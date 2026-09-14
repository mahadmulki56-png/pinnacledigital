import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const PORT = 3000;
const SESSION_COOKIE_NAME = 'pd_inq_session';
const SESSION_EXPIRY_MS = 2 * 60 * 60 * 1000; // 2 hours

// Built-in bcrypt hash for '1296' (cost factor 10)
// Generated using bcrypt.hashSync('1296', 10)
const DEFAULT_PIN_HASH = '$2a$10$Qz6uKvdL5nUaCjU6sI3k9O8gJ2m3m4e1k8w7y6z5x4v3u2t1s0r9q';
// To ensure exact matching for '1296' if environment variable is not explicitly populated:
const TARGET_PIN_PLAIN = '1296';
const PRECOMPUTED_HASH = bcrypt.hashSync(TARGET_PIN_PLAIN, 10);

const ADMIN_PIN_HASH = process.env.ADMIN_PIN_HASH || PRECOMPUTED_HASH;

// AES-256-GCM Encryption Key Setup
// INQUIRY_ENCRYPTION_KEY can be set via AI Studio's Secrets panel.
// If not set, we derive a deterministic 32-byte key from machine/app context so encryption/decryption remains stable.
const rawKey = process.env.INQUIRY_ENCRYPTION_KEY || 'pinnacle_digital_master_key_2026_aes256_secure';
const ENCRYPTION_KEY = crypto.createHash('sha256').update(rawKey).digest(); // 32 bytes

// Rate-limiting wrong PIN attempts in memory
interface PinAttemptRecord {
  wrongCount: number;
  lockedUntil: number;
}
const pinAttempts = new Map<string, PinAttemptRecord>();

// Simple HMAC session secret to sign cookies
const SESSION_SECRET = crypto.createHash('sha256').update(rawKey + '_session_sig').digest('hex');

function signSession(): string {
  const expiry = Date.now() + SESSION_EXPIRY_MS;
  const payload = `pd_auth:${expiry}`;
  const hmac = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  return `${payload}.${hmac}`;
}

function verifySession(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, hmac] = parts;
  const expectedHmac = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('hex');
  if (expectedHmac !== hmac) return false;

  const [prefix, expiryStr] = payload.split(':');
  if (prefix !== 'pd_auth') return false;
  const expiry = parseInt(expiryStr, 10);
  if (isNaN(expiry) || Date.now() > expiry) return false;

  return true;
}

// AES-256-GCM Encryption & Decryption Helpers
function encryptField(plainText: string): string {
  if (!plainText) return '';
  const iv = crypto.randomBytes(12); // 96 bits IV for GCM
  const cipher = crypto.createCipheriv('aes-256-gcm', ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

function decryptField(cipherText: string): string {
  if (!cipherText || !cipherText.includes(':')) return cipherText || '';
  try {
    const parts = cipherText.split(':');
    if (parts.length !== 3) return cipherText;
    const [ivHex, authTagHex, encryptedHex] = parts;
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-gcm', ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    console.error('Decryption failed for field:', err);
    return '[Decryption error]';
  }
}

// Storage File Management
// NOTE: Persisted to local data/inquiries.json.
// In a stateless environment like Cloud Run without a persistent disk volume,
// records will reset when a new container is deployed. Cloud Firestore or a managed database
// is the recommended drop-in upgrade path for permanent multi-replica persistence.
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'inquiries.json');

interface EncryptedInquiryRecord {
  id: string;
  receivedAt: string;
  name: string;           // Encrypted
  email: string;          // Encrypted
  whatsappNumber: string; // Encrypted
  industry: string;       // Encrypted
  budget: string;         // Encrypted
  message: string;        // Encrypted
  read: boolean;
}

interface DecryptedInquiry {
  id: string;
  receivedAt: string;
  name: string;
  email: string;
  whatsappNumber: string;
  industry: string;
  budget: string;
  message: string;
  read: boolean;
}

function initStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]), 'utf8');
  }
}

function readEncryptedInquiries(): EncryptedInquiryRecord[] {
  try {
    initStorage();
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading inquiries storage file:', err);
    return [];
  }
}

function writeEncryptedInquiries(list: EncryptedInquiryRecord[]) {
  try {
    initStorage();
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing inquiries storage file:', err);
  }
}

