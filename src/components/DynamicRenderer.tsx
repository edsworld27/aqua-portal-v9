import React from 'react';
import { DashboardWidget } from './shared/DashboardWidget';
import AIChatbot from './AIChatbot';
import { SidebarItem } from './shared/SidebarItem';
import { DesignConcepts } from './collaboration/DesignConcepts/index';
import { ProjectTimeline } from './collaboration/ProjectTimeline/index';
import { ProjectChat } from './collaboration/ProjectChat/index';
import { SyncCard } from './collaboration/SyncCard/index';
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
