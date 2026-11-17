import { useState } from 'react';

const SearchInput = ({ placeholder = 'Search...', onSearch, className = '', debounceMs = 300 }) => {
  const [value, setValue] = useState('');
  let debounceTimer;

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (onSearch) onSearch(newValue);
    }, debounceMs);
  };

  const handleClear = () => {
    setValue('');
    if (onSearch) onSearch('');
  };

  return (
    <div className={'relative ' + className}>
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-9 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
      />
      {value && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default SearchInput;
