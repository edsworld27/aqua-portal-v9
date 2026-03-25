import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

export const ProjectTimeline: React.FC = () => (
  <section className="glass-card p-5 md:p-8 rounded-2xl md:rounded-3xl">
    <h3 className="text-lg md:text-xl font-medium mb-5 md:mb-6">Project Timeline</h3>
    <div className="space-y-5 md:space-y-6">
      {[
        { stage: 'Discovery', status: 'completed', date: 'Mar 10' },
        { stage: 'Wireframing', status: 'completed', date: 'Mar 15' },
        { stage: 'UI Design', status: 'current', date: 'Mar 24' },
        { stage: 'Development', status: 'pending', date: 'Apr 05' },
        { stage: 'Launch', status: 'pending', date: 'Apr 20' }
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3 md:gap-4">
          <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shrink-0 ${
            item.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' :
            item.status === 'current' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/50' :
            'bg-white/5 text-slate-600'
          }`}>
            {item.status === 'completed' ? <CheckCircle className="w-4 h-4 md:w-5 md:h-5" /> : <Circle className="w-4 h-4 md:w-5 md:h-5" />}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className={`text-xs md:text-sm font-medium ${item.status === 'pending' ? 'text-slate-600' : 'text-white'}`}>{item.stage}</span>
              <span className="text-[10px] md:text-xs text-slate-500">{item.date}</span>
            </div>
            {item.status === 'current' && (
              <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-indigo-500 w-2/3" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </section>
);
