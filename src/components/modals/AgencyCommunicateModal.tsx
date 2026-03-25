import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, PlusCircle, Users, Settings, MessageCircle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface AgencyCommunicateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AgencyCommunicateModal({ isOpen, onClose }: AgencyCommunicateModalProps) {
  const { users, currentUser, agencyMessages, setAgencyMessages } = useAppContext();

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
          className="relative w-full max-w-5xl bg-slate-900 border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden h-[80vh] flex flex-col"
        >
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
            <h2 className="text-xl font-semibold">Agency Communication</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex-1 flex overflow-hidden">
            {/* Channel Sidebar */}
            <div className="w-64 border-r border-white/5 bg-white/[0.02] flex-col shrink-0 hidden md:flex">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <h3 className="font-semibold">Channels</h3>
                <PlusCircle className="w-4 h-4 text-slate-500 cursor-pointer hover:text-white" />
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {['general', 'design', 'development', 'client-feedback'].map(channel => (
                  <div key={channel} className={`px-4 py-2 rounded-xl text-sm cursor-pointer transition-all ${channel === 'general' ? 'bg-indigo-600/20 text-indigo-400 font-medium' : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'}`}>
                    # {channel}
                  </div>
                ))}
                <div className="pt-6 pb-2 text-[10px] uppercase tracking-widest font-bold text-slate-600 px-4">Direct Messages</div>
                {users.filter(u => u.id !== currentUser?.id).map(u => (
                  <div key={u.id} className="px-4 py-2 rounded-xl text-sm cursor-pointer text-slate-500 hover:bg-white/5 hover:text-slate-300 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    {u.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col min-w-0">
              <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
                <div className="flex items-center gap-3 overflow-hidden">
                  <h3 className="font-semibold shrink-0"># general</h3>
                  <span className="text-xs text-slate-500 truncate hidden sm:inline">Company-wide announcements and talk</span>
                </div>
                <div className="flex items-center gap-4 text-slate-400">
                  <Users className="w-4 h-4 cursor-pointer hover:text-white" />
                  <Settings className="w-4 h-4 cursor-pointer hover:text-white" />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                {agencyMessages.map(msg => {
                  const sender = users.find(u => u.id === msg.senderId);
                  return (
                    <div key={msg.id} className="flex gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold shrink-0 text-base">
                        {sender?.avatar}
                      </div>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-sm truncate">{sender?.name}</span>
                          <span className="text-[10px] text-slate-600 shrink-0">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed font-light break-words">{msg.text}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-6 border-t border-white/5">
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Message #general"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600 text-base"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value) {
                        setAgencyMessages([...agencyMessages, { 
                          id: Date.now().toString(), 
                          senderId: currentUser?.id || 1, 
                          text: e.currentTarget.value, 
                          timestamp: new Date().toISOString() 
                        }]);
                        e.currentTarget.value = '';
                      }
                    }}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-500">
                    <PlusCircle className="w-5 h-5 cursor-pointer hover:text-white hidden sm:block" />
                    <MessageCircle className="w-5 h-5 cursor-pointer hover:text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
