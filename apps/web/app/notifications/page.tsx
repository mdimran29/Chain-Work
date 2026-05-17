import React from "react";
import SideNavBar from "../components/SideNavBar";
import { NotificationItem } from "../components/ui/NotificationItem";

export default function NotificationsPage() {
  return (
    <>
      <SideNavBar />
      <main className="md:ml-64 pt-24 pb-12 px-6 flex flex-col items-center bg-background min-h-screen">
        <div className="w-full max-w-4xl space-y-10">
          {/* Editorial Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-5xl font-black tracking-tight mb-2">Notifications</h1>
              <p className="text-on-surface-variant text-lg">
                Stay updated with your curated Web3 workspace.
              </p>
            </div>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-highest/40 backdrop-blur-xl border border-white/5 rounded-xl text-primary text-sm font-semibold hover:bg-surface-container-highest transition-all group">
              <span className="material-symbols-outlined text-sm group-hover:rotate-12 transition-transform">
                done_all
              </span>
              Mark as read
            </button>
          </header>

          {/* Navigation / Filters */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-surface-container-lowest/50 rounded-2xl w-fit backdrop-blur-md">
            <button className="px-6 py-2 rounded-xl text-sm font-bold bg-primary text-on-primary-container shadow-lg shadow-primary/20 transition-all">
              All
            </button>
            <button className="px-6 py-2 rounded-xl text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all">
              Unread
            </button>
            <button className="px-6 py-2 rounded-xl text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all">
              Transactions
            </button>
            <button className="px-6 py-2 rounded-xl text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-white/5 transition-all">
              Jobs
            </button>
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            <NotificationItem
              iconName="description"
              iconBgClass="bg-primary-container/20"
              iconColorClass="text-primary"
              iconBorderClass="border-primary/10"
              title="Proposal received"
              timeAgo="Just Now"
              isUnread={true}
              description={
                <>
                  <span className="text-primary font-semibold">Alex Rivera</span> submitted a
                  proposal for{" "}
                  <span className="italic">&quot;Solidity Smart Contract Audit&quot;</span>.
                </>
              }
            />

            <NotificationItem
              iconName="account_balance_wallet"
              iconBgClass="bg-tertiary/10"
              iconColorClass="text-tertiary"
              iconBorderClass="border-tertiary/10"
              title="Payment released"
              timeAgo="2 hours ago"
              description={
                <>
                  Payment of <span className="font-mono text-tertiary">2.45 ETH</span> has been
                  released from escrow for Milestone #2.
                </>
              }
            />

            <NotificationItem
              iconName="check_circle"
              iconBgClass="bg-secondary-container/20"
              iconColorClass="text-secondary"
              iconBorderClass="border-secondary/10"
              title="Proposal accepted"
              timeAgo="5 hours ago"
              description={
                <>
                  Your proposal for{" "}
                  <span className="text-secondary font-semibold">
                    &quot;DAO Governance UI Design&quot;
                  </span>{" "}
                  was accepted by the client.
                </>
              }
            />

            <NotificationItem
              iconName="campaign"
              iconBgClass="bg-primary-container/10"
              iconColorClass="text-primary"
              iconBorderClass="border-primary/10"
              title="New job posted"
              timeAgo="8 hours ago"
              description={
                <>
                  A new project matching your skills:{" "}
                  <span className="italic">&quot;Full-stack Web3 Dashboard Development&quot;</span>{" "}
                  was just posted.
                </>
              }
            />

            {/* Date Separator (Tonal Shift) */}
            <div className="py-6 flex items-center gap-4">
              <span className="font-mono text-xs text-outline tracking-widest uppercase">
                Yesterday
              </span>
              <div className="flex-1 h-[1px] bg-outline-variant/20"></div>
            </div>

            <NotificationItem
              iconName="star"
              iconBgClass="bg-surface-container-high"
              iconColorClass="text-outline"
              iconBorderClass="border-white/5"
              title="New review received"
              timeAgo="May 14, 2024"
              isFaded={true}
              description={
                <>
                  <span className="text-on-surface">Genesis Labs</span> left you a 5-star review for
                  the project <span className="italic">&quot;L2 Bridge Integration&quot;</span>.
                </>
              }
            />
          </div>

          {/* Bento Summary / Featured Action */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="md:col-span-2 p-8 rounded-2xl bg-gradient-to-br from-surface-container/80 to-primary/5 border border-primary/10 flex flex-col justify-between backdrop-blur-xl">
              <div>
                <span className="font-mono text-xs text-primary uppercase tracking-[0.2em] mb-4 block">
                  Recommended for you
                </span>
                <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                  Your Weekly Curator Report is Ready
                </h3>
                <p className="text-on-surface-variant max-w-md">
                  We&apos;ve compiled a summary of 24 projects matching your profile in the
                  Decentralized Infrastructure sector.
                </p>
              </div>
              <button className="mt-8 w-fit px-8 py-3 bg-white text-background rounded-xl font-bold text-sm hover:scale-105 transition-all">
                View Full Report
              </button>
            </div>
            <div className="p-8 rounded-2xl flex flex-col items-center justify-center text-center gap-4 group bg-surface-container/60 backdrop-blur-xl border border-primary/5">
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-2 relative">
                <span className="material-symbols-outlined text-4xl">bolt</span>
                <div className="absolute inset-0 rounded-full border-2 border-secondary/20 scale-125 group-hover:scale-150 group-hover:opacity-0 transition-all duration-700"></div>
              </div>
              <h4 className="font-bold text-lg">Boost Presence</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Increase notification priority for your proposals by 30% with WorkBoost.
              </p>
              <button className="text-secondary font-bold text-sm underline decoration-secondary/20 underline-offset-4 hover:decoration-secondary transition-all">
                Upgrade Now
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
