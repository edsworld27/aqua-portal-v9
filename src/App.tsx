/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Lock, 
  User, 
  ShieldCheck, 
  ChevronRight, 
  LayoutDashboard, 
  Users, 
  Globe, 
  ChevronLeft, 
  FileText, 
  BarChart3,
  ExternalLink,
  BookOpen,
  Settings,
  LogOut,
  LifeBuoy,
  CreditCard,
  Lightbulb,
  Calendar,
  MessageSquare,
  Star,
  Download,
  Link2,
  Sparkles,
  Send,
  Zap,
  Bell,
  Clock,
  Briefcase,
  Building2,
  HelpCircle,
  Database,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Shield,
  ArrowLeft,
  Play,
  UserPlus,
  Settings2,
  Monitor,
  Layers,
  Compass,
  CheckCircle,
  Circle,
  Upload,
  MessageSquarePlus,
  Layout,
  Activity,
  Palette,
  Code2,
  Ticket,
  History,
  MessageCircle,
  ShieldAlert,
  UserCog,
  UserCircle,
  Mail,
  FolderOpen,
  PlusCircle,
  CheckSquare,
  LayoutGrid,
  Terminal,
  UserCheck,
  X,
  Menu
} from 'lucide-react';
import { getSidebarItems } from './config/sidebar';

import {
  Step,
  ClientStage,
  PortalView,
  Todo,
  ActivityLog,
  Client,
  CustomRole,
  Agency,
  UserRole,
  AppUser,
  LogEntry,
  AppTicket,
  SubStep,
  TaskAttachment,
  Project,
  ProjectTask,
  CustomSidebarLink,
  AgencyTemplate,
  CustomPage
} from './types';

import { MasterConfig, initialMasterConfig } from './config/masterConfig';
import { AppProvider } from './context/AppContext';
import { InboxProvider } from './context/InboxContext';
import { useModalContext } from './context/ModalContext';
import { SidebarItem } from './components/shared/SidebarItem';
import { DashboardWidget } from './components/shared/DashboardWidget';
import { InboxView } from './components/views/InboxView';
import { AgencyClientsView } from './views/AgencyClientsView';
import { AgencyConfiguratorView } from './views/AgencyConfiguratorView';
import { RoleSwitcher } from './components/RoleSwitcher';
import { EditClientModal } from './components/modals/EditClientModal';
import { AddClientModal } from './components/modals/AddClientModal';
import { AddRoleModal } from './components/modals/AddRoleModal';
import { AddUserModal } from './components/modals/AddUserModal';
import { NewProjectModal } from './components/modals/NewProjectModal';
import { TaskDetailModal } from './components/modals/TaskDetailModal';
import { TaskModal } from './components/modals/TaskModal';
import { TicketModal } from './components/modals/TicketModal';

import { SupportView } from './components/views/SupportView';
import { DataHubView } from './components/views/DataHubView';
import { DesignDashboardView } from './components/views/DesignDashboardView';
import { DevDashboardView } from './components/views/DevDashboardView';
import OnboardingDashboardView from './components/views/OnboardingDashboardView';
import DiscoveryDashboardView from './components/views/DiscoveryDashboardView';
import OnboardingView from './components/views/OnboardingView';
import CollaborationView from './components/views/CollaborationView';
import { AgencyBuilderView } from './components/views/AgencyBuilderView';
import { CustomPageView } from './components/views/CustomPageView';
import { EmployeeManagementView } from './components/views/EmployeeManagementView';
import { EmployeeProfileModal } from './components/modals/EmployeeProfileModal';
import { EmployeeManagementModal } from './components/modals/EmployeeManagementModal';
import { PlanModal } from './components/modals/PlanModal';
import { AgencyCommunicateModal } from './components/modals/AgencyCommunicateModal';
import { SupportTicketsModal } from './components/modals/SupportTicketsModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { ConfirmationModal } from './components/modals/ConfirmationModal';
import { GlobalTasksModal } from './components/modals/GlobalTasksModal';
import { GlobalSettingsView } from './views/GlobalSettingsView';
import { InboxModal } from './components/modals/InboxModal';
import { AppLauncherModal } from './components/modals/AppLauncherModal';

export const iconMap: Record<string, any> = {
  Lock, User, ShieldCheck, ChevronRight, LayoutDashboard, Users, Globe, ChevronLeft, FileText, BarChart3, ExternalLink, BookOpen, Settings, LogOut, LifeBuoy, CreditCard, Lightbulb, Calendar, MessageSquare, Star, Download, Link2, Sparkles, Send, Zap, Bell, Clock, Briefcase, Building2, HelpCircle, Database, Plus, Trash2, CheckCircle2, XCircle, Shield, ArrowLeft, Play, UserPlus, Settings2, Monitor, Layers, Compass, CheckCircle, Circle, Upload, MessageSquarePlus, Layout, Activity, Palette, Code2, Ticket, History, MessageCircle, ShieldAlert, UserCog, UserCircle, Mail, FolderOpen, PlusCircle, CheckSquare, LayoutGrid, Terminal, UserCheck
};

