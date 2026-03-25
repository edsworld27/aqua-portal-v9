import React from 'react';
import { motion } from 'motion/react';
import { Building2, ChevronRight } from 'lucide-react';

interface ClientLoginViewProps {
  onLogin: () => void;
}

export const ClientLoginView: React.FC<ClientLoginViewProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen relative z-[100] px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md glass-card rounded-[2.5rem] p-10 shadow-2xl border border-white/10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center shadow-lg shadow-slate-600/30 mb-6">
            <Building2 className="w-8 h-8 text-slate-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Client Portal</h1>
          <p className="text-slate-500 mt-2">Sign in to access your projects</p>
        </div>

        <div className="space-y-4">
          <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500 transition-all" />
          <input type="password" placeholder="Password" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500 transition-all" />
          
          <button 
            onClick={onLogin}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            Sign In
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
