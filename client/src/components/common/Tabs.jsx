import { useState } from 'react';
import { motion } from 'framer-motion';

const Tabs = ({ tabs = [], defaultActive = 0, onChange, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultActive);

  const handleSelect = (idx) => {
    setActiveTab(idx);
    if (onChange) onChange(idx, tabs[idx]);
  };

  return (
    <div className={w-full \}>
      <div className=\"flex items-center gap-2 border-b border-gray-800 pb-2 overflow-x-auto scrollbar-none\">
        {tabs.map((tab, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={tab.label || idx}
              onClick={() => handleSelect(idx)}
              className={elative px-5 py-2.5 rounded-lg font-mono text-xs uppercase tracking-wider font-bold transition-colors whitespace-nowrap \}
            >
              {tab.icon && <span className=\"mr-2\">{tab.icon}</span>}
              {tab.label}
              {isActive && (
                <motion.div
                  layoutId=\"activeTabIndicator\"
                  className=\"absolute inset-0 bg-red-600/20 border border-red-600 rounded-lg -z-10 shadow-lg shadow-red-600/10\"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
      <div className=\"pt-6\">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;
