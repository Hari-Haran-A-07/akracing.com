import React, { useState, useEffect } from 'react';

const NotificationToastQueue = ({ notifications = [], onDismiss }) => {
  return (
    <div className=\"fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full font-mono text-xs pointer-events-none\">
      {notifications.map((item) => (
        <div
          key={item.id}
          className=\"p-3 rounded-xl bg-gray-900 border border-gray-800 shadow-2xl flex items-center justify-between text-white pointer-events-auto transition-all\"
        >
          <div className=\"flex items-center gap-2\">
            <span className=\"w-2 h-2 rounded-full bg-red-500 animate-pulse\" />
            <span>{item.message}</span>
          </div>
          {onDismiss && (
            <button
              onClick={() => onDismiss(item.id)}
              className=\"text-gray-400 hover:text-white ml-2 font-bold\"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default NotificationToastQueue;
