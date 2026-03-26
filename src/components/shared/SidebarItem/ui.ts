// ============================================================
// SidebarItem — UI Variables
// Every visual value for this component lives here.
// Feeds up to: shared/ui.config.ts → uiMaster.ts
// ============================================================

export const sidebarItemUI = {

  // --- Base button ---
  button: {
    layout: 'w-full flex items-center gap-4',
    padding: 'px-4 py-3',
    radius: 'rounded-xl',
    transition: 'transition-all duration-300',
    group: 'group',
    collapsedLayout: 'justify-center',
  },

  // --- Active state ---
  active: {
    bg: 'bg-indigo-600/20',
    text: 'text-indigo-400',
    border: 'border border-indigo-500/30',
  },

  // --- Inactive state ---
  inactive: {
    text: 'text-slate-400',
    bgHover: 'hover:bg-white/5',
    textHover: 'hover:text-white',
    border: 'border border-transparent',
  },

  // --- Icon ---
  icon: {
    size: 'w-5 h-5 shrink-0',
    colorActive: 'text-indigo-400',
    colorHover: 'group-hover:text-white',
  },

  // --- Badge (collapsed mode — dot on icon) ---
  badgeCollapsed: {
    position: 'absolute -top-2 -right-2',
    size: 'min-w-[16px] h-4',
    bg: 'bg-indigo-600',
    text: 'text-[10px] font-bold text-white',
    radius: 'rounded-full',
    layout: 'flex items-center justify-center',
    padding: 'px-1',
    border: 'border border-black',
    shadow: 'shadow-lg',
  },

  // --- Label (expanded mode) ---
  label: {
    animation: { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 } },
    fontWeight: 'font-medium',
    whitespace: 'whitespace-nowrap',
  },

  // --- Badge (expanded mode — inline pill) ---
  badgeExpanded: {
    padding: 'px-2 py-0.5',
    radius: 'rounded-full',
    bg: 'bg-indigo-600/20',
    fontSize: 'text-[10px]',
    fontWeight: 'font-bold',
    text: 'text-indigo-400',
    border: 'border border-indigo-500/20',
  },

};
