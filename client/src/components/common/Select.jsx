import React, { useState, useRef, useEffect } from 'react';

const Select = ({ options = [], value, onChange, placeholder = 'Select option...', label, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={elative \} ref={containerRef}>
      {label && <label className=\"block text-xs font-mono uppercase tracking-wider text-gray-400 mb-1.5\">{label}</label>}
      <button
        type=\"button\"
        onClick={() => setIsOpen(!isOpen)}
        className=\"w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-left text-sm font-mono text-white flex items-center justify-between hover:border-red-600 transition-colors focus:outline-none\"
      >
        <span className={selectedOption ? 'text-white' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className=\"text-gray-500 text-xs ml-2\">â–¼</span>
      </button>

      {isOpen && (
        <div className=\"absolute z-50 w-full mt-1.5 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800\">
          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={px-4 py-2.5 text-xs font-mono cursor-pointer transition-colors \}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
