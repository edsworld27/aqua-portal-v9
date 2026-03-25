import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, GripVertical, CheckCircle2, LayoutTemplate, Link as LinkIcon, Save, Layout, Shield } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { CustomSidebarLink, AgencyTemplate } from '../../types';
import { PageBuilder } from './PageBuilder';
import { RoleBuilder } from './RoleBuilder';

const PREDEFINED_TEMPLATES: AgencyTemplate[] = [
  {
    id: 't1',
    name: 'Standard Agency',
    description: 'The default setup for most digital agencies.',
    features: ['CRM', 'Project Management', 'Support Tickets'],
    sidebarLinks: [
      { id: 'l1', label: 'Dashboard', iconName: 'LayoutDashboard', view: 'dashboard', roles: ['Founder', 'AgencyManager', 'AgencyEmployee', 'ClientOwner'], order: 1 },
      { id: 'l2', label: 'Clients', iconName: 'Users', view: 'agency-clients', roles: ['Founder', 'AgencyManager'], order: 2 },
      { id: 'l3', label: 'Projects', iconName: 'Briefcase', view: 'project-hub', roles: ['Founder', 'AgencyManager', 'AgencyEmployee'], order: 3 },
    ]
  },
  {
    id: 't2',
    name: 'SaaS Provider',
    description: 'Optimized for software-as-a-service companies.',
    features: ['User Management', 'Subscription Billing', 'API Logs'],
    sidebarLinks: [
      { id: 'l4', label: 'Overview', iconName: 'Activity', view: 'dashboard', roles: ['Founder', 'AgencyManager'], order: 1 },
      { id: 'l5', label: 'Subscribers', iconName: 'Users', view: 'agency-clients', roles: ['Founder', 'AgencyManager'], order: 2 },
      { id: 'l6', label: 'System Logs', iconName: 'Terminal', view: 'logs', roles: ['Founder', 'AgencyManager'], order: 3 },
    ]
  }
];

