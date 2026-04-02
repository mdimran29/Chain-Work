import React from 'react';

interface NotificationItemProps {
  iconName: string;
  iconBgClass: string;
  iconColorClass: string;
  iconBorderClass: string;
  title: string;
  timeAgo: string;
  description: React.ReactNode;
  isUnread?: boolean;
  isFaded?: boolean;
}

export function NotificationItem({
  iconName,
  iconBgClass,
  iconColorClass,
  iconBorderClass,
  title,
  timeAgo,
  description,
  isUnread,
  isFaded,
}: NotificationItemProps) {
  return (
    <div
      className={`p-5 rounded-2xl flex items-start gap-5 hover:translate-x-1 transition-transform cursor-pointer relative overflow-hidden group bg-surface-container/60 backdrop-blur-xl border border-primary/5 ${
        isFaded ? 'opacity-60 hover:opacity-100' : ''
      }`}
    >
      {isUnread && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      )}
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${iconBgClass} ${iconColorClass} ${iconBorderClass} relative z-10`}
      >
        <span
          className="material-symbols-outlined"
          style={
            iconName === 'star' || iconName === 'account_balance_wallet'
              ? { fontVariationSettings: "'FILL' 1" }
              : {}
          }
        >
          {iconName}
        </span>
      </div>
      <div className="flex-1 min-w-0 z-10 relative">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-bold text-on-surface truncate">{title}</h4>
          <span
            className={`font-mono text-[10px] uppercase tracking-widest text-on-surface-variant ${
              isUnread ? 'bg-surface-container-high px-2 py-0.5 rounded-full' : ''
            }`}
          >
            {timeAgo}
          </span>
        </div>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          {description}
        </p>
      </div>
      {isUnread && (
        <div className="flex-shrink-0 self-center z-10 relative">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
        </div>
      )}
    </div>
  );
}
