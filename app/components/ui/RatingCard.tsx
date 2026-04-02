import React from 'react';

interface RatingCardProps {
  title: string;
  typeLabel: string;
  typeBgClass: string;
  typeTextClass: string;
  typeBorderClass: string;
  ratingValue: number; // e.g. 1-5
  date: string;
  reviewText: string;
  reviewerName: string;
  reviewerAddress: string;
  reviewerAvatar: string;
}

export function RatingCard({
  title,
  typeLabel,
  typeBgClass,
  typeTextClass,
  typeBorderClass,
  ratingValue,
  date,
  reviewText,
  reviewerName,
  reviewerAddress,
  reviewerAvatar,
}: RatingCardProps) {
  // Generate stars based on rating Value
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    let starType = 'star';
    let fill = 0;
    if (i <= ratingValue) {
      fill = 1;
    } else if (i - 0.5 === ratingValue) {
      starType = 'star_half';
      fill = 0.5; // Though material symbols usually uses star_half with fill 0 or so, we'll try to emulate the HTML behavior
    }
    stars.push(
      <span key={i} className="material-symbols-outlined text-lg" style={{ fontVariationSettings: `'FILL' ${fill}` }}>
        {starType}
      </span>
    );
  }

  return (
    <div className="bg-surface-container/60 backdrop-blur-xl border border-primary/5 rounded-2xl p-6 transition-all hover:bg-surface-container/80 shadow-lg group">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <span className={`text-[10px] font-mono ${typeTextClass} ${typeBgClass} px-2 py-0.5 rounded border ${typeBorderClass}`}>
              {typeLabel}
            </span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex text-primary">
              {stars}
            </div>
            <span className="text-xs text-on-surface-variant font-mono">{date}</span>
          </div>
          <p className="text-on-surface-variant leading-relaxed text-sm max-w-3xl">
            "{reviewText}"
          </p>
        </div>
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-bold text-white">{reviewerName}</p>
              <p className="text-[10px] font-mono text-on-surface-variant">{reviewerAddress}</p>
            </div>
            <img
              alt="Reviewer Avatar"
              className="w-10 h-10 rounded-xl bg-surface-container-highest p-1 object-cover"
              src={reviewerAvatar}
            />
          </div>
          <button className="flex items-center gap-1 text-[10px] font-bold text-on-surface-variant hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-sm">verified</span>
            VIEW TRANSACTION
          </button>
        </div>
      </div>
    </div>
  );
}
