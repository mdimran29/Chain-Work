"use client";

import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'success', isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const iconName = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
  const iconColor = type === 'success' ? 'text-tertiary' : type === 'error' ? 'text-error' : 'text-blue-400';

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-3 px-6 py-4 rounded-xl bg-surface-container/80 backdrop-blur-xl shadow-2xl border border-indigo-500/30 animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-none">
      <span className={`material-symbols-outlined ${iconColor}`} style={{ fontVariationSettings: "'FILL' 1" }}>{iconName}</span>
      <p className="text-sm font-bold text-white">{message}</p>
    </div>
  );
}
