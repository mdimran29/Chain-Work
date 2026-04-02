import React from 'react';
import SideNavBar from '../components/SideNavBar';
import { PortfolioCard } from '../components/ui/PortfolioCard';

export default function PortfolioPage() {
  return (
    <>
      <SideNavBar />
      <main className="lg:ml-64 pt-24 px-6 pb-12 min-h-screen bg-background text-on-surface">
        {/* User Profile Header Section */}
        <section className="max-w-6xl mx-auto mb-16">
          <div className="relative group">
            {/* Profile Backdrop Decor */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]"></div>
            <div className="relative flex flex-col md:flex-row items-end md:items-center gap-8 p-8 rounded-2xl bg-surface-container/40 backdrop-blur-xl border border-primary/5">
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-indigo-400/20 shadow-2xl">
                  <img
                    alt="Alex Rivers"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7B3oRHxUg7AL84PXeKvJwoXm1CGwcC_m5mFGMENbwt0GznIANAexPur1jEKI4DpV_T1bHo-HvFcUYHC6BH_0cILfLwNPpSSWFhPE57Ojfq7ASneTHyXf-cNCGl1sNWCbOy6Nwyi6g-JlxUCYK5XFX-wTlaR_4kL0X7-iMLUi_GlLmi2waQ9DTPT6H9_xTWP_CE3_qyXlnwFNB7UB1jbGrh3e4kqIJd5WUpug_EOdqG6kpd41XPwBFlN3a4bz0_zvTWwakXfdc6wM"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-tertiary text-on-tertiary-container px-2 py-1 rounded-lg font-mono text-[10px] font-bold shadow-lg">
                  VERIFIED
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-4">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">Alex Rivers</h1>
                    <div className="flex items-center gap-2 px-3 py-1 bg-surface-container-highest/50 rounded-full border border-white/5">
                      <span className="material-symbols-outlined text-indigo-400 text-sm">verified_user</span>
                      <span className="font-mono text-xs text-indigo-300">0x71C...392D</span>
                    </div>
                  </div>
                  <p className="text-xl text-on-surface-variant font-medium">Full-Stack Web3 Architect & UI/UX Designer</p>
                </div>
                <p className="max-w-2xl text-on-surface-variant leading-relaxed">
                  Curating digital experiences at the intersection of decentralization and high-end aesthetics. Specialized in React, Solidity, and Kinetic UI systems. Building the future of the open web, one block at a time.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/20">Solidity</span>
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/20">React Native</span>
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/20">UI/UX</span>
                  <span className="px-3 py-1 bg-indigo-500/10 text-indigo-300 text-xs font-bold rounded-full border border-indigo-500/20">Ethers.js</span>
                  <span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant text-xs font-bold rounded-full">+12 more</span>
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col gap-3 z-10">
                <div className="p-4 rounded-xl flex items-center justify-between gap-8 bg-surface-container/60 backdrop-blur-xl border border-primary/5">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Total Earnings</p>
                    <p className="text-2xl font-mono font-bold text-white">42.8 ETH</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Rating</p>
                    <div className="flex items-center gap-1 text-tertiary">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="font-mono font-bold">4.9</span>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-gradient-to-r from-primary to-secondary-container text-white font-bold py-3 rounded-xl active:scale-95 transition-all">Hire Alex</button>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Grid Header */}
        <section className="max-w-6xl mx-auto mb-8 flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-white tracking-tight">Project Portfolio</h2>
            <p className="text-on-surface-variant text-sm">A curated selection of smart contracts and interfaces.</p>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all group">
            <span className="material-symbols-outlined text-indigo-400 group-hover:rotate-90 transition-transform">add</span>
            <span className="text-sm font-bold text-white">Add Project</span>
          </button>
        </section>

        {/* Bento Grid Portfolio */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          <PortfolioCard
            size="large"
            title="EtherFlow DEX Interface"
            description="A complete overhaul of the EtherFlow decentralized exchange, focusing on reducing transaction friction and enhancing liquidity pool visualization."
            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBDBN7Gb90wKGetXlgnka6KpNtws--3Km4kSVxfIwZXam0DsQXufhITld81q08saqM0xYz1H2paBwwVF0qPBOBnaLtc8qX0w1oARY3asGrYDQwh_X2xCNEsbNIBkh0N2lxxMhBMfLh4uR5jWlYjUwAcYMXBIKFM5oyP3djPP1hXtkr4jDbL8wcG34CfqGw1fG_DtvhmVnezTXSaADRlfoAx8xLj7UE7B3yG6Rl5NAfKNyug2rOUhZ-_7tBFKwTWXUaLF0PTtDaRMos"
            tags={['React', 'Tailwind', 'Web3.js']}
            liveStatus="LIVE"
          />
          <PortfolioCard
            size="small"
            title="Nebula NFT Mint"
            description="High-performance minting engine for a 10k collection on Polygon."
            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCEmlbaDg9ZPdtUbjRabbm3Jd2bjb4s4nQLdh7hDq1CfQp_Q9JMdch_0GEwppORFnOqlMBcyyxY8TrzjtnTXUNYI4IsbPzTyG1bAgXxyAfSD-iObS7fqiug2zCBKidy2GobeS0Y2WM2TJiUMOyLphSCEXKHfFGNFCLTaiVhyGpgOU8D2lNAw_jqrXGMNK9y0gw2wal2b47e16zXT7M1MmP14bB6EHInzsa0P7fl8_Yw1FyfbtvHXVUDQYLmng8ft_H_UMSJ2801qAQ"
            tags={['Solidity', 'Hardhat']}
          />
          <PortfolioCard
            size="small"
            title="DAO Governance Bot"
            description="Discord automation for snapshot voting and proposal alerts."
            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCvWIu3knSfy-n2V4MtU1rIgm-911TrzzkVpn7270jQp9c-5H_bfuFjp8Cfk6AfautEZqKsTiWNk-nalDagBwd85UlEPLUvSzKbW8YidefjzMFGEuHiVrpIxbyQ2d7zOBVikFsaWKbwWCuC386eTYzuSGV2vlvfaGRHtk85VTxIxvO7kvzUcD0RAHiVRDqqx26rfwYhu96vSx_YeRUZypI6yfrODXcVWIhTY2u9Q9awtbPHzz9MY_kJzM-E371REyXHFYClq0GEo6w"
            tags={['Node.js', 'Ethers']}
          />
          <PortfolioCard
            size="medium"
            title="Pulse Analytics"
            description="A real-time on-chain data visualizer for whale wallet tracking and token flow analysis. Custom D3.js implementation for dynamic graphing."
            imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAomowD3M_J1s5BSrcQo00K700_UwzriJt7fI9lFK3TCooNZ1bhWZiddS2iCVnUOVEI2KjBBlNLWXJu2i83REqfDeNsrZOWL3IvNVo7aSA0YYoDHMeFMe19J_n_c2dA1_UsQ9-f0Fdmgj52YbwGC6CUBRxHzojaNS5kLaad1NUOzqn-X3phY9b79-pHiJVAhookEsGvh_N6l4ZSW8PtLSTKoFGSmBBEfgwwXJcU9mH1hZeWsA3RJixpY36buo477asDF2R1bOC9fAw"
            tags={[]}
            isFeatured={true}
          />
        </section>

        {/* Tech Stack / Experience Section */}
        <section className="max-w-6xl mx-auto mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-bold">Core Mastery</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Smart Contracts</span>
                  <span className="font-mono text-indigo-300">95%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[95%]"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Frontend Dev</span>
                  <span className="font-mono text-indigo-300">90%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[90%]"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">System Design</span>
                  <span className="font-mono text-indigo-300">85%</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[85%]"></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6 md:col-span-2">
              <h4 className="text-xs uppercase tracking-[0.2em] text-indigo-400 font-bold">Recent Achievements</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl flex items-start gap-4 bg-surface-container/60 backdrop-blur-xl border border-primary/5">
                  <div className="p-2 bg-tertiary/10 text-tertiary rounded-lg">
                    <span className="material-symbols-outlined">emoji_events</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">ETHGlobal Finalist</p>
                    <p className="text-on-surface-variant text-xs">2023 - Paris Hackathon</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl flex items-start gap-4 bg-surface-container/60 backdrop-blur-xl border border-primary/5">
                  <div className="p-2 bg-indigo-400/10 text-indigo-300 rounded-lg">
                    <span className="material-symbols-outlined">history_edu</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Audited 12+ Protocols</p>
                    <p className="text-on-surface-variant text-xs">Zero critical exploits found post-audit.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl flex items-start gap-4 bg-surface-container/60 backdrop-blur-xl border border-primary/5">
                  <div className="p-2 bg-purple-400/10 text-purple-300 rounded-lg">
                    <span className="material-symbols-outlined">group</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Open Source Lead</p>
                    <p className="text-on-surface-variant text-xs">Contributor to Ethers.js & Wagmi</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl flex items-start gap-4 bg-surface-container/60 backdrop-blur-xl border border-primary/5">
                  <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                    <span className="material-symbols-outlined">rocket_launch</span>
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">50+ Projects Shipped</p>
                    <p className="text-on-surface-variant text-xs">Successful launches across 4 chains.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
