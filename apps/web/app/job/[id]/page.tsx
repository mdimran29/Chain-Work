"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useWallet } from "@solana/wallet-adapter-react";
import { useChainWork } from "../../providers/ChainWorkProvider";
import Link from "next/link";

const API = "http://localhost:5000/api/jobs";

interface Proposal {
  _id: string;
  bid: number;
  coverLetter?: string;
  status: string;
  freelancerWallet?: string;
  createdAt: string;
}

interface Job {
  _id: string;
  title: string;
  description: string;
  status: string;
  chain: string;
  budget: number;
  timeline: string;
  skills: string[];
  escrowAddress: string | null;
  freelancerWallet: string | null;
  txHash: string | null;
  client: { _id: string; username: string; walletAddress?: string };
  freelancer: { _id: string; username: string; walletAddress?: string } | null;
  proposals: Proposal[];
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  open: "bg-primary/10 text-primary border-primary/20",
  active: "bg-tertiary/10 text-tertiary border-tertiary/20",
  review: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  completed: "bg-green-500/10 text-green-400 border-green-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
  disputed: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { publicKey } = useWallet();
  const { sdk } = useChainWork();

  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [mounted, setMounted] = useState(false);

  const walletStr = publicKey?.toBase58();

  const fetchJob = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/${id}`);
      if (res.ok) setJob(await res.json());
      else router.push("/marketplace");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <main className="lg:pl-[10%] pt-24 pb-12 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto text-center py-32 text-on-surface-variant animate-pulse">
          Loading job…
        </div>
      </main>
    );
  }

  if (!job) return null;

  const isClient = !!(mounted && walletStr && job.client?.walletAddress === walletStr);
  const isFreelancer = !!(
    mounted &&
    walletStr &&
    (job.freelancer?.walletAddress === walletStr || job.freelancerWallet === walletStr)
  );

  // ─── Actions ──────────────────────────────────────────────────────────────
  const handleRelease = async () => {
    if (!publicKey || !sdk) {
      alert("Connect wallet");
      return;
    }
    if (!job.escrowAddress || !job.freelancerWallet) {
      alert("No escrow for this job");
      return;
    }
    try {
      setActionLoading("releasing");
      const { PublicKey } = await import("@solana/web3.js");
      const txHash = await sdk.releaseSol(
        new PublicKey(job.escrowAddress),
        new PublicKey(job.freelancerWallet),
      );
      await fetch(`${API}/${job._id}/release`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txHash, walletAddress: walletStr }),
      });
      await fetchJob();
    } catch (e) {
      alert("Release failed: " + (e as Error).message);
    } finally {
      setActionLoading("");
    }
  };

  const handleCancel = async () => {
    if (!confirm("Cancel this job and request refund?")) return;
    try {
      setActionLoading("cancelling");
      await fetch(`${API}/${job._id}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: walletStr }),
      });
      await fetchJob();
    } catch (e) {
      alert("Cancel failed: " + (e as Error).message);
    } finally {
      setActionLoading("");
    }
  };

  const handleAccept = async () => {
    if (!publicKey || !sdk) {
      alert("Connect wallet");
      return;
    }
    if (!job.escrowAddress) {
      alert("No escrow to accept");
      return;
    }
    try {
      setActionLoading("accepting");
      const { PublicKey } = await import("@solana/web3.js");
      const txHash = await sdk.accept(new PublicKey(job.escrowAddress));
      await fetch(`${API}/${job._id}/accept`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ txHash, walletAddress: walletStr }),
      });
      await fetchJob();
    } catch (e) {
      alert("Accept failed: " + (e as Error).message);
    } finally {
      setActionLoading("");
    }
  };

  const handleDeliver = async () => {
    if (!confirm("Mark work as delivered for client review?")) return;
    try {
      setActionLoading("delivering");
      await fetch(`${API}/${job._id}/deliver`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: walletStr }),
      });
      await fetchJob();
    } catch (e) {
      alert("Failed: " + (e as Error).message);
    } finally {
      setActionLoading("");
    }
  };

  return (
    <main className="lg:pl-[10%] pt-24 pb-12 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* ── Left Column: Job Info ── */}
        <div className="xl:col-span-8 space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-widest capitalize ${STATUS_COLORS[job.status] || "bg-outline/10 text-outline border-outline/20"}`}
              >
                {job.status}
              </span>
              <span className="text-xs font-mono text-outline">{timeAgo(job.createdAt)}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-on-surface leading-tight">
              {job.title}
            </h1>
            <div className="flex items-center gap-4 text-on-surface-variant text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  account_circle
                </span>
                <span className="font-mono text-xs">
                  {job.client?.walletAddress
                    ? job.client.walletAddress.slice(0, 6) +
                      "…" +
                      job.client.walletAddress.slice(-4)
                    : job.client?.username}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">schedule</span>
                <span className="capitalize">{job.timeline}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">link</span>
                <span className="capitalize font-mono">{job.chain}</span>
              </div>
            </div>
          </section>

          {/* Skills */}
          {job.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {job.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1.5 rounded-full bg-surface-container-highest text-primary-fixed-dim text-xs font-semibold border border-outline-variant/20"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          {/* Description */}
          <section className="prose prose-invert max-w-none">
            <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10">
              <h3 className="text-on-surface font-bold mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">description</span>
                Job Description
              </h3>
              <p className="text-on-surface-variant leading-relaxed whitespace-pre-wrap">
                {job.description}
              </p>
            </div>
          </section>

          {/* On-chain info */}
          {job.escrowAddress && (
            <section className="p-5 bg-surface-container-low border border-outline-variant/10 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-on-surface uppercase tracking-widest">
                On-Chain Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-outline block mb-1">Escrow PDA</span>
                  <a
                    href={`https://explorer.solana.com/address/${job.escrowAddress}?cluster=devnet`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline break-all"
                  >
                    {job.escrowAddress}
                  </a>
                </div>
                {job.txHash && (
                  <div>
                    <span className="text-outline block mb-1">Tx Hash</span>
                    <a
                      href={`https://explorer.solana.com/tx/${job.txHash}?cluster=devnet`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {job.txHash.slice(0, 32)}…
                    </a>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Proposals (only visible to the client) */}
          {isClient && job.proposals.length > 0 && (
            <section className="space-y-4 pt-4">
              <h2 className="text-2xl font-bold text-on-surface">
                Proposals
                <span className="ml-2 text-sm font-normal text-outline">
                  {job.proposals.length}
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.proposals.map((p) => (
                  <div
                    key={p._id}
                    className="bg-surface-container rounded-2xl p-5 border border-outline-variant/5 hover:border-primary/20 transition-all space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-on-surface-variant">
                        {p.freelancerWallet ? p.freelancerWallet.slice(0, 8) + "…" : "Anonymous"}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[p.status] || "bg-outline/10 text-outline"}`}
                      >
                        {p.status}
                      </span>
                    </div>
                    {p.coverLetter && (
                      <p className="text-xs text-on-surface-variant line-clamp-3">
                        {p.coverLetter}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-primary">{p.bid} SOL</span>
                      <span className="text-xs text-outline">{timeAgo(p.createdAt)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ── Right Column: Contract Panel ── */}
        <div className="xl:col-span-4 sticky top-24">
          <div className="glass-panel p-8 rounded-2xl border border-outline-variant/10 shadow-2xl space-y-6 bg-surface-container/60 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">Contract Panel</h2>
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest ${job.chain === "solana" ? "bg-[#14F195]/10 border-[#14F195]/20 text-[#14F195]" : "bg-primary/10 border-primary/20 text-primary"}`}
              >
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: job.chain === "solana" ? "#14F195" : "#627EEA" }}
                />
                {job.chain}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold text-outline tracking-widest">
                Escrow Status
              </label>
              <div className="flex items-center gap-2">
                <span
                  className={`text-2xl font-black capitalize ${STATUS_COLORS[job.status]?.includes("tertiary") ? "text-tertiary" : STATUS_COLORS[job.status]?.includes("green") ? "text-green-400" : STATUS_COLORS[job.status]?.includes("yellow") ? "text-yellow-400" : "text-primary"}`}
                >
                  {job.status}
                </span>
                <span
                  className="material-symbols-outlined text-tertiary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {job.status === "completed"
                    ? "check_circle"
                    : job.status === "active"
                      ? "lock"
                      : "pending"}
                </span>
              </div>
            </div>

            {/* Financials */}
            <div className="p-5 bg-surface-container-lowest rounded-2xl border border-outline-variant/5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">Contract Value</span>
                <span className="font-mono text-lg font-bold text-on-surface">
                  {job.budget} SOL
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant">Platform Fee (2%)</span>
                <span className="font-mono text-sm text-on-surface-variant">
                  {(job.budget * 0.02).toFixed(4)} SOL
                </span>
              </div>
              <div className="pt-3 border-t border-outline-variant/10 flex justify-between items-center">
                <span className="text-sm font-bold text-on-surface">Freelancer Receives</span>
                <span className="font-mono text-xl font-black text-primary">
                  {(job.budget * 0.98).toFixed(4)} SOL
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              {/* Client actions */}
              {isClient && ["active", "review"].includes(job.status) && (
                <>
                  <button
                    onClick={handleRelease}
                    disabled={!!actionLoading}
                    className="w-full bg-gradient-to-r from-tertiary to-[#00885d] text-on-tertiary font-bold py-4 rounded-xl shadow-lg shadow-tertiary/10 active:scale-[0.98] transition-transform cursor-pointer disabled:opacity-50"
                  >
                    {actionLoading === "releasing" ? "Signing wallet…" : "✓ Release Payment"}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={!!actionLoading}
                    className="w-full border border-outline text-on-surface-variant font-bold py-4 rounded-xl hover:bg-white/5 active:scale-[0.98] transition-transform cursor-pointer disabled:opacity-50"
                  >
                    {actionLoading === "cancelling" ? "…" : "Request Refund"}
                  </button>
                </>
              )}

              {/* Freelancer actions */}
              {isFreelancer && job.status === "active" && (
                <>
                  {job.escrowAddress && (
                    <button
                      onClick={handleAccept}
                      disabled={!!actionLoading}
                      className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl active:scale-[0.98] transition-transform cursor-pointer disabled:opacity-50"
                    >
                      {actionLoading === "accepting" ? "Signing…" : "Accept Contract On-Chain"}
                    </button>
                  )}
                  <button
                    onClick={handleDeliver}
                    disabled={!!actionLoading}
                    className="w-full bg-gradient-to-r from-tertiary to-[#00885d] text-on-tertiary font-bold py-4 rounded-xl active:scale-[0.98] transition-transform cursor-pointer disabled:opacity-50"
                  >
                    {actionLoading === "delivering" ? "…" : "Mark Work Delivered"}
                  </button>
                </>
              )}

              {job.status === "completed" && (
                <div className="text-center py-4 text-green-400 font-bold">
                  ✓ Contract Completed
                </div>
              )}

              {job.status === "cancelled" && (
                <div className="text-center py-4 text-red-400 font-bold">✗ Contract Cancelled</div>
              )}

              {mounted && !isClient && !isFreelancer && job.status === "open" && publicKey && (
                <Link
                  href={`/job/${job._id}`}
                  className="block w-full text-center bg-primary text-on-primary font-bold py-4 rounded-xl hover:bg-primary/90 transition-colors"
                >
                  Apply / Submit Proposal
                </Link>
              )}

              {mounted && !publicKey && (
                <p className="text-center text-xs text-outline mt-2">
                  Connect your wallet to interact with this contract.
                </p>
              )}
            </div>

            {/* Tx details */}
            {job.txHash && (
              <div className="pt-2 space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase font-bold text-outline tracking-widest">
                    Latest Tx
                  </span>
                  <a
                    className="font-mono text-xs text-primary hover:underline truncate"
                    href={`https://explorer.solana.com/tx/${job.txHash}?cluster=devnet`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {job.txHash.slice(0, 40)}…
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
