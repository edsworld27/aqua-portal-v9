import { LayoutDashboard, Users, Briefcase, MessageSquare, UserCog, History, ShieldAlert, Compass, FileText, Palette, Code2, Monitor, Sparkles, LayoutGrid, HelpCircle, Link2, FolderOpen, Database, CreditCard, Settings } from 'lucide-react';
import { PortalView, AppUser, Client } from '../types';

export interface SidebarItemConfig {
  id: string;
  label: string;
  icon: any;
  view: PortalView | string;
  badge?: string | number;
  section?: string;
  onClick: () => void;
  active: boolean;
}

// Data-driven configuration
const LOADOUTS = {
  discovery: {
    'Client Portal': [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
      { id: 'discovery-dashboard', label: 'Discovery Dashboard', icon: Compass, view: 'discovery-dashboard' },
      { id: 'onboarding', label: 'Discovery Form', icon: FileText, view: 'onboarding' },
      { id: 'aqua-ai', label: 'Aqua AI', icon: Sparkles, view: 'aqua-ai' },
      { id: 'resources', label: 'Resources', icon: FolderOpen, view: 'resources' },
    ],
    'Support & Settings': [
      { id: 'support', label: 'Support & Help', icon: HelpCircle, view: 'support' },
      { id: 'your-plan', label: 'Your Plan', icon: CreditCard, view: 'your-plan' },
      { id: 'settings', label: 'Settings', icon: Settings, view: 'data-hub' },
      { id: 'configurator', label: 'Configurator', icon: Settings, view: 'configurator' },
    ]
  },
  design: {
    'Client Portal': [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
      { id: 'design-dashboard', label: 'Design Dashboard', icon: Palette, view: 'design-dashboard' },
      { id: 'collaboration', label: 'Collaboration', icon: Monitor, view: 'collaboration' },
      { id: 'aqua-ai', label: 'Aqua AI', icon: Sparkles, view: 'aqua-ai' },
      { id: 'resources', label: 'Resources', icon: FolderOpen, view: 'resources' },
    ],
    'Support & Settings': [
      { id: 'support', label: 'Support & Help', icon: HelpCircle, view: 'support' },
      { id: 'your-plan', label: 'Your Plan', icon: CreditCard, view: 'your-plan' },
      { id: 'settings', label: 'Settings', icon: Settings, view: 'data-hub' },
      { id: 'configurator', label: 'Configurator', icon: Settings, view: 'configurator' },
    ]
  },
  development: {
    'Client Portal': [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, view: 'dashboard' },
      { id: 'dev-dashboard', label: 'Dev Dashboard', icon: Code2, view: 'dev-dashboard' },
      { id: 'collaboration', label: 'Collaboration', icon: Monitor, view: 'collaboration' },
      { id: 'aqua-ai', label: 'Aqua AI', icon: Sparkles, view: 'aqua-ai' },
      { id: 'resources', label: 'Resources', icon: FolderOpen, view: 'resources' },
    ],
    'Support & Settings': [
      { id: 'support', label: 'Support & Help', icon: HelpCircle, view: 'support' },
      { id: 'your-plan', label: 'Your Plan', icon: CreditCard, view: 'your-plan' },
      { id: 'settings', label: 'Settings', icon: Settings, view: 'data-hub' },
      { id: 'configurator', label: 'Configurator', icon: Settings, view: 'configurator' },
    ]
  },
  live: {
    'Client Portal': [
      { id: 'dashboard', label: 'Live Dashboard', icon: LayoutDashboard, view: 'dashboard' },
      { id: 'aqua-ai', label: 'Aqua AI', icon: Sparkles, view: 'aqua-ai' },
      { id: 'resources', label: 'Resources', icon: FolderOpen, view: 'resources' },
    ],
    'Support & Settings': [
      { id: 'support', label: 'Support & Help', icon: HelpCircle, view: 'support' },
      { id: 'your-plan', label: 'Your Plan', icon: CreditCard, view: 'your-plan' },
      { id: 'settings', label: 'Settings', icon: Settings, view: 'data-hub' },
      { id: 'configurator', label: 'Configurator', icon: Settings, view: 'configurator' },
    ]
  }
};

export const getSidebarItems = (params: {
  currentUser: AppUser,
  activeClient: Client | undefined,
  portalView: PortalView | string,
  clients: Client[],
  projects: any[],
  tickets: any[],
  isAgencyRole: boolean,
  impersonatingClientId: string | null,
  hasPermission: (view: PortalView) => boolean,
  handleViewChange: (view: PortalView | string) => void,
  setShowEmployeeManagementModal: (show: boolean) => void,
  setShowAppLauncherModal: (show: boolean) => void,
  sidebarCollapsed: boolean
}): { section: string, items: SidebarItemConfig[] }[] => {
  const {
    currentUser,
    activeClient,
    portalView,
    clients,
    projects,
    tickets,
    isAgencyRole,
    impersonatingClientId,
    hasPermission,
    handleViewChange,
    setShowEmployeeManagementModal,
    setShowAppLauncherModal
  } = params;
  
  const sections: { section: string, items: SidebarItemConfig[] }[] = [];

  if (isAgencyRole && !impersonatingClientId) {
    // Agency Workspace
    const agencyItems: SidebarItemConfig[] = [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, view: 'agency-hub', onClick: () => handleViewChange('agency-hub'), active: portalView === 'agency-hub' },
      { id: 'clients', label: 'Clients', icon: Users, view: 'agency-clients', onClick: () => handleViewChange('agency-clients'), active: portalView === 'agency-clients', badge: clients.length },
      { id: 'projects', label: 'Projects', icon: Briefcase, view: 'project-hub', onClick: () => handleViewChange('project-hub'), active: portalView === 'project-hub', badge: projects.length },
      { id: 'inbox', label: 'Inbox', icon: MessageSquare, view: 'inbox', onClick: () => handleViewChange('inbox'), active: portalView === 'inbox', badge: tickets.filter(t => t.status === 'Open').length },
      { id: 'team', label: 'Team', icon: UserCog, view: 'team', onClick: () => setShowEmployeeManagementModal(true), active: false },
    ];
    sections.push({ section: 'Agency Workspace', items: agencyItems });

    // Founder Tools
    if (currentUser?.role === 'Founder') {
      const founderItems: SidebarItemConfig[] = [
        { id: 'activity', label: 'Global Activity', icon: History, view: 'global-activity', onClick: () => handleViewChange('global-activity'), active: portalView === 'global-activity' },
        { id: 'ai-monitor', label: 'AI Monitor', icon: ShieldAlert, view: 'ai-sessions', onClick: () => handleViewChange('ai-sessions'), active: portalView === 'ai-sessions' },
        { id: 'agency-configurator', label: 'Agency Configurator', icon: Settings, view: 'agency-configurator', onClick: () => handleViewChange('agency-configurator'), active: portalView === 'agency-configurator' },
      ];
      sections.push({ section: 'Founder Tools', items: founderItems });
    }
  } else if (activeClient) {
    // Client-Facing
    const stage = activeClient.stage as keyof typeof LOADOUTS;
    const loadout = LOADOUTS[stage];

    if (loadout) {
      Object.entries(loadout).forEach(([sectionTitle, items]) => {
        sections.push({
          section: sectionTitle,
          items: items.map(item => ({
            ...item,
            onClick: () => handleViewChange(item.view),
            active: portalView === item.view
          }))
        });
      });
    }
  }

  return sections;
};