export default function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [step, setStep] = useState<Step>('login');
  const [portalView, setPortalView] = useState<PortalView | string>('dashboard');
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Review Q1 performance reports', completed: false, priority: 'High', category: 'Strategic' },
    { id: '2', text: 'Onboard new development lead', completed: false, priority: 'Medium', category: 'HR' },
    { id: '3', text: 'Update global compliance docs', completed: true, priority: 'High', category: 'Legal' },
  ]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState(['', '', '', '']);

  // Settings & User Management State
  const [userProfile, setUserProfile] = useState({
    name: 'Edward Hallam',
    email: 'edwardhallam07@gmail.com',
    avatar: 'EH'
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { showPlanModal, setShowPlanModal, showAgencyCommunicateModal, setShowAgencyCommunicateModal, showSupportTicketsModal, setShowSupportTicketsModal, showNewProjectModal, setShowNewProjectModal, showNewTaskModal, setShowNewTaskModal, showAddUserModal, setShowAddUserModal, showSettingsModal, setShowSettingsModal, showGlobalTasksModal, setShowGlobalTasksModal, showInboxModal, setShowInboxModal, showAppLauncherModal, setShowAppLauncherModal, showTicketModal, setShowTicketModal, showMobileMenu, setShowMobileMenu, showAddClientModal, setShowAddClientModal, showEditClientModal, setShowEditClientModal, showConfirmationModal, setShowConfirmationModal, showAddRoleModal, setShowAddRoleModal, showEmployeeProfileModal, setShowEmployeeProfileModal, showEmployeeManagementModal, setShowEmployeeManagementModal } = useModalContext();
  const [editingClient, setEditingClient] = useState<any>(null);
  const [selectedTask, setSelectedTask] = useState<ProjectTask | null>(null);
  const [users, setUsers] = useState<AppUser[]>([
    { id: 2, name: 'John Manager', email: 'john@example.com', role: 'AgencyManager', permissions: ['dashboard', 'admin-dashboard', 'client-management', 'logs', 'agency-communicate', 'support-tickets', 'employee-profile', 'project-hub', 'task-board'], avatar: 'JM', workingHours: '9:00 AM - 5:00 PM', bio: 'Operations Manager', joinedDate: '2025-02-15' },
    { id: 3, name: 'Sarah Employee', email: 'sarah@example.com', role: 'AgencyEmployee', permissions: ['dashboard', 'client-management', 'agency-communicate', 'employee-profile', 'project-hub', 'task-board'], avatar: 'SE', workingHours: '10:00 AM - 4:00 PM', bio: 'Design Lead', joinedDate: '2025-03-10' },
    { id: 4, name: 'Client Owner', email: 'contact@acme.com', role: 'ClientOwner', permissions: ['dashboard', 'onboarding', 'support', 'logs', 'employee-profile'], clientId: 'client-1', avatar: 'CO', workingHours: '8:00 AM - 4:00 PM', bio: 'CEO at Acme Corp', joinedDate: '2026-01-20' },
    { id: 101, name: 'Example Operator', email: 'operator@example.com', role: 'AgencyEmployee', permissions: ['dashboard', 'client-management', 'agency-communicate', 'employee-profile', 'project-hub', 'task-board'], avatar: 'EO', workingHours: '9-5', bio: 'Mock Operator', joinedDate: '2026-01-01' },
    { id: 102, name: 'Example Manager', email: 'manager@example.com', role: 'AgencyManager', permissions: ['dashboard', 'admin-dashboard', 'client-management', 'logs', 'agency-communicate', 'support-tickets', 'employee-profile', 'project-hub', 'task-board'], avatar: 'EM', workingHours: '9-5', bio: 'Mock Manager', joinedDate: '2026-01-01' },
    { id: 103, name: 'Example Client', email: 'client@example.com', role: 'ClientOwner', permissions: ['dashboard', 'onboarding', 'support', 'logs', 'employee-profile'], clientId: 'client-1', avatar: 'EC', workingHours: '9-5', bio: 'Mock Client', joinedDate: '2026-01-01' },
  ]);

  const [agencyMessages, setAgencyMessages] = useState([
    { id: '1', senderId: 1, text: "Hey team, how's the new portal coming along?", timestamp: new Date().toISOString() },
    { id: '2', senderId: 2, text: "Almost there! Working on the AI integration now.", timestamp: new Date().toISOString() }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    { id: 'proj-1', name: 'Aqua Portal V2', clientId: 'client-1', description: 'Internal refactor and feature expansion.', status: 'Active', createdAt: '2026-03-01' },
    { id: 'proj-2', name: 'Brand Identity', clientId: 'client-1', description: 'Redesigning the core brand elements.', status: 'Planning', createdAt: '2026-03-15' },
  ]);

  const [projectTasks, setProjectTasks] = useState<ProjectTask[]>([
    { 
      id: 'task-1', 
      projectId: 'proj-1', 
      title: 'Implement Task Management', 
      description: 'Create the core UI and state for managing projects and tasks.',
      status: 'In Progress',
      priority: 'High',
      assigneeId: 1,
      dueDate: '2026-03-26',
      steps: [
        { id: 's1', text: 'Define Data Models', completed: true },
        { id: 's2', text: 'Implement Project Hub', completed: false },
        { id: 's3', text: 'Build Task Board', completed: false }
      ],
      attachments: [
        { id: 'a1', name: 'SOP: Project Standards', url: '#', type: 'sop' }
      ],
      createdAt: '2026-03-24'
    }
  ]);

  const [tickets, setTickets] = useState<AppTicket[]>([
    { id: 'TIC-001', title: 'Login issue reported via call', status: 'Open', priority: 'High', creator: 'Client Owner', creatorId: 4, createdAt: new Date().toISOString(), type: 'internal', description: 'Client mentioned login lag during the weekly sync.' },
    { id: 'TIC-002', title: 'Feature request: Dark mode', status: 'Closed', priority: 'Low', creator: 'Edward Hallam', creatorId: 1, createdAt: new Date().toISOString(), type: 'internal' },
    { id: 'TIC-003', title: 'Unable to upload logo', status: 'Open', priority: 'Medium', creator: 'Acme Corp', creatorId: 'client-1', createdAt: new Date().toISOString(), type: 'client' }
  ]);

  const [aiSessions, setAiSessions] = useState([
    { id: 'sess-1', userId: 1, userName: 'Edward Hallam', interactions: [{ prompt: 'Analyze revenue', response: 'Revenue is up 20%...', timestamp: new Date().toISOString() }] },
    { id: 'sess-2', userId: 4, userName: 'Client Owner', interactions: [{ prompt: 'How do I add a logo?', response: 'Go to settings...', timestamp: new Date().toISOString() }] }
  ]);
  const [activityLogs, setActivityLogs] = useState<LogEntry[]>([
    { id: '1', timestamp: new Date().toISOString(), userId: 1, userName: 'Founder', action: 'Login', details: 'Founder logged in', type: 'system' },
    { id: '2', timestamp: new Date().toISOString(), userId: 1, userName: 'Founder', action: 'Portal Access', details: 'Accessed Agency Hub', type: 'action' },
    { id: '3', timestamp: new Date().toISOString(), userId: 2, userName: 'John Manager', action: 'Update', details: 'Updated client priority', type: 'action' },
  ]);
  const [newTicket, setNewTicket] = useState({ title: '', priority: 'Medium' as const, type: 'internal' as const });
  const [confirmationConfig, setConfirmationConfig] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
    type?: 'danger' | 'warning' | 'info';
  }>({ title: '', message: '', onConfirm: () => {} });
  const [newUser, setNewUser] = useState<Omit<AppUser, 'id'>>({
    name: '',
    email: '',
    role: 'AgencyEmployee',
    customRoleId: undefined,
    permissions: ['dashboard'] as PortalView[],
    avatar: '',
    clientId: undefined
  });
  const [selectedUserToEdit, setSelectedUserToEdit] = useState<AppUser | null>(null);
  const [newClientForm, setNewClientForm] = useState({
    name: '',
    email: '',
    stage: 'discovery' as ClientStage,
    websiteUrl: '',
    permissions: ['dashboard', 'crm', 'website', 'resources', 'aqua-ai', 'support']
  });

  const [newProjectForm, setNewProjectForm] = useState({
    name: '',
    clientId: 'client-1',
    description: '',
    status: 'Planning' as const
  });

  const [newTaskForm, setNewTaskForm] = useState({
    title: '',
    projectId: 'proj-1',
    priority: 'Medium' as const,
    assigneeId: 1,
    description: ''
  });
  const [exporting, setExporting] = useState(false);
  
  // App Customization State
  const [appTheme, setAppTheme] = useState('indigo');
  const [customSidebarLinks, setCustomSidebarLinks] = useState<CustomSidebarLink[]>([]);
  const [customPages, setCustomPages] = useState<CustomPage[]>([]);
  const [masterConfig, setMasterConfig] = useState<MasterConfig>(initialMasterConfig);
  const [activeTemplate, setActiveTemplate] = useState<AgencyTemplate | null>(null);
  const [appLogo, setAppLogo] = useState<string | null>(null);
  const [loginPortalType, setLoginPortalType] = useState<'standard' | 'branded'>('standard');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isMasterAdmin, setIsMasterAdmin] = useState(true); // Default to true for development
  const [agencies, setAgencies] = useState<Agency[]>([
    {
      id: 'aqua-agency-1',
      name: 'Aqua Digital HQ',
      isConfigured: true,
      roles: [
        { id: 'Founder', name: 'Founder', permissions: ['dashboard', 'admin-dashboard', 'client-management', 'settings', 'logs', 'employee-management', 'agency-communicate', 'support-tickets', 'ai-sessions', 'employee-profile', 'agency-clients', 'project-hub', 'task-board'], isMaster: true },
        { id: 'AgencyManager', name: 'Agency Manager', permissions: ['dashboard', 'admin-dashboard', 'client-management', 'logs', 'agency-communicate', 'support-tickets', 'employee-profile', 'project-hub', 'task-board'] },
        { id: 'AgencyEmployee', name: 'Agency Employee', permissions: ['dashboard', 'client-management', 'agency-communicate', 'employee-profile', 'project-hub', 'task-board'] }
      ]
    }
  ]);
  const [activeAgencyId, setActiveAgencyId] = useState<string | null>('aqua-agency-1');
  const [appMode, setAppMode] = useState<'setup' | 'auth' | 'portal'>('portal');
  const [setupStep, setSetupStep] = useState(1);
  const [newAgencyForm, setNewAgencyForm] = useState({
    name: '',
    logo: null as string | null,
    primaryColor: '#6366f1'
  });
  const [newRoleForm, setNewRoleForm] = useState<Omit<CustomRole, 'id'>>({
    name: '',
    permissions: []
  });
  const [impersonatingClientId, setImpersonatingClientId] = useState<string | null>(null);
  const [impersonatedUserEmail, setImpersonatedUserEmail] = useState<string | null>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const handleAgencySetup = () => {
    if (!newAgencyForm.name) return;

    const newAgency: Agency = {
      id: `agency-${Date.now()}`,
      name: newAgencyForm.name,
      logo: newAgencyForm.logo || undefined,
      theme: { primary: newAgencyForm.primaryColor, secondary: '#1e293b' },
      isConfigured: true,
      roles: [
        { id: 'Founder', name: 'Founder', permissions: ['dashboard', 'admin-dashboard', 'client-management', 'settings', 'logs', 'employee-management', 'agency-communicate', 'support-tickets', 'ai-sessions', 'employee-profile', 'agency-clients', 'project-hub', 'task-board'], isMaster: true },
        { id: 'AgencyManager', name: 'Agency Manager', permissions: ['dashboard', 'admin-dashboard', 'client-management', 'logs', 'agency-communicate', 'support-tickets', 'employee-profile', 'project-hub', 'task-board'] },
        { id: 'AgencyEmployee', name: 'Agency Employee', permissions: ['dashboard', 'client-management', 'agency-communicate', 'employee-profile', 'project-hub', 'task-board'] }
      ]
    };

    setAgencies(prev => [...prev, newAgency]);
    setActiveAgencyId(newAgency.id);
    setAppMode('auth');
    setStep('login');
    addLog('Agency Setup', `Agency ${newAgency.name} configured successfully`, 'system');
  };

  const currentAgency = agencies.find(a => a.id === activeAgencyId);
  const currentUser = users.find(u => u.email === (impersonatedUserEmail || userProfile.email)) || users[0];
  const isImpersonating = !!impersonatedUserEmail;
  
  const [clients, setClients] = useState<Client[]>([
    {
      id: 'client-1',
      name: 'Acme Corp',
      email: 'contact@acme.com',
      stage: 'discovery',
      discoveryAnswers: {
        'business-goals': 'We want to increase our online sales by 50% this year.',
        'target-audience': 'Tech-savvy professionals aged 25-45.',
        'brand-voice': 'Professional, yet approachable and innovative.'
      },
      resources: [],
      permissions: ['dashboard', 'onboarding', 'support']
    },
    {
      id: 'client-2',
      name: 'Global Tech',
      email: 'info@globaltech.io',
      stage: 'design',
      websiteUrl: 'https://example.com/preview/globaltech',
      discoveryAnswers: {},
      resources: [{ name: 'Brand Assets', url: '#', type: 'zip' }],
      permissions: ['dashboard', 'collaboration', 'support', 'resources']
    }
  ]);


  const isAgencyAdmin = currentUser?.role === 'Founder' || currentUser?.role === 'AgencyManager';
  const isAgencyEmployee = currentUser?.role === 'AgencyEmployee';
  const isAgencyRole = isAgencyAdmin || isAgencyEmployee;

  const activeClient = impersonatingClientId 
    ? clients.find(c => c.id === impersonatingClientId) 
    : (!isAgencyRole ? clients.find(c => c.email === userProfile.email) : null);

  const managedClient = clients.find(c => c.id === selectedClientId);

  const [workspaces, setWorkspaces] = useState([
    { id: 'crm', title: 'CRM Portal', description: 'Manage your clients, leads, and sales pipeline in one secure place.', icon: Users },
    { id: 'website', title: 'Website Editor', description: 'Build and maintain your online presence with our powerful editor.', icon: Globe }
  ]);
  // Logging Helper
  const addLog = (action: string, details: string, type: LogEntry['type'] = 'action', clientId?: string) => {
    const actorName = userProfile.name;
    const perspectiveName = impersonatedUserEmail ? users.find(u => u.email === impersonatedUserEmail)?.name : null;
    
    const logAction = impersonatedUserEmail ? `[IMPERSONATION] ${action}` : action;
    const logDetails = impersonatedUserEmail ? `(By ${actorName} as ${perspectiveName}): ${details}` : details;

    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
      userId: userProfile.email,
      userName: actorName + (perspectiveName ? ` (as ${perspectiveName})` : ''),
      action: logAction,
      details: logDetails,
      clientId: clientId || impersonatingClientId || undefined,
      type
    };

    setActivityLogs(prev => [newLog, ...prev]);
  };

  const hasPermission = (view: PortalView) => {

    if (!currentUser) return false;

    // Founder has full access
    if (currentUser.role === 'Founder' && !impersonatingClientId) return true;

    // If impersonating, use the client's permissions
    if (impersonatingClientId && activeClient) {
      return activeClient.permissions.includes(view);
    }

    // Otherwise use the user's own permissions
    // Check custom roles from current agency
    const customRole = currentAgency?.roles.find(r => r.id === currentUser.role);
    if (customRole) {
      if (customRole.isMaster) return true;
      return customRole.permissions.includes(view);
    }
    
    // Fallback for legacy roles
    if (currentUser.role === 'Founder') return true;
    return currentUser.permissions.includes(view);
  };

  const handleAddWorkspace = () => {
    const name = prompt('Enter workspace name:');
    if (name) {
      const id = name.toLowerCase().replace(/\s+/g, '-');
      setWorkspaces([...workspaces, {
        id: id as any,
        title: name,
        description: 'New custom workspace for your business needs.',
        icon: Briefcase
      }]);
    }
  };

  const handleUpdateClientStage = (clientId: string, stage: ClientStage) => {
    setClients(clients.map(c => c.id === clientId ? { ...c, stage } : c));
    addLog('Client', `Updated client stage to ${stage}`, 'action');
  };

  const handleEditClient = (client: any) => {
    setEditingClient(client);
    setShowEditClientModal(true);
  };

  const handleSaveClient = (updatedClient: any) => {
    setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c));
    addLog('Client', `Updated client ${updatedClient.name}`, 'action');
  };

  const handleImpersonate = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    addLog('Impersonation', `Started impersonating ${client?.name}`, 'impersonation', clientId);
    setImpersonatingClientId(clientId);
    setPortalView('dashboard');
  };

  const handleStopImpersonating = () => {
    addLog('Impersonation', 'Stopped impersonation', 'impersonation');
    setImpersonatingClientId(null);
    setImpersonatedUserEmail(null);
    setPortalView('operations-hub');
  };

  const handleAddClient = () => {
    if (!newClientForm.name || !newClientForm.email) return;
    const newClient: Client = {
      id: `client-${Date.now()}`,
      ...newClientForm,
      name: newClientForm.name,
      email: newClientForm.email,
      websiteUrl: newClientForm.websiteUrl,
      stage: 'discovery',
      discoveryAnswers: {},
      resources: [],
      assignedEmployees: []
    };

    setClients(prev => [...prev, newClient]);
    addLog('Client Created', `New client ${newClient.name} added to the system`, 'action', newClient.id);
    setShowAddClientModal(false);
    setNewClientForm({
      name: '',
      email: '',
      stage: 'discovery',
      websiteUrl: '',
      permissions: ['dashboard', 'crm', 'website', 'resources', 'aqua-ai', 'support']
    });
  };

  const handleAddProject = () => {
    if (!newProjectForm.name) return;
    const project: Project = {
      id: `proj-${Date.now()}`,
      ...newProjectForm,
      createdAt: new Date().toISOString()
    };
    setProjects(prev => [...prev, project]);
    setShowNewProjectModal(false);
    setNewProjectForm({ name: '', clientId: clients[0]?.id || 'client-1', description: '', status: 'Planning' });
    addLog('Project Created', `New project: ${project.name}`, 'action');
  };

  const handleAddTask = () => {
    if (!newTaskForm.title) return;
    const task: ProjectTask = {
      id: `task-${Date.now()}`,
      ...newTaskForm,
      status: 'Backlog',
      steps: [],
      attachments: [],
      createdAt: new Date().toISOString()
    };
    setProjectTasks(prev => [...prev, task]);
    setShowNewTaskModal(false);
    setNewTaskForm({ title: '', projectId: projects[0]?.id || 'proj-1', priority: 'Medium', assigneeId: 1, description: '' });
    addLog('Task Created', `New task: ${task.title}`, 'action');
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;

    if (selectedUserToEdit) {
      setUsers(prev => prev.map(u => u.id === selectedUserToEdit.id ? { ...u, ...newUser } : u));
      addLog('User Updated', `Permissions updated for ${newUser.name}`, 'action');
    } else {
      const user: AppUser = {
        ...newUser,
        id: Date.now(),
        avatar: (newUser.name || '').split(' ').map(n => n[0]).join('')
      };
      setUsers(prev => [...prev, user]);
      addLog('User Created', `New user ${user.name} added with role ${user.role}`, 'action');
    }
    
    setShowAddUserModal(false);
    setSelectedUserToEdit(null);
    setNewUser({
      name: '',
      email: '',
      role: 'AgencyEmployee',
      customRoleId: undefined,
      permissions: ['dashboard'],
      avatar: '',
      clientId: undefined
    });
  };

  const handleDeleteUser = (id: number) => {
    const user = users.find(u => u.id === id);
    if (!user) return;
    if (user.role === 'Founder') {
      alert('Cannot delete the Founder account.');
      return;
    }

    setConfirmationConfig({
      title: 'Delete User',
      message: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      onConfirm: () => {
        setUsers(prev => prev.filter(u => u.id !== id));
        addLog('User Deleted', `User ${user.name} removed from the system`, 'action');
      }
    });
    setShowConfirmationModal(true);
  };

  const handleDeleteRole = (roleId: string) => {
    const role = currentAgency?.roles.find(r => r.id === roleId);
    if (!role) return;

    setConfirmationConfig({
      title: 'Delete Role',
      message: `Are you sure you want to delete the "${role.name}" role? Users assigned to this role will lose their custom permissions.`,
      onConfirm: () => {
        setAgencies(prev => prev.map(a => 
          a.id === activeAgencyId ? { ...a, roles: a.roles.filter(r => r.id !== roleId) } : a
        ));
        // Reset users with this role
        setUsers(prev => prev.map(u => u.customRoleId === roleId ? { ...u, customRoleId: undefined } : u));
        addLog('Role Deleted', `Role "${role.name}" was removed`, 'action');
      }
    });
    setShowConfirmationModal(true);
  };

  const handleCreateRole = () => {
    if (!newRoleForm.name || !activeAgencyId) return;
    const role: CustomRole = {
      ...newRoleForm,
      id: `role-${Date.now()}`
    };
    setAgencies(prev => prev.map(a => 
      a.id === activeAgencyId ? { ...a, roles: [...a.roles, role] } : a
    ));
    setShowAddRoleModal(false);
    setNewRoleForm({ name: '', permissions: [] });
    addLog('Role Created', `New role "${role.name}" created`, 'action');
  };

  const toggleRolePermission = (permission: PortalView) => {
    setNewRoleForm(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };
  
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hello Edward! I'm Aqua AI, your personal assistant trained on your company's data. How can I help you today?", time: '10:22 AM' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (portalView === 'aqua-ai') {
      scrollToBottom();
    }
  }, [messages, portalView]);

  const codeRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      addLog('Login Attempt', `User ${username} attempted login`, 'auth');
      setStep('security');
    }
  };

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      codeRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      codeRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    if (code.every(digit => digit !== '')) {
      addLog('Login Success', `User ${username} verified and logged in`, 'auth');
      setStep('portal');
    }
  };

  const handleLogout = () => {
    setStep('login');
    setUsername('');
    setPassword('');
    setCode(['', '', '', '']);
    setPortalView('dashboard');
    setSidebarCollapsed(false);
  };

  const handleExportWebsite = async () => {
    setExporting(true);
    try {
      const zip = new JSZip();
      zip.file("index.html", "<html><body><h1>My Website</h1></body></html>");
      zip.file("styles.css", "body { background: #000; color: #fff; }");
      zip.file("script.js", "console.log('Hello World');");
      
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "website-export.zip");
    } finally {
      setExporting(false);
    }
  };

  const handleExportData = () => {
    const data = {
      profile: userProfile,
      users: users,
      activityLogs: activityLogs,
      aiSessions: aiSessions,
      employeeLogs: activityLogs.filter(log => {
        const user = users.find(u => u.id === log.userId);
        return user?.role.includes('Agency');
      }),
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    saveAs(blob, "portal-data-export.json");
    addLog('Data Export', 'User exported account and employee data logs', 'action');
  };

  const togglePermission = (perm: PortalView) => {
    if (newUser.permissions.includes(perm)) {
      setNewUser({ ...newUser, permissions: newUser.permissions.filter(p => p !== perm) });
    } else {
      setNewUser({ ...newUser, permissions: [...newUser.permissions, perm] });
    }
  };

  const handleViewChange = (view: PortalView | string) => {
    if (view === 'your-plan') {
      setShowPlanModal(true);
      return;
    }
    if (view === 'inbox') {
      setPortalView('inbox');
      setShowMobileMenu(false);
      return;
    }
    if (view === 'support-tickets') {
      setShowSupportTicketsModal(true);
      return;
    }
    if (view === 'agency-configurator') {
      setPortalView('agency-configurator');
      setShowMobileMenu(false);
      return;
    }
    setPortalView(view);
    setShowMobileMenu(false);
    if (view === 'website') {
      setSidebarCollapsed(true);
    } else {
      setSidebarCollapsed(false);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMsg = { role: 'user', text: inputMessage, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');

    // Mock AI Response
    setTimeout(() => {
      const aiMsg = { 
        role: 'ai', 
        text: "I've analyzed your request. Based on the current data, I recommend focusing on the conversion rate optimization for your landing page. Would you like me to generate a detailed report?", 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  const dashboardData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
    { name: 'Jul', value: 1100 },
  ];

  const appContextValue = {
    users,
    setUsers,
    clients,
    setClients,
    tickets,
    setTickets,
    projects,
    setProjects,
    tasks: projectTasks,
    setTasks: setProjectTasks,
    activityLogs,
    setActivityLogs,
    userProfile,
    setUserProfile,
    impersonatedUserEmail,
    setImpersonatedUserEmail,
    impersonatingClientId,
    setImpersonatingClientId,
    appTheme,
    setAppTheme,
    appLogo,
    setAppLogo,
    loginPortalType,
    setLoginPortalType,
    portalView,
    setPortalView,
    addLog,
    currentUser,
    isAgencyAdmin,
    isAgencyEmployee,
    customSidebarLinks,
    setCustomSidebarLinks,
    activeTemplate,
    setActiveTemplate,
    agencies,
    setAgencies,
    currentAgency,
    activeAgencyId,
    customPages,
    setCustomPages,
    masterConfig,
    setMasterConfig
  };

  return (
    <InboxProvider>
      <AppProvider value={appContextValue}>
      <div className={`relative flex min-h-screen overflow-hidden transition-colors duration-1000 ${step === 'portal' ? 'bg-black' : 'bg-[#0f172a]'}`}>
      {/* Background Orbs */}
      {step !== 'portal' && (
        <>
          <motion.div 
            animate={{ 
              x: [0, 100, 0], 
              y: [0, 50, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="bg-glow top-1/4 left-1/4" 
          />
          <motion.div 
            animate={{ 
              x: [0, -100, 0], 
              y: [0, -50, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="bg-glow bottom-1/4 right-1/4" 
          />
        </>
      )}

      <AnimatePresence mode="wait">
        {step === 'login' && (
          <div className="flex items-center justify-center w-full min-h-screen relative z-[100] px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]" />
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative w-full max-w-md glass-card rounded-[2.5rem] p-10 shadow-2xl border border-white/10 text-center"
            >
              <h1 className="text-3xl font-bold mb-8">Aqua CRM</h1>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => {
                    setUserProfile({ name: 'Founder', email: 'edwardhallam07@gmail.com', avatar: 'FO', role: 'Founder' });
                    setStep('portal');
                  }}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold transition-all text-sm"
                >
                  Login as Founder
                </button>
                <button 
                  onClick={() => {
                    setUserProfile({ name: 'Client', email: 'contact@acme.com', avatar: 'CL', role: 'ClientOwner' });
                    setStep('portal');
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold transition-all text-sm"
                >
                  Login as Client
                </button>
                <button 
                  onClick={() => {
                    setUserProfile({ name: 'Operator', email: 'operator@example.com', avatar: 'OP', role: 'AgencyManager' });
                    setStep('portal');
                  }}
                  className="w-full py-3 bg-amber-600 hover:bg-amber-500 rounded-xl font-bold transition-all text-sm"
                >
                  Login as Operator
                </button>
                <button 
                  onClick={() => {
                    setUserProfile({ name: 'Employee', email: 'sarah@example.com', avatar: 'EM', role: 'AgencyEmployee' });
                    setStep('portal');
                  }}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-500 rounded-xl font-bold transition-all text-sm"
                >
                  Login as Employee
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {step === 'security' && (
          <div className="flex items-center justify-center w-full p-4">
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card w-full max-w-md p-6 md:p-10 rounded-2xl md:rounded-[32px] shadow-2xl z-10"
            >
              <div className="text-center mb-8 md:mb-10">
                <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-indigo-500/20 mb-4 md:mb-6">
                  <ShieldCheck className="w-7 h-7 md:w-8 md:h-8 text-indigo-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">Security Check</h2>
                <p className="text-xs md:text-sm text-slate-400">We've sent a 4-digit code to your email.</p>
              </div>

              <div className="flex justify-center gap-2 md:gap-4 mb-8 md:mb-10">
                {code.map((digit, i) => (
                  <input
                    key={i}
                    ref={codeRefs[i]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e) }
                    className="w-12 h-16 md:w-16 md:h-20 text-center text-2xl md:text-3xl font-bold bg-black/20 border border-white/10 rounded-xl md:rounded-2xl outline-none focus:border-indigo-500 transition-colors text-white"
                  />
                ))}
              </div>

              <button
                onClick={handleVerify}
                className="w-full py-3 md:py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 group text-sm md:text-base"
              >
                Verify Identity
                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              
              <button 
                onClick={() => setStep('login')}
                className="w-full mt-4 py-2 text-slate-500 hover:text-slate-300 text-xs md:text-sm transition-colors"
              >
                Back to login
              </button>
            </motion.div>
          </div>
        )}

        {step === 'portal' && (
          <motion.div
            key="portal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex w-full h-screen text-white"
          >
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
              {showMobileMenu && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowMobileMenu(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
                />
              )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
              initial={false}
              animate={{ 
                width: sidebarCollapsed ? 80 : 280,
                x: showMobileMenu ? 0 : (typeof window !== 'undefined' && window.innerWidth < 768 ? -280 : 0)
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              className={`fixed md:relative h-full glass-card border-r border-white/5 flex flex-col z-[60] group/sidebar transition-all duration-300 shadow-2xl md:shadow-none bg-[#0a0a0a]/90 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none`}
            >
              <div className="flex flex-col h-full">
                <div className={`p-4 md:p-6 mb-4 md:mb-8 flex items-center gap-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0 overflow-hidden shadow-lg shadow-indigo-600/20">
                    {currentAgency?.logo ? (
                      <img src={currentAgency.logo} alt="Logo" className="w-full h-full object-cover" />
                    ) : (
                      <ShieldCheck className="w-5 h-5 text-white" />
                    )}
                  </div>
                  {!sidebarCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-lg md:text-xl font-semibold tracking-tight truncate"
                    >
                      {currentAgency?.name || 'Portal'}
                    </motion.span>
                  )}
                </div>

                <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
                  {getSidebarItems({
                    currentUser: currentUser!,
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
                    setShowAppLauncherModal,
                    sidebarCollapsed
                  }).map((section, index) => (
                    <div key={index} className="mb-6 space-y-1">
                      {!sidebarCollapsed && <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-2 px-4">{section.section}</div>}
                      {section.items.map(item => (
                        <SidebarItem 
                          key={item.id}
                          icon={item.icon}
                          label={item.label}
                          active={item.active}
                          onClick={item.onClick}
                          collapsed={sidebarCollapsed}
                          badge={item.badge}
                        />
                      ))}
                    </div>
                  ))}
                </nav>


                <div className="p-4 border-t border-white/5 space-y-1">
                  <button
                    onClick={handleLogout}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all duration-300 ${sidebarCollapsed ? 'justify-center' : ''}`}
                  >
                    <LogOut className="w-5 h-5 shrink-0" />
                    {!sidebarCollapsed && <span className="font-medium">Logout</span>}
                  </button>
                </div>
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className={`absolute bottom-8 -right-3 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg border border-white/10 hover:scale-110 transition-transform z-30`}
              >
                {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-hidden relative bg-black/40 flex flex-col">
              {/* Mobile Header */}
              <div className="md:hidden h-16 bg-[#1e1e2d] border-b border-white/5 flex items-center justify-between px-6 z-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-bold text-lg tracking-tight">AquaPortal</span>
                </div>
                <button 
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2 hover:bg-white/5 rounded-xl transition-colors"
                >
                  {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

              {impersonatedUserEmail && (
                <div className="h-10 bg-indigo-600/90 backdrop-blur-md flex items-center justify-between px-8 text-white z-50">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4" />
                    Viewing as {currentUser.name} ({currentUser.role})
                  </div>
                  <button 
                    onClick={() => {
                      setImpersonatedUserEmail(null);
                      setPortalView('dashboard');
                      addLog('Impersonation Stopped', `Returned to ${userProfile.name}'s account`, 'system');
                    }}
                    className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all"
                  >
                    Switch back to my profile
                  </button>
                </div>
              )}
              {impersonatingClientId && !impersonatedUserEmail && (
                <div className="h-10 bg-amber-600/90 backdrop-blur-md flex items-center justify-between px-8 text-white z-50">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
                    <Building2 className="w-4 h-4" />
                    Viewing {clients.find(c => c.id === impersonatingClientId)?.name} Workspace
                  </div>
                  <button 
                    onClick={() => {
                      setImpersonatingClientId(null);
                      setPortalView('operations-hub');
                    }}
                    className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all"
                  >
                    Return to Agency Hub
                  </button>
                </div>
              )}

              {/* Top Header */}
              <header className="h-16 border-b border-white/5 bg-black/20 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 shrink-0 z-10">
                <div className="flex items-center gap-4">
                  <h2 className="text-xs font-medium text-slate-400 capitalize truncate max-w-[150px] md:max-w-none">
                    {portalView.replace('-', ' ')}
                  </h2>
                </div>
                <div className="flex items-center gap-1 md:gap-2">
                  <button 
                    onClick={() => setShowGlobalTasksModal(true)}
                    className="p-1.5 md:p-2 rounded-lg transition-all hover:bg-white/5 group relative text-slate-400 hover:text-indigo-400"
                  >
                    <CheckSquare className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button 
                    onClick={() => setShowInboxModal(true)}
                    className={`p-1.5 md:p-2 rounded-lg transition-all hover:bg-white/5 group relative ${showInboxModal ? 'text-indigo-400' : 'text-slate-400'}`}
                  >
                    <Clock className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-500 rounded-full border border-black" />
                  </button>
                  <button 
                    onClick={() => setShowInboxModal(true)}
                    className={`p-1.5 md:p-2 rounded-lg transition-all hover:bg-white/5 group relative ${showInboxModal ? 'text-indigo-400' : 'text-slate-400'}`}
                  >
                    <Bell className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full border border-black" />
                  </button>
                  <div className="w-px h-4 bg-white/10 mx-1 md:mx-2" />
                  <div className="relative" ref={dropdownRef}>
                    <button 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 md:gap-3 pl-1 md:pl-2 group"
                    >
                      <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-bold ${
                        appTheme === 'indigo' ? 'bg-indigo-600' :
                        appTheme === 'cyan' ? 'bg-cyan-600' :
                        appTheme === 'emerald' ? 'bg-emerald-600' :
                        'bg-rose-600'
                      }`}>
                        {userProfile.avatar}
                      </div>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-xl shadow-lg border border-white/10 z-50">
                        <div className="p-2">
                          {currentUser?.role === 'Founder' ? (
                            <div className="space-y-1">
                              <div className="px-4 py-1 text-xs text-slate-500 uppercase">Switch User</div>
                              {users.map(u => (
                                <button 
                                  key={u.id} 
                                  onClick={() => { 
                                    setImpersonatedUserEmail(u.email); 
                                    setIsDropdownOpen(false); 
                                    addLog('Impersonation', `Switched to ${u.name}`, 'impersonation');
                                  }}
                                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 rounded-lg"
                                >
                                  {u.name} ({u.role})
                                </button>
                              ))}
                              <div className="border-t border-white/10 my-1"></div>
                              <button onClick={() => { setPortalView('workspaces'); setIsDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 rounded-lg">View Workspaces</button>
                            </div>
                          ) : (
                            <button onClick={() => { /* Add logic for Add Account */ setIsDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 rounded-lg">Add Account</button>
                          )}
                          <button onClick={() => { handleLogout(); setIsDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg">Log Out</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </header>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="wait">


                  {portalView === 'support' && (
                    <SupportView key="support" handleViewChange={handleViewChange} />
                  )}

                  {portalView === 'data-hub' && (
                    <DataHubView key="data-hub" handleViewChange={handleViewChange} />
                  )}

                  {portalView === 'design-dashboard' && (
                    <DesignDashboardView key="design-dashboard" />
                  )}

                  {portalView === 'dev-dashboard' && (
                    <DevDashboardView key="dev-dashboard" />
                  )}

                  {portalView === 'agency-builder' && (
                    <AgencyBuilderView key="agency-builder" />
                  )}

                  {customPages.find(p => p.slug === portalView) && (
                    <CustomPageView key={portalView} pageId={customPages.find(p => p.slug === portalView)!.id} />
                  )}

                  {portalView === 'onboarding-dashboard' && (
                    <OnboardingDashboardView key="onboarding-dashboard" />
                  )}

                  {portalView === 'discovery-dashboard' && (
                    <DiscoveryDashboardView key="discovery-dashboard" />
                  )}

                  {portalView === 'onboarding' && (
                    <OnboardingView key="onboarding" />
                  )}

                  {portalView === 'collaboration' && (
                    <CollaborationView key="collaboration" />
                  )}
                  {portalView === 'admin-dashboard' && (
                    <motion.div
                      key="admin-dashboard"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 md:p-10 max-w-6xl mx-auto w-full"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                            {currentUser?.role === 'Founder' ? 'Founder Command Center' : 
                             currentUser?.role === 'AgencyManager' ? 'Agency Operations' : 
                             'Employee Dashboard'}
                          </h2>
                          <p className="text-sm md:text-base text-slate-500">
                            {currentUser?.role === 'Founder' ? 'Global overview of your agency performance and growth.' : 
                             currentUser?.role === 'AgencyManager' ? 'Manage your team, clients, and operational workflows.' : 
                             'Track your assigned clients and daily tasks.'}
                          </p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                          {isAgencyAdmin && (
                            <button 
                              onClick={() => setShowAddClientModal(true)}
                              className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-semibold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                            >
                              <Plus className="w-5 h-5" />
                              Add New Client
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
                        {currentUser?.role === 'Founder' ? (
                          <>
                            <DashboardWidget 
                              icon={CreditCard} 
                              label="Monthly Revenue" 
                              value="$124,500" 
                              trend="+12.5%" 
                              color="emerald" 
                            />
                            <DashboardWidget 
                              icon={Users} 
                              label="Total Clients" 
                              value={clients.length.toString()} 
                              trend="+2" 
                              color="indigo" 
                            />
                            <DashboardWidget 
                              icon={Zap} 
                              label="Agency Growth" 
                              value="24%" 
                              trend="+5%" 
                              color="amber" 
                            />
                            <DashboardWidget 
                              icon={ShieldCheck} 
                              label="System Health" 
                              value="99.9%" 
                              trend="Stable" 
                              color="blue" 
                            />
                          </>
                        ) : currentUser?.role === 'AgencyManager' ? (
                          <>
                            <DashboardWidget 
                              icon={Briefcase} 
                              label="Active Projects" 
                              value={clients.filter(c => c.stage !== 'live').length.toString()} 
                              trend="On Track" 
                              color="indigo" 
                            />
                            <DashboardWidget 
                              icon={Users} 
                              label="Team Capacity" 
                              value="85%" 
                              trend="-5%" 
                              color="emerald" 
                            />
                            <DashboardWidget 
                              icon={Clock} 
                              label="Avg. Turnaround" 
                              value="4.2 Days" 
                              trend="-0.5d" 
                              color="amber" 
                            />
                            <DashboardWidget 
                              icon={MessageSquare} 
                              label="Pending Feedback" 
                              value="12" 
                              trend="+3" 
                              color="blue" 
                            />
                          </>
                        ) : (
                          <>
                            <DashboardWidget 
                              icon={Users} 
                              label="Your Clients" 
                              value={clients.filter(c => c.assignedEmployees?.includes(currentUser?.id || 0)).length.toString()} 
                              trend="Active" 
                              color="indigo" 
                            />
                            <DashboardWidget 
                              icon={CheckCircle2} 
                              label="Tasks Completed" 
                              value="48" 
                              trend="+12" 
                              color="emerald" 
                            />
                            <DashboardWidget 
                              icon={Star} 
                              label="Client Rating" 
                              value="4.9/5" 
                              trend="+0.1" 
                              color="amber" 
                            />
                            <DashboardWidget 
                              icon={Zap} 
                              label="Efficiency" 
                              value="94%" 
                              trend="+2%" 
                              color="blue" 
                            />
                          </>
                        )}
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {currentUser?.role === 'Founder' ? (
                          <>
                            {/* Operator Performance */}
                            <div className="glass-card p-8 rounded-3xl">
                              <h3 className="text-xl font-medium mb-8">Operator Performance</h3>
                              <div className="space-y-6">
                                {[
                                  { name: 'Sarah Jenkins', role: 'Agency Manager', clients: 12, rating: 4.9 },
                                  { name: 'Michael Chen', role: 'Agency Manager', clients: 8, rating: 4.7 },
                                  { name: 'Emma Wilson', role: 'Agency Manager', clients: 15, rating: 4.8 }
                                ].map((op, i) => (
                                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                                        {op.name.charAt(0)}
                                      </div>
                                      <div>
                                        <div className="text-sm font-medium">{op.name}</div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">{op.role}</div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-sm font-bold text-emerald-400">{op.rating} ★</div>
                                      <div className="text-[10px] text-slate-500">{op.clients} Clients</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Top Revenue Clients */}
                            <div className="glass-card p-8 rounded-3xl">
                              <h3 className="text-xl font-medium mb-8">Top Revenue Clients</h3>
                              <div className="space-y-4">
                                {clients.slice(0, 4).map((client) => (
                                  <div key={client.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                                        {client.name.charAt(0)}
                                      </div>
                                      <div>
                                        <div className="text-sm font-medium">{client.name}</div>
                                        <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">{client.stage}</div>
                                      </div>
                                    </div>
                                    <div className="text-sm font-bold text-indigo-400">£2,450/mo</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : currentUser?.role === 'AgencyManager' ? (
                          <>
                            {/* Pipeline Status */}
                            <div className="glass-card p-8 rounded-3xl">
                              <h3 className="text-xl font-medium mb-8">Pipeline Status</h3>
                              <div className="space-y-6">
                                {[
                                  { stage: 'Discovery', count: 5, color: 'bg-indigo-500' },
                                  { stage: 'Onboarding', count: 3, color: 'bg-blue-500' },
                                  { stage: 'Design', count: 8, color: 'bg-purple-500' },
                                  { stage: 'Development', count: 12, color: 'bg-cyan-500' },
                                  { stage: 'Live', count: 45, color: 'bg-emerald-500' }
                                ].map((s, i) => (
                                  <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                      <span className="text-slate-400">{s.stage}</span>
                                      <span className="font-bold">{s.count}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full ${s.color} transition-all duration-1000`} 
                                        style={{ width: `${(s.count / 73) * 100}%` }}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Team Workload */}
                            <div className="glass-card p-8 rounded-3xl">
                              <h3 className="text-xl font-medium mb-8">Team Workload</h3>
                              <div className="space-y-4">
                                {users.filter(u => u.role === 'AgencyEmployee').slice(0, 4).map((user) => (
                                  <div key={user.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                                        {user.name.charAt(0)}
                                      </div>
                                      <div>
                                        <div className="text-sm font-medium">{user.name}</div>
                                        <div className="text-[10px] text-slate-500">4 Active Clients</div>
                                      </div>
                                    </div>
                                    <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full uppercase tracking-widest">
                                      Available
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Task List */}
                            <div className="glass-card p-8 rounded-3xl">
                              <h3 className="text-xl font-medium mb-8">Your Tasks</h3>
                              <div className="space-y-4">
                                {[
                                  { task: 'Review Design Feedback', client: 'Acme Corp', priority: 'High' },
                                  { task: 'Update Staging Environment', client: 'Global Tech', priority: 'Medium' },
                                  { task: 'Prepare Onboarding Docs', client: 'Nexus Solutions', priority: 'Low' }
                                ].map((t, i) => (
                                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all">
                                    <div className="flex items-center gap-4">
                                      <div className={`w-2 h-2 rounded-full ${
                                        t.priority === 'High' ? 'bg-red-500' :
                                        t.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'
                                      }`} />
                                      <div>
                                        <div className="text-sm font-medium">{t.task}</div>
                                        <div className="text-[10px] text-slate-500">{t.client}</div>
                                      </div>
                                    </div>
                                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                      <CheckCircle2 className="w-4 h-4 text-slate-400" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Upcoming Deadlines */}
                            <div className="glass-card p-8 rounded-3xl">
                              <h3 className="text-xl font-medium mb-8">Upcoming Deadlines</h3>
                              <div className="space-y-4">
                                {[
                                  { item: 'Design V2 Approval', date: 'Mar 26', status: 'Pending' },
                                  { item: 'Beta Launch', date: 'Mar 28', status: 'On Track' },
                                  { item: 'Client Sync', date: 'Mar 30', status: 'Scheduled' }
                                ].map((d, i) => (
                                  <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                      <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex flex-col items-center justify-center text-[10px] font-bold">
                                        <span className="text-indigo-400">{d.date.split(' ')[0]}</span>
                                        <span>{d.date.split(' ')[1]}</span>
                                      </div>
                                      <div className="text-sm font-medium">{d.item}</div>
                                    </div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{d.status}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {portalView === 'client-management' && (
                    <motion.div
                      key="client-management"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-6 md:p-10 max-w-6xl mx-auto w-full"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div>
                          <h2 className="text-2xl md:text-3xl font-semibold mb-2">Client Management</h2>
                          <p className="text-sm md:text-base text-slate-500">Configure client profiles and feature access.</p>
                        </div>
                        <button 
                          onClick={() => setPortalView('admin-dashboard')}
                          className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm self-start md:self-auto"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Back to Dashboard
                        </button>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
                        <div className="lg:col-span-1 space-y-3 md:space-y-4">
                          <div className="flex flex-col gap-3">
                            {clients.map(client => (
                              <button
                                key={client.id}
                                onClick={() => setSelectedClientId(client.id)}
                                className={`w-full p-4 rounded-2xl text-left transition-all ${
                                  selectedClientId === client.id 
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                                    : 'glass-card hover:bg-white/5 text-slate-400'
                                }`}
                              >
                                <div className="font-medium text-sm md:text-base">{client.name}</div>
                                <div className="text-[9px] md:text-[10px] uppercase tracking-widest mt-1 opacity-60">{client.stage}</div>
                              </button>
                            ))}
                          </div>
                          <button 
                            onClick={handleAddClient}
                            className="w-full p-4 rounded-2xl border border-dashed border-white/10 text-slate-500 hover:text-white hover:border-white/20 transition-all text-sm flex items-center justify-center gap-2"
                          >
                            <Plus className="w-4 h-4" />
                            Add Client
                          </button>
                        </div>

                        <div className="lg:col-span-3">
                          {managedClient ? (
                            <div className="space-y-6 md:space-y-8">
                              <div className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                                  <h3 className="text-lg md:text-xl font-medium">Client Profile: {managedClient.name}</h3>
                                  <button 
                                    onClick={() => handleImpersonate(managedClient.id)}
                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm w-full sm:w-auto"
                                  >
                                    <Monitor className="w-4 h-4" />
                                    Impersonate View
                                  </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                  <div className="space-y-6">
                                    <div>
                                      <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 block">Current Stage</label>
                                      <div className="flex flex-wrap gap-2">
                                        {(['discovery', 'design', 'development', 'live'] as ClientStage[]).map(stage => (
                                          <button
                                            key={stage}
                                            onClick={() => handleUpdateClientStage(managedClient.id, stage)}
                                            className={`px-3 py-1.5 rounded-lg text-[10px] md:text-xs font-medium transition-all ${
                                              managedClient.stage === stage 
                                                ? 'bg-indigo-600 text-white' 
                                                : 'bg-white/5 text-slate-500 hover:bg-white/10'
                                            }`}
                                          >
                                            {stage.charAt(0).toUpperCase() + stage.slice(1)}
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 block">Feature Permissions</label>
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {['dashboard', 'crm', 'website', 'analytics', 'support', 'onboarding', 'collaboration', 'aqua-ai', 'workspaces', 'company', 'data-hub', 'your-plan'].map(perm => (
                                          <label key={perm} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                                            <input 
                                              type="checkbox" 
                                              checked={managedClient.permissions.includes(perm as any)}
                                              onChange={(e) => {
                                                const newPerms = e.target.checked 
                                                  ? [...managedClient.permissions, perm as any]
                                                  : managedClient.permissions.filter(p => p !== perm);
                                                setClients(prev => prev.map(c => c.id === managedClient.id ? { ...c, permissions: newPerms } : c));
                                              }}
                                              className="w-4 h-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span className="text-xs md:text-sm capitalize">{perm.replace('-', ' ')}</span>
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="space-y-6">
                                    <div>
                                      <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 block">Discovery Status</label>
                                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="flex items-center justify-between mb-2">
                                          <span className="text-sm">Questions Answered</span>
                                          <span className="text-sm font-medium text-indigo-400">
                                            {Object.keys(managedClient.discoveryAnswers || {}).length} / 12
                                          </span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                          <div 
                                            className="h-full bg-indigo-500" 
                                            style={{ width: `${(Object.keys(managedClient.discoveryAnswers || {}).length / 12) * 100}%` }}
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <div className="flex items-center justify-between mb-2">
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Client Resources</label>
                                        <button 
                                          onClick={() => {
                                            const name = prompt('Resource Name:');
                                            if (!name) return;
                                            const newResource = { name, url: '#', type: 'document' };
                                            setClients(prev => prev.map(c => c.id === managedClient.id ? { ...c, resources: [...c.resources, newResource] } : c));
                                            addLog('Client Update', `Uploaded resource ${name} for ${managedClient.name}`, 'action', managedClient.id);
                                          }}
                                          className="text-[10px] text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-widest"
                                        >
                                          + Upload
                                        </button>
                                      </div>
                                      <div className="space-y-2 mb-6">
                                        {(managedClient.resources || []).length === 0 ? (
                                          <p className="text-xs text-slate-600 italic">No resources uploaded yet.</p>
                                        ) : (
                                          (managedClient.resources || []).map((res, i) => (
                                            <div key={`${res.name}-${i}`} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                                              <span className="text-sm truncate mr-2">{res.name}</span>
                                              <Download className="w-4 h-4 text-slate-500" />
                                            </div>
                                          ))
                                        )}
                                      </div>

                                      <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-2 block">Assigned Employees</label>
                                      <div className="space-y-2">
                                        {users.filter(u => u.role === 'AgencyEmployee').map(employee => (
                                          <label key={employee.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                                            <input 
                                              type="checkbox" 
                                              checked={managedClient.assignedEmployees?.includes(employee.id)}
                                              onChange={(e) => {
                                                const currentAssigned = managedClient.assignedEmployees || [];
                                                const newAssigned = e.target.checked 
                                                  ? [...currentAssigned, employee.id]
                                                  : currentAssigned.filter(id => id !== employee.id);
                                                setClients(prev => prev.map(c => c.id === managedClient.id ? { ...c, assignedEmployees: newAssigned } : c));
                                                addLog('Client Update', `Assigned ${employee.name} to ${managedClient.name}`, 'action', managedClient.id);
                                              }}
                                              className="w-4 h-4 rounded border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <div className="flex items-center gap-2">
                                              <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-[8px] font-bold text-indigo-400">
                                                {employee.avatar || employee.name.charAt(0)}
                                              </div>
                                              <span className="text-sm">{employee.name}</span>
                                            </div>
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="h-full flex flex-col items-center justify-center glass-card rounded-3xl p-12 text-center">
                              <Users className="w-12 h-12 text-slate-700 mb-4" />
                              <h3 className="text-xl font-medium mb-2">Select a Client</h3>
                              <p className="text-sm text-slate-500 max-w-xs">
                                Choose a client from the list on the left to manage their profile, stage, and permissions.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {portalView === 'dashboard' && (
                    <motion.div
                      key="dashboard"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-4 md:p-6 lg:p-10 max-w-6xl mx-auto w-full"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10">
                        <div>
                          <h1 className="text-2xl md:text-3xl font-semibold mb-2">Dashboard Overview</h1>
                          <p className="text-sm md:text-base text-slate-500">Welcome back, {userProfile.name}. Here's what's happening today.</p>
                        </div>
                        <div className="flex items-center gap-3">
                          {currentUser?.role === 'ClientOwner' && (
                            <button 
                              onClick={() => setShowAddUserModal(true)}
                              className="flex-1 md:flex-none px-4 md:px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl border border-white/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2 text-xs md:text-sm shadow-lg"
                            >
                              <Users className="w-4 h-4" />
                              Manage Team
                            </button>
                          )}
                          <div className="px-4 py-2.5 glass-card rounded-xl flex items-center gap-2 border border-white/5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] md:text-xs font-medium">Live Traffic</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
                        <div className="glass-card p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-indigo-500/20 rounded-lg group-hover:scale-110 transition-transform">
                              <Users className="w-5 h-5 text-indigo-400" />
                            </div>
                            <span className="text-xs text-emerald-400 font-medium">+12%</span>
                          </div>
                          <div className="text-xl md:text-2xl font-bold mb-1">2,845</div>
                          <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">Total Users</div>
                        </div>
                        <div className="glass-card p-5 md:p-6 rounded-2xl md:rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-cyan-500/20 rounded-lg group-hover:scale-110 transition-transform">
                              <Globe className="w-5 h-5 text-cyan-400" />
                            </div>
                            <span className="text-xs text-emerald-400 font-medium">+5.2%</span>
                          </div>
                          <div className="text-xl md:text-2xl font-bold mb-1">45.2k</div>
                          <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">Page Views</div>
                        </div>
                        <div className="glass-card p-5 md:p-6 rounded-2xl md:rounded-3xl sm:col-span-2 md:col-span-1 border border-white/5 hover:border-white/10 transition-all group">
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-purple-500/20 rounded-lg group-hover:scale-110 transition-transform">
                              <Zap className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="text-xs text-red-400 font-medium">-2%</span>
                          </div>
                          <div className="text-xl md:text-2xl font-bold mb-1">1.2s</div>
                          <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-bold">Avg. Load Time</div>
                        </div>
                      </div>

                      <div className="glass-card p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] mb-8 md:mb-10 border border-white/5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 md:mb-8">
                          <h3 className="text-lg font-medium">Growth Analytics</h3>
                          <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs outline-none self-start sm:self-auto focus:border-indigo-500 transition-colors">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                          </select>
                        </div>
                        <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dashboardData}>
                              <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                              <XAxis 
                                dataKey="name" 
                                stroke="#64748b" 
                                fontSize={10} 
                                tickLine={false} 
                                axisLine={false} 
                                dy={10}
                              />
                              <YAxis 
                                stroke="#64748b" 
                                fontSize={10} 
                                tickLine={false} 
                                axisLine={false} 
                                tickFormatter={(value) => `${value}`}
                              />
                              <Tooltip 
                                contentStyle={{ 
                                  backgroundColor: '#0f172a', 
                                  border: '1px solid rgba(255,255,255,0.1)',
                                  borderRadius: '12px',
                                  fontSize: '12px'
                                }}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#6366f1" 
                                strokeWidth={3}
                                fillOpacity={1} 
                                fill="url(#colorValue)" 
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {portalView === 'aqua-ai' && (
                  <motion.div
                    key="aqua-ai"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full w-full flex flex-col relative"
                  >
                    {/* Subtle Aqua Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-cyan-500/5 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none z-0" />

                    {/* Chat Header */}
                    <div className="p-4 md:p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-black/20 backdrop-blur-md z-10">
                      <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                        </div>
                        <div>
                          <h2 className="text-base md:text-xl font-semibold tracking-tight">Aqua AI</h2>
                          <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 md:w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-widest font-bold">System Online</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 self-end sm:self-auto">
                        <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
                          <Zap className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
                          <Settings className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6 custom-scrollbar z-10">
                      {messages.map((msg, i) => (
                        <div key={msg.id || i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[90%] sm:max-w-[80%] p-3 md:p-4 rounded-2xl ${
                            msg.role === 'user' 
                              ? 'bg-indigo-600/20 border border-indigo-500/30 rounded-tr-none' 
                              : 'glass-card border-cyan-500/20 rounded-tl-none'
                          }`}>
                            <p className="text-xs md:text-sm leading-relaxed">
                              {msg.text}
                            </p>
                            <span className={`text-[9px] md:text-[10px] mt-2 block ${msg.role === 'user' ? 'text-indigo-400/60' : 'text-slate-500'}`}>
                              {msg.time}
                            </span>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Quick Actions */}
                    <div className="px-4 md:px-8 py-3 md:py-4 flex gap-2 md:gap-3 overflow-x-auto custom-scrollbar no-scrollbar z-10">
                      <button 
                        onClick={() => setInputMessage("Analyze CRM Data")}
                        className="whitespace-nowrap px-3 md:px-4 py-1.5 md:py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] md:text-xs text-slate-400 transition-all"
                      >
                        Analyze CRM Data
                      </button>
                      <button 
                        onClick={() => setInputMessage("Check Billing Status")}
                        className="whitespace-nowrap px-3 md:px-4 py-1.5 md:py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] md:text-xs text-slate-400 transition-all"
                      >
                        Check Billing Status
                      </button>
                      <button 
                        onClick={() => handleViewChange('updates')}
                        className="whitespace-nowrap px-3 md:px-4 py-1.5 md:py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] md:text-xs text-slate-400 transition-all"
                      >
                        Planned Updates
                      </button>
                      <button 
                        onClick={() => handleViewChange('support')}
                        className="whitespace-nowrap px-3 md:px-4 py-1.5 md:py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] md:text-xs text-slate-400 transition-all"
                      >
                        Support Hub
                      </button>
                    </div>

                    {/* Input Area */}
                    <div className="p-8 pt-0 z-10">
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-2xl blur opacity-20 group-focus-within:opacity-40 transition duration-1000"></div>
                        <form 
                          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                          className="relative flex items-center bg-black/40 border border-white/10 rounded-2xl p-2 backdrop-blur-xl"
                        >
                          <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Ask Aqua AI anything..."
                            className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm placeholder:text-slate-600"
                          />
                          <button 
                            type="submit"
                            className="w-10 h-10 bg-cyan-600 hover:bg-cyan-500 rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-cyan-500/20"
                          >
                            <Send className="w-5 h-5 text-white" />
                          </button>
                        </form>
                      </div>
                      <p className="text-[10px] text-slate-600 text-center mt-4 tracking-wide uppercase">
                        Aqua AI is trained on your company data. Check important info.
                      </p>
                    </div>
                  </motion.div>
                )}


                {portalView === 'resources' && (
                  <motion.div
                    key="resources"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full w-full p-6 md:p-10 overflow-y-auto custom-scrollbar"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Resources</h2>
                        <p className="text-sm md:text-base text-slate-500">Training materials, documentation, and helpful guides.</p>
                      </div>
                      <button 
                        onClick={() => handleViewChange('support')}
                        className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm self-start md:self-auto"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Help
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[
                        { title: 'Getting Started Guide', category: 'Basics', icon: BookOpen, description: 'Learn the fundamentals of navigating and using the portal.' },
                        { title: 'CRM Best Practices', category: 'Training', icon: Users, description: 'Optimize your workflow with our recommended CRM strategies.' },
                        { title: 'Security Protocols', category: 'Compliance', icon: Shield, description: 'Understand how we protect your data and privacy.' },
                        { title: 'API Documentation', category: 'Technical', icon: Zap, description: 'Detailed technical guides for integrating with our systems.' },
                        { title: 'Brand Guidelines', category: 'Marketing', icon: Globe, description: 'Assets and rules for using our company branding.' },
                        { title: 'Video Tutorials', category: 'Multimedia', icon: Play, description: 'Step-by-step video walkthroughs of key features.' }
                      ].map((resource, i) => (
                        <div key={i} className="glass-card p-6 rounded-3xl hover:bg-white/5 transition-all group cursor-pointer border border-white/5 hover:border-indigo-500/30">
                          <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <resource.icon className="w-6 h-6 text-indigo-400" />
                          </div>
                          <div className="text-[10px] uppercase tracking-widest font-bold text-indigo-400/60 mb-1">{resource.category}</div>
                          <h3 className="text-lg font-medium mb-2">{resource.title}</h3>
                          <p className="text-xs text-slate-500 leading-relaxed mb-4">{resource.description}</p>
                          <div className="flex items-center gap-2 text-xs font-medium text-indigo-400 group-hover:translate-x-1 transition-transform">
                            View Resource
                            <ChevronRight className="w-3 h-3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {portalView === 'discover' && (
                  <motion.div
                    key="discover"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="h-full flex flex-col items-center justify-center p-10"
                  >
                    <Globe className="w-16 h-16 text-indigo-400 mb-6" />
                    <h1 className="text-4xl font-light tracking-widest text-white uppercase mb-4">Discover My Company</h1>
                    <p className="text-slate-500 mb-8">Internal insights and structure.</p>
                    <button 
                      onClick={() => handleViewChange('company')}
                      className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Company Hub
                    </button>
                  </motion.div>
                )}

                {portalView === 'crm' && (
                  <motion.div
                    key="crm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full w-full p-6 md:p-10 flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <button 
                        onClick={() => handleViewChange('workspaces')}
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Workspaces
                      </button>
                    </div>
                    <div className="flex-1 w-full rounded-3xl glass-card overflow-hidden flex flex-col">
                      <div className="p-6 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-indigo-400" />
                          <h2 className="text-lg font-medium">CRM Portal</h2>
                        </div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest">Secure Connection</div>
                      </div>
                      <div className="flex-1 bg-black/40 flex items-center justify-center text-slate-500 italic">
                        <div className="text-center p-10">
                          <div className="relative w-24 h-24 mx-auto mb-8">
                            <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-2xl animate-pulse"></div>
                            <Users className="relative w-full h-full text-indigo-400/40" />
                          </div>
                          <h3 className="text-xl font-medium text-white not-italic mb-2">CRM Interface</h3>
                          <p className="max-w-xs mx-auto mb-8">Your customer relationship management tools are being synchronized with the portal.</p>
                          <button 
                            onClick={() => alert('Opening CRM in new tab...')}
                            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-white transition-all flex items-center gap-2 mx-auto"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Open CRM External
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {portalView === 'website' && (
                  <motion.div
                    key="website"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full w-full p-6 md:p-10 flex flex-col gap-8"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex items-center gap-4 md:gap-6">
                        <button 
                          onClick={() => handleViewChange('workspaces')}
                          className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex items-center gap-3">
                          <Globe className="w-6 h-6 text-indigo-400" />
                          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Website Editor</h2>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                          onClick={() => alert('Report generation started...')}
                          className="w-full sm:w-auto px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                        >
                          <FileText className="w-4 h-4" />
                          Run a report
                        </button>
                        <button 
                          onClick={() => handleViewChange('dashboard')}
                          className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
                        >
                          <BarChart3 className="w-4 h-4" />
                          Analytics dashboard
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 rounded-3xl glass-card overflow-hidden flex flex-col">
                      <div className="flex-1 bg-black/40 flex items-center justify-center text-slate-500 italic">
                        <div className="text-center p-10">
                          <div className="relative w-24 h-24 mx-auto mb-8">
                            <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl animate-pulse"></div>
                            <Globe className="relative w-full h-full text-cyan-400/40" />
                          </div>
                          <h3 className="text-xl font-medium text-white not-italic mb-2">Website Editor</h3>
                          <p className="max-w-xs mx-auto mb-8">The visual editor is preparing your workspace. This usually takes a few seconds.</p>
                          <div className="flex gap-4 justify-center">
                            <button 
                              onClick={() => alert('Launching editor...')}
                              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-600/20"
                            >
                              Launch Editor
                            </button>
                            <button 
                              onClick={() => handleExportWebsite()}
                              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm text-white transition-all"
                            >
                              Download Backup
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {portalView === 'logs' && (
                  <motion.div
                    key="logs"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="h-full w-full p-6 md:p-10 overflow-y-auto"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-2">Activity Logs</h2>
                        <p className="text-sm md:text-base text-slate-400">Monitor system activity and user actions.</p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-500 transition-colors text-white w-full sm:w-auto">
                          <option value="all">All Types</option>
                          <option value="auth">Authentication</option>
                          <option value="impersonation">Impersonation</option>
                          <option value="action">Actions</option>
                          <option value="system">System</option>
                        </select>
                        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-medium transition-colors w-full sm:w-auto">
                          Export Logs
                        </button>
                      </div>
                    </div>

                    <div className="glass-card rounded-3xl overflow-hidden border border-white/5">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-white/5 bg-white/5">
                              <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Timestamp</th>
                              <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">User</th>
                              <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Action</th>
                              <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Details</th>
                              <th className="p-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">Type</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {(isAgencyAdmin ? activityLogs : activityLogs.filter(l => l.clientId === currentUser?.clientId || l.userId === currentUser?.id)).map((log) => (
                              <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                                <td className="p-4 text-sm text-slate-400 font-mono whitespace-nowrap">
                                  {new Date(log.timestamp).toLocaleString()}
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-400">
                                      {((log.userName || '').split(' ') || []).map(n => n[0]).join('')}
                                    </div>
                                    <span className="text-sm font-medium whitespace-nowrap">{log.userName}</span>
                                  </div>
                                </td>
                                <td className="p-4 text-sm font-medium whitespace-nowrap">{log.action}</td>
                                <td className="p-4 text-sm text-slate-400 min-w-[300px]">{log.details}</td>
                                <td className="p-4">
                                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    log.type === 'auth' ? 'bg-blue-500/10 text-blue-400' :
                                    log.type === 'impersonation' ? 'bg-purple-500/10 text-purple-400' :
                                    log.type === 'action' ? 'bg-green-500/10 text-green-400' :
                                    'bg-slate-500/10 text-slate-400'
                                  }`}>
                                    {log.type}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}




                <PlanModal 
                  isOpen={showPlanModal}
                  onClose={() => setShowPlanModal(false)}
                />

                <EmployeeManagementModal 
                  isOpen={showEmployeeManagementModal}
                  onClose={() => setShowEmployeeManagementModal(false)}
                  onAddUser={() => {
                    setShowEmployeeManagementModal(false);
                    setShowAddUserModal(true);
                  }}
                  onDeleteUser={handleDeleteUser}
                />

                <EmployeeProfileModal 
                  isOpen={showEmployeeProfileModal} 
                  onClose={() => setShowEmployeeProfileModal(false)}
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  currentUser={currentUser}
                  isEditingProfile={isEditingProfile}
                  setIsEditingProfile={setIsEditingProfile}
                  users={users}
                  setUsers={setUsers}
                  addLog={addLog}
                />

                <AgencyCommunicateModal 
                  isOpen={showAgencyCommunicateModal}
                  onClose={() => setShowAgencyCommunicateModal(false)}
                />

                {portalView === 'support-tickets' && (
                  <motion.div
                    key="support-tickets"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full w-full p-4 md:p-6 lg:p-10 overflow-y-auto custom-scrollbar"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-semibold">Support Tickets</h2>
                        <p className="text-sm md:text-base text-slate-400">Track and manage client requests and internal issues.</p>
                      </div>
                      <button 
                        onClick={() => setShowTicketModal(true)}
                        className="w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
                      >
                        <Plus className="w-4 h-4" />
                        New Ticket
                      </button>
                    </div>

                    <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden border border-white/5">
                      <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left min-w-[700px]">
                          <thead>
                            <tr className="text-slate-500 text-[10px] md:text-xs uppercase tracking-widest border-b border-white/5 bg-white/[0.02]">
                              <th className="px-6 md:px-8 py-4 font-semibold">ID</th>
                              <th className="px-6 md:px-8 py-4 font-semibold">Ticket Details</th>
                              <th className="px-6 md:px-8 py-4 font-semibold">Type</th>
                              <th className="px-6 md:px-8 py-4 font-semibold">Status</th>
                              <th className="px-6 md:px-8 py-4 font-semibold text-right">Created By</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {tickets.map(ticket => (
                              <tr key={ticket.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-6 md:px-8 py-4 font-medium text-indigo-400 text-sm">{ticket.id}</td>
                                <td className="px-6 md:px-8 py-4">
                                  <div className="font-medium text-sm md:text-base group-hover:text-indigo-300 transition-colors">{ticket.title}</div>
                                  <div className={`text-[9px] md:text-[10px] font-bold uppercase tracking-widest mt-1 ${
                                    ticket.priority === 'High' ? 'text-red-400' : 
                                    ticket.priority === 'Medium' ? 'text-amber-400' : 'text-indigo-400'
                                  }`}>
                                    {ticket.priority} Priority
                                  </div>
                                </td>
                                <td className="px-6 md:px-8 py-4">
                                  <span className={`px-2 md:px-3 py-1 text-[8px] md:text-[9px] font-bold rounded-full uppercase tracking-widest border ${
                                    ticket.type === 'client' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-slate-500/10 text-slate-400 border-white/5'
                                  }`}>
                                    {ticket.type}
                                  </span>
                                </td>
                                <td className="px-6 md:px-8 py-4">
                                  <span className={`px-2 md:px-3 py-1 text-[9px] md:text-[10px] font-bold rounded-full uppercase tracking-widest ${
                                    ticket.status === 'Open' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'
                                  }`}>
                                    {ticket.status}
                                  </span>
                                </td>
                                <td className="px-6 md:px-8 py-4 text-right">
                                  <div className="text-xs md:text-sm font-medium">{ticket.creator}</div>
                                  <div className="text-[9px] md:text-[10px] text-slate-500">{new Date(ticket.createdAt).toLocaleDateString()}</div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}

                {portalView === 'project-hub' && (
                  <motion.div
                    key="project-hub"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full w-full p-4 md:p-6 lg:p-10 overflow-y-auto custom-scrollbar"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-semibold">Project Hub</h2>
                        <p className="text-sm md:text-base text-slate-400">Strategic oversight of all agency & client initiatives.</p>
                      </div>
                      <button 
                        onClick={() => setShowNewProjectModal(true)}
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl md:rounded-2xl transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                      >
                        <Plus className="w-5 h-5" />
                        New Project
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                      {projects.map(project => {
                        const client = clients.find(c => c.id === project.clientId);
                        const tasks = projectTasks.filter(t => t.projectId === project.id);
                        const completedTasks = tasks.filter(t => t.status === 'Done').length;
                        const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

                        return (
                          <div key={project.id} className="glass-card p-5 md:p-6 rounded-2xl md:rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-all group cursor-pointer" onClick={() => setPortalView('task-board')}>
                            <div className="flex items-start justify-between mb-4 md:mb-6">
                              <div className="p-2 md:p-3 rounded-xl md:rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                                <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
                              </div>
                              <span className={`text-[9px] md:text-[10px] font-bold px-2 md:px-3 py-1 rounded-full uppercase tracking-widest ${
                                project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                              }`}>
                                {project.status}
                              </span>
                            </div>
                            <h3 className="text-lg md:text-xl font-semibold mb-2 truncate group-hover:text-indigo-400 transition-colors">{project.name}</h3>
                            <p className="text-xs md:text-sm text-slate-500 line-clamp-2 mb-4 md:mb-6">{project.description}</p>
                            
                            <div className="space-y-4">
                              <div className="flex items-center justify-between text-[10px] md:text-xs">
                                <span className="text-slate-500">Client</span>
                                <span className="text-slate-300 font-medium truncate ml-2">{client?.name || 'Internal'}</span>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                  <span>Progress</span>
                                  <span>{Math.round(progress)}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {portalView === 'task-board' && (
                  <motion.div
                    key="task-board"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full w-full p-4 md:p-6 lg:p-10 overflow-hidden flex flex-col"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10 shrink-0">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <button onClick={() => setPortalView('project-hub')} className="p-2 hover:bg-white/5 rounded-xl transition-all active:scale-90">
                            <ArrowLeft className="w-5 h-5 text-slate-400" />
                          </button>
                          <h2 className="text-2xl md:text-3xl font-semibold">Active Tasks</h2>
                        </div>
                        <p className="text-sm md:text-base text-slate-400 ml-0 md:ml-12">Kanban board for operational execution.</p>
                      </div>
                      <button 
                        onClick={() => setShowNewTaskModal(true)}
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl md:rounded-2xl border border-white/10 transition-all active:scale-[0.98] shadow-lg"
                      >
                        <Plus className="w-5 h-5 text-indigo-400" />
                        Create Task
                      </button>
                    </div>

                    <div className="flex-1 flex gap-4 md:gap-6 overflow-x-auto pb-4 custom-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                      {(['Backlog', 'In Progress', 'Review', 'Done'] as const).map(status => (
                        <div key={status} className="w-[280px] md:w-80 shrink-0 flex flex-col">
                          <div className="flex items-center justify-between mb-4 px-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                status === 'Backlog' ? 'bg-slate-500' :
                                status === 'In Progress' ? 'bg-indigo-500' :
                                status === 'Review' ? 'bg-amber-500' : 'bg-emerald-500'
                              }`} />
                              <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest text-slate-400">{status}</h3>
                            </div>
                            <span className="text-[9px] md:text-[10px] font-bold text-slate-600 bg-white/5 px-2 py-0.5 rounded-full">
                              {projectTasks.filter(t => t.status === status).length}
                            </span>
                          </div>
                          
                          <div className="flex-1 space-y-3 md:space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                            {projectTasks.filter(t => t.status === status).map(task => (
                              <motion.div
                                key={task.id}
                                layoutId={task.id}
                                onClick={() => setSelectedTask(task)}
                                className="glass-card p-4 md:p-5 rounded-2xl md:rounded-3xl border border-white/5 hover:border-white/10 transition-all cursor-pointer group"
                              >
                                <div className="flex items-center justify-between mb-3">
                                  <span className={`text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-lg uppercase tracking-widest ${
                                    task.priority === 'High' ? 'text-rose-400 bg-rose-400/10' :
                                    task.priority === 'Medium' ? 'text-amber-400 bg-amber-400/10' : 'text-indigo-400 bg-indigo-400/10'
                                  }`}>
                                    {task.priority}
                                  </span>
                                  <div className="flex -space-x-2">
                                    {task.assigneeId && (
                                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-indigo-600 border border-slate-900 flex items-center justify-center text-[9px] md:text-[10px] font-bold text-white uppercase transform group-hover:scale-110 transition-transform">
                                        {users.find(u => u.id === task.assigneeId)?.avatar}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <h4 className="text-xs md:text-sm font-semibold mb-2 group-hover:text-indigo-400 transition-colors line-clamp-2">{task.title}</h4>
                                <div className="flex items-center gap-3 md:gap-4 text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                  <div className="flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" />
                                    {task.steps.filter(s => s.completed).length}/{task.steps.length}
                                  </div>
                                  {task.attachments.length > 0 && (
                                    <div className="flex items-center gap-1">
                                      <Link2 className="w-3 h-3" />
                                      {task.attachments.length}
                                    </div>
                                  )}
                                  {task.dueDate && (
                                    <div className="flex items-center gap-1 ml-auto">
                                      <Calendar className="w-3 h-3" />
                                      {new Date(task.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {portalView === 'ai-sessions' && (
                  <motion.div
                    key="ai-sessions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full w-full p-4 md:p-6 lg:p-10 overflow-y-auto custom-scrollbar"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-semibold">AI Session Monitor</h2>
                        <p className="text-sm md:text-base text-slate-400">View and analyze all Aqua AI interactions across the platform.</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="w-full md:w-auto px-4 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] md:text-xs font-medium border border-white/5 transition-all active:scale-95">
                          Export All Sessions
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
                      <DashboardWidget icon={Zap} label="Total AI Calls" value="1,284" trend="+12%" color="indigo" />
                      <DashboardWidget icon={Clock} label="Avg Response Time" value="1.2s" trend="-5%" color="emerald" />
                      <DashboardWidget icon={MessageSquare} label="Active Sessions" value="42" trend="+8%" color="amber" />
                    </div>

                    <div className="space-y-4 md:space-y-6">
                      <h3 className="text-lg font-medium mb-4 md:mb-6">Recent Sessions</h3>
                      {aiSessions.map(session => (
                        <div key={session.id} className="glass-card p-4 md:p-6 rounded-2xl md:rounded-3xl space-y-4 border border-white/5">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold shrink-0 text-sm md:text-base">
                                {((session.userName || '').split(' ') || []).map(n => n[0]).join('')}
                              </div>
                              <div className="min-w-0">
                                <div className="font-semibold text-sm md:text-base truncate">{session.userName}</div>
                                <div className="text-[9px] md:text-[10px] text-slate-500 uppercase tracking-widest truncate">{session.id}</div>
                              </div>
                            </div>
                            <span className="text-[10px] md:text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-lg self-start sm:self-auto">{(session.interactions || []).length} Interactions</span>
                          </div>
                          <div className="space-y-3">
                            {(session.interactions || []).map((int, i) => (
                              <div key={`${session.id}-int-${i}`} className="p-3 md:p-4 bg-white/[0.02] rounded-xl md:rounded-2xl border border-white/5 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div className="text-[9px] md:text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Prompt</div>
                                  <div className="text-[9px] md:text-[10px] text-slate-600">{new Date(int.timestamp).toLocaleTimeString()}</div>
                                </div>
                                <p className="text-xs md:text-sm text-slate-400 italic break-words">"{int.prompt}"</p>
                                <div className="pt-2 border-t border-white/5">
                                  <div className="text-[9px] md:text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">AI Response</div>
                                  <p className="text-xs md:text-sm text-slate-300 line-clamp-3 md:line-clamp-2 break-words">{int.response}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}



                {portalView === 'agency-configurator' && (
                  <AgencyConfiguratorView />
                )}
                
                {portalView === 'inbox' && (
                  <InboxView />
                )}

                {portalView === 'agency-clients' && (
                  <AgencyClientsView 
                    clients={clients}
                    setShowAddClientModal={setShowAddClientModal}
                    handleImpersonate={handleImpersonate}
                    onEditClient={handleEditClient}
                    onUpdateClientStage={handleUpdateClientStage}
                  />
                )}

                {portalView === 'agency-hub' && (
                  <motion.div
                    key="agency-hub"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full w-full p-4 md:p-6 lg:p-10 overflow-y-auto custom-scrollbar"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10">
                      <div>
                        <h2 className="text-2xl md:text-3xl font-semibold">Agency Internal CRM</h2>
                        <p className="text-sm md:text-base text-slate-400">Unified command center for agency operations.</p>
                      </div>
                      {currentUser?.role === 'Founder' && (
                        <button
                          onClick={() => handleViewChange('agency-configurator')}
                          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-semibold transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
                        >
                          <Settings className="w-5 h-5" />
                          Agency Configurator
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
                      <DashboardWidget icon={Users} label="Active Team" value={users.length.toString()} trend="+2" color="indigo" />
                      <DashboardWidget icon={Ticket} label="Open Tickets" value={tickets.filter(t => t.status === 'Open').length.toString()} trend="-1" color="emerald" />
                      <DashboardWidget icon={MessageSquare} label="Unread Comms" value="12" trend="+5" color="amber" />
                      <DashboardWidget icon={Zap} label="AI Sessions (24h)" value={aiSessions.length.toString()} trend="+8%" color="indigo" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                      {/* Team Overview Mini-Module */}
                      <div className="glass-card p-4 md:p-6 rounded-2xl md:rounded-3xl">
                        <div className="flex items-center justify-between mb-4 md:mb-6">
                          <h3 className="font-semibold">Team Presence</h3>
                          <button onClick={() => setShowEmployeeManagementModal(true)} className="text-xs text-indigo-400 hover:text-indigo-300">View All</button>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                          {users.slice(0, 4).map(u => (
                            <div key={u.id} className="flex items-center justify-between p-3 bg-white/[0.02] rounded-xl md:rounded-2xl">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold text-xs">
                                  {u.avatar}
                                </div>
                                <span className="text-sm font-medium truncate max-w-[120px] md:max-w-none">{u.name}</span>
                              </div>
                              <span className="text-[9px] md:text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Online</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Recent AI Interactions Mini-Module */}
                      <div className="glass-card p-4 md:p-6 rounded-2xl md:rounded-3xl">
                        <div className="flex items-center justify-between mb-4 md:mb-6">
                          <h3 className="font-semibold">Live AI Stream</h3>
                          <button onClick={() => setPortalView('ai-sessions')} className="text-xs text-indigo-400 hover:text-indigo-300">Auditor</button>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                          {aiSessions.slice(0, 2).map((session, i) => (
                            <div key={session.id} className="p-4 bg-white/[0.02] rounded-xl md:rounded-2xl space-y-2">
                              <div className="flex items-center justify-between text-[9px] md:text-[10px] text-slate-500">
                                <span className="truncate max-w-[100px]">{session.userName}</span>
                                <span>Just now</span>
                              </div>
                              <p className="text-xs text-slate-300 line-clamp-1 italic">"{session.interactions[0].prompt}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {portalView === 'founder-todos' && (
                  <motion.div
                    key="founder-todos"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="h-full w-full p-4 md:p-6 lg:p-10 overflow-y-auto custom-scrollbar"
                  >
                    <div className="max-w-4xl mx-auto">
                      <div className="flex items-center justify-between mb-8 md:mb-12">
                        <div>
                          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-2">My Task Center</h2>
                          <p className="text-sm md:text-base text-slate-400">Founder oversight and strategic priorities.</p>
                        </div>
                        <button 
                          onClick={() => {
                            const text = prompt('Task description:');
                            if (text) setTodos([...todos, { id: Date.now().toString(), text, completed: false, priority: 'Medium', category: 'General' }]);
                          }}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                        >
                          <Plus className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                      </div>

                      <div className="space-y-6 md:space-y-8">
                        {['High', 'Medium', 'Low'].map(priority => (
                          <div key={priority} className="space-y-3 md:space-y-4">
                            <h3 className={`text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] px-2 ${
                              priority === 'High' ? 'text-rose-400' : priority === 'Medium' ? 'text-amber-400' : 'text-indigo-400'
                            }`}>
                              {priority} Priority
                            </h3>
                            <div className="space-y-2 md:space-y-3">
                              {todos.filter(t => t.priority === priority).map(todo => (
                                <motion.div 
                                  key={todo.id}
                                  layout
                                  className={`glass-card p-4 md:p-6 rounded-2xl md:rounded-3xl flex items-center gap-3 md:gap-6 group transition-all border border-white/5 hover:border-white/10 ${todo.completed ? 'opacity-50' : ''}`}
                                >
                                  <button 
                                    onClick={() => setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t))}
                                    className={`w-5 h-5 md:w-6 md:h-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 ${
                                      todo.completed ? 'bg-indigo-600 border-indigo-600' : 'border-white/10 hover:border-indigo-500'
                                    }`}
                                  >
                                    {todo.completed && <CheckSquare className="w-3 h-3 md:w-4 md:h-4 text-white" />}
                                  </button>
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm md:text-lg font-medium transition-all break-words ${todo.completed ? 'line-through text-slate-500' : 'text-slate-100 group-hover:text-indigo-300'}`}>
                                      {todo.text}
                                    </p>
                                    <div className="flex items-center gap-3 mt-1">
                                      <span className="text-[8px] md:text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-slate-500 font-bold uppercase tracking-widest">{todo.category}</span>
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {portalView === 'global-activity' && (
                  <motion.div
                    key="global-activity"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full w-full p-4 md:p-6 lg:p-10 overflow-y-auto custom-scrollbar"
                  >
                    <div className="max-w-5xl mx-auto w-full">
                      <div className="mb-8 md:mb-12">
                        <h2 className="text-2xl md:text-3xl font-semibold mb-2 tracking-tight">Platform Activity Monitor</h2>
                        <p className="text-sm md:text-base text-slate-400">Real-time audit log of all events across the agency.</p>
                      </div>

                      <div className="glass-card rounded-2xl md:rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
                        <div className="p-4 md:p-8 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.01]">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-sm font-medium">Global Event Stream</span>
                          </div>
                          <div className="flex gap-2">
                             <div className="px-3 py-1 bg-white/5 rounded-full text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest border border-white/5">Live Updates Enabled</div>
                          </div>
                        </div>
                        <div className="divide-y divide-white/5">
                          {activityLogs.map(log => (
                            <div key={log.id} className="p-4 md:p-6 flex items-start md:items-center gap-4 md:gap-6 hover:bg-white/[0.02] transition-all group">
                              <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-indigo-600/10 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                                <Activity className="w-5 h-5 md:w-6 md:h-6" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                                  <span className="font-bold text-xs md:text-base truncate group-hover:text-indigo-400 transition-colors">{log.userName}</span>
                                  <span className="text-[9px] md:text-xs text-slate-500 font-medium">{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                                  <p className="text-[11px] md:text-sm text-slate-300 break-words line-clamp-2 md:line-clamp-none flex-1">{log.action}</p>
                                  <span className="hidden sm:block w-1 h-1 rounded-full bg-slate-600 shrink-0" />
                                  <span className="text-[8px] md:text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-400/10 px-2 py-0.5 rounded shrink-0">{log.module}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {portalView === 'global-settings' && <GlobalSettingsView />}


                {portalView === 'feature-request' && (
                  <motion.div
                    key="feature-request"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="h-full w-full p-4 md:p-6 lg:p-10 flex flex-col items-center justify-center max-w-2xl mx-auto"
                  >
                    <AnimatePresence mode="wait">
                      {!feedbackSubmitted ? (
                        <motion.div
                          key="form"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="w-full flex flex-col items-center"
                        >
                          <div className="w-14 h-14 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-indigo-600/20 flex items-center justify-center mb-6 md:mb-8">
                            <Lightbulb className="w-7 h-7 md:w-10 md:h-10 text-indigo-400" />
                          </div>
                          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-center tracking-tight">Submit a Feature</h2>
                          <p className="text-xs md:text-base text-slate-400 text-center mb-8 md:mb-10 max-w-md">Help us shape the future of the portal. Share your ideas and suggestions with our product team.</p>
                          
                          <div className="w-full space-y-4 md:space-y-6">
                            <div className="space-y-2">
                              <label className="text-[10px] md:text-[11px] uppercase tracking-widest font-semibold text-slate-500 ml-1">Feature Title</label>
                              <input
                                type="text"
                                placeholder="e.g., Dark mode for editor"
                                className="w-full px-4 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 text-sm md:text-base text-white"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] md:text-[11px] uppercase tracking-widest font-semibold text-slate-500 ml-1">Description</label>
                              <textarea
                                rows={4}
                                placeholder="Tell us more about how this feature would help you..."
                                className="w-full px-4 py-3 md:py-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-600 resize-none text-sm md:text-base text-white"
                              />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                              <button 
                                onClick={() => handleViewChange('support')}
                                className="w-full sm:flex-1 py-3 md:py-4 bg-white/5 hover:bg-white/10 rounded-xl font-semibold transition-all text-sm md:text-base"
                              >
                                Cancel
                              </button>
                              <button 
                                onClick={() => {
                                  setFeedbackSubmitted(true);
                                  setTimeout(() => {
                                    setFeedbackSubmitted(false);
                                    handleViewChange('support');
                                  }, 3000);
                                }}
                                className="w-full sm:flex-2 py-3 md:py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-indigo-600/20 text-sm md:text-base"
                              >
                                Submit Proposal
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center"
                        >
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6 md:mb-8 mx-auto">
                            <CheckCircle2 className="w-8 h-8 md:w-10 md:h-10 text-emerald-400" />
                          </div>
                          <h2 className="text-2xl md:text-4xl font-semibold mb-3 md:mb-4">Thank you!</h2>
                          <p className="text-sm md:text-base text-slate-400 max-w-sm mx-auto">Your feedback has been received. We'll review your request and get back to you as soon as possible.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </main>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add User Modal */}
      <AnimatePresence>
        <EditClientModal
          isOpen={showEditClientModal}
          onClose={() => setShowEditClientModal(false)}
          client={editingClient}
          onSave={handleSaveClient}
        />

        <AddClientModal 
          isOpen={showAddClientModal}
          onClose={() => setShowAddClientModal(false)}
          newClientForm={newClientForm}
          setNewClientForm={setNewClientForm}
          handleAddClient={handleAddClient}
        />

        <AddUserModal
          isOpen={showAddUserModal}
          onClose={() => { 
            setShowAddUserModal(false); 
            setSelectedUserToEdit(null); 
            setNewUser({
              name: '',
              email: '',
              role: 'AgencyEmployee',
              customRoleId: undefined,
              permissions: ['dashboard'],
              avatar: '',
              clientId: undefined
            });
          }}
          selectedUserToEdit={selectedUserToEdit}
          newUser={newUser}
          setNewUser={setNewUser}
          currentUser={currentUser}
          clients={clients}
          currentAgency={currentAgency}
          handleAddUser={handleAddUser}
        />

        <TaskDetailModal
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          users={users}
          projectTasks={projectTasks}
          setProjectTasks={setProjectTasks}
        />

        <NewProjectModal
          isOpen={showNewProjectModal}
          onClose={() => setShowNewProjectModal(false)}
          newProjectForm={newProjectForm}
          setNewProjectForm={setNewProjectForm}
          clients={clients}
          handleAddProject={handleAddProject}
        />

        <TaskModal
          isOpen={showNewTaskModal}
          onClose={() => setShowNewTaskModal(false)}
          newTaskForm={newTaskForm}
          setNewTaskForm={setNewTaskForm}
          projects={projects}
          users={users}
          handleAddTask={handleAddTask}
        />

        <TicketModal
          isOpen={showTicketModal}
          onClose={() => setShowTicketModal(false)}
          newTicket={newTicket}
          setNewTicket={setNewTicket}
          userProfile={userProfile}
          currentUser={currentUser}
          tickets={tickets}
          setTickets={setTickets}
          addLog={addLog}
        />

        <SettingsModal
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          onOpenAddUser={() => setShowAddUserModal(true)}
          onOpenAddRole={() => setShowAddRoleModal(true)}
          onEditUser={(user) => {
            setSelectedUserToEdit(user);
            setNewUser({
              name: user.name,
              email: user.email,
              role: user.role,
              customRoleId: user.customRoleId,
              permissions: user.permissions,
              avatar: user.avatar,
              clientId: user.clientId
            });
            setShowAddUserModal(true);
          }}
          onDeleteUser={handleDeleteUser}
          onDeleteRole={handleDeleteRole}
          onExportData={handleExportData}
          onExportWebsite={handleExportWebsite}
          exporting={exporting}
        />

        <ConfirmationModal
          isOpen={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={confirmationConfig.onConfirm}
          title={confirmationConfig.title}
          message={confirmationConfig.message}
          type={confirmationConfig.type}
        />

        <GlobalTasksModal
          isOpen={showGlobalTasksModal}
          onClose={() => setShowGlobalTasksModal(false)}
        />

        <InboxModal
          isOpen={showInboxModal}
          onClose={() => setShowInboxModal(false)}
        />

        <AppLauncherModal
          isOpen={showAppLauncherModal}
          onClose={() => setShowAppLauncherModal(false)}
          handleViewChange={handleViewChange}
          hasPermission={hasPermission}
        />

        <AddRoleModal
          isOpen={showAddRoleModal}
          onClose={() => setShowAddRoleModal(false)}
          newRoleForm={newRoleForm}
          setNewRoleForm={setNewRoleForm}
          handleCreateRole={handleCreateRole}
        />
      </AnimatePresence>
      <RoleSwitcher />
    </div>
    </AppProvider>
    </InboxProvider>
  );
}
