import React from 'react';

export const SyncCard: React.FC = () => (
  <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-indigo-600/10 border border-indigo-500/20">
    <h4 className="font-semibold mb-2 text-sm md:text-base">Need a quick sync?</h4>
    <p className="text-xs md:text-sm text-slate-400 mb-4">Schedule a 15-min call with your project manager.</p>
    <button className="w-full py-2.5 md:py-3 bg-indigo-600 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold hover:bg-indigo-700 transition-all">Book Call</button>
  </div>
);
