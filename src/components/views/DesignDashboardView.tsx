import React from 'react';
import { motion } from 'motion/react';
import { Palette, Send, FileText, Download } from 'lucide-react';

export function DesignDashboardView() {
  return (
    <motion.div
      key="design-dashboard"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 md:p-6 lg:p-10 max-w-6xl mx-auto w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-1 md:mb-2">Design Dashboard</h2>
          <p className="text-xs md:text-sm lg:text-base text-slate-500">Reviewing and refining your project's visual identity.</p>
        </div>
        <div className="flex items-center gap-2 text-indigo-400 font-medium bg-indigo-400/10 px-3 md:px-4 py-1.5 md:py-2 rounded-xl border border-indigo-400/20 self-start md:self-auto text-xs md:text-sm lg:text-base">
          <Palette className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
          Design Phase
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <section className="glass-card p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl">
            <h3 className="text-lg md:text-xl font-medium mb-4 md:mb-6">Latest Design Concepts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {[
                { title: 'Homepage Concept A', img: 'https://picsum.photos/seed/design1/800/600', status: 'Reviewing' },
                { title: 'Mobile App Layout', img: 'https://picsum.photos/seed/design2/800/600', status: 'Approved' }
              ].map((design, i) => (
                <div key={i} className="group relative overflow-hidden rounded-xl md:rounded-2xl border border-white/10 bg-white/5">
                  <img src={design.img} alt={design.title} className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 md:p-4 lg:p-6">
                    <h4 className="text-white font-medium mb-2 text-xs md:text-sm lg:text-base">{design.title}</h4>
                    <div className="flex gap-2">
                      <button className="px-2 md:px-3 py-1 md:py-1.5 bg-indigo-600 text-white text-[8px] md:text-[9px] lg:text-[10px] font-bold rounded-lg uppercase tracking-widest">View Full</button>
                      <button className="px-2 md:px-3 py-1 md:py-1.5 bg-white/20 text-white text-[8px] md:text-[9px] lg:text-[10px] font-bold rounded-lg uppercase tracking-widest backdrop-blur-md">Feedback</button>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 lg:top-4 lg:right-4 px-1.5 md:px-2 py-0.5 md:py-1 bg-black/60 backdrop-blur-md rounded-lg text-[8px] md:text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-indigo-400 border border-indigo-400/30">
                    {design.status}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl">
            <h3 className="text-lg md:text-xl font-medium mb-4 md:mb-6">Design Feedback Loop</h3>
            <div className="space-y-3 md:space-y-4">
              <div className="flex gap-3 md:gap-4 p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/5">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center font-bold text-xs md:text-sm">EH</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs md:text-sm font-medium truncate mr-2">Edward Hallam</span>
                    <span className="text-[8px] md:text-[9px] lg:text-[10px] text-slate-500 shrink-0">2 hours ago</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-400 line-clamp-3">Can we try a more vibrant blue for the primary buttons? I think it would pop more against the dark background.</p>
                </div>
              </div>
              <div className="flex gap-3 md:gap-4 p-3 md:p-4 bg-indigo-600/5 rounded-xl md:rounded-2xl border border-indigo-500/20 ml-4 md:ml-8">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-800 flex-shrink-0 flex items-center justify-center font-bold text-indigo-400 text-xs md:text-sm">AA</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs md:text-sm font-medium text-indigo-400 truncate mr-2">Aqua Agency (Designer)</span>
                    <span className="text-[8px] md:text-[9px] lg:text-[10px] text-slate-500 shrink-0">Just now</span>
                  </div>
                  <p className="text-xs md:text-sm text-slate-400 line-clamp-3">Great suggestion! I'll update the style guide and push a new version for you to review shortly.</p>
                </div>
              </div>
            </div>
            <div className="mt-5 md:mt-6 flex gap-2 md:gap-3">
              <input type="text" placeholder="Add a comment..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 md:px-4 py-2 md:py-2.5 lg:py-3 text-xs md:text-sm outline-none focus:border-indigo-500/50 transition-colors" />
              <button className="p-2 md:p-2.5 lg:p-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-colors shrink-0">
                <Send className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
              </button>
            </div>
          </section>
        </div>

        <div className="space-y-6 md:space-y-8">
          <section className="glass-card p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl">
            <h3 className="text-base md:text-lg font-medium mb-4 md:mb-6">Design Progress</h3>
            <div className="space-y-4 md:space-y-6">
              {[
                { label: 'Style Guide', progress: 100 },
                { label: 'Wireframes', progress: 100 },
                { label: 'UI Concepts', progress: 65 },
                { label: 'Prototypes', progress: 20 }
              ].map((item, i) => (
                <div key={i} className="space-y-1.5 md:space-y-2">
                  <div className="flex justify-between text-[9px] md:text-[10px] lg:text-xs">
                    <span className="text-slate-400">{item.label}</span>
                    <span className="text-indigo-400 font-medium">{item.progress}%</span>
                  </div>
                  <div className="w-full h-1 md:h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="glass-card p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl">
            <h3 className="text-base md:text-lg font-medium mb-3 md:mb-5">Brand Assets</h3>
            <div className="space-y-2 md:space-y-3">
              {['Logo_Final.svg', 'Style_Guide_v1.pdf', 'Typography_Specs.txt'].map((file, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 md:p-3 bg-white/5 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer group">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0">
                    <FileText className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-500 group-hover:text-indigo-400 transition-colors shrink-0" />
                    <span className="text-[10px] md:text-[11px] lg:text-xs text-slate-400 group-hover:text-slate-200 transition-colors truncate">{file}</span>
                  </div>
                  <Download className="w-2.5 h-2.5 md:w-3 md:h-3 text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
