import React from 'react';
import { motion } from 'motion/react';
import { PlusCircle, Building2, Edit2 } from 'lucide-react';
import { StageDropdown } from '../components/StageDropdown';
import { ClientStage } from '../types';

interface AgencyClientsViewProps {
  clients: any[];
  setShowAddClientModal: (show: boolean) => void;
  handleImpersonate: (clientId: string) => void;
  onEditClient: (client: any) => void;
  onUpdateClientStage: (clientId: string, stage: ClientStage) => void;
}

export function AgencyClientsView({ clients, setShowAddClientModal, handleImpersonate, onEditClient, onUpdateClientStage }: AgencyClientsViewProps) {
  return (
    <motion.div
      key="agency-clients"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="h-full w-full p-4 md:p-6 lg:p-10 overflow-y-auto custom-scrollbar"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">Agency Internal CRM</h2>
          <p className="text-sm md:text-base text-slate-400">View and impersonate clients to manage their workspaces and logs.</p>
        </div>
        <button 
          onClick={() => setShowAddClientModal(true)}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl md:rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98] text-xs md:text-base"
        >
          <PlusCircle className="w-4 h-4 md:w-5 md:h-5" />
          Onboard Client
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {clients.map(client => (
          <div key={client.id} className="glass-card p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group flex flex-col">
            <div className="flex items-start justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Building2 className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base md:text-xl font-semibold mb-1 truncate group-hover:text-indigo-400 transition-colors">{client.name}</h3>
                  <StageDropdown currentStage={client.stage} onUpdate={(stage) => onUpdateClientStage(client.id, stage)} />
                </div>
              </div>
              <button 
                onClick={() => onEditClient(client)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Edit2 className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
              <div className="flex items-center justify-between text-[11px] md:text-sm py-2 border-b border-white/5">
                <span className="text-slate-500">Authorized Access</span>
                <span className="text-slate-300">{client.permissions.length} Modules</span>
              </div>
              <div className="flex items-center justify-between text-[11px] md:text-sm py-2">
                <span className="text-slate-500">Contact</span>
                <span className="text-slate-300 truncate ml-4">{client.email}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 md:gap-3 mt-auto">
              <button
                onClick={() => handleImpersonate(client.id)}
                className="flex-1 py-3 md:py-4 bg-white/5 hover:bg-white/10 rounded-xl md:rounded-2xl text-amber-400 font-bold transition-all flex items-center justify-center gap-2 group-hover:bg-amber-600 group-hover:text-white text-xs md:text-base"
              >
                <Building2 className="w-4 h-4" />
                View Workspace
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
