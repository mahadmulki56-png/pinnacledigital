import React, { useState } from 'react';

interface PinnacleLogoProps {
  variant?: 'full' | 'mark';
  className?: string;
  showCursor?: boolean;
}

export const PinnacleLogo: React.FC<PinnacleLogoProps> = ({
  variant = 'full',
  className = 'h-8 sm:h-9 w-auto',
  showCursor = true,
}) => {
  const [pngAvailable, setPngAvailable] = useState<boolean | null>(null);

  // If the user uploads a direct raster PNG into /public/pinnaclelogo.png, we can render it
  // otherwise we render the high-precision vector SVG component
  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      {variant === 'full' ? (
        <svg
          viewBox="0 0 520 180"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Pinnacle Digital Logo"
        >
          <defs>
            <filter id="pinnacle-drop-shadow" x="-10%" y="-10%" width="130%" height="140%">
              <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="#020d07" floodOpacity="0.5" />
            </filter>
            <style>
              {`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,900&display=swap');
                .pinnacle-word {
                  font-family: 'Montserrat', 'Arial Black', 'Impact', sans-serif;
                  font-weight: 900;
                  font-style: italic;
                  font-size: 88px;
                  letter-spacing: -1px;
                }
              `}
            </style>
          </defs>

          <g filter="url(#pinnacle-drop-shadow)">
            {/* Deep 3D Shadow Layers (Faceted Forest Green Extrusion matching reference) */}
            <g fill="#041a0e" stroke="#041a0e" strokeWidth="6" strokeLinejoin="round">
              <text className="pinnacle-word" x="38" y="128">PINNACLE</text>
              <text className="pinnacle-word" x="37" y="127">PINNACLE</text>
              <text className="pinnacle-word" x="36" y="126">PINNACLE</text>
              <text className="pinnacle-word" x="35" y="125">PINNACLE</text>
            </g>

            {/* Mid Extrusion Layer */}
            <g fill="#08301a" stroke="#08301a" strokeWidth="5" strokeLinejoin="round">
              <text className="pinnacle-word" x="34" y="124">PINNACLE</text>
              <text className="pinnacle-word" x="33" y="123">PINNACLE</text>
              <text className="pinnacle-word" x="32" y="122">PINNACLE</text>
              <text className="pinnacle-word" x="31" y="121">PINNACLE</text>
              <text className="pinnacle-word" x="30" y="120">PINNACLE</text>
              <text className="pinnacle-word" x="29" y="119">PINNACLE</text>
              <text className="pinnacle-word" x="28" y="118">PINNACLE</text>
              <text className="pinnacle-word" x="27" y="117">PINNACLE</text>
              <text className="pinnacle-word" x="26" y="116">PINNACLE</text>
            </g>

            {/* Upper Extrusion Highlights */}
            <g fill="#0c3c22" stroke="#0c3c22" strokeWidth="4" strokeLinejoin="round">
              <text className="pinnacle-word" x="25" y="115">PINNACLE</text>
              <text className="pinnacle-word" x="24" y="114">PINNACLE</text>
              <text className="pinnacle-word" x="23" y="113">PINNACLE</text>
              <text className="pinnacle-word" x="22" y="112">PINNACLE</text>
              <text className="pinnacle-word" x="21" y="111">PINNACLE</text>
            </g>

            {/* Deep Green Stroke Outline of the front face */}
            <text
              className="pinnacle-word"
              x="20"
              y="110"
              fill="#ffffff"
              stroke="#062413"
              strokeWidth="7"
              strokeLinejoin="round"
            >
              PINNACLE
            </text>

            {/* Front Letter Face (Pure Crisp White) */}
            <text className="pinnacle-word" x="20" y="110" fill="#ffffff">
              PINNACLE
            </text>

            {/* Neon Lime Arrow Mouse Cursor at bottom right under L & E */}
            {showCursor && (
              <g transform="translate(422, 114)">
                {/* Cursor shadow */}
                <path
                  d="M 0,0 L 16,36 L 24,26 L 36,38 L 44,30 L 32,18 L 42,16 Z"
                  fill="#020c06"
                  transform="translate(3, 4)"
                />
                {/* Cursor dark border */}
                <path
                  d="M 0,0 L 16,36 L 24,26 L 36,38 L 44,30 L 32,18 L 42,16 Z"
                  fill="#84e824"
                  stroke="#062413"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />
                {/* Cursor neon lime fill */}
                <path
                  d="M 0,0 L 16,36 L 24,26 L 36,38 L 44,30 L 32,18 L 42,16 Z"
                  fill="#84e824"
                />
              </g>
            )}
          </g>
        </svg>
      ) : (
        /* Compact Mark / Icon variant */
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Pinnacle Icon"
        >
          <defs>
            <style>
              {`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@1,900&display=swap');
                .pinnacle-mark {
                  font-family: 'Montserrat', 'Arial Black', sans-serif;
                  font-weight: 900;
                  font-style: italic;
                  font-size: 82px;
                }
              `}
            </style>
          </defs>

          {/* 3D Extruded P */}
          <g fill="#041a0e" stroke="#041a0e" strokeWidth="5" strokeLinejoin="round">
            <text className="pinnacle-mark" x="38" y="90">P</text>
            <text className="pinnacle-mark" x="36" y="88">P</text>
            <text className="pinnacle-mark" x="34" y="86">P</text>
          </g>
          <g fill="#0c3c22" stroke="#0c3c22" strokeWidth="4" strokeLinejoin="round">
            <text className="pinnacle-mark" x="32" y="84">P</text>
            <text className="pinnacle-mark" x="30" y="82">P</text>
            <text className="pinnacle-mark" x="28" y="80">P</text>
          </g>
          <text
            className="pinnacle-mark"
            x="24"
            y="76"
            fill="#ffffff"
            stroke="#062413"
            strokeWidth="6"
            strokeLinejoin="round"
          >
            P
          </text>
          <text className="pinnacle-mark" x="24" y="76" fill="#ffffff">
            P
          </text>

          {/* Lime cursor badge */}
          {showCursor && (
            <g transform="translate(68, 62) scale(0.7)">
              <path
                d="M 0,0 L 16,36 L 24,26 L 36,38 L 44,30 L 32,18 L 42,16 Z"
                fill="#84e824"
                stroke="#062413"
                strokeWidth="4"
                strokeLinejoin="round"
              />
            </g>
          )}
        </svg>
      )}
    </div>
  );
};
