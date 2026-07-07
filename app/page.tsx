import Link from 'next/link';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 pb-20">
          {/* Animated Background Blobs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary-container/10 rounded-full blur-[150px] -z-10 animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>
          <div className="max-w-5xl text-center space-y-8 mt-20">
            <div className="inline-flex flex-col items-center gap-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest/50 backdrop-blur-md border border-outline-variant/30 text-primary text-xs font-bold tracking-widest uppercase">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                New Era of Freelancing
              </div>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-on-surface-variant text-glow">
                Work Without
                <br />
                Trust Issues
              </h1>
              <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
                Decentralized freelancing powered by blockchain escrow. Secure payments, zero intermediaries, global reach.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link href="/create-job" className="inline-block text-center w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-primary to-secondary-container text-on-primary font-bold text-lg shadow-[0_20px_50px_rgba(102,0,192,0.2)] hover:scale-[1.02] transition-all active:scale-95">
                Post a Job
              </Link>
              <Link href="/dashboard/freelancer" className="inline-block text-center w-full sm:w-auto px-10 py-5 rounded-2xl bg-surface-container-highest/40 backdrop-blur-xl border border-white/10 text-white font-bold text-lg hover:bg-surface-container-highest/60 transition-all active:scale-95">
                Find Work
              </Link>
            </div>
            <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              <img
                className="h-8 mx-auto object-contain"
                alt="minimalist ethereum logo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZIc6q3FLZyt5ezpq5BDa_dwLqg0cS2iFxOgWXd0x5LC8b_AI7EvQqQNZZIsC-V5K5QUr2urZ2k0aH2CF6GuVMtalI4LckkSWDWTpN-GMs1rDdfQH9AtmKoHUIGAWpPw1sAI_s8X9qu4ZfE6stMO8exNQhfM6LIlfjeNL07ni2ZXctWWElk4byA2z1Glu-dkVxw-pWTQ_ifh12ZmHXkRwT9Z6aCIVvsYvlJH_C_qkt3CC5QE-VUil81PMWILaF0XPLjoAdCPIeatw"
              />
              <img
                className="h-8 mx-auto object-contain"
                alt="minimalist polygon matic logo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAs4qlHm_Nums9KrpeJAuM93DfaW4WS7fS250sUllEy6S-UtwRDjLJtmh9e5BPKJxmWDaaKxijcs6VtLWz9UFNhVOyFP4CJnhSdLVBsfg0s27YH5LcrJ5msfYTCIZZ_cJiapaoyyp1qUV4-TyviaiFjvc3D9-RP_cCmDx-Fm4QjMFj3qXrgQ8Edc9YtBzP5ATVruHslMKx3e4Bx6LOBeYk4CXcpWnM5B9DvK7H_i6RPBVQvAUdqPa8ZAgB-wyMinaK1mngq9se4OMw"
              />
              <img
                className="h-8 mx-auto object-contain"
                alt="minimalist solana logo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUaUgMM0xZLsSofcBPCFI-_NQICkTs2eIjVq1hMoD9blrC-pKP3lvqy8kK2JsmPeWSDscnOc7Tb2Hub2YYQ_C0QW8dUws23p6t0k5bQuVl3G5ASEUvAKU6-lR4xDQzzUwO7YI7w-I-MsMvQENE0Dh6QtGvPfARNSr7r9tFQtCwbmaIUulN9Gy5yAi8v6KixfNNllNcCBoMV30uCBeN3vPVFN4JuyMpj0ffqN_wwWq0PFZmYcmiD8FORhWQZnGi7cNjLMFPSW4etOU"
              />
              <img
                className="h-8 mx-auto object-contain"
                alt="minimalist arbitrum logo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC02tQN7NV4lMTDqOzBYmhssjGDdizS_euXTxHyQfW-r0NpJQkYGax_9X-AE7o-j7N3fXZOgaKdWgh0BnkMrHqMbTSonRVGVAknb4A8RKgkimnnz1BEq7ctwegxJ_wlZNUh83yPL7RPN39-N9-Pk2Dnv8cN0U5JI-Ac46Ew7cFMqnYN5D4dF7Qzd7Xun00i-plqQCf7NOx2jXQhhKUDyJ60b48cLfdpSkrc-Cy39nBPHL5HP-r9XjhTtbLP7GB35r3nNyr_CJktjE"
              />
            </div>
          </div>
        </section>

        {/* Feature Bento Grid */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Large Feature Card */}
            <div className="md:col-span-8 bg-surface-container-low rounded-[1.5rem] p-10 relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-3xl">shield</span>
                </div>
                <h3 className="text-3xl font-bold text-white">Escrow Payments</h3>
                <p className="text-on-surface-variant text-lg max-w-md">
                  Funds are held in a smart contract and released only when milestones are met. No more chasing clients for payment.
                </p>
              </div>
              <div className="absolute right-0 bottom-0 w-1/2 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <img
                  className="w-full h-full object-cover"
                  alt="abstract security shield concept"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB670uekFPuYo7MZl-w9XIuU9LGYYTV76ihSXGkyWTbkMdT3KStfUYo3-wBzAHAckaQTBfJ-2u8HHHVFlxgqDMvEKcC2V0WOFrF5hebLfvSqAqnrvBm9y42QBek3pOOEDr237f7pwZiWKZHtpD2CfLKNF_o12i0Bk2cSnHvmQ1kxzqzxexKtxfK8Tm_AJ-cDjMvB5FR1iSxaupjG64JogEpj9xLMxHJ8aKWfauELpyZYYV6IBxCs3U_EpXv4nP0PvUlvJMM0fRvdRQ"
                />
              </div>
            </div>

            {/* Small Feature Card 1 */}
            <div className="md:col-span-4 bg-surface-container rounded-[1.5rem] p-8 flex flex-col justify-between border border-white/5 hover:border-primary/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-2xl">link</span>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-2 text-white">Multi-chain Support</h3>
                <p className="text-on-surface-variant text-sm">Pay and get paid in ETH, MATIC, SOL, or Stablecoins. Your choice of network.</p>
              </div>
            </div>

            {/* Small Feature Card 2 */}
            <div className="md:col-span-4 bg-surface-container rounded-[1.5rem] p-8 flex flex-col justify-between border border-white/5 hover:border-secondary-container/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-2xl">payments</span>
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-2 text-white">Zero Middleman Fees</h3>
                <p className="text-on-surface-variant text-sm">Traditional platforms take 20%. We take 0%. Keep 100% of what you earn.</p>
              </div>
            </div>

            {/* Large Feature Card 2 */}
            <div className="md:col-span-8 bg-surface-container-high rounded-[1.5rem] p-10 relative overflow-hidden flex flex-col md:flex-row gap-10">
              <div className="space-y-4 flex-1">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-primary mb-6">
                  <span className="material-symbols-outlined text-3xl">wallet</span>
                </div>
                <h3 className="text-3xl font-bold text-white">Secure Wallet Login</h3>
                <p className="text-on-surface-variant text-lg">
                  No passwords, no emails. Just your cryptographic identity. One-click sign-in with MetaMask or Phantom.
                </p>
              </div>
              <div className="flex-1 bg-surface-container-lowest/50 rounded-xl p-4 font-mono text-[11px] text-primary/60 border border-white/5 relative h-full flex flex-col justify-center min-h-[140px]">
                <div className="space-y-1">
                  <p>{`> Connecting to provider...`}</p>
                  <p>{`> User: 0x71C...8e4f`}</p>
                  <p className="text-tertiary">{`> Auth success [200]`}</p>
                  <p>{`> Fetching active contracts...`}</p>
                  <p>{`> Loading encrypted messages...`}</p>
                  <p className="animate-pulse">_</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-surface-container-low/30 relative mt-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">The Future of Collaboration</h2>
              <p className="text-on-surface-variant max-w-xl mx-auto">Seamless, trustless, and automated. From posting to payout in four simple steps.</p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-outline-variant to-transparent -translate-y-12"></div>

              {/* Step 1 */}
              <div className="relative group text-center space-y-6">
                <div className="relative w-24 h-24 mx-auto rounded-[1.5rem] bg-surface-container flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500 z-10">
                  <span className="material-symbols-outlined text-4xl text-primary">add_circle</span>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-xs">1</div>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">Post Job</h4>
                  <p className="text-sm text-on-surface-variant">Describe your project and set a bounty.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group text-center space-y-6">
                <div className="relative w-24 h-24 mx-auto rounded-[1.5rem] bg-surface-container flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500 z-10">
                  <span className="material-symbols-outlined text-4xl text-primary">account_balance</span>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-xs">2</div>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">Fund Escrow</h4>
                  <p className="text-sm text-on-surface-variant">Lock funds in the smart contract to start.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group text-center space-y-6">
                <div className="relative w-24 h-24 mx-auto rounded-[1.5rem] bg-surface-container flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500 z-10">
                  <span className="material-symbols-outlined text-4xl text-primary">check_circle</span>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-xs">3</div>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">Work Delivered</h4>
                  <p className="text-sm text-on-surface-variant">Review the submitted work directly.</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative group text-center space-y-6">
                <div className="relative w-24 h-24 mx-auto rounded-[1.5rem] bg-surface-container flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500 z-10">
                  <span className="material-symbols-outlined text-4xl text-primary">rocket_launch</span>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-xs">4</div>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-white">Release Payment</h4>
                  <p className="text-sm text-on-surface-variant">Approve work and trigger instant payout.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto rounded-[3rem] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-container to-primary -z-10"></div>
            <div
              className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}
            ></div>
            <div className="p-12 md:p-24 text-center space-y-8 flex flex-col items-center">
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                Ready to build the
                <br />
                decentralized future?
              </h2>
              <p className="text-on-secondary-container text-lg md:text-xl max-w-2xl font-medium">
                Join 15,000+ developers and companies already using ChainWork to hire and get hired.
              </p>
              <div className="pt-6 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/create-job" className="inline-block text-center bg-white text-secondary-container px-12 py-5 rounded-2xl font-bold text-lg hover:bg-on-surface-variant transition-all cursor-pointer">
                  Start Your First Job
                </Link>
                <Link href="/marketplace" className="inline-block text-center bg-transparent border-2 border-white/30 text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all cursor-pointer">
                  Browse Talent
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
