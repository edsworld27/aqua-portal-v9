import React from 'react';
import { motion } from 'motion/react';
import { Users, Globe, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useModalContext } from '../context/ModalContext';

interface DashboardViewProps {
  userProfile: any;
  currentUser: any;
  dashboardData: any[];
}

export function DashboardView({ userProfile, currentUser, dashboardData }: DashboardViewProps) {
  const { setShowAddUserModal } = useModalContext();

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 md:p-6 lg:p-10 max-w-6xl mx-auto w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">Dashboard Overview</h1>
          <p className="text-sm md:text-base text-slate-500">Welcome back, {userProfile.name}. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          {currentUser?.role === 'ClientOwner' && (
            <button 
              onClick={() => setShowAddUserModal(true)}
              className="flex-1 md:flex-none px-4 md:px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-xs md:text-sm shadow-lg"
            >
              <Users className="w-4 h-4" />
              Manage Team
            </button>
          )}
          <div className="px-4 py-2.5 glass-card rounded-xl flex items-center gap-2 border border-white/5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] md:text-xs font-medium">Live Traffic</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
        <div className="glass-card p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
            <span className="text-xs text-emerald-400 font-medium">+12%</span>
          </div>
          <div className="text-xl md:text-2xl font-bold mb-1">2,845</div>
          <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">Total Users</div>
        </div>
        <div className="glass-card p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-cyan-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-xs text-emerald-400 font-medium">+5.2%</span>
          </div>
          <div className="text-xl md:text-2xl font-bold mb-1">45.2k</div>
          <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">Page Views</div>
        </div>
        <div className="glass-card p-5 md:p-6 rounded-2xl md:rounded-3xl sm:col-span-2 md:col-span-1 border border-white/5 hover:border-white/10 transition-all group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xs text-red-400 font-medium">-2%</span>
          </div>
          <div className="text-xl md:text-2xl font-bold mb-1">1.2s</div>
          <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">Avg. Load Time</div>
        </div>
      </div>

      <div className="glass-card p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] mb-8 md:mb-10 border border-white/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <h3 className="text-lg font-medium">Growth Analytics</h3>
          <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none self-start sm:self-auto focus:border-indigo-500 transition-colors">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dashboardData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                dx={-10}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px' }}
                itemStyle={{ color: '#e2e8f0' }}
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#6366f1" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
