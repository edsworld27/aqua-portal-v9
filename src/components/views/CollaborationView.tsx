import React from 'react';
import { motion } from 'motion/react';
import { MessageSquarePlus } from 'lucide-react';
import { DynamicRenderer, ComponentConfig } from '../DynamicRenderer';

const CollaborationView: React.FC = () => {
  const leftColumnConfig: ComponentConfig[] = [
    { component: 'DesignConcepts', props: {} },
    { component: 'ProjectTimeline', props: {} }
  ];

  const rightColumnConfig: ComponentConfig[] = [
    { component: 'ProjectChat', props: {} },
    { component: 'SyncCard', props: {} }
  ];

  return (
    <motion.div
      key="collaboration"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-4 md:p-10 max-w-6xl mx-auto w-full"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 md:mb-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">Collaboration Center</h2>
          <p className="text-sm md:text-base text-slate-500">Review designs, share ideas, and track project progress.</p>
        </div>
        <div className="flex items-center gap-2 text-indigo-400 font-medium self-start md:self-auto text-sm md:text-base">
          <MessageSquarePlus className="w-4 h-4 md:w-5 md:h-5" />
          Active Project
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <DynamicRenderer config={leftColumnConfig} />
        </div>

        <div className="space-y-6 md:space-y-8">
          <DynamicRenderer config={rightColumnConfig} />
        </div>
      </div>
    </motion.div>
  );
};

export default CollaborationView;
