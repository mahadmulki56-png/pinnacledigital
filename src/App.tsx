/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { IntroSection } from './components/IntroSection.tsx';
import { CapabilitiesSection } from './components/CapabilitiesSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { PricingSection } from './components/PricingSection.tsx';
import { TrustSection } from './components/TrustSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { InsightsSection } from './components/InsightsSection.tsx';
import { FinalCtaSection } from './components/FinalCtaSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ContactModal } from './components/ContactModal.tsx';
import { ProjectModal } from './components/ProjectModal.tsx';
import { RevealSection } from './components/RevealSection.tsx';
import { Project } from './types.ts';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [contactModalOpen, setContactModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#050605] light:bg-[#f8faf8] text-[#f4f7f4] light:text-[#0d140f] selection:bg-[#12b85a]/30 selection:text-[#8dffb8] relative transition-colors duration-300">
      {/* Navigation */}
      <Navbar
        darkMode={darkMode}
        onToggleTheme={toggleTheme}
        onOpenContact={() => setContactModalOpen(true)}
      />

      {/* Main Content Sections matching exact visual reference hierarchy */}
      <main>
        {/* 1. Hero */}
        <RevealSection delayMs={50}>
          <Hero onOpenContact={() => setContactModalOpen(true)} />
        </RevealSection>

        {/* 2. Intro / Value Proposition */}
        <RevealSection>
          <IntroSection onOpenContact={() => setContactModalOpen(true)} />
        </RevealSection>

        {/* 3. Personal / Agency Capabilities & Metrics */}
        <RevealSection>
          <CapabilitiesSection />
        </RevealSection>

        {/* 4. Selected Projects (Strictly Two Projects) */}
        <RevealSection>
          <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
        </RevealSection>

        {/* 5. Services Multi-Card Visual Grid */}
        <RevealSection>
          <ServicesSection onOpenContact={() => setContactModalOpen(true)} />
        </RevealSection>

        {/* 6. Pricing & Engagement Models */}
        <RevealSection>
          <PricingSection onOpenContact={() => setContactModalOpen(true)} />
        </RevealSection>

        {/* 7. Trust & Client Feedback */}
        <RevealSection>
          <TrustSection />
        </RevealSection>

        {/* 8. FAQ Accordion */}
        <RevealSection>
          <FaqSection onOpenContact={() => setContactModalOpen(true)} />
        </RevealSection>

        {/* 9. Creative Insights & Articles */}
        <RevealSection>
          <InsightsSection />
        </RevealSection>

        {/* 10. Large Final Glowing Emerald CTA with bottom navigation tiles */}
        <RevealSection>
          <FinalCtaSection onOpenContact={() => setContactModalOpen(true)} />
        </RevealSection>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Contact Drawer/Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

      {/* Interactive Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => {
          setSelectedProject(null);
          setContactModalOpen(true);
        }}
      />
    </div>
  );
}
