import React from 'react';
import useCountdown from '../../hooks/useCountdown';

const CountdownTimer = ({ targetDate, title = 'Next Grand Prix', className = '' }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

  const units = [
    { label: 'DAYS', val: days },
    { label: 'HRS', val: hours },
    { label: 'MIN', val: minutes },
    { label: 'SEC', val: seconds },
  ];

  return (
    <div className={p-6 rounded-2xl bg-gray-900/80 border border-gray-800 text-center \}>
      <span className=\"text-xs font-mono uppercase tracking-widest text-red-500 font-bold block mb-3\">
        {title}
      </span>
      {isExpired ? (
        <span className=\"text-2xl font-mono font-black text-emerald-400 animate-pulse\">
          SESSION IN PROGRESS ðŸ
        </span>
      ) : (
        <div className=\"grid grid-cols-4 gap-3\">
          {units.map((u) => (
            <div key={u.label} className=\"bg-black/60 border border-gray-800 rounded-xl p-3\">
              <span className=\"text-2xl md:text-3xl font-black font-mono text-white block\">
                {String(u.val).padStart(2, '0')}
              </span>
              <span className=\"text-[10px] font-mono text-gray-500 uppercase tracking-widest\">
                {u.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
