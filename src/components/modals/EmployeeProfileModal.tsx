import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, ShieldCheck, User, Clock, Settings2 } from 'lucide-react';
import { AppUser } from '../../types';

interface EmployeeProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: { name: string; email: string; avatar: string };
  setUserProfile: (profile: { name: string; email: string; avatar: string }) => void;
  currentUser: AppUser | null;
  isEditingProfile: boolean;
  setIsEditingProfile: (isEditing: boolean) => void;
  users: AppUser[];
  setUsers: (users: AppUser[]) => void;
  addLog: (action: string, details: string, type: 'auth' | 'impersonation' | 'action' | 'system') => void;
}

export function EmployeeProfileModal({
  isOpen,
  onClose,
  userProfile,
  setUserProfile,
  currentUser,
  isEditingProfile,
  setIsEditingProfile,
  users,
  setUsers,
  addLog
}: EmployeeProfileModalProps) {
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
            <h2 className="text-xl font-semibold">Employee Profile</h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-8 md:p-10 overflow-y-auto max-h-[80vh] custom-scrollbar">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-12 text-center md:text-left">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-[1.5rem] md:rounded-[2rem] bg-indigo-600 text-white flex items-center justify-center text-3xl md:text-4xl font-bold shadow-2xl shadow-indigo-600/30">
                {userProfile.avatar}
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold mb-2">{userProfile.name}</h2>
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-slate-400 text-sm md:text-base">
                  <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {userProfile.email}</span>
                  <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> {currentUser?.role}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="glass-card p-8 rounded-[2.5rem] space-y-6">
                <h3 className="text-xl font-medium flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-400" />
                  General Information
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Full Name</label>
                    <input
                      type="text"
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500 transition-all"
                      disabled={!isEditingProfile}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Bio / Role Description</label>
                    <textarea
                      rows={3}
                      value={currentUser?.bio || ''}
                      onChange={(e) => setUsers(users.map(u => u.id === currentUser?.id ? { ...u, bio: e.target.value } : u))}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500 transition-all resize-none"
                      disabled={!isEditingProfile}
                      placeholder="Describe your role and impact..."
                    />
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 rounded-[2.5rem] space-y-6">
                <h3 className="text-xl font-medium flex items-center gap-2">
                  <Clock className="w-5 h-5 text-emerald-400" />
                  Availability
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Working Hours</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <input
                        type="text"
                        value={currentUser?.workingHours || '9:00 AM - 5:00 PM'}
                        onChange={(e) => setUsers(users.map(u => u.id === currentUser?.id ? { ...u, workingHours: e.target.value } : u))}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500 transition-all"
                        disabled={!isEditingProfile}
                        placeholder="e.g. Mon-Fri, 9-5"
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                    <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">Status</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-sm font-medium">Currently Online</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-4">
              {isEditingProfile ? (
                <>
                  <button
                    onClick={() => setIsEditingProfile(false)}
                    className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setIsEditingProfile(false);
                      addLog('Profile Updated', 'User updated their profile information', 'action');
                    }}
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/20"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold transition-all flex items-center gap-2"
                >
                  <Settings2 className="w-4 h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
