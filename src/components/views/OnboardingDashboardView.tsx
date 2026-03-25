import React from 'react';
import { motion } from 'motion/react';
import { Zap, CheckCircle2, FileText, Users, Check } from 'lucide-react';
import { DynamicRenderer, ComponentConfig } from '../DynamicRenderer';

const OnboardingDashboardView: React.FC = () => {
  const widgetConfig: ComponentConfig[] = [
    { component: 'DashboardWidget', props: { icon: CheckCircle2, label: "Setup Progress", value: "45%", trend: "+15%", color: "indigo" } },
    { component: 'DashboardWidget', props: { icon: FileText, label: "Docs Signed", value: "3/4", trend: "Pending 1", color: "emerald" } },
    { component: 'DashboardWidget', props: { icon: Users, label: "Team Assigned", value: "5 Members", trend: "Active", color: "amber" } }
  ];

  return (
    <motion.div
      key="onboarding-dashboard"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 md:p-6 lg:p-10 max-w-6xl mx-auto w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 mb-8 md:mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-1 md:mb-2">Onboarding Dashboard</h2>
          <p className="text-xs md:text-sm lg:text-base text-slate-500">Welcome to the agency! Let's get your project started.</p>
        </div>
        <div className="flex items-center gap-2 text-indigo-400 font-medium bg-indigo-400/10 px-3 md:px-4 py-1.5 md:py-2 rounded-xl border border-indigo-400/20 self-start md:self-auto text-xs md:text-sm lg:text-base">
          <Zap className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
          Setup Phase
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
        <DynamicRenderer config={widgetConfig} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <section className="glass-card p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl">
            <h3 className="text-lg md:text-xl font-medium mb-4 md:mb-6">Onboarding Checklist</h3>
            <div className="space-y-3 md:space-y-4">
              {[
                { task: 'Sign Service Agreement', status: 'Completed' },
                { task: 'Complete Discovery Questionnaire', status: 'Completed' },
                { task: 'Schedule Kickoff Call', status: 'In Progress' },
                { task: 'Upload Brand Assets', status: 'Pending' }
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 md:gap-4 min-w-0">
                    <div className={`w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      t.status === 'Completed' ? 'bg-emerald-500 border-emerald-500' : 'border-white/20'
                    }`}>
                      {t.status === 'Completed' && <Check className="w-2 md:w-2.5 lg:w-3 md:h-2.5 lg:h-3 text-white" />}
                    </div>
                    <span className={`text-xs md:text-sm font-medium truncate ${t.status === 'Completed' ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                      {t.task}
                    </span>
                  </div>
                  <span className={`text-[8px] md:text-[9px] lg:text-[10px] font-bold uppercase tracking-widest flex-shrink-0 ml-2 ${
                    t.status === 'Completed' ? 'text-emerald-400' :
                    t.status === 'In Progress' ? 'text-amber-400' : 'text-slate-500'
                  }`}>
                    {t.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6 md:space-y-8">
          <DynamicRenderer config={[{ component: 'AIChatbot', props: {} }]} />
          <section className="glass-card p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl">
            <h3 className="text-base md:text-lg font-medium mb-4 md:mb-6">Your Success Team</h3>
            <div className="space-y-4 md:space-y-6">
              {[
                { name: 'Sarah Jenkins', role: 'Account Manager', contact: 'sarah@agency.com' },
                { name: 'Michael Chen', role: 'Project Lead', contact: 'michael@agency.com' }
              ].map((m, i) => (
                <div key={i} className="p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-xs md:text-sm shrink-0">
                      {m.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs md:text-sm font-medium truncate">{m.name}</div>
                      <div className="text-[9px] md:text-[10px] text-slate-500 truncate">{m.role}</div>
                    </div>
                  </div>
                  <a href={`mailto:${m.contact}`} className="text-[10px] md:text-xs text-indigo-400 hover:text-indigo-300 transition-colors block text-center py-2 bg-white/5 rounded-lg md:rounded-xl">
                    Contact {m.name.split(' ')[0]}
                  </a>
                </div>
              ))}
            </div>
          </section>

          <div className="p-5 md:p-8 rounded-2xl md:rounded-3xl bg-indigo-600/10 border border-indigo-500/20">
            <h4 className="font-semibold mb-2 text-sm md:text-base">Need Help?</h4>
            <p className="text-xs md:text-sm text-slate-400 mb-4">Our support team is available 24/7 to assist you with onboarding.</p>
            <button className="w-full py-2.5 md:py-3 bg-indigo-600 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold hover:bg-indigo-700 transition-all">Contact Support</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OnboardingDashboardView;
