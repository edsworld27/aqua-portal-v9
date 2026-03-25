import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface SupportTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  setShowTicketModal: (show: boolean) => void;
}

export function SupportTicketsModal({ isOpen, onClose, setShowTicketModal }: SupportTicketsModalProps) {
  const { tickets } = useAppContext();

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
          className="relative w-full max-w-5xl bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
            <h2 className="text-xl font-semibold">Support Tickets</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-8 md:p-10 overflow-y-auto max-h-[80vh] custom-scrollbar">
            <div className="flex justify-end mb-8">
              <button 
                onClick={() => setShowTicketModal(true)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Ticket
              </button>
            </div>

            <div className="glass-card rounded-3xl overflow-hidden border border-white/5">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-500 text-xs uppercase tracking-widest border-b border-white/5 bg-white/[0.02]">
                      <th className="px-8 py-4 font-semibold">ID</th>
                      <th className="px-8 py-4 font-semibold">Ticket Details</th>
                      <th className="px-8 py-4 font-semibold">Type</th>
                      <th className="px-8 py-4 font-semibold">Status</th>
                      <th className="px-8 py-4 font-semibold text-right">Created By</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {tickets.map(ticket => (
                      <tr key={ticket.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-8 py-4 font-medium text-indigo-400 text-sm">{ticket.id}</td>
                        <td className="px-8 py-4">
                          <div className="font-medium group-hover:text-indigo-300 transition-colors">{ticket.title}</div>
                          <div className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${
                            ticket.priority === 'High' ? 'text-red-400' : 
                            ticket.priority === 'Medium' ? 'text-amber-400' : 'text-indigo-400'
                          }`}>
                            {ticket.priority} Priority
                          </div>
                        </td>
                        <td className="px-8 py-4">
                          <span className={`px-3 py-1 text-[9px] font-bold rounded-full uppercase tracking-widest border ${
                            ticket.type === 'client' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-slate-500/10 text-slate-400 border-white/5'
                          }`}>
                            {ticket.type}
                          </span>
                        </td>
                        <td className="px-8 py-4">
                          <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase tracking-widest ${
                            ticket.status === 'Open' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-8 py-4 text-right text-slate-400 text-sm">{ticket.creator}</td>
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
