import React from "react";
import SideNavBar from "../components/SideNavBar";
import { TransactionRow } from "../components/ui/TransactionRow";

export default function TransactionsPage() {
  return (
    <>
      <SideNavBar />
      <main className="lg:ml-64 pt-24 pb-12 px-6 md:px-10 min-h-screen bg-background text-on-surface">
        {/* Header Section */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2 leading-tight">
              Financial <span className="text-indigo-400">Activities</span>
            </h1>
            <p className="text-on-surface-variant max-w-xl text-lg">
              Detailed audit trail of all smart contract interactions and peer-to-peer payments.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-surface-container/60 backdrop-blur-xl flex items-center px-4 py-2 rounded-xl border border-white/5">
              <div className="mr-4">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  Total Volume
                </p>
                <p className="font-mono text-xl font-bold text-white">12.45 ETH</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">show_chart</span>
              </div>
            </div>
            <div className="bg-surface-container/60 backdrop-blur-xl flex items-center px-4 py-2 rounded-xl border border-white/5">
              <div className="mr-4">
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  Pending
                </p>
                <p className="font-mono text-xl font-bold text-white">0.82 ETH</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined">history</span>
              </div>
            </div>
          </div>
        </header>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:max-w-md">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              search
            </span>
            <input
              className="w-full bg-surface-container-lowest text-white border-none rounded-xl py-3 pl-12 pr-4 focus:ring-1 focus:ring-primary/40 transition-all placeholder:text-slate-600 outline-none"
              placeholder="Search by job title or hash..."
              type="text"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <button className="bg-indigo-500/10 text-indigo-300 px-4 py-2.5 rounded-lg border border-indigo-500/20 text-sm whitespace-nowrap font-medium">
              All Networks
            </button>
            <button className="bg-surface-container hover:bg-surface-container-high px-4 py-2.5 rounded-lg text-slate-400 text-sm whitespace-nowrap transition-colors">
              Ethereum
            </button>
            <button className="bg-surface-container hover:bg-surface-container-high px-4 py-2.5 rounded-lg text-slate-400 text-sm whitespace-nowrap transition-colors">
              Solana
            </button>
            <button className="bg-surface-container hover:bg-surface-container-high px-4 py-2.5 rounded-lg text-slate-400 text-sm whitespace-nowrap transition-colors">
              Polygon
            </button>
          </div>
          <button className="md:ml-auto flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <span className="material-symbols-outlined">filter_list</span>
            <span className="text-sm font-medium">More Filters</span>
          </button>
        </div>

        {/* Transactions Table Container */}
        <div className="bg-surface-container/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white/5 border-b border-white/5">
                  <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                    Job Title
                  </th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                    Network
                  </th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                    Transaction Hash
                  </th>
                  <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <TransactionRow
                  iconName="code"
                  iconBgColors="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-500/20"
                  iconTextColor="text-indigo-300"
                  title="Smart Contract Audit"
                  subtitle="DeFi Protocol V2"
                  amount="2.40 ETH"
                  networkName="Ethereum"
                  networkColor="bg-[#627EEA]"
                  status="Completed"
                  statusColors="bg-tertiary/10 text-tertiary border-tertiary/20"
                  hash="0x7a2...f4e1"
                  date="Oct 24, 2023"
                />
                <TransactionRow
                  iconName="brush"
                  iconBgColors="bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border-teal-500/20"
                  iconTextColor="text-teal-300"
                  title="Landing Page Design"
                  subtitle="Aura Analytics"
                  amount="850.00 SOL"
                  networkName="Solana"
                  networkColor="bg-[#14F195]"
                  status="Pending"
                  statusColors="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                  hash="4kL9...9zWa"
                  date="Oct 23, 2023"
                />
                <TransactionRow
                  iconName="database"
                  iconBgColors="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border-purple-500/20"
                  iconTextColor="text-purple-300"
                  title="Indexing Solution"
                  subtitle="SubGraph Connect"
                  amount="4,200.00 MATIC"
                  networkName="Polygon"
                  networkColor="bg-[#8247E5]"
                  status="Completed"
                  statusColors="bg-tertiary/10 text-tertiary border-tertiary/20"
                  hash="0x9f1...88b2"
                  date="Oct 21, 2023"
                />
                <TransactionRow
                  iconName="security"
                  iconBgColors="bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-500/20"
                  iconTextColor="text-pink-300"
                  title="Security Consulting"
                  subtitle="Shield Finance"
                  amount="1.25 ETH"
                  networkName="Ethereum"
                  networkColor="bg-[#627EEA]"
                  status="Completed"
                  statusColors="bg-tertiary/10 text-tertiary border-tertiary/20"
                  hash="0x3e4...c9a0"
                  date="Oct 18, 2023"
                />
                <TransactionRow
                  iconName="hub"
                  iconBgColors="bg-gradient-to-br from-orange-500/20 to-amber-500/20 border-orange-500/20"
                  iconTextColor="text-orange-300"
                  title="Ecosystem Architecture"
                  subtitle="NeoNexus"
                  amount="12,500.00 MATIC"
                  networkName="Polygon"
                  networkColor="bg-[#8247E5]"
                  status="Pending"
                  statusColors="bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                  hash="0x1d4...f761"
                  date="Oct 15, 2023"
                />
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 bg-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">Showing 1 to 5 of 42 transactions</p>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-white/5">
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-lg bg-indigo-500 text-white font-bold text-xs">
                1
              </button>
              <button className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-white/5">
                2
              </button>
              <button className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-white/5">
                3
              </button>
              <button className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-slate-400 hover:text-white transition-colors border border-white/5">
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Insights / Bento Area */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container/60 backdrop-blur-xl p-6 rounded-2xl border border-white/5 md:col-span-1">
            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-400">pie_chart</span>
              Network Distribution
            </h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Ethereum</span>
                  <span className="text-white">65%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#627EEA] h-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Polygon</span>
                  <span className="text-white">25%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#8247E5] h-full" style={{ width: "25%" }}></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-400">Solana</span>
                  <span className="text-white">10%</span>
                </div>
                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#14F195] h-full" style={{ width: "10%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container/60 backdrop-blur-xl p-6 rounded-2xl border border-white/5 md:col-span-2 relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-white font-bold mb-2">Export Statements</h4>
              <p className="text-slate-500 text-sm mb-6 max-w-md">
                Generate official tax-compliant reports for your digital earnings and gas expenses.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white text-sm font-bold transition-all border border-white/5">
                  <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
                  Download PDF
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-white text-sm font-bold transition-all border border-white/5">
                  <span className="material-symbols-outlined text-sm">csv</span>
                  Export CSV
                </button>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 rounded-xl text-sm font-bold transition-all border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
                  <span className="material-symbols-outlined text-sm">mail</span>
                  Email to Accountant
                </button>
              </div>
            </div>
            {/* Abstract bg element */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/15 blur-[60px] rounded-full pointer-events-none"></div>
          </div>
        </div>
      </main>
    </>
  );
}
