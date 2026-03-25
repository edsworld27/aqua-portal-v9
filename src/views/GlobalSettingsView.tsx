import React from 'react';
import { motion } from 'motion/react';

export function GlobalSettingsView() {
  return (
    <motion.div
      key="global-settings"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full w-full p-4 md:p-6 lg:p-10 overflow-y-auto custom-scrollbar"
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2 tracking-tight">Global System Settings</h2>
          <p className="text-sm md:text-base text-slate-400">Platform-wide configurations and agency branding.</p>
        </div>

        <div className="space-y-6 md:space-y-8">
          <div className="glass-card p-5 md:p-8 rounded-2xl md:rounded-[32px] space-y-6 border border-white/5 shadow-xl">
            <h3 className="text-base md:text-lg font-bold flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              Agency Identity
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Agency Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium text-sm md:text-base text-white shadow-inner" 
                  defaultValue="Aqua Agency" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1">Primary Color</label>
                <div className="flex flex-wrap gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-indigo-600 cursor-pointer border-2 border-white ring-4 ring-indigo-600/20 shadow-lg transition-transform hover:scale-110" />
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-emerald-600 cursor-pointer border-2 border-transparent shadow-lg transition-transform hover:scale-110" />
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-rose-600 cursor-pointer border-2 border-transparent shadow-lg transition-transform hover:scale-110" />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-5 md:p-8 rounded-2xl md:rounded-[32px] space-y-6 border border-white/5 shadow-xl">
            <h3 className="text-base md:text-lg font-bold flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Security & Compliance
            </h3>
            <div className="space-y-4 md:space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white/[0.02] rounded-2xl md:rounded-3xl border border-white/5 gap-4 hover:bg-white/[0.04] transition-colors group">
                <div>
                  <p className="font-bold text-sm md:text-base group-hover:text-indigo-400 transition-colors">Strict AI Monitoring</p>
                  <p className="text-[10px] md:text-xs text-slate-500 font-medium">Record all AI interactions for audit purposes.</p>
                </div>
                <div className="w-12 h-6 md:w-14 md:h-7 bg-indigo-600 rounded-full relative shrink-0 cursor-pointer shadow-inner">
                  <div className="absolute right-1 top-1 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-md" />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white/[0.02] rounded-2xl md:rounded-3xl border border-white/5 opacity-50 gap-4 group">
                <div>
                  <p className="font-bold text-sm md:text-base">Session Timeout</p>
                  <p className="text-[10px] md:text-xs text-slate-500 font-medium">Auto logout after 30 minutes of inactivity.</p>
                </div>
                <div className="w-12 h-6 md:w-14 md:h-7 bg-slate-700 rounded-full relative shrink-0 cursor-not-allowed shadow-inner">
                  <div className="absolute left-1 top-1 w-4 h-4 md:w-5 md:h-5 bg-white rounded-full shadow-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
