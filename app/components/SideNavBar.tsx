"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideNavBar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Client Dashboard', icon: 'dashboard', href: '/dashboard/client' },
    { name: 'Freelancer Dashboard', icon: 'space_dashboard', href: '/dashboard/freelancer' },
    { name: 'Marketplace', icon: 'storefront', href: '/marketplace' },
    { name: 'Messages', icon: 'chat', href: '/messaging' },
    { name: 'Notifications', icon: 'notifications', href: '/notifications' },
    { name: 'Transactions', icon: 'account_balance_wallet', href: '/transactions' },
    { name: 'Reviews', icon: 'star', href: '/reviews' },
    { name: 'Portfolio', icon: 'folder_shared', href: '/portfolio' },
    { name: 'Settings', icon: 'settings', href: '/settings' },
  ];

  return (
    <aside className="fixed left-0 top-[4.5rem] h-[calc(100vh-4.5rem)] w-64 bg-slate-900/50 backdrop-blur-lg border-r border-white/5 flex-col py-6 gap-2 font-sans text-sm font-medium z-40 hidden md:flex overflow-y-auto no-scrollbar">
      <div className="px-6 mb-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center cursor-pointer hover:bg-indigo-400 transition-colors">
            <span className="material-symbols-outlined text-white text-xl">token</span>
          </Link>
          <div>
            <div className="text-white font-bold text-sm tracking-tight">ChainWork</div>
            <div className="text-slate-500 text-[10px] uppercase tracking-widest font-mono">The Digital Curator</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 transition-all rounded-xl group ${
                isActive
                  ? 'text-white bg-indigo-500/10 border-r-2 border-indigo-500'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="px-4 py-6 space-y-1">
        <Link href="/help" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all rounded-xl">
          <span className="material-symbols-outlined text-xl">help</span>
          <span>Help Center</span>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all rounded-xl text-left">
          <span className="material-symbols-outlined text-xl">logout</span>
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
