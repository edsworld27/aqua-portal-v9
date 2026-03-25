import React from 'react';
import { DashboardWidget } from './DashboardWidget';
import AIChatbot from './AIChatbot';
import { SidebarItem } from './SidebarItem';
import { DesignConcepts } from './collaboration/DesignConcepts';
import { ProjectTimeline } from './collaboration/ProjectTimeline';
import { ProjectChat } from './collaboration/ProjectChat';
import { SyncCard } from './collaboration/SyncCard';
// Import other components here

const componentMap: Record<string, React.FC<any>> = {
  DashboardWidget,
  AIChatbot,
  SidebarItem,
  DesignConcepts,
  ProjectTimeline,
  ProjectChat,
  SyncCard,
  // Map other component names here
};

export interface ComponentConfig {
  component: string;
  props: Record<string, any>;
}

interface DynamicRendererProps {
  config: ComponentConfig[];
}

export const DynamicRenderer: React.FC<DynamicRendererProps> = ({ config }) => {
  return (
    <>
      {config.map((item, index) => {
        const Component = componentMap[item.component];
        if (!Component) {
          console.warn(`Component ${item.component} not found`);
          return null;
        }
        return <Component key={index} {...item.props} />;
      })}
    </>
  );
};
