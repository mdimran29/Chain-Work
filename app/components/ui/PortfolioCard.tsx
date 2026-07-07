import React from 'react';
import Image from 'next/image';

interface PortfolioCardProps {
  size: 'large' | 'medium' | 'small';
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  isFeatured?: boolean;
  linkUrl?: string;
  liveStatus?: string;
}

export function PortfolioCard({
  size,
  title,
  description,
  imageUrl,
  tags,
  isFeatured,
  linkUrl = '#',
  liveStatus,
}: PortfolioCardProps) {
  if (size === 'medium') {
    return (
      <div className="md:col-span-8 group relative overflow-hidden rounded-2xl bg-surface-container/60 backdrop-blur-xl border border-primary/5 transition-all hover:translate-y-[-4px]">
        <div className="flex flex-col md:flex-row h-full">
          <div className="md:w-1/2 overflow-hidden h-64 md:h-full">
            <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={imageUrl} alt={title} />
          </div>
          <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              {isFeatured && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#d9b9ff]"></span>
                  <span className="text-[10px] font-mono text-secondary uppercase tracking-widest font-bold">Featured Project</span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">{title}</h3>
              <p className="text-on-surface-variant text-sm">{description}</p>
            </div>
            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-surface-container-highest text-white py-2 rounded-xl text-xs font-bold hover:bg-indigo-500/20 transition-all border border-white/5">View Case Study</button>
              <button className="p-2 border border-white/10 rounded-xl hover:bg-white/5">
                <span className="material-symbols-outlined text-white">code</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isLarge = size === 'large';

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-surface-container/60 backdrop-blur-xl border border-primary/5 transition-all hover:translate-y-[-4px] ${isLarge ? 'md:col-span-8' : 'md:col-span-4'}`}>
      <div className={`${isLarge ? 'h-64 md:h-80' : 'h-48'} w-full overflow-hidden`}>
        <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={imageUrl} alt={title} />
      </div>
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className={`${isLarge ? 'text-2xl' : 'text-xl'} font-bold text-white group-hover:text-indigo-300 transition-colors`}>{title}</h3>
            <p className={`text-on-surface-variant ${isLarge ? 'text-sm max-w-xl' : 'text-xs'}`}>{description}</p>
          </div>
          {isLarge && (
            <a href={linkUrl} className="p-2 bg-indigo-500/20 text-indigo-300 rounded-lg hover:bg-indigo-500/40 transition-colors">
              <span className="material-symbols-outlined">open_in_new</span>
            </a>
          )}
        </div>
        <div className={`flex flex-wrap gap-2 ${!isLarge ? 'pt-2' : ''}`}>
          {liveStatus && (
            <span className="px-2 py-0.5 bg-surface-container-lowest text-[10px] font-mono text-tertiary rounded border border-tertiary/20">{liveStatus}</span>
          )}
          {tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 bg-surface-container-lowest text-[10px] font-mono text-on-surface-variant rounded border border-outline-variant/30">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
