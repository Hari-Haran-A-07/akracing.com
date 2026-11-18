import React from 'react';

const TelemetryAnomalyAlert = ({ anomaly, onIntervene }) => {
  if (!anomaly || anomaly.status === 'HEALTHY') return null;

  return (
    <div className=\"border border-red-600/40 bg-red-950/20 rounded-xl p-4 text-white shadow-xl\">
      <div className=\"flex items-center justify-between mb-3\">
        <div className=\"flex items-center gap-2\">
          <span className=\"text-red-500 text-lg animate-pulse\">âš ï¸</span>
          <span className=\"font-mono font-bold text-red-400 text-sm tracking-wider uppercase\">
            Automated Anomaly Interceptor
          </span>
        </div>
        <span className=\"text-xs font-mono px-2 py-0.5 rounded bg-red-600 text-white font-bold\">
          SEVERITY: {anomaly.severityScore}/100
        </span>
      </div>

      <div className=\"space-y-2 mb-4\">
        {anomaly.diagnostics && anomaly.diagnostics.map((diag, i) => (
          <div key={i} className=\"bg-black/50 p-2.5 rounded border border-red-900/40 text-xs font-mono\">
            <div className=\"text-red-300 font-semibold mb-1\">[{diag.component}] {diag.issue}</div>
            <div className=\"text-gray-400\">Action: {diag.recommendation}</div>
          </div>
        ))}
      </div>

      {onIntervene && (
        <button
          onClick={onIntervene}
          className=\"w-full py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors\"
        >
          Execute Automated Safety Protocol
        </button>
      )}
    </div>
  );
};

export default TelemetryAnomalyAlert;
