import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserPlus, UserCog, Edit2, Shield, Trash2, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { AppUser } from '../../types';

interface EmployeeManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: () => void;
  onDeleteUser: (id: number) => void;
}

export function EmployeeManagementModal({
  isOpen,
  onClose,
  onAddUser,
  onDeleteUser,
}: EmployeeManagementModalProps) {
  const { users, setUsers, currentAgency, addLog } = useAppContext();
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);

  if (!isOpen) return null;

  const agencyUsers = users.filter(u => u.role.includes('Agency') || u.role === 'Founder');

  const handleUpdateUserRole = (userId: number, customRoleId: string) => {
    const role = currentAgency?.roles.find(r => r.id === customRoleId);
    if (role) {
      setUsers(users.map(u => u.id === userId ? { ...u, customRoleId, permissions: role.permissions } : u));
      addLog('User Role Updated', `Updated role for user ID ${userId} to ${role.name}`, 'system');
    } else if (customRoleId === 'none') {
      setUsers(users.map(u => u.id === userId ? { ...u, customRoleId: undefined } : u));
    }
    setEditingUser(null);
  };

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
            <h2 className="text-xl font-semibold">Team Management</h2>
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
                onClick={onAddUser}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Add Member
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {agencyUsers.map(user => {
                const customRole = currentAgency?.roles.find(r => r.id === user.customRoleId);
                
                return (
                  <div key={user.id} className="glass-card p-6 rounded-2xl flex items-center justify-between gap-4 hover:border-white/10 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-lg">
                        {user.avatar || user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-slate-500">
                          {customRole ? customRole.name : user.role} • {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right mr-4">
                        <div className="text-[10px] uppercase tracking-widest font-bold text-slate-600 mb-1">Permissions</div>
                        <div className="flex gap-1 justify-end">
                          {(user.permissions || []).slice(0, 2).map((p, i) => (
                            <span key={`${p}-${i}`} className="px-2 py-0.5 bg-white/5 border border-white/5 rounded-md text-[9px] text-slate-400">{p}</span>
                          ))}
                          {(user.permissions || []).length > 2 && <span className="text-[9px] text-slate-500">+{(user.permissions || []).length - 2}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setEditingUser(user)}
                          className="p-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => onDeleteUser(user.id)}
                          className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
