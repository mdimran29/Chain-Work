import SideNavBar from '../../components/SideNavBar';

export default function FreelancerDashboard() {
  return (
    <>
      <SideNavBar />

      {/* Main Content Canvas */}
      <main className="lg:ml-64 pt-24 px-6 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-4xl font-extrabold tracking-tight text-white font-headline">Welcome back, Curator</h1>
              <p className="text-on-surface-variant text-lg">Your Web3 professional ecosystem at a glance.</p>
            </div>
            <div className="flex items-center gap-2 text-tertiary text-sm font-medium bg-tertiary/5 px-4 py-2 rounded-full border border-tertiary/10">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              Connected to Ethereum Mainnet
            </div>
          </header>

          {/* Stats Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-8 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
              </div>
              <p className="text-on-surface-variant font-medium mb-2">Total Earnings</p>
              <h2 className="text-4xl font-mono font-bold text-white tracking-tight">$12,450.00</h2>
              <div className="mt-4 flex items-center gap-2 text-tertiary text-sm">
                <span className="material-symbols-outlined text-sm">trending_up</span>
                <span>+12.5% this month</span>
              </div>
            </div>

            <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
              <p className="text-on-surface-variant font-medium mb-2">Active Contracts</p>
              <h2 className="text-4xl font-mono font-bold text-white tracking-tight">08</h2>
              <div className="mt-4 flex -space-x-2">
                <div className="w-8 h-8 rounded-full border-2 border-surface bg-primary/20 flex items-center justify-center text-[10px] font-bold">DA</div>
                <div className="w-8 h-8 rounded-full border-2 border-surface bg-secondary/20 flex items-center justify-center text-[10px] font-bold">OP</div>
                <div className="w-8 h-8 rounded-full border-2 border-surface bg-tertiary/20 flex items-center justify-center text-[10px] font-bold">WS</div>
                <div className="w-8 h-8 rounded-full border-2 border-surface bg-surface-container-highest flex items-center justify-center text-[10px] font-bold">+5</div>
              </div>
            </div>

            <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10">
              <p className="text-on-surface-variant font-medium mb-2">Jobs Applied</p>
              <h2 className="text-4xl font-mono font-bold text-white tracking-tight">24</h2>
              <div className="mt-4 w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-2/3"></div>
              </div>
              <p className="mt-2 text-xs text-on-surface-variant">Top 5% of applicants in Solidity</p>
            </div>
          </section>

          {/* Bottom Content: Job Feed & Proposals */}
          <section className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Recommended for You</h3>
                <button className="text-primary text-sm font-semibold hover:underline transition-all cursor-pointer">View All</button>
              </div>
              <div className="space-y-4">
                {/* Job Item 1 */}
                <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/5 hover:border-primary/20 transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-2xl">terminal</span>
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">Senior Solidity Auditor</h4>
                        <p className="text-on-surface-variant text-sm">Nexus Protocol • 2 hours ago</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-mono font-bold">4.5 ETH</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Fixed Budget</p>
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-sm line-clamp-2 mb-4 leading-relaxed">
                    Reviewing complex DeFi logic across 12 smart contracts. Expertise in gas optimization and reentrancy protection required...
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-surface-container-highest text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider">Security</span>
                    <span className="px-3 py-1 bg-surface-container-highest text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider">Auditing</span>
                    <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                      <span className="w-2 h-2 rounded-full bg-[#627EEA]"></span>
                      <span className="text-[10px] text-indigo-300 font-mono">Ethereum</span>
                    </div>
                  </div>
                </div>

                {/* Job Item 2 */}
                <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/5 hover:border-primary/20 transition-all duration-300 group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-2xl">palette</span>
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-lg">Generative Art UI/UX</h4>
                        <p className="text-on-surface-variant text-sm">ArtBlocks Curator • 5 hours ago</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-mono font-bold">$120/hr</p>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Hourly Rate</p>
                    </div>
                  </div>
                  <p className="text-on-surface-variant text-sm line-clamp-2 mb-4 leading-relaxed">
                    Designing a high-fidelity interface for minting generative artworks. Focus on dark mode aesthetics and real-time visualization...
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-surface-container-highest text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider">Design</span>
                    <span className="px-3 py-1 bg-surface-container-highest text-primary text-[10px] font-bold rounded-lg uppercase tracking-wider">React</span>
                    <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-purple-500/10 rounded-full border border-purple-500/20">
                      <span className="w-2 h-2 rounded-full bg-[#8247E5]"></span>
                      <span className="text-[10px] text-purple-300 font-mono">Polygon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* My Proposals (Col 4-5) */}
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-bold text-white">Active Proposals</h3>
              <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/5">
                <div className="p-4 bg-surface-container-high/50 text-[10px] uppercase tracking-widest font-bold text-outline-variant flex justify-between">
                  <span>Project</span>
                  <span>Status / Bid</span>
                </div>
                <div className="divide-y divide-outline-variant/10">
                  <div className="p-5 flex justify-between items-center hover:bg-white/[0.02] transition-colors">
                    <div className="space-y-1">
                      <p className="text-white font-medium text-sm">Governance Dashboard</p>
                      <p className="text-on-surface-variant text-xs">Snapshot.org</p>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold rounded-full border border-yellow-500/20 uppercase">Pending</span>
                      <p className="text-white font-mono text-xs">$3,500</p>
                    </div>
                  </div>
                  <div className="p-5 flex justify-between items-center hover:bg-white/[0.02] transition-colors">
                    <div className="space-y-1">
                      <p className="text-white font-medium text-sm">ZK-Rollup Bridge</p>
                      <p className="text-on-surface-variant text-xs">StarkWare Ecosystem</p>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="px-2 py-0.5 bg-tertiary/10 text-tertiary text-[10px] font-bold rounded-full border border-tertiary/20 uppercase">Accepted</span>
                      <p className="text-white font-mono text-xs">8.0 ETH</p>
                    </div>
                  </div>
                  <div className="p-5 flex justify-between items-center hover:bg-white/[0.02] transition-colors">
                    <div className="space-y-1">
                      <p className="text-white font-medium text-sm">NFT Staking Logic</p>
                      <p className="text-on-surface-variant text-xs">Cool Cats Studio</p>
                    </div>
                    <div className="text-right space-y-1">
                      <span className="px-2 py-0.5 bg-yellow-500/10 text-yellow-500 text-[10px] font-bold rounded-full border border-yellow-500/20 uppercase">Pending</span>
                      <p className="text-white font-mono text-xs">$2,200</p>
                    </div>
                  </div>
                </div>
                <button className="w-full py-4 text-xs font-bold text-on-surface-variant hover:text-white hover:bg-white/5 transition-all cursor-pointer">
                  View All Proposals
                </button>
              </div>

              {/* Profile Performance Snippet */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary-container/20 to-secondary-container/20 border border-primary/10">
                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm">auto_awesome</span>
                  Profile Strength
                </h4>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        className="text-surface-container-highest"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="transparent"
                        stroke="currentColor"
                        strokeWidth="3"
                      ></path>
                      <path
                        className="text-primary"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="transparent"
                        stroke="currentColor"
                        strokeDasharray="85, 100"
                        strokeLinecap="round"
                        strokeWidth="3"
                      ></path>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-white">85%</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-on-surface-variant leading-relaxed">Add a video introduction to reach the &quot;Elite&quot; tier and unlock lower platform fees.</p>
                  </div>
                </div>
                <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold transition-all border border-white/5 cursor-pointer">
                  Update Profile
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
