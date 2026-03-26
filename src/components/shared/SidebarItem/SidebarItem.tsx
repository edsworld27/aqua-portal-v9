import React from 'react';
import { motion } from 'motion/react';
import { PortalView } from '../../../types';
import { sidebarItemUI as ui } from './ui';

interface SidebarItemProps {
  key?: React.Key;
  view?: PortalView | string;
  icon: any;
  label: string;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
  className?: string;
  badge?: number | string;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  active,
  collapsed,
  onClick,
  className = '',
  badge,
}) => (
  <button
    onClick={onClick}
    title={collapsed ? label : ''}
    className={[
      ui.button.layout,
      ui.button.padding,
      ui.button.radius,
      ui.button.transition,
      ui.button.group,
      active
        ? `${ui.active.bg} ${ui.active.text} ${ui.active.border}`
        : `${ui.inactive.text} ${ui.inactive.bgHover} ${ui.inactive.textHover} ${ui.inactive.border}`,
      collapsed ? ui.button.collapsedLayout : '',
      className,
    ].join(' ')}
  >
    {/* Icon + collapsed badge */}
    <div className="relative">
      <Icon className={`${ui.icon.size} ${active ? ui.icon.colorActive : ui.icon.colorHover}`} />
      {badge !== undefined && collapsed && (
        <span className={`${ui.badgeCollapsed.position} ${ui.badgeCollapsed.size} ${ui.badgeCollapsed.bg} ${ui.badgeCollapsed.text} ${ui.badgeCollapsed.radius} ${ui.badgeCollapsed.layout} ${ui.badgeCollapsed.padding} ${ui.badgeCollapsed.border} ${ui.badgeCollapsed.shadow}`}>
          {badge}
        </span>
      )}
    </div>

    {/* Label + expanded badge */}
    {!collapsed && (
      <div className="flex-1 flex items-center justify-between overflow-hidden">
        <motion.span
          initial={ui.label.animation.initial}
          animate={ui.label.animation.animate}
          className={`${ui.label.fontWeight} ${ui.label.whitespace}`}
        >
          {label}
        </motion.span>
        {badge !== undefined && (
          <span className={`${ui.badgeExpanded.padding} ${ui.badgeExpanded.radius} ${ui.badgeExpanded.bg} ${ui.badgeExpanded.fontSize} ${ui.badgeExpanded.fontWeight} ${ui.badgeExpanded.text} ${ui.badgeExpanded.border}`}>
            {badge}
          </span>
        )}
      </div>
    )}
  </button>
);
