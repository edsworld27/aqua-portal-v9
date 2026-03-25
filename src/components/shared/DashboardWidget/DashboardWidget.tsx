import React from 'react';
import { dashboardWidgetUI as ui } from './ui';

interface DashboardWidgetProps {
  icon: any;
  label: string;
  value: string;
  trend: string;
  color: string;
}

export const DashboardWidget: React.FC<DashboardWidgetProps> = ({
  icon: Icon,
  label,
  value,
  trend,
  color,
}) => {
  const isPositive = trend.startsWith('+');

  return (
    <div className={`glass-card ${ui.wrapper.padding} ${ui.wrapper.radius} ${ui.wrapper.border} ${ui.wrapper.borderHover} ${ui.wrapper.transition} ${ui.wrapper.group}`}>

      {/* Header — icon + trend badge */}
      <div className={`${ui.header.layout} ${ui.header.gap}`}>

        {/* Icon */}
        <div className={`${ui.icon.padding} ${ui.icon.radius} ${ui.icon.colorBg(color)} ${ui.icon.colorText(color)} ${ui.icon.hoverScale} ${ui.icon.transition}`}>
          <Icon className={ui.icon.size} />
        </div>

        {/* Trend badge */}
        <div className={`${ui.trend.fontSize} ${ui.trend.fontWeight} ${ui.trend.paddingX} ${ui.trend.paddingY} ${ui.trend.radius} ${isPositive ? `${ui.trend.positiveBg} ${ui.trend.positiveText}` : `${ui.trend.neutralBg} ${ui.trend.neutralText}`}`}>
          {trend}
        </div>

      </div>

      {/* Value */}
      <div className={`${ui.value.fontSize} ${ui.value.fontWeight} ${ui.value.color} ${ui.value.gap}`}>
        {value}
      </div>

      {/* Label */}
      <div className={`${ui.label.fontSize} ${ui.label.color} ${ui.label.transform} ${ui.label.tracking} ${ui.label.fontWeight}`}>
        {label}
      </div>

    </div>
  );
};
