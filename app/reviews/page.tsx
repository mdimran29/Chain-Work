import React from 'react';
import SideNavBar from '../components/SideNavBar';
import { RatingCard } from '../components/ui/RatingCard';

export default function ReviewsPage() {
  return (
    <>
      <SideNavBar />
      <main className="lg:ml-64 mt-16 p-6 md:p-10 max-w-7xl mx-auto min-h-screen bg-background text-on-surface">
        {/* Header Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2 text-white">
            Reputation <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-600">Protocol</span>
          </h1>
          <p className="text-on-surface-variant text-lg">Verified chain-of-trust reviews and marketplace performance data.</p>
        </header>

        {/* Summary Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Main Score Card */}
          <div className="md:col-span-2 bg-surface-container/60 backdrop-blur-xl border border-primary/5 rounded-2xl p-8 flex items-center justify-between relative overflow-hidden group shadow-lg">
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl transition-all group-hover:bg-primary/10"></div>
            <div className="relative z-10">
              <p className="text-sm font-bold text-primary tracking-widest uppercase mb-4">Average Rating</p>
              <div className="flex items-end gap-3 flex-wrap">
                <span className="text-7xl font-black leading-none text-white">4.9</span>
                <div className="flex flex-col mb-1">
                  <div className="flex text-primary">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0.5" }}>star_half</span>
                  </div>
                  <span className="text-on-surface-variant text-sm font-medium mt-1">Based on 124 verified jobs</span>
                </div>
              </div>
            </div>
            <div className="text-right relative z-10 hidden sm:block">
              <div className="mb-2">
                <span className="text-xs font-mono text-tertiary bg-tertiary/10 px-2 py-1 rounded border border-tertiary/20">PLATINUM TIER</span>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <div className="h-1.5 w-32 bg-surface-container-highest rounded-full overflow-hidden flex justify-end">
                  <div className="h-full bg-primary" style={{ width: '92%' }}></div>
                </div>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">92nd Percentile</p>
              </div>
            </div>
          </div>

          {/* Reputation Score Card */}
          <div className="bg-surface-container/60 backdrop-blur-xl border border-primary/10 rounded-2xl p-8 flex flex-col justify-center shadow-lg">
            <p className="text-sm font-bold text-on-surface-variant tracking-widest uppercase mb-2">Trust Score</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white">998</span>
              <span className="text-tertiary text-sm font-mono">+12%</span>
            </div>
            <p className="text-xs text-on-surface-variant mt-4 leading-relaxed">
              Calculation based on wallet age, transaction volume, and dispute-free history.
            </p>
          </div>
        </section>

        {/* Filters & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar pb-2 sm:pb-0">
            <button className="bg-surface-container-highest text-white px-4 py-2 rounded-xl text-sm font-bold border border-white/5 whitespace-nowrap">All Reviews</button>
            <button className="bg-transparent text-on-surface-variant px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/5 transition-all whitespace-nowrap">Latest</button>
            <button className="bg-transparent text-on-surface-variant px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/5 transition-all whitespace-nowrap">Highest Rated</button>
          </div>
          <div className="relative w-full sm:w-auto">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl">search</span>
            <input
              className="w-full sm:w-64 bg-surface-container-lowest border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-primary/30 outline-none text-white"
              placeholder="Search reviews..."
              type="text"
            />
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          <RatingCard
            title="Smart Contract Architect for DeFi Protocol"
            typeLabel="FIXED PRICE"
            typeBgClass="bg-primary/10"
            typeTextClass="text-primary"
            typeBorderClass="border-primary/20"
            ratingValue={5}
            date="24 Oct 2023"
            reviewText="Absolutely exceptional work on the liquidity pools. Code was gas-optimized beyond my expectations and the documentation was institutional grade. Highly recommended for any complex EVM-based architecture projects. A true professional."
            reviewerName="VortexDAO.eth"
            reviewerAddress="0x71C...4921"
            reviewerAvatar="https://lh3.googleusercontent.com/aida-public/AB6AXuDPBF0pA-X_iipQtb-S_UG5d8yTUjwYYXtRYu2nsiT5jCSXDwN1bB0bZqjXkG9AHwqqXbP7nrK2dMhl-GmoG69Z_qD6_-twlMp6mBevRztrXQ3p19pP6SJ9v4zX638vmnKE6LB7kDI769_ew3beESasYtqFp8vWAdHeeixZUiVyYf8H4I9RCjO1amSR5xjB4wpulWesov8Agj8cMMkDD9pl5qR83qFy7diW8_AKcsNfpZ4w7ekf48s_k71R37cUCk246_30nU_bOGw"
          />

          <RatingCard
            title="Full Stack Web3 Integration (Next.js & Wagmi)"
            typeLabel="MILESTONE"
            typeBgClass="bg-secondary/10"
            typeTextClass="text-secondary"
            typeBorderClass="border-secondary/20"
            ratingValue={4}
            date="12 Sep 2023"
            reviewText="Fast delivery and great communication. The frontend is beautiful and hooks into the protocol perfectly. Had a minor issue with the mobile responsive menu but it was fixed within an hour of reporting. Will definitely hire again."
            reviewerName="NeonPixels_Labs"
            reviewerAddress="0x3A2...F912"
            reviewerAvatar="https://lh3.googleusercontent.com/aida-public/AB6AXuDDaLiZxipRjhDuqKDL5XXyKLpSeLxGXyl2ngrAB5sc0Cg0y4uZ6Mj-cZgf65InLvZSLPqlHMn-I2M7eEmRkUwn2Co5khXZ8xryHwunva7HTMaAvYlsscfrM5Hg9xizy-WQ8BNYcG2_e1j9CLU-WS9FVSiSBz61LH2F0S3ojOD9bWr3t-a0ruO_iCTx27CdOp1dItWGVFVJvKfoMm843XaXIEi2z9Gx29yJgv_uZjWmdkwzJcbW6TjBQcltv1Rs-XqowdAoDbcKdao"
          />

          <RatingCard
            title="NFT Collection Smart Contract & Minting Site"
            typeLabel="RECURRING"
            typeBgClass="bg-tertiary/10"
            typeTextClass="text-tertiary"
            typeBorderClass="border-tertiary/20"
            ratingValue={5}
            date="30 Aug 2023"
            reviewText="The best developer I've worked with on ChainWork. Handled the ERC-721A implementation flawlessly. The reveal mechanism was perfectly coded and secure. 10/10 service."
            reviewerName="ArtBlock_Master"
            reviewerAddress="0x9E2...D331"
            reviewerAvatar="https://lh3.googleusercontent.com/aida-public/AB6AXuBaiS10cNtOPAD-IrYGcs-NexfR6j6cPgOX-BKBAArAPU70qiSqJuMR4b6LPgvQ_xJWSPCYaS7yW88AfNYn5tpoivZVfhZWpbhsJvCHW1NWEL1rx7iyeCiGWIRceDWomykBrvR_S08vO1MMMZlGAPX-P5F6JAgIvL6BUCyDKRJomDzFjuUSjWitlrdQbK0b43ZDLe7vgBAmU9sdL7sf7OrMVvRSqkVhnpdADeLkBmZErxp5WK_3UxbNEpKs_hESQYlV_CewkQgoDlI"
          />
        </div>

        {/* Load More */}
        <div className="mt-12 text-center pb-8">
          <button className="px-8 py-3 rounded-xl border border-white/10 text-on-surface-variant font-bold text-sm hover:bg-white/5 hover:text-white transition-all">
            Load More Reviews
          </button>
        </div>
      </main>
    </>
  );
}
