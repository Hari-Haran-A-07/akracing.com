import React from 'react';

const RadioGroup = ({ options = [], value, onChange, name = 'radio-group', label, className = '' }) => {
  return (
    <div className={ont-mono \}>
      {label && <label className=\"block text-xs uppercase tracking-wider text-gray-400 mb-2 font-semibold\">{label}</label>}
      <div className=\"grid grid-cols-2 md:grid-cols-4 gap-2\">
        {options.map((opt) => {
          const isSelected = opt.value === value;
          return (
            <label
              key={opt.value}
              className={lex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all select-none \}
            >
              <input
                type=\"radio\"
                name={name}
                value={opt.value}
                checked={isSelected}
                onChange={() => onChange(opt.value)}
                className=\"sr-only\"
              />
              <span className={w-3.5 h-3.5 rounded-full border flex items-center justify-center \}>
                {isSelected && <span className=\"w-2 h-2 rounded-full bg-red-600\" />}
              </span>
              <span className=\"uppercase tracking-wider\">{opt.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default RadioGroup;
