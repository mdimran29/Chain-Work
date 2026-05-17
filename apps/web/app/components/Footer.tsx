import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-white/5 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <span className="text-2xl font-black tracking-tighter text-white">ChainWork</span>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              The global marketplace for trustless work. Powered by high-fidelity smart contracts.
            </p>
            <div className="flex gap-4">
              <Link
                className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-white transition-all border border-white/5"
                href="/"
              >
                <span className="material-symbols-outlined text-[20px]">public</span>
              </Link>
              <Link
                className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-white transition-all border border-white/5"
                href="/"
              >
                <span className="material-symbols-outlined text-[20px]">hub</span>
              </Link>
              <Link
                className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-white transition-all border border-white/5"
                href="/"
              >
                <span className="material-symbols-outlined text-[20px]">terminal</span>
              </Link>
            </div>
          </div>
          <div className="space-y-6">
            <h5 className="font-bold text-white uppercase tracking-widest text-xs">Marketplace</h5>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors" href="/marketplace">
                  Find a Job
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/dashboard/client">
                  Hire Talent
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/">
                  Fees & Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h5 className="font-bold text-white uppercase tracking-widest text-xs">Resources</h5>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors" href="/">
                  Developer Docs
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/">
                  Security Audit
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/">
                  Tokenomics
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/">
                  Whitepaper
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-6">
            <h5 className="font-bold text-white uppercase tracking-widest text-xs">Legal</h5>
            <ul className="space-y-4 text-sm text-on-surface-variant">
              <li>
                <Link className="hover:text-primary transition-colors" href="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary transition-colors" href="/">
                  Dispute Resolution
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-outline font-mono">
            © 2026 ChainWork Protocol. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5">
              <span className="text-[10px] font-mono text-outline">v1.2.4-alpha</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
