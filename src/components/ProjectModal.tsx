import React from 'react';
import { X, CheckCircle2, ArrowUpRight, ExternalLink } from 'lucide-react';
import { Project } from '../types.ts';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenContact }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl glass-card border border-white/15 light:border-black/15 p-5 sm:p-8 md:p-10 shadow-2xl bg-[#0a0d0b] light:bg-[#ffffff] text-[#f4f7f4] light:text-[#0d140f] my-6 sm:my-8 overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle green ambient spotlight */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#12b85a]/15 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Close Button with minimum touch target */}
        <button
          onClick={onClose}
          id="project-modal-close"
          aria-label="Close Project Modal"
          className="sticky top-0 float-right w-11 h-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-[#a0ada3] hover:text-[#f4f7f4] hover:bg-white/[0.08] light:hover:bg-black/[0.05] transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10 clear-both">
          {/* Header info */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs font-semibold text-[#39ff88] light:text-[#075c32] uppercase tracking-wider mb-2">
            <span>Project {project.number}</span>
            <span>•</span>
            <span>{project.category}</span>
          </div>

          <h2 className="font-display font-bold text-xl sm:text-3xl md:text-4xl text-[#f4f7f4] light:text-[#0d140f] tracking-tight">
            {project.title}
          </h2>

          {/* Hero Mockup in Modal */}
          <div className="my-5 sm:my-6 rounded-xl sm:rounded-2xl overflow-hidden aspect-[16/9] border border-white/10 light:border-black/10 shadow-xl bg-[#101512]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Description & Deliverables */}
          <div className="space-y-5 sm:space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-[#a0ada3] light:text-[#4a594e] uppercase tracking-wider mb-2">
                Executive Overview
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-[#f4f7f4]/90 light:text-[#0d140f]/90 leading-relaxed">
                {project.description}
              </p>
            </div>

            {project.deliverables && (
              <div>
                <h3 className="text-xs font-semibold text-[#a0ada3] light:text-[#4a594e] uppercase tracking-wider mb-3">
                  Key Deliverables & Measured Impact
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {project.deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-3.5 rounded-xl bg-white/[0.03] light:bg-black/[0.03] border border-white/10 light:border-black/10 flex items-center gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#39ff88] shrink-0" />
                      <span className="text-xs sm:text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div>
              <h3 className="text-xs font-semibold text-[#a0ada3] light:text-[#4a594e] uppercase tracking-wider mb-2">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 sm:px-3 py-1 rounded-full text-xs bg-[#12b85a]/10 border border-[#39ff88]/25 text-[#39ff88] light:text-[#075c32] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-5 sm:pt-6 border-t border-white/10 light:border-black/10 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
              <span className="text-xs text-[#a0ada3] light:text-[#4a594e]">
                {project.client} · Deliverable Cycle: {project.year}
              </span>

              <div className="flex items-center gap-3">
                {project.link && project.link !== '#' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-[#121614] light:bg-[#0d140f] border border-white/15 light:border-black/15 text-xs sm:text-sm font-semibold text-[#f4f7f4] hover:border-[#39ff88]/60 hover:text-[#39ff88] transition-all"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="min-h-[44px] group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 rounded-full bg-[#12b85a] hover:bg-[#39ff88] text-[#050605] font-semibold text-xs sm:text-sm transition-all shadow-md shadow-[#12b85a]/20"
                >
                  <span>Inquire About Similar Work</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