export function AgencyBuilderView() {
  const { customSidebarLinks, setCustomSidebarLinks, activeTemplate, setActiveTemplate, addLog, currentAgency, customPages } = useAppContext();
  const [editingLinks, setEditingLinks] = useState<CustomSidebarLink[]>(customSidebarLinks);
  const [activeTab, setActiveTab] = useState<'navigation' | 'pages' | 'roles'>('navigation');

  React.useEffect(() => {
    setEditingLinks(customSidebarLinks);
  }, [customSidebarLinks]);

  const handleActivateTemplate = (template: AgencyTemplate) => {
    setActiveTemplate(template);
    setCustomSidebarLinks(template.sidebarLinks);
    setEditingLinks(template.sidebarLinks);
    addLog('Template Activated', `Activated ${template.name} template`, 'system');
  };

  const handleAddLink = () => {
    const newLink: CustomSidebarLink = {
      id: `link-${Date.now()}`,
      label: 'New Link',
      iconName: 'Link2',
      view: 'dashboard',
      roles: ['Founder'],
      order: editingLinks.length + 1
    };
    setEditingLinks([...editingLinks, newLink]);
  };

  const handleUpdateLink = (id: string, updates: Partial<CustomSidebarLink>) => {
    setEditingLinks(editingLinks.map(link => link.id === id ? { ...link, ...updates } : link));
  };

  const handleRemoveLink = (id: string) => {
    setEditingLinks(editingLinks.filter(link => link.id !== id));
  };

  const handleSaveLinks = () => {
    setCustomSidebarLinks(editingLinks);
    addLog('Sidebar Updated', 'Custom sidebar links were updated', 'system');
  };

  return (
    <motion.div
      key="agency-builder"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 md:p-10 max-w-6xl mx-auto w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold mb-2">App Builder</h1>
          <p className="text-sm md:text-base text-slate-500">Customize your portal structure, custom pages, and roles.</p>
        </div>
      </div>

      <div className="flex gap-2 md:gap-4 mb-6 md:mb-8 border-b border-white/10 pb-4 overflow-x-auto no-scrollbar">
        <button 
          onClick={() => setActiveTab('navigation')}
          className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl transition-colors whitespace-nowrap text-xs md:text-sm ${activeTab === 'navigation' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
        >
          <LinkIcon className="w-4 h-4" />
          Navigation
        </button>
        <button 
          onClick={() => setActiveTab('pages')}
          className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl transition-colors whitespace-nowrap text-xs md:text-sm ${activeTab === 'pages' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
        >
          <Layout className="w-4 h-4" />
          Custom Pages
        </button>
        <button 
          onClick={() => setActiveTab('roles')}
          className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl transition-colors whitespace-nowrap text-xs md:text-sm ${activeTab === 'roles' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
        >
          <Shield className="w-4 h-4" />
          Roles
        </button>
      </div>

      {activeTab === 'pages' && <PageBuilder />}
      {activeTab === 'roles' && <RoleBuilder />}
      
      {activeTab === 'navigation' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-10">
          {/* Templates Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-card p-5 md:p-6 rounded-2xl md:rounded-3xl">
              <h2 className="text-lg md:text-xl font-medium mb-5 md:mb-6 flex items-center gap-2">
                <LayoutTemplate className="w-5 h-5 text-indigo-400" />
                Templates
              </h2>
              <div className="space-y-4">
                {PREDEFINED_TEMPLATES.map(template => (
                  <div 
                    key={template.id} 
                    className={`p-4 rounded-xl md:rounded-2xl border transition-all ${activeTemplate?.id === template.id ? 'bg-indigo-600/20 border-indigo-500/50' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                  >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-white text-sm md:text-base">{template.name}</h3>
                    {activeTemplate?.id === template.id && (
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-indigo-400" />
                    )}
                  </div>
                  <p className="text-[10px] md:text-xs text-slate-400 mb-4">{template.description}</p>
                  <button
                    onClick={() => handleActivateTemplate(template)}
                    className={`w-full py-2 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-colors ${activeTemplate?.id === template.id ? 'bg-indigo-600 text-white' : 'bg-white/10 text-slate-300 hover:bg-white/20'}`}
                  >
                    {activeTemplate?.id === template.id ? 'Active' : 'Activate'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Builder Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-5 md:p-6 rounded-2xl md:rounded-3xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h2 className="text-lg md:text-xl font-medium flex items-center gap-2">
                <LinkIcon className="w-5 h-5 text-emerald-400" />
                Sidebar Navigation
              </h2>
              <div className="flex gap-2 md:gap-3">
                <button 
                  onClick={handleAddLink}
                  className="flex-1 sm:flex-none px-3 md:px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs md:text-sm font-medium rounded-lg md:rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Add Link
                </button>
                <button 
                  onClick={handleSaveLinks}
                  className="flex-1 sm:flex-none px-3 md:px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs md:text-sm font-medium rounded-lg md:rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Save className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Save Changes
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {editingLinks.length === 0 ? (
                <div className="text-center py-10 text-slate-500 border border-dashed border-white/10 rounded-xl md:rounded-2xl text-sm">
                  No custom links defined. Add one or activate a template.
                </div>
              ) : (
                editingLinks.sort((a, b) => a.order - b.order).map((link, index) => (
                  <div key={link.id} className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl md:rounded-2xl group relative">
                    <div className="hidden md:block cursor-grab active:cursor-grabbing text-slate-600 hover:text-slate-400">
                      <GripVertical className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-500 mb-1 block">Label</label>
                        <input 
                          type="text" 
                          value={link.label}
                          onChange={(e) => handleUpdateLink(link.id, { label: e.target.value })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 md:py-2 text-xs md:text-sm text-white focus:border-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-500 mb-1 block">Icon Name</label>
                        <input 
                          type="text" 
                          value={link.iconName}
                          onChange={(e) => handleUpdateLink(link.id, { iconName: e.target.value })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 md:py-2 text-xs md:text-sm text-white focus:border-indigo-500 outline-none"
                          placeholder="e.g. Users, Layout"
                        />
                      </div>
                      <div className="sm:col-span-2 lg:col-span-1">
                        <label className="text-[9px] md:text-[10px] uppercase tracking-widest text-slate-500 mb-1 block">Target View</label>
                        <select 
                          value={link.view}
                          onChange={(e) => handleUpdateLink(link.id, { view: e.target.value })}
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 md:py-2 text-xs md:text-sm text-white focus:border-indigo-500 outline-none"
                        >
                          <optgroup label="Standard Views">
                            <option value="dashboard">Dashboard</option>
                            <option value="agency-clients">Clients</option>
                            <option value="project-hub">Projects</option>
                            <option value="inbox">Inbox</option>
                            <option value="employee-management">Team</option>
                            <option value="global-activity">Activity Logs</option>
                            <option value="ai-sessions">AI Monitor</option>
                            <option value="agency-builder">App Builder</option>
                          </optgroup>
                          {customPages.length > 0 && (
                            <optgroup label="Custom Pages">
                              {customPages.map(page => (
                                <option key={page.id} value={page.slug}>{page.title}</option>
                              ))}
                            </optgroup>
                          )}
                        </select>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleRemoveLink(link.id)}
                      className="absolute top-2 right-2 md:static p-2 text-slate-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        </div>
      )}
    </motion.div>
  );
}
