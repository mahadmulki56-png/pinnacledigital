import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, ExternalLink, CheckCircle2 } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData.ts';
import { Project } from '../types.ts';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [imgErrors, setImgErrors] = useState<{ [key: string]: boolean }>({});

  const handleImgError = (num: string) => {
    setImgErrors((prev) => ({ ...prev, [num]: true }));
  };

  return (
    <section
      id="work"
      className="py-20 sm:py-28 bg-[#050605] light:bg-[#f8faf8] border-t border-white/[0.06] light:border-black/[0.06] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] light:bg-black/[0.04] border border-white/10 light:border-black/10 text-xs font-semibold text-[#39ff88] light:text-[#075c32] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Selected Projects</span>
          </div>
          <h2
            id="projects-heading"
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[52px] tracking-tight text-[#f4f7f4] light:text-[#0d140f]"
          >
            Projects That Delivered <br className="hidden sm:inline" /> Real Impact
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#a0ada3] light:text-[#4a594e] max-w-xl">
            A curated showcase of our recent bespoke digital products and brand transformations.
          </p>
        </div>

        {/* The Two Selected Projects */}
        <div className="flex flex-col gap-12 sm:gap-16 perspective-container">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.number}
              id={`project-card-${project.number}`}
              className="relative rounded-3xl sm:rounded-[36px] glass-card card-project-depth p-6 sm:p-10 lg:p-12 overflow-hidden border border-white/10 light:border-black/10 group"
            >
              {/* Subtle green ambient spotlight on top right */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#12b85a]/10 rounded-full blur-3xl pointer-events-none -z-0 opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                {/* Project Details (Left) */}
                <div className="lg:col-span-6 flex flex-col justify-between h-full">
                  <div>
                    {/* Top Row: Category + Huge Watermark Number */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="text-xs sm:text-sm font-medium text-[#39ff88] light:text-[#075c32] tracking-wide uppercase">
                        {project.category}
                      </span>
                      <span className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white/[0.08] light:text-black/[0.08] select-none">
                        {project.number}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#f4f7f4] light:text-[#0d140f] tracking-tight mb-4">
                      {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#a0ada3] light:text-[#4a594e] leading-relaxed mb-6 max-w-xl">
                      {project.description}
                    </p>

                    {/* Deliverables / Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-white/[0.04] light:bg-black/[0.04] border border-white/10 light:border-black/10 text-[#f4f7f4] light:text-[#0d140f]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-2">
                    <button
                      onClick={() => onSelectProject(project)}
                      id={`explore-project-${project.number}`}
                      className="group/btn inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#121614] light:bg-[#0d140f] border border-white/15 light:border-black/15 text-xs sm:text-sm font-semibold text-[#f4f7f4] hover:border-[#39ff88]/60 hover:bg-[#151c18] transition-all duration-300"
                    >
                      <span>Explore Project</span>
                      <div className="w-5 h-5 rounded-full bg-[#12b85a] group-hover/btn:bg-[#39ff88] text-[#050605] flex items-center justify-center transition-colors">
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                      </div>
                    </button>
                    {project.client && (
                      <span className="text-xs text-[#67756b] light:text-[#a0ada3]">
                        Client: {project.client} · {project.year}
                      </span>
                    )}
                  </div>
                </div>

                {/* Large Project Image Showcase (Right) */}
                <div className="lg:col-span-6">
                  <div
                    onClick={() => onSelectProject(project)}
                    className="relative w-full aspect-[16/10] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#101512] light:bg-[#f0f4f1] border border-white/10 light:border-black/10 group-hover:border-[#39ff88]/30 shadow-2xl cursor-pointer transition-all duration-500"
                  >
                    <img
                      src={
                        imgErrors[project.number]
                          ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85'
                          : project.image
                      }
                      onError={() => handleImgError(project.number)}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    />

                    {/* Interactive overlay pill on hover */}
                    <div className="absolute inset-0 bg-[#050605]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="px-4 py-2 rounded-full bg-[#0a0d0b]/90 text-white text-xs font-semibold backdrop-blur-md border border-white/20 flex items-center gap-2 shadow-xl">
                        <span>View Case Details</span>
                        <ExternalLink className="w-3.5 h-3.5 text-[#39ff88]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
