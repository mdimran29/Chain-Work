"use client";

import React, { useState } from "react";
import SideNavBar from "../components/SideNavBar";
import { Toast } from "../components/ui/Toast";

export default function SettingsPage() {
  const [showToast, setShowToast] = useState(false);
  const [displayName, setDisplayName] = useState("Felix Curator");
  const [role, setRole] = useState("Freelancer");
  const [bio, setBio] = useState(
    "Architecting decentralized experiences in the Kinetic Ether. Specialist in Smart Contract Design and Editorial UI.",
  );
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [theme, setTheme] = useState("Obsidian");

  const handleSave = () => {
    setShowToast(true);
  };

  return (
    <>
      <SideNavBar />
      <main className="md:ml-64 pt-24 pb-12 px-4 md:px-12 bg-background min-h-screen">
        <div className="max-w-5xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl font-black tracking-tight mb-2 text-white">
              The Curator&apos;s Command
            </h1>
            <p className="text-on-surface-variant text-lg">
              Adjust your presence in the digital ether.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Vertical Tabs for Mobile/Sub-Nav */}
            <div className="lg:col-span-3 space-y-2">
              <button className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl bg-indigo-500/10 text-white font-bold border border-indigo-500/20 text-left transition-all shadow-[0_0_20px_rgba(99,102,241,0.1)]">
                <span className="material-symbols-outlined text-indigo-400">person</span> Profile
              </button>
              <button className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-white/5 text-on-surface-variant text-left transition-all">
                <span className="material-symbols-outlined">notifications</span> Notifications
              </button>
              <button className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-white/5 text-on-surface-variant text-left transition-all">
                <span className="material-symbols-outlined">security</span> Security
              </button>
              <button className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-white/5 text-on-surface-variant text-left transition-all">
                <span className="material-symbols-outlined">account_balance_wallet</span> Wallet
              </button>
              <button className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-white/5 text-on-surface-variant text-left transition-all">
                <span className="material-symbols-outlined">tune</span> Preferences
              </button>
            </div>

            {/* Settings Canvas */}
            <div className="lg:col-span-9 space-y-10">
              {/* Profile Section */}
              <section className="bg-surface-container/60 backdrop-blur-xl border border-primary/5 p-8 rounded-2xl shadow-xl">
                <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                  <div className="relative group">
                    <img
                      alt="User Avatar"
                      className="w-32 h-32 rounded-3xl object-cover border-4 border-white/5 bg-surface-container-high"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_pgbW_1FXdfS84sPoIcTzmvYyuDkPrfM-IocWfNYM0o-XBSnwZ7qMGUXr0K7QS4Ja9yhutc7QdneKDjAlLxrPhv0fptCmEqfJH8PKsCDH8I80JbdLqRDVwlcEkneBZ9XP8UhTHmQMiaPzKeR7LHQDQr6z5zNvWTFNlHamO-XQ4TuKk5B7ZG2VC8Dg4hjSMfiBKEW4TdzIEKbLxfH8xNH8rEMEZRqhkXLzYVC6888hL0pMMAvoIbNAFPQqFv6x3sby0szUrPqZgsM"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 rounded-3xl flex items-center justify-center transition-all cursor-pointer">
                      <span className="material-symbols-outlined text-white">photo_camera</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="display-name"
                          className="text-xs font-bold text-indigo-400 uppercase tracking-widest"
                        >
                          Display Name
                        </label>
                        <input
                          id="display-name"
                          className="w-full bg-surface-container-lowest border-none rounded-xl py-3 px-4 text-on-surface focus:ring-1 focus:ring-indigo-500/50 outline-none"
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                          Role Identity
                        </label>
                        <div className="flex bg-surface-container-lowest p-1 rounded-xl">
                          <button
                            onClick={() => setRole("Freelancer")}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${role === "Freelancer" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-on-surface-variant hover:text-white"}`}
                          >
                            Freelancer
                          </button>
                          <button
                            onClick={() => setRole("Client")}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all ${role === "Client" ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "text-on-surface-variant hover:text-white"}`}
                          >
                            Client
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="bio"
                        className="text-xs font-bold text-indigo-400 uppercase tracking-widest"
                      >
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        className="w-full bg-surface-container-lowest border-none rounded-xl py-3 px-4 text-on-surface focus:ring-1 focus:ring-indigo-500/50 outline-none resize-none"
                        rows={3}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Notifications & Theme Grid (Asymmetric) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Notifications */}
                <section className="bg-surface-container/60 backdrop-blur-xl border border-primary/5 p-8 rounded-2xl">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                    <span className="material-symbols-outlined text-indigo-400">notifications</span>
                    Connectivity
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Email Alerts</p>
                        <p className="text-xs text-on-surface-variant">
                          Job invites and contract updates
                        </p>
                      </div>
                      <button
                        onClick={() => setEmailAlerts(!emailAlerts)}
                        className={`w-12 h-6 rounded-full relative transition-all ${emailAlerts ? "bg-indigo-500" : "bg-surface-container-highest"}`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 rounded-full transition-all ${emailAlerts ? "right-1 bg-white" : "left-1 bg-slate-400"}`}
                        ></span>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Push Notifications</p>
                        <p className="text-xs text-on-surface-variant">Real-time message pings</p>
                      </div>
                      <button
                        onClick={() => setPushNotifications(!pushNotifications)}
                        className={`w-12 h-6 rounded-full relative transition-all ${pushNotifications ? "bg-indigo-500" : "bg-surface-container-highest"}`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 rounded-full transition-all ${pushNotifications ? "right-1 bg-white" : "left-1 bg-slate-400"}`}
                        ></span>
                      </button>
                    </div>
                  </div>
                </section>

                {/* Theme Toggle */}
                <section className="bg-surface-container/60 backdrop-blur-xl border border-primary/5 p-8 rounded-2xl flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-4 text-white">Interface Lume</h3>
                  <p className="text-on-surface-variant text-sm mb-6">
                    Switch between the deep void and the bright canvas.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setTheme("Obsidian")}
                      className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === "Obsidian" ? "border-indigo-500 bg-indigo-500/10 text-white" : "border-transparent bg-surface-container-lowest hover:border-white/10 text-on-surface-variant hover:text-white"}`}
                    >
                      <span className="material-symbols-outlined">dark_mode</span>
                      <span className="text-xs font-bold uppercase tracking-widest">Obsidian</span>
                    </button>
                    <button
                      onClick={() => setTheme("Prism")}
                      className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === "Prism" ? "border-indigo-500 bg-indigo-500/10 text-white" : "border-transparent bg-surface-container-lowest hover:border-white/10 text-on-surface-variant hover:text-white"}`}
                    >
                      <span className="material-symbols-outlined">light_mode</span>
                      <span className="text-xs font-bold uppercase tracking-widest">Prism</span>
                    </button>
                  </div>
                </section>
              </div>

              {/* Wallet Management */}
              <section className="bg-surface-container/60 backdrop-blur-xl border border-primary/5 p-8 rounded-2xl">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                    <span className="material-symbols-outlined text-indigo-400">
                      account_balance_wallet
                    </span>
                    Vault Management
                  </h3>
                  <button className="text-indigo-400 text-sm font-bold hover:underline">
                    + Link New Wallet
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Wallet Item */}
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-surface-container-lowest border border-white/5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span
                          className="material-symbols-outlined text-blue-400"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          account_balance
                        </span>
                      </div>
                      <div>
                        <p className="font-mono text-sm text-white">0x71C...4f21</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
                            MetaMask
                          </span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-tertiary/10 text-tertiary font-bold">
                            PRIMARY
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-mono text-indigo-300 font-bold">2.45 ETH</p>
                      <button
                        className="p-2 hover:bg-white/5 rounded-lg text-error transition-all"
                        title="Unlink Wallet"
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          link_off
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Wallet Item 2 */}
                  <div className="flex items-center justify-between p-5 rounded-2xl bg-surface-container-lowest border border-white/5 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <span
                          className="material-symbols-outlined text-purple-400"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          account_balance
                        </span>
                      </div>
                      <div>
                        <p className="font-mono text-sm text-white">0x99a...e210</p>
                        <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest block mt-1">
                          Phantom (Solana)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-mono text-purple-300 font-bold">12.0 SOL</p>
                      <button
                        className="p-2 hover:bg-white/5 rounded-lg text-error transition-all"
                        title="Unlink Wallet"
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          link_off
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Save Action */}
              <div className="flex items-center justify-end gap-4 pb-12">
                <button className="px-8 py-3 rounded-xl font-bold text-on-surface-variant hover:text-white transition-all">
                  Discard Changes
                </button>
                <button
                  onClick={handleSave}
                  className="px-10 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-black shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Save Curator Identity
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Toast
        message="Identity parameters updated successfully"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
