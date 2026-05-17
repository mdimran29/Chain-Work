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
  timeline: string;
  escrowAddress: string | null;
  freelancerWallet: string | null;
  txHash: string | null;
  client: { walletAddress?: string };
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  open: "bg-primary/10 text-primary",
  active: "bg-tertiary/10 text-tertiary",
  review: "bg-yellow-500/10 text-yellow-400",
  completed: "bg-green-500/10 text-green-400",
  cancelled: "bg-red-500/10 text-red-400",
  disputed: "bg-orange-500/10 text-orange-400",
};

export default function FreelancerDashboard() {
  const { publicKey } = useWallet();
  const { sdk } = useChainWork();

  const [openJobs, setOpenJobs] = useState<Job[]>([]);
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<Record<string, string>>({});
  const [proposalBids, setProposalBids] = useState<Record<string, string>>({});
  const [proposalNotes, setProposalNotes] = useState<Record<string, string>>({});
  const [proposingFor, setProposingFor] = useState<string | null>(null);

  const [mounted, setMounted] = useState(false);

  const walletStr = publicKey?.toBase58();

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      // Fetch open marketplace jobs
      const openRes = await fetch(`${API}?status=open`);
      if (openRes.ok) setOpenJobs(await openRes.json());

      // Fetch jobs assigned to this freelancer
      if (walletStr) {
        const myRes = await fetch(`${API}?wallet=${walletStr}`);
        if (myRes.ok) {
          const all: Job[] = await myRes.json();
          // Only show jobs where this wallet is the freelancer (not client)
          setMyJobs(all.filter((j) => j.freelancerWallet === walletStr));
        }
      }
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

  // ─── Submit Proposal ──────────────────────────────────────────────────────
  const handlePropose = async (jobId: string) => {
    if (!mounted || !walletStr) {
      alert("Connect wallet first");
      return;
    }
    const bid = parseFloat(proposalBids[jobId] || "0");
    if (!bid || bid <= 0) {
      alert("Enter a valid bid amount");
      return;
    }

    try {
      setActionLoading((p) => ({ ...p, [jobId]: "proposing" }));
      const res = await fetch(`${API}/${jobId}/proposals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bid,
          coverLetter: proposalNotes[jobId] || "",
          walletAddress: walletStr,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to submit proposal");
      }

      setProposingFor(null);
      setProposalBids((p) => ({ ...p, [jobId]: "" }));
      setProposalNotes((p) => ({ ...p, [jobId]: "" }));
      await fetchJobs();
    } catch (e) {
      alert("Failed to propose: " + (e as Error).message);
    } finally {
      setActionLoading((p) => ({ ...p, [jobId]: "" }));
    }
  };

  // ─── Accept Job (on-chain) ────────────────────────────────────────────────
  const handleAccept = async (job: Job) => {
    if (!publicKey || !sdk) {
      alert("Connect wallet first");
      return;
    }
    if (!job.escrowAddress) {
      alert("This job has no escrow to accept");
      return;
    }

    try {
      setActionLoading((p) => ({ ...p, [job._id]: "accepting" }));
      const { PublicKey } = await import("@solana/web3.js");
      const escrowPubkey = new PublicKey(job.escrowAddress);

      const txHash = await sdk.accept(escrowPubkey);

      await fetch(`${API}/${job._id}/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txHash, walletAddress: walletStr }),
      });

      await fetchJobs();
    } catch (e) {
      alert("Failed to accept: " + (e as Error).message);
    } finally {
      setActionLoading((p) => ({ ...p, [job._id]: "" }));
    }
  };

  // ─── Deliver Work ─────────────────────────────────────────────────────────
  const handleDeliver = async (job: Job) => {
    if (!confirm("Mark this job as delivered and ready for review?")) return;
    try {
      setActionLoading((p) => ({ ...p, [job._id]: "delivering" }));
      await fetch(`${API}/${job._id}/deliver`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: walletStr }),
      });
      await fetchJobs();
    } catch (e) {
      alert("Failed: " + (e as Error).message);
    } finally {
      setActionLoading((p) => ({ ...p, [job._id]: "" }));
    }
  };

  const earnings = myJobs.filter((j) => j.status === "completed").reduce((s, j) => s + j.budget, 0);

  return (
    <>
      <SideNavBar />
      <main className="lg:ml-64 pt-24 px-6 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <header>
            <h1 className="text-4xl md:text-5xl font-headline font-black tracking-tight text-white">
              Freelancer Hub
            </h1>
            <p className="text-on-surface-variant text-lg mt-1">
              Browse opportunities, submit proposals, and manage your active contracts.
            </p>
          </header>

          {/* Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10">
              <span className="text-on-surface-variant text-xs uppercase tracking-widest font-semibold">
                Active Jobs
              </span>
              <div className="mt-3 text-4xl font-bold text-white">
                {myJobs.filter((j) => ["active", "review"].includes(j.status)).length}
              </div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10">
              <span className="text-on-surface-variant text-xs uppercase tracking-widest font-semibold">
                Completed
              </span>
              <div className="mt-3 text-4xl font-bold text-white">
                {myJobs.filter((j) => j.status === "completed").length}
              </div>
            </div>
            <div className="bg-gradient-to-br from-tertiary/20 to-primary/10 p-6 rounded-2xl border border-tertiary/20">
              <span className="text-tertiary text-xs uppercase tracking-widest font-semibold">
                Total Earned
              </span>
              <div className="mt-3 text-4xl font-bold text-white font-mono">
                {earnings.toLocaleString()} SOL
              </div>
            </div>
          </section>

          {/* My Active Contracts */}
          {myJobs.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">My Contracts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myJobs.map((job) => {
                  const busy = actionLoading[job._id];
                  return (
                    <div
                      key={job._id}
                      className="bg-surface-container rounded-2xl p-6 border border-outline-variant/10 space-y-4"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/job/${job._id}`}
                          className="font-bold text-white hover:text-primary transition-colors"
                        >
                          {job.title}
                        </Link>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[job.status] || ""}`}
                        >
                          {job.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-on-surface-variant font-mono">{job.budget} SOL</span>
                        {job.escrowAddress && (
                          <span className="text-xs text-outline font-mono truncate max-w-[120px]">
                            {job.escrowAddress.slice(0, 10)}…
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {job.status === "active" && (
                          <>
                            {job.escrowAddress && (
                              <button
                                onClick={() => handleAccept(job)}
                                disabled={!!busy}
                                className="text-xs font-bold text-on-primary bg-primary px-3 py-1.5 rounded-lg disabled:opacity-50"
                              >
                                {busy === "accepting" ? "Signing…" : "Accept On-Chain"}
                              </button>
                            )}
                            <button
                              onClick={() => handleDeliver(job)}
                              disabled={!!busy}
                              className="text-xs font-bold text-on-tertiary bg-tertiary px-3 py-1.5 rounded-lg disabled:opacity-50"
                            >
                              {busy === "delivering" ? "…" : "Submit Delivery"}
                            </button>
                          </>
                        )}
                        {job.status === "review" && (
                          <span className="text-xs text-yellow-400 font-medium">
                            ⏳ Awaiting client review
                          </span>
                        )}
                        {job.status === "completed" && (
                          <span className="text-xs text-green-400 font-medium">
                            ✓ Payment Released
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Open Jobs Marketplace */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Open Opportunities</h2>
              <button
                onClick={fetchJobs}
                className="p-2 text-on-surface-variant hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined">refresh</span>
              </button>
            </div>

            {loading ? (
              <div className="text-center py-16 text-on-surface-variant animate-pulse">
                Loading…
              </div>
            ) : openJobs.length === 0 ? (
              <div className="text-center py-16 text-on-surface-variant">
                No open jobs right now.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {openJobs.map((job) => {
                  const busy = actionLoading[job._id];
                  const isProposing = proposingFor === job._id;

                  return (
                    <div
                      key={job._id}
                      className="bg-surface-container-low rounded-2xl p-6 border border-outline-variant/10 hover:border-primary/20 transition-all space-y-4"
                    >
                      <div>
                        <Link
                          href={`/job/${job._id}`}
                          className="font-bold text-white hover:text-primary transition-colors text-lg leading-snug block"
                        >
                          {job.title}
                        </Link>
                        <p className="text-xs text-outline mt-1 font-mono capitalize">
                          {job.chain}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-primary font-bold">{job.budget} SOL</span>
                        <span className="text-xs text-on-surface-variant capitalize">
                          {job.timeline || ""}
                        </span>
                      </div>

                      {isProposing ? (
                        <div className="space-y-2">
                          <input
                            type="number"
                            placeholder="Your bid (SOL)"
                            value={proposalBids[job._id] || ""}
                            onChange={(e) =>
                              setProposalBids((p) => ({ ...p, [job._id]: e.target.value }))
                            }
                            className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-primary/40"
                          />
                          <textarea
                            placeholder="Cover letter (optional)"
                            value={proposalNotes[job._id] || ""}
                            onChange={(e) =>
                              setProposalNotes((p) => ({ ...p, [job._id]: e.target.value }))
                            }
                            rows={2}
                            className="w-full bg-surface-container border border-outline-variant/20 rounded-xl px-3 py-2 text-sm text-white outline-none focus:border-primary/40 resize-none"
                          />
                          <div className="flex gap-2">
                            <button
                              onClick={() => handlePropose(job._id)}
                              disabled={!!busy}
                              className="flex-1 text-xs font-bold text-on-primary bg-primary py-2 rounded-lg disabled:opacity-50"
                            >
                              {busy === "proposing" ? "Submitting…" : "Submit"}
                            </button>
                            <button
                              onClick={() => setProposingFor(null)}
                              className="text-xs px-3 py-2 text-on-surface-variant border border-outline-variant/20 rounded-lg hover:bg-white/5"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setProposingFor(job._id)}
                          disabled={!mounted || !publicKey}
                          className="w-full text-xs font-bold text-primary border border-primary/30 py-2 rounded-lg hover:bg-primary/10 transition-colors disabled:opacity-40"
                        >
                          {!mounted
                            ? "Loading wallet…"
                            : publicKey
                              ? "Submit Proposal"
                              : "Connect wallet to apply"}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
