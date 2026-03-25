import React from 'react';
import { Layout } from 'lucide-react';

export const DesignConcepts: React.FC = () => (
  <section className="glass-card p-5 md:p-8 rounded-2xl md:rounded-3xl">
    <div className="flex items-center justify-between mb-5 md:mb-6">
      <h3 className="text-lg md:text-xl font-medium">Design Concepts</h3>
      <span className="px-2.5 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-widest">In Review</span>
    </div>
    <div className="aspect-video bg-white/5 rounded-xl md:rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 md:p-6">
        <button className="px-4 py-2 bg-indigo-600 rounded-xl text-xs md:text-sm font-medium">View Full Screen</button>
      </div>
      <Layout className="w-10 h-10 md:w-12 md:h-12 text-slate-700" />
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-6 md:translate-y-8 text-[10px] md:text-xs text-slate-600">Homepage Concept v1.2</p>
    </div>
    <div className="mt-5 md:mt-6 flex flex-col sm:flex-row gap-3 md:gap-4">
      <button className="flex-1 py-2.5 md:py-3 bg-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl text-xs md:text-sm font-medium transition-all">Request Changes</button>
      <button className="flex-1 py-2.5 md:py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl md:rounded-2xl text-xs md:text-sm font-medium transition-all">Approve Design</button>
    </div>
  </section>
);
