import React from 'react';

const StatCard = ({ title, value, unit, delta, isPositive, icon, description, className = '' }) => {
  return (
    <div className={p-5 rounded-2xl bg-gray-900/60 border border-gray-800 backdrop-blur-xl shadow-xl transition-all hover:border-gray-700 \}>
      <div className=\"flex items-center justify-between mb-3\">
        <span className=\"text-xs font-mono uppercase tracking-widest text-gray-400 font-semibold\">
          {title}
        </span>
        {icon && (
          <span className=\"w-8 h-8 rounded-lg bg-gray-800/80 border border-gray-700/60 flex items-center justify-center text-sm\">
            {icon}
          </span>
        )}
      </div>

      <div className=\"flex items-baseline gap-2\">
        <span className=\"text-3xl font-black font-mono tracking-tight text-white\">
          {value}
        </span>
        {unit && (
          <span className=\"text-xs font-mono font-bold text-gray-400\">
            {unit}
          </span>
        )}
      </div>

      {(delta || description) && (
        <div className=\"mt-3 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs font-mono\">
          {delta && (
            <span className={inline-flex items-center gap-1 font-bold \}>
              <span>{isPositive ? 'â–²' : 'â–¼'}</span>
              <span>{delta}</span>
            </span>
          )}
          {description && (
            <span className=\"text-gray-500 text-[11px] truncate max-w-[180px]\">
              {description}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default StatCard;
