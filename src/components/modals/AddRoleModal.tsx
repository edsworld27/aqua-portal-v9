import React from 'react';
import { motion } from 'motion/react';
import { XCircle, ShieldCheck, UserCog, LayoutDashboard, Database, Globe, Briefcase, CheckSquare, LayoutGrid, Ticket, Sparkles, History } from 'lucide-react';
import { PortalView } from '../../types';

interface AddRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  newRoleForm: { name: string; permissions: PortalView[] };
  setNewRoleForm: React.Dispatch<React.SetStateAction<{ name: string; permissions: PortalView[] }>>;
  handleCreateRole: () => void;
}

export function AddRoleModal({
  isOpen,
  onClose,
  newRoleForm,
  setNewRoleForm,
  handleCreateRole
}: AddRoleModalProps) {
  if (!isOpen) return null;

  const toggleRolePermission = (permId: PortalView) => {
    setNewRoleForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter(p => p !== permId)
        : [...prev.permissions, permId]
    }));
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl glass-card rounded-2xl md:rounded-[2.5rem] p-6 md:p-10 overflow-hidden max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-indigo-600/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-semibold">Create Custom Role</h3>
              <p className="text-xs md:text-sm text-slate-500">Define a unique role and its associated system permissions.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <XCircle className="w-5 h-5 md:w-6 md:h-6 text-slate-500" />
          </button>
        </div>

        <div className="space-y-6 md:space-y-10">
          <div className="space-y-2 md:space-y-3">
            <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">Role Designation</label>
            <div className="relative group">
              <UserCog className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-600 group-focus-within:text-indigo-400 transition-colors" />
              <input 
                type="text" 
                placeholder="e.g. Technical Operator"
                value={newRoleForm.name}
                onChange={(e) => setNewRoleForm({...newRoleForm, name: e.target.value})}
                className="w-full pl-10 md:pl-12 pr-4 py-4 md:py-5 bg-white/5 border border-white/10 rounded-xl md:rounded-[1.5rem] outline-none focus:border-indigo-500 transition-all text-lg md:text-xl font-bold placeholder:text-slate-700"
              />
            </div>
          </div>

          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">Assign Feature Permissions</label>
              <button 
                onClick={() => {
                  const allPerms: PortalView[] = ['dashboard', 'crm', 'website', 'resources', 'support', 'agency-hub', 'project-hub', 'task-board', 'employee-management'];
                  setNewRoleForm(prev => ({
                    ...prev,
                    permissions: prev.permissions.length === allPerms.length ? [] : allPerms
                  }));
                }}
                className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 hover:text-indigo-300"
              >
                {newRoleForm.permissions.length > 0 ? 'Clear All' : 'Select All Operations'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              {[
                { id: 'dashboard', label: 'Live Dashboard', icon: LayoutDashboard, desc: 'View core business metrics' },
                { id: 'crm', label: 'CRM Management', icon: Database, desc: 'Manage leads and deals' },
                { id: 'website', label: 'Website Editor', icon: Globe, desc: 'Edit site content and design' },
                { id: 'project-hub', label: 'Project Control', icon: Briefcase, desc: 'Create and manage strategic projects' },
                { id: 'task-board', label: 'Operational Tasks', icon: CheckSquare, desc: 'Manage daily task execution' },
                { id: 'agency-hub', label: 'Operations Hub', icon: LayoutGrid, desc: 'High-level agency overview' },
                { id: 'employee-management', label: 'Team Control', icon: UserCog, desc: 'Manage team members and roles' },
                { id: 'support-tickets', label: 'Support Desk', icon: Ticket, desc: 'Track and resolve support tickets' },
                { id: 'ai-sessions', label: 'AI Monitor', icon: Sparkles, desc: 'Oversee AI assistant interactions' },
                { id: 'logs', label: 'Audit Logs', icon: History, desc: 'View system-wide activity' }
              ].map(perm => (
                <button
                  key={perm.id}
                  onClick={() => toggleRolePermission(perm.id as PortalView)}
                  className={`flex items-center gap-3 md:gap-4 p-4 md:p-5 rounded-xl md:rounded-[1.5rem] border transition-all text-left group ${
                    newRoleForm.permissions.includes(perm.id as PortalView)
                      ? 'bg-indigo-600/10 border-indigo-500/30'
                      : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className={`p-2.5 md:p-3 rounded-xl transition-colors ${
                    newRoleForm.permissions.includes(perm.id as PortalView)
                      ? 'bg-indigo-600/20 text-indigo-400'
                      : 'bg-white/5 text-slate-600'
                  }`}>
                    <perm.icon className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs md:text-sm font-bold mb-0.5 truncate ${
                      newRoleForm.permissions.includes(perm.id as PortalView) ? 'text-indigo-300' : 'text-slate-300'
                    }`}>
                      {perm.label}
                    </div>
                    <div className="text-[9px] md:text-[10px] text-slate-500 font-medium truncate">{perm.desc}</div>
                  </div>
                  <div className={`ml-auto w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${
                    newRoleForm.permissions.includes(perm.id as PortalView)
                      ? 'border-indigo-500 bg-indigo-500 shadow-lg shadow-indigo-600/40 scale-110'
                      : 'border-white/10'
                  }`}>
                    {newRoleForm.permissions.includes(perm.id as PortalView) && <CheckSquare className="w-2.5 h-2.5 md:w-3 h-3 text-white" />}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
            <button 
              onClick={onClose}
              className="w-full sm:flex-1 py-4 md:py-5 bg-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl font-bold text-slate-400 transition-all border border-white/5 text-sm md:text-base"
            >
              Cancel
            </button>
            <button 
              onClick={handleCreateRole}
              disabled={!newRoleForm.name || newRoleForm.permissions.length === 0}
              className={`w-full sm:flex-[2] py-4 md:py-5 rounded-xl md:rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base ${
                !newRoleForm.name || newRoleForm.permissions.length === 0
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 active:scale-[0.98]'
              }`}
            >
              Deploy Workspace Role
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
