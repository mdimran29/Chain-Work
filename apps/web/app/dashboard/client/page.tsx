import Link from "next/link";
import SideNavBar from "../../components/SideNavBar";

export default function ClientDashboard() {
  return (
    <>
      <SideNavBar />

      {/* Main Content Area */}
      <main className="lg:ml-64 pt-24 overflow-y-auto no-scrollbar p-8 bg-surface">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Hero Header */}
          <header className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-headline font-black tracking-tight text-white">
              Client Overview
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl">
              Manage your open mandates, monitor active smart contracts, and oversee escrowed
              capital.
            </p>
          </header>

          {/* Stats Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 flex flex-col justify-between group hover:bg-surface-container transition-colors duration-300">
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant font-label text-sm uppercase tracking-widest font-semibold">
                  Total Jobs Posted
                </span>
                <span className="material-symbols-outlined text-primary-container">assignment</span>
              </div>
              <div className="mt-4">
                <span className="text-4xl font-headline font-bold text-white">124</span>
                <span className="text-tertiary text-sm ml-2 font-mono">+12%</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 flex flex-col justify-between group hover:bg-surface-container transition-colors duration-300">
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant font-label text-sm uppercase tracking-widest font-semibold">
                  Active Jobs
                </span>
                <span className="material-symbols-outlined text-secondary">rocket_launch</span>
              </div>
              <div className="mt-4">
                <span className="text-4xl font-headline font-bold text-white">8</span>
                <p className="text-on-surface-variant text-xs mt-1">3 pending confirmation</p>
              </div>
            </div>
            <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary-container/20 p-6 rounded-2xl border border-primary/20 flex flex-col justify-between">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="flex justify-between items-start z-10">
                <span className="text-primary font-label text-sm uppercase tracking-widest font-bold">
                  Funds Locked
                </span>
                <span className="material-symbols-outlined text-primary">lock</span>
              </div>
              <div className="mt-4 z-10">
                <span className="text-4xl font-headline font-bold text-white font-mono">
                  $42,500.00
                </span>
                <p className="text-on-primary-container text-xs mt-1">Secured in smart escrow</p>
              </div>
            </div>
          </section>

          {/* Active Jobs Editorial Table */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-headline font-bold text-white">Active Mandates</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-white transition-colors">
                  Export CSV
                </button>
                <button className="px-4 py-2 text-sm font-medium text-on-surface-variant bg-surface-container rounded-lg border border-outline-variant/20">
                  Filter
                </button>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/5">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high/50">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      Job Title
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      Chain
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                      Budget
                    </th>
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/5">
                  <tr className="hover:bg-surface-container/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-white font-semibold">
                          Web3 Protocol Branding & Design
                        </span>
                        <span className="text-xs text-on-surface-variant">Posted 2 days ago</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-tertiary/10 text-tertiary">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#627EEA] shadow-[0_0_8px_#627EEA]"></span>
                        <span className="text-xs font-mono">Ethereum</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-white font-mono font-medium">$12,500</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-xs font-bold text-primary px-3 py-1.5 rounded-lg hover:bg-primary/10">
                          View Proposals
                        </button>
                        <button className="text-xs font-bold text-on-primary bg-primary px-3 py-1.5 rounded-lg shadow-sm">
                          Fund Escrow
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex flex-col">
                        <span className="text-white font-semibold">
                          Solana Rust Smart Contract Audit
                        </span>
                        <span className="text-xs text-on-surface-variant">Posted 5 hours ago</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#14F195] shadow-[0_0_8px_#14F195]"></span>
                        <span className="text-xs font-mono">Solana</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-white font-mono font-medium">$8,200</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-xs font-bold text-primary px-3 py-1.5 rounded-lg hover:bg-primary/10">
                          View Proposals
                        </button>
                        <button className="text-xs font-bold text-on-primary bg-primary px-3 py-1.5 rounded-lg shadow-sm">
                          Fund Escrow
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Ecosystem Insight Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
            <div className="bg-surface-container rounded-2xl p-8 border border-outline-variant/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-20">
                <span className="material-symbols-outlined text-6xl text-primary">analytics</span>
              </div>
              <h3 className="text-xl font-headline font-bold text-white mb-2">Talent Analytics</h3>
              <p className="text-on-surface-variant text-sm mb-6 max-w-xs">
                Your top freelancers are currently saving you an average of 14% on gas fees through
                optimized batching.
              </p>
              <button className="text-primary text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
                View Detailed Report{" "}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="bg-surface-container rounded-2xl p-8 border border-outline-variant/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-20">
                <span className="material-symbols-outlined text-6xl text-tertiary">security</span>
              </div>
              <h3 className="text-xl font-headline font-bold text-white mb-2">Escrow Security</h3>
              <p className="text-on-surface-variant text-sm mb-6 max-w-xs">
                All locked funds are held in a multi-sig vault. Transaction 0xAE...F2 was verified
                successfully.
              </p>
              <button className="text-tertiary text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
                Audit Smart Contracts{" "}
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
