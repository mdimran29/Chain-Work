import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChainWork | Work Without Trust Issues',
  description: 'Decentralized freelancing powered by blockchain escrow.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Load Material Symbols correctly */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL,GRAD,opsz@100..700,0..1,-50..200,20..48&display=block"
          rel="stylesheet"
        />
        {/* Load Berkeley Mono for technical data if needed (via Google Fonts fallback if it was hosted, else we use standard mono) */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.className} bg-background text-on-surface selection:bg-primary/30 antialiased`}>
        {/* Global Navigation Header incorporated throughout */}
        <nav className="fixed top-0 w-full z-50 bg-slate-900/60 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-6 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-black tracking-tighter text-white bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
              ChainWork
            </Link>
            <div className="hidden md:flex items-center gap-6 font-sans font-medium tracking-tight text-sm">
              <Link className="text-indigo-400 border-b-2 border-indigo-400 pb-1 transition-all duration-200" href="/marketplace">Jobs</Link>
              <Link className="text-slate-400 hover:text-white transition-colors transition-all duration-200" href="/marketplace">Marketplace</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="text-[10px] font-mono text-tertiary uppercase tracking-widest">Mainnet Live</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-400 hover:bg-white/5 rounded-xl transition-all duration-200">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 text-slate-400 hover:bg-white/5 rounded-xl transition-all duration-200">
                <span className="material-symbols-outlined">account_balance_wallet</span>
              </button>
              <button className="bg-gradient-to-r from-primary to-secondary-container text-on-primary-container px-5 py-2 rounded-xl font-semibold text-sm hover:opacity-90 active:scale-95 transition-all">
                Connect Wallet
              </button>
            </div>
          </div>
        </nav>
        
        {children}
      </body>
    </html>
  );
}
