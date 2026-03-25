import React from 'react';
import { ClientStage } from '../types';

interface StageDropdownProps {
  currentStage: ClientStage;
  onUpdate: (stage: ClientStage) => void;
}

export const StageDropdown: React.FC<StageDropdownProps> = ({ currentStage, onUpdate }) => {
  const stages: ClientStage[] = ['discovery', 'design', 'development', 'live'];

  return (
    <select
      value={currentStage}
      onChange={(e) => onUpdate(e.target.value as ClientStage)}
      className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[9px] md:text-xs text-slate-300 uppercase tracking-widest font-bold focus:outline-none focus:border-indigo-500/50 transition-colors"
    >
      {stages.map((stage) => (
        <option key={stage} value={stage} className="bg-slate-900 text-white">
          {stage.charAt(0).toUpperCase() + stage.slice(1)}
        </option>
      ))}
    </select>
  );
};
