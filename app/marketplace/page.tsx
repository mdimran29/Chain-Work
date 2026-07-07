import Link from 'next/link';

export default function Marketplace() {
  return (
    <>
      <div className="flex pt-20 min-h-screen">
        {/* Sidebar Filter (SideNavBar Replacement/Adaptation) */}
        <aside className="w-72 fixed left-0 top-0 h-screen pt-24 pb-8 px-6 bg-[#121315] overflow-y-auto hidden lg:block no-scrollbar border-r border-white/5">
          <div className="space-y-8">
            {/* Search (Mobile/Tablet redundancy) */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-outline mb-4">Keywords</h3>
              <div className="bg-surface-container-low p-3 rounded-xl">
                <input
                  className="w-full bg-transparent border-none text-sm focus:ring-0 text-on-surface outline-none"
                  placeholder="Design, Solidity..."
                  type="text"
                />
              </div>
            </div>
            {/* Chain Filter */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-outline mb-4">Networks</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    checked
                    className="rounded border-outline-variant bg-surface-container-highest text-primary focus:ring-primary/20"
                    type="checkbox"
                    readOnly
                  />
                  <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Ethereum</span>
                  <span className="ml-auto w-2 h-2 rounded-full bg-[#627EEA]"></span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="rounded border-outline-variant bg-surface-container-highest text-primary focus:ring-primary/20"
                    type="checkbox"
                  />
                  <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Solana</span>
                  <span className="ml-auto w-2 h-2 rounded-full bg-[#14F195]"></span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="rounded border-outline-variant bg-surface-container-highest text-primary focus:ring-primary/20"
                    type="checkbox"
                  />
                  <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Polygon</span>
                  <span className="ml-auto w-2 h-2 rounded-full bg-[#8247E5]"></span>
                </label>
              </div>
            </div>
            {/* Budget Filter */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-outline">Budget Range</h3>
                <span className="font-mono text-[10px] text-primary">$1k - $25k+</span>
              </div>
              <input
                className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
                max="50000"
                min="1000"
                type="range"
                defaultValue="25000"
              />
            </div>
            {/* Category Dropdown */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-outline mb-4">Category</h3>
              <select className="w-full bg-surface-container-low border-none rounded-xl text-sm text-on-surface focus:ring-1 focus:ring-primary/30 p-3 outline-none">
                <option>Smart Contract Dev</option>
                <option>dApp Frontend</option>
                <option>UI/UX Design</option>
                <option>Protocol Security</option>
                <option>Content Marketing</option>
              </select>
            </div>
            {/* Stats/CTA */}
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 mt-12">
              <p className="text-xs text-primary/80 mb-1">New opportunities today</p>
              <p className="text-2xl font-bold text-primary">142</p>
              <Link href="/create-job" className="block text-center w-full mt-4 py-3 bg-surface-container-highest text-on-surface text-sm font-semibold rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer">
                Post a Job
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-72 px-6 lg:px-12 pb-12">
          {/* Header Section */}
          <header className="py-12">
            <h1 className="text-4xl lg:text-5xl font-black tracking-tighter mb-4">
              Discover <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-container">Open Protocols</span>
            </h1>
            <p className="text-on-surface-variant max-w-xl text-lg">
              Browse verified Web3 opportunities and contribute to the future of decentralized infrastructure.
            </p>
          </header>

          {/* Jobs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
            {/* Job Card 1 */}
            <div className="group relative bg-[#1f2021] border border-white/5 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden flex items-center justify-center border border-white/10">
                  <img
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuByZOKLdlH249FT1WwKFb_uX--z9Bc_MO6jT7XbnjlJLuCjddJ9K-UyIUBNkC9B-MaQQyrcrlWnP57eFWFDmgfaV2hx9nWcaObb1KN2Kt16XUqBXeaGoaM5MvIuoXQB-xOSHSkL7bukwaRPws_PAPEgow7_zLk4XirGUE58B6VfAvkpemDY2OAJpLjhtkKAFrLc5O0xK_zMXTJaPpa1Ug_jclPmsjr4RCNfyF95b4v5Hvk55g1cwoO5G2cUU0FYUIzpLq2B7w1oB-4"
                  />
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-mono text-sm text-primary tracking-tight">$8k - $12k</span>
                  <span className="text-[10px] text-outline uppercase font-bold tracking-widest mt-1">Stables Only</span>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Senior Solidity Architect</h2>
              <p className="text-sm text-on-surface-variant line-clamp-2 mb-6">
                Design and implement core lending protocols for our upcoming L2 launch. Deep knowledge of gas optimization required.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 rounded-full bg-[#0d0e0f] text-[10px] font-bold text-outline border border-white/5 uppercase tracking-tighter">Solidity</span>
                <span className="px-3 py-1 rounded-full bg-[#0d0e0f] text-[10px] font-bold text-outline border border-white/5 uppercase tracking-tighter">DeFi</span>
                <span className="px-3 py-1 rounded-full bg-[#0d0e0f] text-[10px] font-bold text-outline border border-white/5 uppercase tracking-tighter">EVM</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#627EEA]"></span>
                  <span className="text-xs font-medium text-on-surface-variant">Ethereum</span>
                </div>
                <Link href="/job/123" className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-[#1000a9] rounded-lg text-xs font-bold transition-all cursor-pointer">
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Job Card 2 */}
            <div className="group relative bg-[#1f2021] border border-white/5 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden flex items-center justify-center border border-white/10">
                  <img
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsLXlH9S2xV7wzujHOLg1wa4SuB75nv5b4nh0exKK8Hx2yqfug_KbtbuzjDCpZR8hzHoh8Pi0ZSYjuHI03Ebi_pc-6Fk8PKG9boVer26_HRwQgIjkil4JP9FDaBfUYk03z-5nRy_8zivszP0V25N5IsxdIT1iVnnto36N8CmRli_6SLQfD_2g0t_HzeEIEDyZi16eyfAEalm7JpOWLPk35s6EW7PO7vuptgr26d_L3RAjseXg9MiFd6vzrTOCIs9lA-_0kvSo02Xs"
                  />
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-mono text-sm text-primary tracking-tight">$4.5k - $6k</span>
                  <span className="text-[10px] text-outline uppercase font-bold tracking-widest mt-1">Milestones</span>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Rust Developer (Anchor)</h2>
              <p className="text-sm text-on-surface-variant line-clamp-2 mb-6">
                Migration of current ERC-20 staking logic to Solana SPL using the Anchor framework. Audit experience preferred.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 rounded-full bg-[#0d0e0f] text-[10px] font-bold text-outline border border-white/5 uppercase tracking-tighter">Rust</span>
                <span className="px-3 py-1 rounded-full bg-[#0d0e0f] text-[10px] font-bold text-outline border border-white/5 uppercase tracking-tighter">Solana</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#14F195]"></span>
                  <span className="text-xs font-medium text-on-surface-variant">Solana</span>
                </div>
                <Link href="/job/123" className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-[#1000a9] rounded-lg text-xs font-bold transition-all cursor-pointer">
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Job Card 3 */}
            <div className="group relative bg-[#1f2021] border border-white/5 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden flex items-center justify-center border border-white/10">
                  <img
                    alt="Company Logo"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBk5XaeZeKU0tiHKjYln5Le1KbVJv-7gql-AyT-Dh3x6HgTrtDsCedAsSCD4xYsGI-YD0Hq5yeKE9R4fLQV7rOG_7C2MjQct5Pib2d69fYTuWqVQeiy1h-Q__h5qruWs9GQZBnXojTDJmRpOqJ3Qx2c8XX-iFWnHOroR6QKq-YC8CkA1qUCHvNiD_Rins4QzB_xA4oD4wf0nQpzqosKqFwrQFYHQkjNAx0CdSBo89C3yVX2WmZIoPGCfnvruWJep9q_RRKn_qc1-CI"
                  />
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-mono text-sm text-primary tracking-tight">$12k - $20k</span>
                  <span className="text-[10px] text-outline uppercase font-bold tracking-widest mt-1">Full Retainer</span>
                </div>
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">UI/UX Designer (dApp)</h2>
              <p className="text-sm text-on-surface-variant line-clamp-2 mb-6">
                Reimagining the yield farming experience for high-net-worth users. Focus on visual hierarchy and complex data.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 rounded-full bg-[#0d0e0f] text-[10px] font-bold text-outline border border-white/5 uppercase tracking-tighter">Figma</span>
                <span className="px-3 py-1 rounded-full bg-[#0d0e0f] text-[10px] font-bold text-outline border border-white/5 uppercase tracking-tighter">Product</span>
                <span className="px-3 py-1 rounded-full bg-[#0d0e0f] text-[10px] font-bold text-outline border border-white/5 uppercase tracking-tighter">Web3</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8247E5]"></span>
                  <span className="text-xs font-medium text-on-surface-variant">Polygon</span>
                </div>
                <Link href="/job/123" className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-[#1000a9] rounded-lg text-xs font-bold transition-all cursor-pointer">
                  Apply Now
                </Link>
              </div>
            </div>

            {/* Job Card 6 (Bento-style variation) */}
            <div className="group relative bg-[#1f2021] border border-white/5 rounded-2xl p-6 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 md:col-span-2 2xl:col-span-1 overflow-hidden">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 blur-3xl rounded-full"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 overflow-hidden flex items-center justify-center border border-white/10">
                    <img
                      alt="Company Logo"
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSle_2z5RQVt6_EktBpeGAJr2qngxt-udU3r7QnpseFZX73JP9ux0rGZp935UnmLhCPDnZdZeSPUXmH_0eAv9wz4hsUuJy2WKKucRSHHJxKL-V5eHKESfAB3pmU_ZeNmZ7QMHjhZomDCznw4VECrM3QlstwZ-titoDUgCbLqvuHl2KRtD7S39NKcJQGdPrZqSUxhvnA0FZCJW6K_BYzlPdc9XAbbHny5OpDgc-_mQn1MAs1kxNi_t4u0X86Aq79-5uWHu3zysQ8bo"
                    />
                  </div>
                  <span className="font-mono text-sm text-primary tracking-tight">$25k+</span>
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Head of Product</h2>
                <p className="text-sm text-on-surface-variant mb-6">
                  Executive role for a top-tier VC-backed DAO platform. Influence the roadmap for thousands of governance participants.
                </p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-[#0d0e0f] p-3 rounded-xl border border-white/5">
                    <p className="text-[10px] text-outline uppercase font-bold tracking-widest mb-1">Duration</p>
                    <p className="text-sm font-semibold">12 Months+</p>
                  </div>
                  <div className="bg-[#0d0e0f] p-3 rounded-xl border border-white/5">
                    <p className="text-[10px] text-outline uppercase font-bold tracking-widest mb-1">Level</p>
                    <p className="text-sm font-semibold">Executive</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#627EEA]"></span>
                    <span className="text-xs font-medium text-on-surface-variant">Ethereum Mainnet</span>
                  </div>
                  <Link href="/job/123" className="inline-block text-center px-6 py-2 bg-gradient-to-r from-primary to-secondary-container text-on-primary-container rounded-lg text-xs font-bold shadow-lg shadow-primary/20 transition-all cursor-pointer">
                    View Executive Brief
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination / Load More */}
          <div className="mt-16 flex flex-col items-center gap-4">
            <button className="px-10 py-4 bg-surface-container-highest/50 backdrop-blur border border-white/5 rounded-2xl text-on-surface-variant font-bold hover:bg-surface-container-highest transition-all flex items-center gap-3 cursor-pointer">
              Load More Opportunities
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
            <p className="text-xs text-outline font-mono">Displaying 1 - 4 of 142 contracts</p>
          </div>
        </main>
      </div>

      {/* Mobile Bottom NavBar - visible only on md screens and below */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container/60 backdrop-blur-3xl border-t border-white/5 px-6 py-4 flex justify-between items-center z-50">
        <Link href="/marketplace" className="flex flex-col items-center gap-1 text-indigo-400">
          <span className="material-symbols-outlined">work</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Jobs</span>
        </Link>
        <Link href="/dashboard/client" className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">description</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Contracts</span>
        </Link>
        <div className="flex flex-col items-center -mt-8 relative z-10">
          <Link href="/create-job" className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary-container shadow-xl flex items-center justify-center text-white">
            <span className="material-symbols-outlined font-bold">add</span>
          </Link>
        </div>
        <Link href="/dashboard/freelancer" className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">payments</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Earnings</span>
        </Link>
        <Link href="/" className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Settings</span>
        </Link>
      </nav>

      {/* FAB */}
      <Link href="/create-job" className="hidden lg:flex fixed bottom-8 right-8 w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-secondary-container shadow-2xl items-center justify-center text-white group hover:scale-110 transition-all z-40 cursor-pointer">
        <span className="material-symbols-outlined text-3xl transition-transform group-hover:rotate-90">add</span>
        <div className="absolute right-20 px-4 py-2 bg-surface-container-highest rounded-xl text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-white/5 pointer-events-none">
          Post a Job
        </div>
      </Link>
    </>
  );
}
