import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Settings, Save, Palette, Layout } from 'lucide-react';

export const AgencyConfiguratorView: React.FC = () => {
  const { masterConfig, setMasterConfig } = useAppContext();
  const [config, setConfig] = useState(masterConfig);

  const handleSave = () => {
    setMasterConfig(config);
    alert('Configuration saved!');
  };

  return (
    <div className="p-10 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2 className="text-3xl font-semibold">Agency Configurator</h2>
          <p className="text-slate-400">Manage your agency's master configuration.</p>
        </div>
        <button 
          onClick={handleSave}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-semibold transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-6 rounded-3xl border border-white/10">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Layout className="w-5 h-5 text-indigo-400" />
            Agency Details
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Agency Name</label>
              <input 
                type="text" 
                value={config.agency.name}
                onChange={(e) => setConfig({...config, agency: {...config.agency, name: e.target.value}})}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-white"
              />
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-white/10">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-400" />
            Theme Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Primary Color</label>
              <input 
                type="color" 
                value={config.theme.primaryColor}
                onChange={(e) => setConfig({...config, theme: {...config.theme, primaryColor: e.target.value}})}
                className="w-full h-10 bg-slate-900 border border-slate-700 rounded-xl px-2 py-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
