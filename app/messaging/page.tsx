import React from 'react';
import SideNavBar from '../components/SideNavBar';
import { ChatMessage } from '../components/ui/ChatMessage';

export default function MessagingPage() {
  return (
    <>
      <SideNavBar />
      <main className="md:ml-64 pt-[4.5rem] h-screen grid grid-cols-1 md:grid-cols-12 gap-0 overflow-hidden bg-background">
        {/* Conversation List Sidebar */}
        <section className="col-span-12 md:col-span-4 lg:col-span-3 border-r border-white/5 flex flex-col bg-surface-container-low/30 h-full overflow-y-auto no-scrollbar hidden md:flex">
          <div className="p-6">
            <h1 className="text-xl font-bold text-white mb-6">Messages</h1>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg">search</span>
              <input className="w-full bg-surface-container-lowest border-none rounded-xl py-3 pl-10 pr-4 text-sm text-on-surface focus:ring-1 focus:ring-primary/20 placeholder:text-slate-600 transition-all" placeholder="Search conversations..." type="text" />
            </div>
          </div>
          <div className="flex-1 px-2 pb-6 space-y-1">
            {/* Active Conversation Item */}
            <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-surface-container-high transition-all border border-white/5 text-left relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5OqUm9uXWd1X0HREFZ-gQP4x5c__SkN1pl5Fm1_DOvMfSClJ5nLlYYHu2qOGHVx1eat4KEOo4sAPCM-HRkaALVQxKYHZm69PBoG1nk8Mr_rK58aGdKOacAWN2I1TuIwKm_acddohbkGcNF1VING4uEMb4_WPh_BDrSRLkrmb1C4W5B6cO08SNTOjLI3KryXiYGVW0pmfsxARuPSPDdyUcy-wdWpWQPwZ_4KFCibttoo017EKL3uh5tiiwWBx0uCLrlr6eRmLyfwk" alt="Avatar"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-white font-semibold text-sm truncate">Elena Vance</span>
                  <span className="text-[10px] font-mono text-slate-500">12:45 PM</span>
                </div>
                <div className="text-primary text-[11px] font-bold uppercase tracking-wider mb-1">dApp UX Redesign</div>
                <p className="text-slate-400 text-xs truncate">The smart contract hooks are ready for the...</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
            </button>
            {/* Inactive Conversation Items */}
            <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all text-left group">
              <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM1THVH5sPEKFc3iiuFJZ1g2AcmOI5LfnCMQXvZlw21w52Q9KaL1jB0nig_L7GRF5uJzy2vcAUjLX92l8KDPw48PS1WJh36zDx5QXcrR5RT4fLKm6KJ1Acp3fqi7eGUebR37jS61jIns-baZuo6SiybK6m7hyH5PH6BGzYgSU7FJd7E199MkqxikWr48EqV6-xillGUPAcYglj4-C_wMYy3OCdCjIJYaBXP4nQhESWJmQM8k_1RKRh_vaaswRSnwpUdaFd8y8dkds" alt="Avatar"/>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-slate-300 font-medium text-sm truncate">Marcus Chen</span>
                  <span className="text-[10px] font-mono text-slate-500">YESTERDAY</span>
                </div>
                <div className="text-slate-500 text-[11px] font-bold uppercase tracking-wider mb-1">Solidity Audit</div>
                <p className="text-slate-500 text-xs truncate">Thanks! I'll review the report by Monday morning.</p>
              </div>
            </button>
          </div>
        </section>

        {/* Active Chat Panel */}
        <section className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-col bg-surface relative h-full">
          {/* Chat Header */}
          <header className="h-20 flex items-center justify-between px-8 bg-surface-container/20 backdrop-blur-md border-b border-white/5 z-10 flex-shrink-0">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlxv4EBU3kVkNtcTnmE8QI7ZfpjzaWzVsK0t-MeYLJlVTK1Bljtd86ws5qLE3XuulRDOcIF6rHADF4i3NHpROGam-C1usL5vkjvAXLqFEUCQtOhfoILTT9BqchkCvA-LGxY1yUL1YLmsVtjBISYsXLvNW5xHqn2JJiAqTMEkaUWurBG4RZGPIfiLfGHS0V6XmGrK28sPi6qESp2xPbK7VXXiQDr9TYQM_KYQnixh6lc4gFnm034UDmhB3-jLexp4CqHVYYt4PyKuc" alt="Avatar"/>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-tertiary border-2 border-surface"></div>
              </div>
              <div>
                <div className="text-white font-bold tracking-tight">Elena Vance</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 rounded-md">dApp UX Redesign</span>
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  <span className="text-[10px] text-slate-500 font-mono">0x71C...39A1</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-slate-400">
                <span className="material-symbols-outlined text-lg">videocam</span>
              </button>
              <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all text-slate-400">
                <span className="material-symbols-outlined text-lg">more_vert</span>
              </button>
            </div>
          </header>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth no-scrollbar">
            {/* Date Divider */}
            <div className="flex justify-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-600 bg-surface-container-low px-4 py-1 rounded-full">July 24, 2024</span>
            </div>
            
            <ChatMessage
              isSender={false}
              avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuCwNU3Z6QptDhxQR98lW7AAEK7XYP0b1UKgujO1jVZLb1o1DQCX1V4DdEtjGrAOey8JVo6vR2H4NifNac9zakGzXKyp25TYImxIt33kYtredfcd0zbRiK2c37qfP8d4-2JO8hArrK_dG3Shvs4tO_RJYQ_raubeB9jmJn6dGrjPEVA1bm4Hiy15LTxGysmIf-75ahqWERXsnrycM3IghKqsv0Wb20IdQtTIEFvXw5SgKy-V4hGaKytapx5h1arZvWGklL4PUESBx1s"
              messageText="Hey! I've just pushed the latest Figma iterations for the wallet connection modal. I took your feedback on the 'Gas Fee' transparency into account."
              timestamp="10:24 AM"
            />

            <ChatMessage
              isSender={true}
              avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAYIbhz0xseqyuKD-fovm-d1FsQlImZ0U5htMU1lhFCj1dv4RBs8b8wbbsBnCeI-q2zs4E50ojNeSIs3KAv4Ywltf7rHsio-JlEw1Ve7CcoEbedCONNTcgrA5qPJt2Z8MEIzE8kq97v6ofRGcYnPI-s1fDb_Eo-wmPElzc2_V62SWB10gYjxZ1rGleT0U4vMiNRWsP2GqHCkS-DlXILzbG9df-FK_uNI0MkEVFvxM5oubruAVTiQBerbhMkLSce4JUFHXrPudtXJEc"
              messageText="Awesome work, Elena. The breakdown looks much cleaner now. Let's make sure the 'Connect' button has that same kinetic hover state we discussed."
              timestamp="10:30 AM"
            />
            
            <ChatMessage
              isSender={false}
              avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuBe1tQJFS_SIRQqWowAZHBkOnCBD2oVOFnJZGJROrWhFyVEm0KKYJTK04ESIM1-UdXttjVv-WVAd93SjY80_mZR1Y4-kI-8YBkn1kKoj50xhTb1z8sXZ7cG6E-9zjaWGO7us9lr0QOAvz_yfOeCF28eANUGfu72vp2IGTlCoKHRMA3nUMgHoGMcD-hZdHUKVNzvP9xqoKFiHou8YflqMwSV8IvgB8Wb9gVuin5_Y_li8HoC44fUxPnxxSFRSW65BMrZdvNnMUNA_qo"
              messageText="Got it. Here is the revised component spec for the hover state."
              timestamp="10:45 AM"
              hasAttachment={true}
              attachmentName="interaction-specs-v2.pdf"
              attachmentSize="4.2 MB • PDF"
            />

            <ChatMessage
              isSender={true}
              avatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAgKqBiMjVMZ_VcnctskaFyqKs0IpcGR-ZViq3Ka5I5-XNopjY5Cg022Kfr9-ob4kUqCtkrTzn1Om-Ws_Y0OEQEqJ_slUQpwxSHYmjP-SoL5Scac1GRFerqqHk4lWjIQ90MCh95P74MCWW9CFum2hGjC2GFQPI7uqOsutKRxMipFzPSb2aVMBJJ613arQzMNNvpeEMRUHLSu5hqWY3twDttU597ehl5022IXd5_EkITygJhqYBBbH04QRuDJSEVEC1khsdxkD-ZxpY"
              messageText="Perfect. I'll pass this to the engineering team for the sprint planning. We should be ready to deploy the testnet version by Friday."
              timestamp="12:45 PM"
            />
          </div>

          {/* Input Area */}
          <footer className="p-6 bg-surface-container-lowest/80 backdrop-blur-xl border-t border-white/5 relative z-10 flex-shrink-0">
            <div className="max-w-4xl mx-auto flex items-end gap-3">
              <div className="flex gap-1 mb-1">
                <button className="w-10 h-10 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center">
                  <span className="material-symbols-outlined">attach_file</span>
                </button>
                <button className="w-10 h-10 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center">
                  <span className="material-symbols-outlined">sentiment_satisfied</span>
                </button>
              </div>
              <div className="flex-1 relative">
                <textarea className="w-full bg-surface-container-high border-none rounded-2xl py-3.5 px-6 text-sm text-on-surface focus:ring-1 focus:ring-primary/20 placeholder:text-slate-600 resize-none transition-all no-scrollbar" placeholder="Type a message..." rows={1}></textarea>
              </div>
              <button className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/20 active:scale-90 transition-all">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
              </button>
            </div>
          </footer>

          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        </section>
      </main>
    </>
  );
}
