"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [walletConnected, setWalletConnected] = useState(false);

  const handleConnect = () => {
    // In a real app, this would use Web3/Solana wallet adapter
    setWalletConnected(true);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/60 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600"
        >
          ChainWork
        </Link>
        <div className="hidden md:flex items-center gap-6 font-sans font-medium tracking-tight text-sm">
          <Link
            className="text-indigo-400 border-b-2 border-indigo-400 pb-1 transition-all duration-200"
            href="/marketplace"
          >
            Jobs
          </Link>
          <Link
            className="text-slate-400 hover:text-white transition-colors transition-all duration-200"
            href="/marketplace"
          >
            Marketplace
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          <span className="text-[10px] font-mono text-tertiary uppercase tracking-widest">
            Mainnet Live
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-400 hover:bg-white/5 rounded-xl transition-all duration-200 cursor-pointer">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-slate-400 hover:bg-white/5 rounded-xl transition-all duration-200 cursor-pointer">
            <span className="material-symbols-outlined">account_balance_wallet</span>
          </button>
          {walletConnected ? (
            <Link
              href="/dashboard/freelancer"
              className="bg-surface-container-high text-primary px-5 py-2 rounded-xl font-mono text-sm border border-primary/20 hover:bg-surface-container-highest transition-all cursor-pointer"
            >
              0x71C...8e4f
            </Link>
          ) : (
            <button
              onClick={handleConnect}
              className="bg-gradient-to-r from-primary to-secondary-container text-on-primary-container px-5 py-2 rounded-xl font-semibold text-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
