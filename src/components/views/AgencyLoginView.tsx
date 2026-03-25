import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Lock, User, ChevronRight } from 'lucide-react';

interface AgencyLoginViewProps {
  onLogin: () => void;
  onSignup: () => void;
}

export const AgencyLoginView: React.FC<AgencyLoginViewProps> = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center w-full min-h-screen relative z-[100] px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md glass-card rounded-[2.5rem] p-10 shadow-2xl border border-white/10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">{isLogin ? 'Welcome Back' : 'Get Started'}</h1>
          <p className="text-slate-500 mt-2">{isLogin ? 'Sign in to your agency hub' : 'Create your agency account'}</p>
        </div>

        <div className="space-y-4">
          <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500 transition-all" />
          <input type="password" placeholder="Password" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500 transition-all" />
          
          <button 
            onClick={isLogin ? onLogin : onSignup}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button 
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-6 text-sm text-slate-400 hover:text-white transition-colors"
        >
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </motion.div>
    </div>
  );
};
