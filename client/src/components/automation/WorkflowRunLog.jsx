import React from 'react';

const WorkflowRunLog = ({ logs = [], title = 'Workflow Execution Log' }) => {
  return (
    <div className=\"bg-black/90 border border-gray-800 rounded-xl p-4 font-mono text-xs text-gray-300 shadow-2xl\">
      <div className=\"flex items-center justify-between pb-3 mb-3 border-b border-gray-800\">
        <div className=\"flex items-center gap-2\">
          <span className=\"w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping\" />
          <h4 className=\"font-bold text-white uppercase tracking-wider text-xs\">{title}</h4>
        </div>
        <span className=\"text-gray-500 text-[10px]\">{logs.length} events streamed</span>
      </div>
      <div className=\"max-h-64 overflow-y-auto space-y-1.5 scrollbar-thin scrollbar-thumb-gray-800\">
        {logs.length === 0 ? (
          <div className=\"text-gray-600 italic py-4 text-center\">Awaiting workflow trigger...</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className=\"flex items-start gap-2 leading-relaxed hover:bg-gray-900/50 p-1 rounded\">
              <span className=\"text-red-500/80 select-none\">â¯</span>
              <span className=\"text-gray-400 flex-1 break-all\">{log}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WorkflowRunLog;
