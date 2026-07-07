"use client";

import React, { useState } from 'react';

const networks = [
  { id: 'ethereum', name: 'Ethereum', color: 'bg-[#627EEA]' },
  { id: 'polygon', name: 'Polygon', color: 'bg-[#8247E5]' },
  { id: 'solana', name: 'Solana', color: 'bg-[#14F195]' },
  { id: 'optimism', name: 'Optimism', color: 'bg-[#FF0420]' },
];

export function NetworkSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);

  return (
    <div className="relative z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/5 transition-all text-sm font-bold text-white shadow-lg"
      >
        <div className={`w-2 h-2 rounded-full ${selectedNetwork.color} shadow-[0_0_8px_${selectedNetwork.color}]`}></div>
        {selectedNetwork.name}
        <span className="material-symbols-outlined text-sm text-slate-400 ml-1">
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-surface-container-high border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-200">
          <div className="px-3 py-2 text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mb-1">
            Select Network
          </div>
          <div className="space-y-1">
            {networks.map((net) => (
              <button
                key={net.id}
                onClick={() => {
                  setSelectedNetwork(net);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedNetwork.id === net.id 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-on-surface hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${net.color}`}></div>
                  {net.name}
                </div>
                {selectedNetwork.id === net.id && (
                  <span className="material-symbols-outlined text-sm">check</span>
                )}
              </button>
            ))}
          </div>
          
          <div className="mt-2 pt-2 border-t border-white/5">
            <div className="px-3 py-2 bg-error/10 text-error rounded-xl flex items-start gap-2 max-w-[200px] text-xs">
              <span className="material-symbols-outlined text-sm shrink-0 mt-0.5">warning</span>
              <p className="leading-tight">Verify you're on the correct network before finalizing smart contracts.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
