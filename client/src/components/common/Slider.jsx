import React from 'react';

const Slider = ({ min = 0, max = 100, step = 1, value = 50, onChange, label, unit = '', className = '' }) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={w-full font-mono \}>
      {(label || unit) && (
        <div className=\"flex justify-between items-center mb-2 text-xs\">
          <span className=\"text-gray-400 uppercase tracking-wider\">{label}</span>
          <span className=\"text-white font-bold\">
            {value} {unit}
          </span>
        </div>
      )}
      <div className=\"relative flex items-center\">
        <input
          type=\"range\"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange && onChange(Number(e.target.value))}
          className=\"w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none\"
          style={{
            background: linear-gradient(to right, #dc2626 \%, #1f2937 \%),
          }}
        />
      </div>
    </div>
  );
};

export default Slider;
