"use client";

import { useEffect, useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useChainWork } from "../../providers/ChainWorkProvider";
import Link from "next/link";
import SideNavBar from "../../components/SideNavBar";

const API = "http://localhost:5000/api/jobs";

interface Job {
  _id: string;
  title: string;
  status: string;
  chain: string;
  budget: number;
  escrowAddress: string | null;
  freelancerWallet: string | null;
  txHash: string | null;
  createdAt: string;
  proposals: { bid: number; status: string; freelancerWallet?: string }[];
}

const STATUS_COLORS: Record<string, string> = {
  open: "bg-primary/10 text-primary",
  active: "bg-tertiary/10 text-tertiary",
  review: "bg-yellow-500/10 text-yellow-400",
  completed: "bg-green-500/10 text-green-400",
  cancelled: "bg-red-500/10 text-red-400",
  disputed: "bg-orange-500/10 text-orange-400",
};

const CHAIN_DOT: Record<string, string> = {
  solana: "#14F195",
  ethereum: "#627EEA",
  polygon: "#8247E5",
};

export default function ClientDashboard() {
  const { publicKey } = useWallet();
  const { sdk } = useChainWork();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<Record<string, string>>({});

  const [mounted, setMounted] = useState(false);

  const walletStr = publicKey?.toBase58();

  const fetchJobs = useCallback(async () => {
    if (!walletStr) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API}?wallet=${walletStr}`);
      if (res.ok) setJobs(await res.json());
    } finally {
      setLoading(false);
    }
  }, [walletStr]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  // ─── Fund Escrow ──────────────────────────────────────────────────────────
  const handleFundEscrow = async (job: Job) => {
    if (!publicKey || !sdk) {
      alert("Connect wallet first");
      return;
    }

    try {
      setActionLoading((p) => ({ ...p, [job._id]: "funding" }));
      const amountInLamports = Math.floor(job.budget * 1e9);

      const { Keypair } = await import("@solana/web3.js");
      const freelancerKeypair = Keypair.generate();

      const txHash = await sdk.initializeSol(amountInLamports, freelancerKeypair.publicKey);
      const [escrowPda] = await sdk.findEscrowPDA(publicKey, freelancerKeypair.publicKey);

      await fetch(`${API}/${job._id}/fund-escrow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          escrowAddress: escrowPda.toBase58(),
          freelancerWallet: freelancerKeypair.publicKey.toBase58(),
          txHash,
          walletAddress: walletStr,
        }),
      });

      await fetchJobs();
    } catch (e) {
      alert("Failed to fund escrow: " + (e as Error).message);
    } finally {
      setActionLoading((p) => ({ ...p, [job._id]: "" }));
    }
  };

  // ─── Release Payment ──────────────────────────────────────────────────────
  const handleRelease = async (job: Job) => {
    if (!publicKey || !sdk) {
      alert("Connect wallet first");
      return;
    }
    if (!job.escrowAddress || !job.freelancerWallet) {
      alert("No escrow found for this job");
      return;
    }

    try {
      setActionLoading((p) => ({ ...p, [job._id]: "releasing" }));
      const { PublicKey } = await import("@solana/web3.js");
      const freelancerKey = new PublicKey(job.freelancerWallet);

      const txHash = await sdk.releaseSol(new PublicKey(job.escrowAddress), freelancerKey);

      await fetch(`${API}/${job._id}/release`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txHash, walletAddress: walletStr }),
      });

      await fetchJobs();
    } catch (e) {
      alert("Failed to release payment: " + (e as Error).message);
    } finally {
      setActionLoading((p) => ({ ...p, [job._id]: "" }));
    }
  };

  // ─── Cancel Job ───────────────────────────────────────────────────────────
  const handleCancel = async (job: Job) => {
    if (!confirm("Cancel this job and refund the escrow?")) return;
    try {
      setActionLoading((p) => ({ ...p, [job._id]: "cancelling" }));
      // cancelSol would be called here if the SDK has it
      await fetch(`${API}/${job._id}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: walletStr }),
      });
      await fetchJobs();
    } catch (e) {
      alert("Failed to cancel: " + (e as Error).message);
    } finally {
      setActionLoading((p) => ({ ...p, [job._id]: "" }));
    }
  };

  const stats = {
    total: jobs.length,
    active: jobs.filter((j) => ["active", "review"].includes(j.status)).length,
    lockedSol: jobs
      .filter((j) => ["active", "review"].includes(j.status))
      .reduce((s, j) => s + j.budget, 0),
  };

  return (
    <>
      <SideNavBar />
      <main className="lg:ml-64 pt-24 overflow-y-auto no-scrollbar p-8 bg-surface">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-headline font-black tracking-tight text-white">
                Client Overview
              </h1>
              <p className="text-on-surface-variant text-lg max-w-2xl">
                Manage your mandates, monitor active escrows, and release payments.
              </p>
            </div>
            <Link
              href="/create-job"
              className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-on-primary font-bold rounded-xl hover:bg-primary/90 transition-colors text-sm"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Post New Job
            </Link>
          </header>

          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 flex flex-col justify-between group hover:bg-surface-container transition-colors">
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant font-label text-sm uppercase tracking-widest font-semibold">
                  Total Jobs
                </span>
                <span className="material-symbols-outlined text-primary-container">assignment</span>
              </div>
              <div className="mt-4">
                <span className="text-4xl font-headline font-bold text-white">{stats.total}</span>
              </div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 flex flex-col justify-between group hover:bg-surface-container transition-colors">
              <div className="flex justify-between items-start">
                <span className="text-on-surface-variant font-label text-sm uppercase tracking-widest font-semibold">
                  Active / Review
                </span>
                <span className="material-symbols-outlined text-secondary">rocket_launch</span>
              </div>
              <div className="mt-4">
                <span className="text-4xl font-headline font-bold text-white">{stats.active}</span>
              </div>
            </div>
            <div className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-secondary-container/20 p-6 rounded-2xl border border-primary/20 flex flex-col justify-between">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="flex justify-between items-start z-10">
                <span className="text-primary font-label text-sm uppercase tracking-widest font-bold">
                  SOL Locked
                </span>
                <span className="material-symbols-outlined text-primary">lock</span>
              </div>
              <div className="mt-4 z-10">
                <span className="text-4xl font-headline font-bold text-white font-mono">
                  {stats.lockedSol.toLocaleString()} SOL
                </span>
                <p className="text-on-primary-container text-xs mt-1">Secured in smart escrow</p>
              </div>
            </div>
          </section>

          {/* Jobs Table */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-headline font-bold text-white">Your Jobs</h2>
              <button
                onClick={fetchJobs}
                className="p-2 text-on-surface-variant hover:text-white transition-colors"
                title="Refresh"
              >
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>

            {!mounted || !publicKey ? (
              <div className="text-center py-20 text-on-surface-variant">
                {!mounted ? "Loading jobs…" : "Connect your wallet to see your jobs."}
              </div>
            ) : loading ? (
              <div className="text-center py-20 text-on-surface-variant animate-pulse">
                Loading jobs…
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-20 text-on-surface-variant">
                No jobs yet.{" "}
                <Link href="/create-job" className="text-primary underline">
                  Post your first job
                </Link>
              </div>
            ) : (
              <div className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/5">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high/50">
                      {["Job Title", "Status", "Chain", "Budget", "Proposals", "Actions"].map(
                        (h) => (
                          <th
                            key={h}
                            className={`px-6 py-4 text-xs font-bold uppercase tracking-widest text-on-surface-variant ${h === "Actions" ? "text-right" : ""}`}
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/5">
                    {jobs.map((job) => {
                      const busy = actionLoading[job._id];
                      return (
                        <tr
                          key={job._id}
                          className="hover:bg-surface-container/50 transition-colors group"
                        >
                          <td className="px-6 py-5">
                            <Link
                              href={`/job/${job._id}`}
                              className="flex flex-col hover:text-primary transition-colors"
                            >
                              <span className="text-white font-semibold">{job.title}</span>
                              <span className="text-xs text-on-surface-variant font-mono">
                                {job.escrowAddress
                                  ? job.escrowAddress.slice(0, 12) + "…"
                                  : "No escrow yet"}
                              </span>
                            </Link>
                          </td>
                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_COLORS[job.status] || "bg-outline/10 text-outline"}`}
                            >
                              {job.status}
                            </span>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                  background: CHAIN_DOT[job.chain] || "#888",
                                  boxShadow: `0 0 8px ${CHAIN_DOT[job.chain] || "#888"}`,
                                }}
                              />
                              <span className="text-xs font-mono capitalize">{job.chain}</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            <span className="text-white font-mono font-medium">
                              {job.budget.toLocaleString()} SOL
                            </span>
                          </td>
                          <td className="px-6 py-5 text-on-surface-variant text-sm">
                            {job.proposals.length}
                          </td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex items-center justify-end gap-2 flex-wrap">
                              {job.status === "open" && !job.escrowAddress && (
                                <button
                                  onClick={() => handleFundEscrow(job)}
                                  disabled={!!busy}
                                  className="text-xs font-bold text-on-primary bg-primary px-3 py-1.5 rounded-lg shadow-sm disabled:opacity-50 hover:bg-primary/90 transition-colors"
                                >
                                  {busy === "funding" ? "Signing…" : "Fund Escrow"}
                                </button>
                              )}
                              {["active", "review"].includes(job.status) && (
                                <>
                                  <button
                                    onClick={() => handleRelease(job)}
                                    disabled={!!busy}
                                    className="text-xs font-bold text-on-tertiary bg-tertiary px-3 py-1.5 rounded-lg shadow-sm disabled:opacity-50 hover:bg-tertiary/90 transition-colors"
                                  >
                                    {busy === "releasing" ? "Signing…" : "Release ✓"}
                                  </button>
                                  <button
                                    onClick={() => handleCancel(job)}
                                    disabled={!!busy}
                                    className="text-xs font-bold text-red-400 border border-red-400/40 px-3 py-1.5 rounded-lg disabled:opacity-50 hover:bg-red-500/10 transition-colors"
                                  >
                                    {busy === "cancelling" ? "…" : "Cancel"}
                                  </button>
                                </>
                              )}
                              {["completed", "cancelled"].includes(job.status) && (
                                <Link
                                  href={`/job/${job._id}`}
                                  className="text-xs font-bold text-primary px-3 py-1.5 rounded-lg hover:bg-primary/10 transition-colors"
                                >
                                  View
                                </Link>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
