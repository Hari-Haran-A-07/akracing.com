import React from 'react';

const WorkflowMetricsCard = ({ title, value, unit, trend, status = 'nominal' }) => {
  const statusColors = {
    nominal: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
    warning: 'text-amber-400 border-amber-500/20 bg-amber-500/5',
    critical: 'text-red-500 border-red-500/20 bg-red-500/5'
  };

  return (
    <div className={p-4 rounded-xl border backdrop-blur-md \}>
      <span className=\"text-[11px] font-mono text-gray-400 uppercase tracking-widest\">{title}</span>
      <div className=\"flex items-baseline gap-1 mt-2\">
        <span className=\"text-2xl font-black font-mono text-white\">{value}</span>
        {unit && <span className=\"text-xs text-gray-400 font-mono\">{unit}</span>}
      </div>
      {trend && (
        <div className=\"text-[10px] mt-2 font-mono flex items-center gap-1 text-gray-400\">
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};

export default WorkflowMetricsCard;
