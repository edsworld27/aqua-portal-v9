import React from 'react';
import { motion } from 'motion/react';
import { supportViewUI as ui } from './ui';

interface SupportViewProps {
  handleViewChange: (view: any) => void;
}

export const SupportView: React.FC<SupportViewProps> = ({ handleViewChange }) => {
  const HeroIcon = ui.hero.icon;

  return (
    <motion.div
      key={ui.page.motionKey}
      initial={ui.page.animation.initial}
      animate={ui.page.animation.animate}
      className={`${ui.page.layout} ${ui.page.padding} ${ui.page.maxWidth}`}
    >
      {/* Hero */}
      <div className={`${ui.hero.layout} ${ui.hero.gap}`}>
        <HeroIcon className={`${ui.hero.iconSize} ${ui.hero.iconColor} ${ui.hero.iconLayout}`} />
        <h2 className={`${ui.hero.titleSize} ${ui.hero.titleWeight} ${ui.hero.titleGap}`}>{ui.hero.title}</h2>
        <p className={`${ui.hero.subtitleSize} ${ui.hero.subtitleColor}`}>{ui.hero.subtitle}</p>
      </div>

      {/* Option cards */}
      <div className={ui.grid.layout}>
        {ui.options.map((option, i) => {
          const CardIcon = option.icon;
          const handleClick = option.action === 'navigate'
            ? () => handleViewChange(option.target)
            : () => alert(option.alertMessage);

          return (
            <button
              key={i}
              onClick={handleClick}
              className={`${ui.card.padding} glass-card ${ui.card.radius} ${ui.card.bgHover} ${ui.card.transition} ${ui.card.layout}`}
            >
              <CardIcon className={`${ui.card.iconSize} ${ui.card.iconColor} ${ui.card.iconGap} ${ui.card.iconHover}`} />
              <h3 className={`${ui.card.titleSize} ${ui.card.titleWeight} ${ui.card.titleGap}`}>{option.title}</h3>
              <p className={`${ui.card.bodySize} ${ui.card.bodyColor}`}>{option.body}</p>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};
