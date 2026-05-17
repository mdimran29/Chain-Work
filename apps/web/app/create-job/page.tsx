"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useChainWork } from "../providers/ChainWorkProvider";
import { useRouter } from "next/navigation";

const API = "http://localhost:5000/api/jobs";

export default function CreateJob() {
  const [title, setTitle] = useState("Senior Smart Contract Auditor");
  const [description, setDescription] = useState(
    "Looking for a security expert to audit a set of Rust-based Anchor programs for an upcoming DeFi protocol...",
  );
  const [budget, setBudget] = useState("5200");
  const [timeline, setTimeline] = useState("2weeks");
  const [blockchain, setBlockchain] = useState("Solana");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState<"idle" | "saving" | "signing" | "done">("idle");

  const { publicKey } = useWallet();
  const { sdk } = useChainWork();
  const router = useRouter();

  const handleSubmit = async () => {
    if (!publicKey) {
      alert("Please connect your wallet first");
      return;
    }

    try {
      setIsSubmitting(true);

      // Normalise values
      const normalTimeline = ["2weeks", "1month", "longterm"].includes(timeline)
        ? timeline
        : "2weeks";
      const normalChain = blockchain.toLowerCase();

      // ─── Step 1: Save job to DB (no escrow yet) ──────────────────────────
      setSubmitStep("saving");
      const createRes = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          budget: parseFloat(budget),
          timeline: normalTimeline,
          chain: normalChain,
          walletAddress: publicKey.toBase58(),
        }),
      });

      if (!createRes.ok) {
        const err = await createRes.json();
        throw new Error(err.error || "Failed to save job");
      }

      const job = await createRes.json();

      // ─── Step 2: Initialize escrow on-chain (only for Solana) ─────────────
      if (normalChain === "solana" && sdk) {
        setSubmitStep("signing");
        const amountInLamports = Math.floor(parseFloat(budget) * 1e9);

        // Use a placeholder freelancer key — will be replaced when a real
        // freelancer is selected and the client calls "Fund Escrow" in dashboard.
        const { Keypair } = await import("@solana/web3.js");
        const placeholderFreelancer = Keypair.generate();

        const txHash = await sdk.initializeSol(amountInLamports, placeholderFreelancer.publicKey);
        const [escrowPda] = await sdk.findEscrowPDA(publicKey, placeholderFreelancer.publicKey);

        // ─── Step 3: Persist escrow info back to DB ────────────────────────
        await fetch(`${API}/${job._id}/fund-escrow`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            escrowAddress: escrowPda.toBase58(),
            freelancerWallet: placeholderFreelancer.publicKey.toBase58(),
            txHash,
            walletAddress: publicKey.toBase58(),
          }),
        });
      }

      setSubmitStep("done");
      router.push("/dashboard/client");
    } catch (error) {
      console.error("Failed to create job:", error);
      alert("Failed to create job: " + (error as Error).message);
      setSubmitStep("idle");
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabel: Record<string, string> = {
    idle: "Deploy Job Contract",
    saving: "Saving to database…",
    signing: "Sign transaction in wallet…",
    done: "Done!",
  };
  return (
    <main className="pt-28 pb-20 min-h-screen px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Left: Multi-Step Flow */}
      <div className="lg:col-span-7 space-y-12">
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Forge a new{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary-container">
              Job Contract
            </span>
          </h1>
          <p className="text-on-surface-variant text-lg">
            Define your requirements and deploy them to the global talent network.
          </p>
        </header>

        <section className="space-y-10">
          {/* Step 1: Core Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-container/20 text-primary font-mono text-sm border border-primary/20">
                01
              </span>
              <h2 className="text-xl font-bold tracking-tight">Job Identity</h2>
            </div>
            <div className="space-y-4">
              <div className="group">
                <label
                  htmlFor="position-title"
                  className="block text-xs font-semibold uppercase tracking-widest text-outline mb-2 ml-1"
                >
                  Position Title
                </label>
                <input
                  id="position-title"
                  className="w-full bg-surface-container-low border-none rounded-2xl py-4 px-5 text-lg focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-outline-variant outline-none"
                  placeholder="e.g. Senior Smart Contract Auditor"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="group">
                <label
                  htmlFor="detailed-brief"
                  className="block text-xs font-semibold uppercase tracking-widest text-outline mb-2 ml-1"
                >
                  Detailed Brief
                </label>
                <div className="bg-surface-container-low rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                  <div className="flex gap-4 p-3 border-b border-outline-variant/10 bg-surface-container/50">
                    <button className="material-symbols-outlined text-outline hover:text-on-surface cursor-pointer">
                      format_bold
                    </button>
                    <button className="material-symbols-outlined text-outline hover:text-on-surface cursor-pointer">
                      format_italic
                    </button>
                    <button className="material-symbols-outlined text-outline hover:text-on-surface cursor-pointer">
                      list
                    </button>
                    <button className="material-symbols-outlined text-outline hover:text-on-surface cursor-pointer">
                      link
                    </button>
                  </div>
                  <textarea
                    id="detailed-brief"
                    className="w-full bg-transparent border-none py-4 px-5 focus:ring-0 text-on-surface-variant outline-none resize-y"
                    placeholder="Describe the scope, deliverables, and technical requirements..."
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Financials & Chain */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-container/20 text-primary font-mono text-sm border border-primary/20">
                02
              </span>
              <h2 className="text-xl font-bold tracking-tight">Network & Budget</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label
                  htmlFor="fixed-budget"
                  className="block text-xs font-semibold uppercase tracking-widest text-outline mb-2 ml-1"
                >
                  Fixed Budget (USDC)
                </label>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 font-mono text-outline">
                    $
                  </span>
                  <input
                    id="fixed-budget"
                    className="w-full bg-surface-container-low border-none rounded-2xl py-4 pl-10 pr-5 text-lg font-mono focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="0.00"
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
              </div>
              <div className="group">
                <label
                  htmlFor="timeline"
                  className="block text-xs font-semibold uppercase tracking-widest text-outline mb-2 ml-1"
                >
                  Timeline
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-outline">
                    schedule
                  </span>
                  <select
                    id="timeline"
                    className="w-full bg-surface-container-low border-none rounded-2xl py-4 pl-12 pr-5 text-lg focus:ring-2 focus:ring-primary/20 transition-all appearance-none outline-none"
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                  >
                    <option value="2weeks">Fixed 2 Weeks</option>
                    <option value="1month">1 Month</option>
                    <option value="longterm">Long Term</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <label className="block text-xs font-semibold uppercase tracking-widest text-outline ml-1">
                Target Blockchain
              </label>
              <div className="grid grid-cols-3 gap-4">
                {/* Solana */}
                <button
                  onClick={() => setBlockchain("Solana")}
                  className={`flex flex-col items-center gap-3 p-6 rounded-2xl transition-all cursor-pointer ${
                    blockchain === "Solana"
                      ? "bg-surface-container-high border-2 border-primary shadow-[0_0_15px_rgba(192,193,255,0.1)]"
                      : "bg-surface-container-low border-2 border-transparent hover:bg-surface-container-high"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                    <img
                      alt="Solana"
                      className="w-6 h-6"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQNg4fTkMYDYlccbojnj3HwIL_kti_Ko2VoPBHRa3yeOkBP0dSQgV_IY4DpfmOuFFE3FMYLcBsscmKi-50HNLFE2gk3tEeNQU8KN_kBgyYR9hZKhgwV5NFXI6Cow6gXV-rCdLl0OhVe1cxPSF3dBNnTIze3JVZAy7hjQp5XRGUJbCx3ApC2flwPsQHPhgkLL4ta9qUgxIOh6C3SV3eHoEw5YWaWJTzl94hMI9QRlD623GoF7_PI1CN7Pw8O4Wz4BnRv1UEFKIrO6c"
                    />
                  </div>
                  <span
                    className={`text-sm font-bold ${blockchain === "Solana" ? "text-white" : "text-outline"}`}
                  >
                    Solana
                  </span>
                </button>
                {/* Ethereum */}
                <button
                  onClick={() => setBlockchain("Ethereum")}
                  className={`flex flex-col items-center gap-3 p-6 rounded-2xl transition-all cursor-pointer ${
                    blockchain === "Ethereum"
                      ? "bg-surface-container-high border-2 border-primary shadow-[0_0_15px_rgba(192,193,255,0.1)]"
                      : "bg-surface-container-low border-2 border-transparent hover:bg-surface-container-high"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                    <img
                      alt="Ethereum"
                      className="w-6 h-6"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuANOdM8WCPJzkHXMHjvdmOmXv_AGr1AY3kNckt24CkRDyDnW7Lh5DorwnCHleRfd7dK3WYHVqoSY_te4S4jTEZO99N1oB56jd9BNuWCQ9kvklxU_d-p0pLpDBfMneD2GFNO8o8-mujpECygYgIU1xTyFlwewlNYmxX2YBgB4-uNPkQvybscYfsdMplE-2VnQFtbwG0vTP5ciFt95dJbxgwyRn4WUW39ScmehlgFligzNA-u4OAxXuN2Va2L0VZbFCHtGjqPAd3gAao"
                    />
                  </div>
                  <span
                    className={`text-sm font-bold ${blockchain === "Ethereum" ? "text-white" : "text-outline"}`}
                  >
                    Ethereum
                  </span>
                </button>
                {/* Polygon */}
                <button
                  onClick={() => setBlockchain("Polygon")}
                  className={`flex flex-col items-center gap-3 p-6 rounded-2xl transition-all cursor-pointer ${
                    blockchain === "Polygon"
                      ? "bg-surface-container-high border-2 border-primary shadow-[0_0_15px_rgba(192,193,255,0.1)]"
                      : "bg-surface-container-low border-2 border-transparent hover:bg-surface-container-high"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-black/20 flex items-center justify-center">
                    <img
                      alt="Polygon"
                      className="w-6 h-6"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ5_DA2GvryaaeKivaJ36BtiBPEyHQSmGDTfb_fTMPel6FaFrqXoH3oYrVR2gH8Y2bZ3ZzDUKKHOPWOlLSkH1nlBxzeRNenVcpfJ88Cko3ygIqBg9TF7SglzfeDnddigxcQ0wWr9rUfug0Qk3l5J9bKEoqGr-hcOt7rnfX_NTTiD6mO6G3wPdWXMQQGf0AepODyUBmux_cGSEoeQPWgTDmPOpufNWtlWh8lTGsydjH44DdTIRTDqqYACNFsprfsTstJKhE3U7J6YU"
                    />
                  </div>
                  <span
                    className={`text-sm font-bold ${blockchain === "Polygon" ? "text-white" : "text-outline"}`}
                  >
                    Polygon
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-secondary-container shadow-[0_0_20px_rgba(102,0,192,0.3)] py-5 rounded-2xl text-white font-bold text-lg flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">rocket_launch</span>
              {isSubmitting ? stepLabel[submitStep] : stepLabel["idle"]}
            </button>
            <p className="text-center text-xs text-outline mt-4 font-mono uppercase tracking-widest">
              Transaction fee: 0.002 SOL
            </p>
          </div>
        </section>
      </div>

      {/* Right: Preview Sidebar */}
      <aside className="lg:col-span-5 sticky top-28 h-fit">
        <div className="bg-surface-container-high/60 backdrop-blur-xl p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Visual Accent */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[80px] rounded-full"></div>

          <div className="relative">
            <div className="flex justify-between items-start mb-8">
              <span className="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase tracking-widest rounded-full border border-tertiary/20">
                Preview Mode
              </span>
              <div className="flex -space-x-2">
                <img
                  className="w-8 h-8 rounded-full border-2 border-surface"
                  alt="Applicant 1"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_xBqWcw5Vca3d5j9ThAApRLF3n2qzSHxQhQO0wiWTEDHjlVXEzP8GKP6HiUb5tjXBEcJOuq--PfGwHNyZBCB8gUtHBtyO19adSpxonn1CqsMXwBb350jn041O-yDIm0IluSNBGHXFh7MOeIceov44LVZjzxj8cWoCn3cFedFta_MDGFbxu-6yqTm5Ex5111ePedaoiTxn0Q_wZu-uKmX1WiBxcBAD6sua8mavg2bEf81fVMbUdX0O0IIhcLXWFqMX3pq1CuEU2jI"
                />
                <img
                  className="w-8 h-8 rounded-full border-2 border-surface"
                  alt="Applicant 2"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuARQsf2DHfajA0fbqRI39RWmFimljUnkUF6ksWZiNf0cu6mXDXAeg8zZ6l9A8Lm96Y7r1y9Omo2l8QmZTrcQJ1ffQ15_bAhF9BX9fNHbVFDZWrgW5wYhBhPPh3QJZQHdzP6PUT7K10aMG5UGV9UpXFrbj92lkEfE1TlUmz4jwX7c6sTB2gOVik7FyaGyxyQmnix-KqrsBssb3a4185UhrmSyLfpORW1rgFjqffu14UDN56bOn5eC-hKFbybcdFctMrW7V5_VnbOMXI"
                />
                <div className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-surface flex items-center justify-center text-[10px] font-bold">
                  +12
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold leading-tight">{title || "Job Title"}</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-surface-container rounded-lg">
                    {blockchain === "Solana" && (
                      <img
                        alt="Solana"
                        className="w-4 h-4"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbel8ejHG4vfICGxijPnBBjTPwNI2woFBIKOHqjdQJ-IX6CFeH-7Vpt8e5COfF0BrGcjv3aXAELyZNSubuhegjIE53iD58awsQLVwa1xmBaxwJE1qA_iL1xGq_K0f8g5fyzUMp4K4qkqw5aGdOH8mPr9bijXILfWrTWpUONjBsHwVnFbl_vXppLTyr249DeFwDWa34RRqy_6liYp87o2fmHcefm0If5vXLYGZxO1YC6ocU4oX0GNLNdswI2jqRYqc7h2RYk5I236E"
                      />
                    )}
                    {blockchain === "Ethereum" && (
                      <img
                        alt="Ethereum"
                        className="w-4 h-4"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuANOdM8WCPJzkHXMHjvdmOmXv_AGr1AY3kNckt24CkRDyDnW7Lh5DorwnCHleRfd7dK3WYHVqoSY_te4S4jTEZO99N1oB56jd9BNuWCQ9kvklxU_d-p0pLpDBfMneD2GFNO8o8-mujpECygYgIU1xTyFlwewlNYmxX2YBgB4-uNPkQvybscYfsdMplE-2VnQFtbwG0vTP5ciFt95dJbxgwyRn4WUW39ScmehlgFligzNA-u4OAxXuN2Va2L0VZbFCHtGjqPAd3gAao"
                      />
                    )}
                    {blockchain === "Polygon" && (
                      <img
                        alt="Polygon"
                        className="w-4 h-4"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZ5_DA2GvryaaeKivaJ36BtiBPEyHQSmGDTfb_fTMPel6FaFrqXoH3oYrVR2gH8Y2bZ3ZzDUKKHOPWOlLSkH1nlBxzeRNenVcpfJ88Cko3ygIqBg9TF7SglzfeDnddigxcQ0wWr9rUfug0Qk3l5J9bKEoqGr-hcOt7rnfX_NTTiD6mO6G3wPdWXMQQGf0AepODyUBmux_cGSEoeQPWgTDmPOpufNWtlWh8lTGsydjH44DdTIRTDqqYACNFsprfsTstJKhE3U7J6YU"
                      />
                    )}
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">
                      {blockchain} Mainnet
                    </span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="text-[10px] font-mono text-outline uppercase tracking-widest">
                    Updated just now
                  </span>
                </div>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent"></div>

              <div className="space-y-4">
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {description || "No description provided."}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-outline block mb-1">
                      Budget
                    </span>
                    <span className="text-xl font-bold font-mono">${budget || "0"}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-white/5">
                    <span className="text-[10px] uppercase tracking-widest text-outline block mb-1">
                      Escrow
                    </span>
                    <span className="text-xl font-bold text-tertiary flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">lock</span>
                      SECURE
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-2">
                <span className="text-[10px] font-semibold px-2 py-1 rounded bg-secondary-container/20 text-on-secondary-container">
                  Rust
                </span>
                <span className="text-[10px] font-semibold px-2 py-1 rounded bg-secondary-container/20 text-on-secondary-container">
                  Solana
                </span>
                <span className="text-[10px] font-semibold px-2 py-1 rounded bg-secondary-container/20 text-on-secondary-container">
                  Security Audit
                </span>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-white/5 flex items-center gap-4 text-outline">
            <span className="material-symbols-outlined text-lg">info</span>
            <p className="text-[11px] leading-tight">
              This is how your job will appear to applicants. You can edit this information at any
              time before deploying the smart contract.
            </p>
          </div>
        </div>

        {/* Bottom Helper */}
        <div className="mt-6 flex items-center justify-between px-4 text-xs font-mono text-outline-variant">
          <span>CONTRACT_VER_4.2</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            SYNCING TO CLOUD
          </span>
        </div>
      </aside>
    </main>
  );
}
