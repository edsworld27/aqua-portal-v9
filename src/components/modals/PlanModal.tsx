import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Download } from 'lucide-react';

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PlanModal({ isOpen, onClose }: PlanModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
            <h2 className="text-xl font-semibold">Your Plan</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-8 md:p-10 overflow-y-auto max-h-[80vh] custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-1 glass-card p-8 rounded-3xl bg-indigo-600/10 border-indigo-500/20">
                <div className="text-slate-400 text-sm mb-2">Next Payment Due</div>
                <div className="text-4xl font-bold mb-4">£249.00</div>
                <div className="flex items-center gap-2 text-indigo-400 font-medium">
                  <Calendar className="w-4 h-4" />
                  April 15, 2026
                </div>
              </div>

              <div className="lg:col-span-2 glass-card p-8 rounded-3xl flex items-center justify-between">
                <div>
                  <div className="text-slate-400 text-sm mb-2">Current Plan</div>
                  <div className="text-2xl font-semibold">Premium Enterprise</div>
                </div>
                <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors font-medium">
                  Manage Plan
                </button>
              </div>
            </div>

            <div className="glass-card rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <h3 className="font-medium">Payment History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-500 text-xs uppercase tracking-widest border-b border-white/5">
                      <th className="px-8 py-4 font-semibold">Invoice</th>
                      <th className="px-8 py-4 font-semibold">Date</th>
                      <th className="px-8 py-4 font-semibold">Amount</th>
                      <th className="px-8 py-4 font-semibold">Status</th>
                      <th className="px-8 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { id: 'INV-001', date: 'Mar 15, 2026', amount: '£249.00', status: 'Paid' },
                      { id: 'INV-002', date: 'Feb 15, 2026', amount: '£249.00', status: 'Paid' },
                      { id: 'INV-003', date: 'Jan 15, 2026', amount: '£249.00', status: 'Paid' }
                    ].map(inv => (
                      <tr key={inv.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-8 py-4 font-medium">{inv.id}</td>
                        <td className="px-8 py-4 text-slate-400">{inv.date}</td>
                        <td className="px-8 py-4">{inv.amount}</td>
                        <td className="px-8 py-4">
                          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-widest">
                            {inv.status}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-indigo-400">
                            <Download className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
