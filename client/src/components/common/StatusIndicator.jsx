import React from 'react';

const StatusIndicator = ({ status = 'online', label, ping = false, size = 'sm' }) => {
  const sizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const colors = {
    online: 'bg-emerald-500',
    standby: 'bg-amber-400',
    offline: 'bg-gray-600',
    alert: 'bg-red-600',
  };

  const dotSize = sizes[size] || sizes.sm;
  const dotColor = colors[status] || colors.online;

  return (
    <div className=\"inline-flex items-center gap-2 font-mono text-xs\">
      <span className=\"relative flex items-center justify-center\">
        {ping && <span className={nimate-ping absolute inline-flex h-full w-full rounded-full opacity-75 \} />}
        <span className={elative inline-flex rounded-full \ \} />
      </span>
      {label && <span className=\"uppercase tracking-wider text-gray-300 font-bold text-[11px]\">{label}</span>}
    </div>
  );
};

export default StatusIndicator;