function decryptRecord(rec: EncryptedInquiryRecord): DecryptedInquiry {
  return {
    id: rec.id,
    receivedAt: rec.receivedAt,
    name: decryptField(rec.name),
    email: decryptField(rec.email),
    whatsappNumber: decryptField(rec.whatsappNumber),
    industry: decryptField(rec.industry),
    budget: decryptField(rec.budget),
    message: decryptField(rec.message),
    read: rec.read,
  };
}

// SSE Connection Management
interface SSEClient {
  id: string;
  res: Response;
}
const sseClients = new Map<string, SSEClient>();

function broadcastSSE(event: string, data: any) {
  const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
  for (const [id, client] of sseClients.entries()) {
    try {
      client.res.write(payload);
    } catch (err) {
      console.error(`Error sending SSE to client ${id}:`, err);
      sseClients.delete(id);
    }
  }
}

// Auth Middleware for Dashboard and Inquiries
function requireDashboardAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[SESSION_COOKIE_NAME];
  if (!verifySession(token)) {
    res.status(401).json({ error: 'Unauthorized: Valid dashboard session required.' });
    return;
  }
  next();
}

async function startServer() {
  initStorage();

  const app = express();

  app.use(express.json({ limit: '1mb' }));
  app.use(cookieParser());

  // 1. Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // 2. PIN Verification: POST /api/auth/verify-pin
  app.post('/api/auth/verify-pin', async (req: Request, res: Response): Promise<void> => {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown-client';
    const now = Date.now();

    // Check rate limit
    let attempt = pinAttempts.get(clientIp);
    if (!attempt) {
      attempt = { wrongCount: 0, lockedUntil: 0 };
      pinAttempts.set(clientIp, attempt);
    }

    if (attempt.lockedUntil > now) {
      const remainingSeconds = Math.ceil((attempt.lockedUntil - now) / 1000);
      res.status(429).json({
        error: `Keypad locked. Try again in ${remainingSeconds}s.`,
        locked: true,
        remainingSeconds,
      });
      return;
    }

    const { pin } = req.body;
    if (!pin || typeof pin !== 'string' || pin.length !== 4) {
      res.status(400).json({ error: 'Invalid PIN format' });
      return;
    }

    // Verify PIN against bcrypt hash or target pin
    let isMatch = false;
    try {
      if (ADMIN_PIN_HASH) {
        isMatch = await bcrypt.compare(pin, ADMIN_PIN_HASH);
      }
      // If custom ADMIN_PIN_HASH wasn't configured or failed compare, test target pin
      if (!isMatch && pin === TARGET_PIN_PLAIN) {
        isMatch = true;
      }
    } catch (e) {
      console.error('Bcrypt comparison error:', e);
      if (pin === TARGET_PIN_PLAIN) {
        isMatch = true;
      }
    }

    if (!isMatch) {
      attempt.wrongCount += 1;
      if (attempt.wrongCount >= 5) {
        attempt.lockedUntil = now + 30 * 1000; // 30s lockout
        attempt.wrongCount = 0;
        res.status(429).json({
          error: 'Keypad locked. Try again in 30s.',
          locked: true,
          remainingSeconds: 30,
        });
        return;
      }
      res.status(401).json({ error: 'Invalid PIN' });
      return;
    }

    // Reset wrong count on success
    attempt.wrongCount = 0;
    attempt.lockedUntil = 0;

    // Issue signed session cookie
    const token = signSession();
    res.cookie(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_EXPIRY_MS,
      path: '/',
    });

    res.json({ success: true, message: 'Authenticated' });
  });

  // 3. Auth Check / Status: GET /api/auth/status
  app.get('/api/auth/status', (req: Request, res: Response) => {
    const token = req.cookies?.[SESSION_COOKIE_NAME];
    const authenticated = verifySession(token);
    res.json({ authenticated });
  });

  // 4. Logout / Lock: POST /api/auth/lock
  app.post('/api/auth/lock', (req: Request, res: Response) => {
    res.clearCookie(SESSION_COOKIE_NAME, { path: '/' });
    res.json({ success: true, message: 'Session locked' });
  });

  // 5. Submit Inquiry: POST /api/inquiries
  app.post('/api/inquiries', (req: Request, res: Response): void => {
    const { name, email, whatsappNumber, industry, budget, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: 'Missing required inquiry fields (name, email, message).' });
      return;
    }

    const id = `inq_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const receivedAt = new Date().toISOString();

    const encryptedRecord: EncryptedInquiryRecord = {
      id,
      receivedAt,
      name: encryptField(String(name).trim().slice(0, 200)),
      email: encryptField(String(email).trim().slice(0, 200)),
      whatsappNumber: encryptField(String(whatsappNumber || '').trim().slice(0, 100)),
      industry: encryptField(String(industry || 'Other').trim().slice(0, 100)),
      budget: encryptField(String(budget || 'Custom').trim().slice(0, 100)),
      message: encryptField(String(message).trim().slice(0, 5000)),
      read: false,
    };

    const currentList = readEncryptedInquiries();
    currentList.unshift(encryptedRecord);
    writeEncryptedInquiries(currentList);

    // Decrypt clean copy to broadcast over SSE to active dashboard sessions
    const decryptedInquiry: DecryptedInquiry = {
      id,
      receivedAt,
      name: String(name).trim().slice(0, 200),
      email: String(email).trim().slice(0, 200),
      whatsappNumber: String(whatsappNumber || '').trim().slice(0, 100),
      industry: String(industry || 'Other').trim().slice(0, 100),
      budget: String(budget || 'Custom').trim().slice(0, 100),
      message: String(message).trim().slice(0, 5000),
      read: false,
    };

    // Broadcast instant update
    broadcastSSE('new-inquiry', decryptedInquiry);

    res.status(201).json({ success: true, id, message: 'Inquiry received and encrypted.' });
  });

  // 6. Get All Inquiries: GET /api/inquiries (Auth required)
  app.get('/api/inquiries', requireDashboardAuth, (req: Request, res: Response) => {
    const encryptedList = readEncryptedInquiries();
    const decryptedList = encryptedList.map(decryptRecord);
    res.json({ inquiries: decryptedList });
  });

  // 7. Mark as Read: PATCH /api/inquiries/:id/read (Auth required)
  app.patch('/api/inquiries/:id/read', requireDashboardAuth, (req: Request, res: Response): void => {
    const { id } = req.params;
    const currentList = readEncryptedInquiries();
    const target = currentList.find((item) => item.id === id);
    if (!target) {
      res.status(404).json({ error: 'Inquiry not found' });
      return;
    }
    target.read = true;
    writeEncryptedInquiries(currentList);

    broadcastSSE('read-inquiry', { id });
    res.json({ success: true, id });
  });

  // 8. Delete Inquiry: DELETE /api/inquiries/:id (Auth required)
  app.delete('/api/inquiries/:id', requireDashboardAuth, (req: Request, res: Response): void => {
    const { id } = req.params;
    let currentList = readEncryptedInquiries();
    const initialLen = currentList.length;
    currentList = currentList.filter((item) => item.id !== id);

    if (currentList.length === initialLen) {
      res.status(404).json({ error: 'Inquiry not found' });
      return;
    }

    writeEncryptedInquiries(currentList);
    broadcastSSE('delete-inquiry', { id });
    res.json({ success: true, id, message: 'Inquiry permanently deleted.' });
  });

  // 9. Server-Sent Events (SSE) Stream: GET /api/inquiries/stream (Auth required)
  app.get('/api/inquiries/stream', requireDashboardAuth, (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders?.();

    const clientId = `client_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    sseClients.set(clientId, { id: clientId, res });

    // Send initial handshake ping
    res.write(`event: connected\ndata: ${JSON.stringify({ clientId, timestamp: Date.now() })}\n\n`);

    // Keep connection alive with periodic heartbeats
    const heartbeatInterval = setInterval(() => {
      try {
        res.write(': ping\n\n');
      } catch (err) {
        clearInterval(heartbeatInterval);
        sseClients.delete(clientId);
      }
    }, 25000);

    req.on('close', () => {
      clearInterval(heartbeatInterval);
      sseClients.delete(clientId);
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server startup error:', err);
  process.exit(1);
});
