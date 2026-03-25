import React from 'react';
import { motion } from 'motion/react';
import { Code2, CheckCircle2, Activity, Circle, ExternalLink } from 'lucide-react';

export function DevDashboardView() {
  return (
    <motion.div
      key="dev-dashboard"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 md:p-6 lg:p-10 max-w-6xl mx-auto w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-1 md:mb-2">Development Dashboard</h2>
          <p className="text-xs md:text-sm lg:text-base text-slate-500">Tracking the build and implementation of your project.</p>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 font-medium bg-emerald-400/10 px-3 md:px-4 py-1.5 md:py-2 rounded-xl border border-emerald-400/20 self-start md:self-auto text-xs md:text-sm lg:text-base">
          <Code2 className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
          Build Phase
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <section className="glass-card p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl">
            <div className="flex items-center justify-between mb-5 md:mb-8">
              <h3 className="text-lg md:text-xl font-medium">Build Progress</h3>
              <div className="px-2 md:px-2.5 py-0.5 md:py-1 bg-emerald-500/20 text-emerald-400 text-[8px] md:text-[9px] lg:text-[10px] font-bold rounded-full uppercase tracking-widest">On Track</div>
            </div>
            <div className="space-y-6 md:space-y-8">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-[9px] md:text-[10px] lg:text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-emerald-200">
                      Overall Completion
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] md:text-[10px] lg:text-xs font-semibold inline-block text-emerald-600">
                      75%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-1.5 md:h-2 lg:h-3 mb-4 text-xs flex rounded-full bg-emerald-200/20">
                  <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500 transition-all duration-1000"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {[
                  { label: 'Frontend Architecture', status: 'completed' },
                  { label: 'Backend API Integration', status: 'completed' },
                  { label: 'Database Schema', status: 'completed' },
                  { label: 'User Authentication', status: 'completed' },
                  { label: 'Real-time Sync', status: 'in-progress' },
                  { label: 'Performance Optimization', status: 'pending' },
                  { label: 'Security Audit', status: 'pending' },
                  { label: 'Final QA Testing', status: 'pending' }
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/5">
                    <div className={`w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full flex-shrink-0 flex items-center justify-center ${
                      step.status === 'completed' ? 'bg-emerald-500 text-white' :
                      step.status === 'in-progress' ? 'bg-indigo-500 text-white animate-pulse' :
                      'bg-slate-800 text-slate-600'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle2 className="w-2 md:w-2.5 lg:w-3 md:h-2.5 lg:h-3" /> : 
                       step.status === 'in-progress' ? <Activity className="w-2 md:w-2.5 lg:w-3 md:h-2.5 lg:h-3" /> : 
                       <Circle className="w-2 md:w-2.5 lg:w-3 md:h-2.5 lg:h-3" />}
                    </div>
                    <span className={`text-[11px] md:text-xs lg:text-sm truncate ${step.status === 'pending' ? 'text-slate-500' : 'text-slate-200'}`}>{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="glass-card p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl">
            <h3 className="text-lg md:text-xl font-medium mb-4 md:mb-6">Staging Environment</h3>
            <div className="p-4 md:p-6 bg-indigo-600/10 rounded-xl md:rounded-2xl border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="min-w-0">
                <h4 className="font-medium mb-1 text-sm md:text-base truncate">Current Staging Build: v2.4.0-beta</h4>
                <p className="text-[9px] md:text-[10px] lg:text-xs text-slate-500">Last deployed: Today at 2:45 PM</p>
              </div>
              <button className="px-4 md:px-6 py-2 md:py-2.5 lg:py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs md:text-sm font-medium transition-all flex items-center justify-center gap-2 shrink-0">
                <ExternalLink className="w-3 md:w-3.5 lg:w-4 md:h-3.5 lg:h-4" />
                Open Staging
              </button>
            </div>
          </section>
        </div>

        <div className="space-y-6 md:space-y-8">
          <section className="glass-card p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl">
            <h3 className="text-base md:text-lg font-medium mb-4 md:mb-6">Tech Stack</h3>
            <div className="space-y-2 md:space-y-4">
              {[
                { label: 'Frontend', value: 'React + Vite' },
                { label: 'Styling', value: 'Tailwind CSS' },
                { label: 'Backend', value: 'Node.js + Express' },
                { label: 'Database', value: 'PostgreSQL' },
                { label: 'Real-time', value: 'WebSockets' }
              ].map((tech, i) => (
                <div key={i} className="flex justify-between items-center py-1.5 md:py-2 border-b border-white/5 last:border-0">
                  <span className="text-[9px] md:text-[10px] lg:text-xs text-slate-500">{tech.label}</span>
                  <span className="text-[9px] md:text-[10px] lg:text-xs font-medium text-slate-200">{tech.value}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
