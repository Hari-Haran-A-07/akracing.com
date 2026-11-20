import React from 'react';

const Avatar = ({ src, alt = 'Driver', name = 'Ajith Kumar', size = 'md', status = 'online', role = 'GT3 Driver' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-xl',
  };

  const statusColors = {
    online: 'bg-emerald-500',
    inPit: 'bg-amber-400',
    onTrack: 'bg-red-600 animate-ping',
    offline: 'bg-gray-500',
  };

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className=\"relative inline-flex items-center justify-center\">
      <div
        className={ounded-full overflow-hidden border-2 border-red-600/40 bg-gray-900 flex items-center justify-center font-mono font-bold text-white shadow-lg \}
      >
        {src ? (
          <img src={src} alt={alt} className=\"w-full h-full object-cover\" />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {status && (
        <span
          className={bsolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-black \}
          title={Status: \}
        />
      )}
    </div>
  );
};

export default Avatar;
