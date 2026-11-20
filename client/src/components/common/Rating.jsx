import React from 'react';

const Rating = ({ value = 5, max = 5, icon = 'â˜…', size = 'text-base', className = '', readonly = true, onChange }) => {
  return (
    <div className={inline-flex items-center gap-1 \}>
      {Array.from({ length: max }, (_, i) => {
        const isFilled = i < Math.floor(value);
        return (
          <span
            key={i}
            onClick={() => !readonly && onChange && onChange(i + 1)}
            className={\ \ \}
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
