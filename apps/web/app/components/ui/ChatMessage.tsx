import React from "react";
import Image from "next/image";

interface ChatMessageProps {
  isSender: boolean;
  avatarUrl: string;
  messageText: React.ReactNode;
  timestamp: string;
  hasAttachment?: boolean;
  attachmentName?: string;
  attachmentSize?: string;
}

export function ChatMessage({
  isSender,
  avatarUrl,
  messageText,
  timestamp,
  hasAttachment,
  attachmentName,
  attachmentSize,
}: ChatMessageProps) {
  return (
    <div
      className={`flex ${isSender ? "flex-row-reverse" : ""} items-start gap-4 max-w-2xl ${isSender ? "ml-auto" : ""}`}
    >
      <div
        className={`w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 mt-1 ${isSender ? "border border-indigo-500/30" : ""}`}
      >
        {/* We use standard img with suppressed rules in eslint or unoptimized Image for prototyping */}
        <img className="w-full h-full object-cover" src={avatarUrl} alt="Avatar" />
      </div>
      <div className={`space-y-1 ${isSender ? "items-end flex flex-col" : ""}`}>
        {hasAttachment ? (
          <div className="space-y-2">
            <div
              className={`p-4 rounded-2xl ${isSender ? "bg-gradient-to-br from-indigo-600 to-purple-700 rounded-tr-none shadow-xl shadow-indigo-500/10 text-white" : "bg-surface-container-highest rounded-tl-none border border-white/5 shadow-sm text-slate-200"} text-sm leading-relaxed`}
            >
              {messageText}
            </div>
            <div className="bg-surface-container-lowest p-3 rounded-xl border border-white/5 flex items-center gap-4 group cursor-pointer hover:bg-surface-container-high transition-all">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                <span className="material-symbols-outlined">description</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-slate-300">{attachmentName}</div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                  {attachmentSize}
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-500 group-hover:text-white transition-colors">
                download
              </span>
            </div>
          </div>
        ) : (
          <div
            className={`p-4 rounded-2xl ${isSender ? "bg-gradient-to-br from-indigo-600 to-purple-700 rounded-tr-none shadow-xl shadow-indigo-500/10 text-white" : "bg-surface-container-highest rounded-tl-none border border-white/5 shadow-sm text-slate-200"} text-sm leading-relaxed`}
          >
            {messageText}
          </div>
        )}
        <div
          className={`text-[10px] font-mono text-slate-600 ${isSender ? "mr-1 flex items-center gap-1" : "ml-1"}`}
        >
          {timestamp}
          {isSender && (
            <span
              className="material-symbols-outlined text-xs text-indigo-400"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
