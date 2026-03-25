import React from 'react';
import { Play } from 'lucide-react';

export const ProjectChat: React.FC = () => (
  <section className="glass-card p-5 md:p-8 rounded-2xl md:rounded-3xl flex flex-col h-[400px] md:h-[500px]">
    <h3 className="text-lg md:text-xl font-medium mb-5 md:mb-6">Project Chat</h3>
    <div className="flex-1 overflow-y-auto space-y-4 mb-5 md:mb-6 custom-scrollbar pr-2">
      <div className="bg-white/5 rounded-xl md:rounded-2xl p-3 md:p-4">
        <div className="text-[9px] md:text-[10px] font-bold text-indigo-400 mb-1 uppercase tracking-widest">Edward (Admin)</div>
        <p className="text-xs md:text-sm">I've uploaded the latest homepage concept. Let me know what you think about the color palette!</p>
      </div>
      <div className="bg-indigo-600/20 rounded-xl md:rounded-2xl p-3 md:p-4 ml-4">
        <div className="text-[9px] md:text-[10px] font-bold text-white mb-1 uppercase tracking-widest">You</div>
        <p className="text-xs md:text-sm">Looks great! Can we try a slightly darker shade for the header?</p>
      </div>
    </div>
    <div className="relative">
      <input 
        type="text" 
        placeholder="Type a message..."
        className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 md:py-3 pl-4 pr-12 text-xs md:text-sm outline-none focus:border-indigo-500/50 transition-colors"
      />
      <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-400 hover:text-indigo-300 transition-colors">
        <Play className="w-4 h-4" />
      </button>
    </div>
  </section>
);
