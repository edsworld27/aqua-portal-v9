import React from 'react';
import { motion } from 'motion/react';
import { Compass, Upload, FileText } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const OnboardingView: React.FC = () => {
  const { clients, setClients, activeClientId } = useAppContext();
  const activeClient = clients.find(c => c.id === activeClientId);

  return (
    <motion.div
      key="onboarding"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 md:p-10 max-w-4xl mx-auto w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">Client Discovery</h2>
          <p className="text-sm md:text-base text-slate-500">Tell us more about your project so we can build the perfect solution.</p>
        </div>
        <div className="flex items-center gap-2 text-indigo-400 font-medium self-start md:self-auto text-sm md:text-base">
          <Compass className="w-4 h-4 md:w-5 md:h-5" />
          Onboarding Phase
        </div>
      </div>

      <div className="space-y-6 md:space-y-8">
        <section className="glass-card p-5 md:p-8 rounded-2xl md:rounded-3xl">
          <h3 className="text-lg md:text-xl font-medium mb-5 md:mb-6">Discovery Questionnaire</h3>
          <div className="space-y-5 md:space-y-6">
            {[
              { id: 'q1', q: 'What is the primary goal of your new website?' },
              { id: 'q2', q: 'Who is your target audience?' },
              { id: 'q3', q: 'Are there any specific websites you admire for their design or functionality?' },
              { id: 'q4', q: 'What are the core features you need (e.g., e-commerce, blog, booking)?' }
            ].map((item, i) => (
              <div key={item.id} className="space-y-2">
                <label className="text-xs md:text-sm font-medium text-slate-300">{i + 1}. {item.q}</label>
                <textarea 
                  className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 text-xs md:text-sm outline-none focus:border-indigo-500/50 transition-colors min-h-[80px] md:min-h-[100px]"
                  placeholder="Type your answer here..."
                  value={activeClient?.discoveryAnswers?.[item.id] || ''}
                  onChange={(e) => {
                    if (!activeClient) return;
                    const newAnswers = { ...activeClient.discoveryAnswers, [item.id]: e.target.value };
                    setClients(prev => prev.map(c => c.id === activeClient.id ? { ...c, discoveryAnswers: newAnswers } : c));
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 md:mt-8 flex justify-end">
            <button className="w-full sm:w-auto px-8 py-2.5 md:py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl md:rounded-2xl text-sm font-semibold transition-all shadow-lg shadow-indigo-600/20">
              Save Progress
            </button>
          </div>
        </section>

        <section className="glass-card p-5 md:p-8 rounded-2xl md:rounded-3xl">
          <h3 className="text-lg md:text-xl font-medium mb-5 md:mb-6 flex items-center gap-3">
            <Upload className="w-5 h-5 text-indigo-400" />
            Resource Upload
          </h3>
          <p className="text-xs md:text-sm text-slate-500 mb-5 md:mb-6">Upload logos, brand guidelines, or any other assets we should use.</p>
          
          <div className="border-2 border-dashed border-white/10 rounded-2xl md:rounded-3xl p-8 md:p-12 text-center hover:border-indigo-500/30 transition-all cursor-pointer group">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-500/10 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="w-6 h-6 md:w-8 md:h-8 text-indigo-400" />
            </div>
            <h4 className="font-medium mb-1 text-sm md:text-base">Click or drag to upload</h4>
            <p className="text-[10px] md:text-xs text-slate-500">Support for PDF, PNG, JPG, SVG (Max 20MB)</p>
          </div>

          <div className="mt-6 md:mt-8 space-y-2 md:space-y-3">
            {activeClient?.resources.map((res, i) => (
              <div key={res} className="flex items-center justify-between p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-slate-400" />
                  <span className="text-xs md:text-sm truncate max-w-[150px] sm:max-w-none">{res}</span>
                </div>
                <button className="text-[10px] md:text-xs text-red-400 hover:text-red-300 transition-colors">Remove</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default OnboardingView;
