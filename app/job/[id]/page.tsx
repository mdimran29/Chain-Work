export default function JobDetail() {
  return (
    <main className="lg:pl-[10%] pt-24 pb-12 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Job Info */}
        <div className="xl:col-span-8 space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="bg-tertiary/10 text-tertiary text-[10px] font-mono px-2 py-1 rounded-full uppercase tracking-widest font-bold">Open for Proposals</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface leading-tight">
              Fullstack Rust/Solana Developer
            </h1>
            <div className="flex items-center gap-4 text-on-surface-variant text-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
                <span className="font-mono text-xs">0xAb...123</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <span>Posted 2 hours ago</span>
              </div>
            </div>
          </section>

          {/* Tags Area */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1.5 rounded-full bg-surface-container-highest text-primary-fixed-dim text-xs font-semibold border border-outline-variant/20">Solana</span>
            <span className="px-3 py-1.5 rounded-full bg-surface-container-highest text-primary-fixed-dim text-xs font-semibold border border-outline-variant/20">Rust</span>
            <span className="px-3 py-1.5 rounded-full bg-surface-container-highest text-primary-fixed-dim text-xs font-semibold border border-outline-variant/20">Web3</span>
            <span className="px-3 py-1.5 rounded-full bg-surface-container-highest text-primary-fixed-dim text-xs font-semibold border border-outline-variant/20">Smart Contracts</span>
          </div>

          {/* Description */}
          <section className="prose prose-invert max-w-none space-y-6">
            <p className="text-on-surface-variant text-lg leading-relaxed">
              We are looking for a senior-level Fullstack Rust developer with deep expertise in the Solana ecosystem. You will be responsible for architecting and implementing high-performance programs (smart contracts) using Anchor and building the corresponding frontend interfaces.
            </p>
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10">
              <h3 className="text-on-surface font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">verified_user</span>
                Scope of Work
              </h3>
              <ul className="space-y-3 text-on-surface-variant text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  Develop secure and audited Solana programs using the Anchor framework.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  Optimize gas (compute units) and account management strategies.
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  Integrate programs with a React/Next.js frontend using @solana/web3.js.
                </li>
              </ul>
            </div>
          </section>

          {/* Proposals Section */}
          <section className="space-y-6 pt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-on-surface tracking-tight">Active Proposals</h2>
              <span className="text-sm text-outline">3 Candidates</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/5 hover:border-primary/20 transition-all group cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <img alt="Candidate 1" className="w-12 h-12 rounded-xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqDpBT-nQQ-eaigyhPNuFyjcBMx2fFSA466YqPE3dognKJ6EKIj7__YKUF2G9rpdK_ctJwuVFUVPS_qjBhzOEw-AHlooTLY_l6G6oH1ia_Uh0VuHmrvu5-9rUv2rURySghQDuwmLyYjVt1r5pynP9VTUd8nwLDdz8ONanwlo3BbllCxwjJCLPqO-9ucMhJ1iUcf9UhM-wBHYMEx_9buRdlcJnXSpjXgVYJWnl5Xlj9P49mVWNiF1kYZN9bRn1WYa3DUFzl_zOIejM" />
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">Alex R.</h4>
                    <span className="text-tertiary text-xs font-mono">Top Rated</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant mb-4 line-clamp-2">5+ years Rust experience. Lead dev at XYZ Protocol...</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold">$12,000</span>
                  <button className="text-primary text-[11px] font-bold uppercase tracking-wider group-hover:underline">View Profile</button>
                </div>
              </div>

              <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/5 hover:border-primary/20 transition-all group cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <img alt="Candidate 2" className="w-12 h-12 rounded-xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9ChXyHBqBjAdSiwSNl32aqQMBDWbct6dQmZKiD-uV1gQlMTOT2_5cAtYdA_6nTL3PwUudXhWXuQ3wK-_3PUlTycxo3VqsjhPchpssVNdDIESfpM-1KyBj0aQOWjPRAEvPAnr8KnJ_EDvw0tquKBQFixFsGtj9X33EtLDtuzNTfqmYOybksOtrc0Ou2UjP_L-2cBDRMoGyd4_4XIckpYePsDT3RnnL6QKnwW9R7FPZnJW3to6SuJhMN7-Ul4F8_vEpEjG1LV3IGuo" />
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">Elena K.</h4>
                    <span className="text-primary text-xs font-mono">Anchor Expert</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant mb-4 line-clamp-2">Contributed to Solana Core. Expert in parallelization...</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold">$15,500</span>
                  <button className="text-primary text-[11px] font-bold uppercase tracking-wider group-hover:underline">View Profile</button>
                </div>
              </div>

              <div className="bg-surface-container rounded-2xl p-5 border border-outline-variant/5 hover:border-primary/20 transition-all group cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <img alt="Candidate 3" className="w-12 h-12 rounded-xl object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfh0LXJTUFQp3Fp3JyCtxEG7LD8Oxl8CvfcPwpPgL_y5mwDrB-mNuxGQWzJCWgSih4kGK3HsrA8rYY2kunS_tWxGv8R7kC_M_rXuO6_eZMP985nja2-Aa3mbgwbfKlsMp3BSxZDfJM7h2qg_TgJgX6dgjyaxW6qoYbbrkzAZaOlTCBE8XYDk84w-CErOuz-AHHDUoP0TYuhGd0dt--VKqfNMPFhUsY16584rZzxuy9nX29nMUR_mKmRhcpbt4zg2_h7NgTqlRN5d0" />
                  <div>
                    <h4 className="font-bold text-on-surface text-sm">Jordan M.</h4>
                    <span className="text-outline text-xs font-mono">Rising Star</span>
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant mb-4 line-clamp-2">Fullstack master. React + Rust combo for 3 years...</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold">$10,000</span>
                  <button className="text-primary text-[11px] font-bold uppercase tracking-wider group-hover:underline">View Profile</button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Contract Panel */}
        <div className="xl:col-span-4 sticky top-24">
          <div className="glass-panel p-8 rounded-2xl border border-outline-variant/10 shadow-2xl space-y-8 bg-surface-container/60 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">Contract Panel</h2>
              <div className="flex items-center gap-2 bg-[#14F195]/10 px-3 py-1 rounded-full border border-[#14F195]/20">
                <div className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse"></div>
                <span className="text-[10px] font-bold text-[#14F195] uppercase tracking-widest">Solana</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-outline tracking-widest">Escrow Status</label>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-black text-tertiary">Funded</span>
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
            </div>
            
            <div className="p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">Contract Value</span>
                <span className="font-mono text-lg font-bold text-on-surface">45.00 SOL</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">Platform Fee (2%)</span>
                <span className="font-mono text-sm text-on-surface-variant">0.90 SOL</span>
              </div>
              <div className="pt-4 border-t border-outline-variant/10 flex justify-between items-center">
                <span className="text-sm font-bold text-on-surface">Total Release</span>
                <span className="font-mono text-xl font-black text-primary">44.10 SOL</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-tertiary to-[#00885d] text-on-tertiary font-bold py-4 rounded-xl shadow-lg shadow-tertiary/10 active:scale-[0.98] transition-transform cursor-pointer">
                Release Payment
              </button>
              <button className="w-full border border-outline text-on-surface-variant font-bold py-4 rounded-xl hover:bg-white/5 active:scale-[0.98] transition-transform cursor-pointer">
                Request Refund
              </button>
            </div>
            
            <div className="pt-4 space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-outline tracking-widest">Transaction Hash</span>
                <a className="font-mono text-xs text-primary hover:underline truncate" href="#">0xabc71c8e4f1234567890abcdef1234567890def</a>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-bold text-outline tracking-widest">Network Speed</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-on-surface-variant">~2,400 TPS</span>
                  <div className="h-1 flex-1 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary w-3/4 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Chat Snippet */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="w-80 glass-panel bg-surface-container/80 backdrop-blur-3xl rounded-2xl border border-outline-variant/20 shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-surface-container-high p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img alt="Chat partner" className="w-8 h-8 rounded-full border border-primary/20 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQPrwBl1voEgP-NGrqKHu32qpeYfQD4V3qAMiFqdjGHSmLFN5vc6WwrjiD47GUELKIuXmWfKyybtI8wZaD98oA9aBVqSewzp-ZXnxOQ6kBxN3VG4d9t3_8d5ZQyI2QiWi3Cm76JcSwI8u2YS9El53yww7DbpdfcfnH68RE_9tShkAEX1DyEcqClpgRcYWVR5kML7CpP8FBC0hDiVX5_GwIiQlZXriCeDw8PelsszTNWLUJhVE73E2uxoeHyoXiK58zKwZNtzKNtRc" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-tertiary rounded-full border-2 border-surface-container-high"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Alex R.</span>
                <span className="text-[10px] text-tertiary">Online</span>
              </div>
            </div>
            <button className="material-symbols-outlined text-outline hover:text-on-surface cursor-pointer">close</button>
          </div>
          <div className="h-48 overflow-y-auto p-4 space-y-3">
            <div className="flex flex-col items-start gap-1">
              <div className="bg-surface-container-highest p-3 rounded-2xl rounded-tl-none text-xs text-on-surface-variant max-w-[85%]">
                Hey! I just submitted the code for the first milestone on GitHub. Can you take a look?
              </div>
              <span className="text-[9px] text-outline ml-1">10:42 AM</span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="bg-primary/20 p-3 rounded-2xl rounded-tr-none text-xs text-on-surface max-w-[85%]">
                Perfect, I&apos;m checking it now. The transaction is funded!
              </div>
              <span className="text-[9px] text-outline mr-1">10:45 AM</span>
            </div>
          </div>
          <div className="p-3 border-t border-outline-variant/10">
            <div className="relative flex items-center">
              <input className="w-full bg-surface-container-lowest border-none text-xs py-2.5 pl-4 pr-10 rounded-xl focus:ring-1 focus:ring-primary/30 outline-none" placeholder="Type a message..." type="text" />
              <button className="absolute right-2 material-symbols-outlined text-primary text-lg cursor-pointer">send</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
