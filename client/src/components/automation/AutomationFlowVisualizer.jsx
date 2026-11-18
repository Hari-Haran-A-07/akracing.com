import React, { useState } from 'react';

const steps = [
  { id: 'ingest', label: 'Telemetry Ingest', icon: 'ðŸ“¡', desc: 'Pub/Sub @ 100Hz' },
  { id: 'eval', label: 'Vertex AI Model', icon: 'ðŸ§ ', desc: 'Anomaly Scorer' },
  { id: 'decision', label: 'Strategy Policy', icon: 'âš¡', desc: 'Cloud Workflows' },
  { id: 'action', label: 'Paddock Dispatch', icon: 'ðŸš¨', desc: 'Radio & Alert' }
];

const AutomationFlowVisualizer = ({ activeIndex = 1 }) => {
  const [selectedStep, setSelectedStep] = useState(steps[activeIndex]);

  return (
    <div className=\"bg-gray-900/80 border border-gray-800 rounded-2xl p-6 backdrop-blur-xl shadow-2xl\">
      <div className=\"flex items-center justify-between mb-6\">
        <div>
          <h3 className=\"text-white font-bold text-base uppercase tracking-wider font-mono\">
            Google Cloud EventFlow DAG Architecture
          </h3>
          <p className=\"text-gray-400 text-xs mt-1\">Autonomous Race Operations Pipeline</p>
        </div>
        <span className=\"px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono rounded-full font-bold\">
          STATUS: SYNCHRONIZED
        </span>
      </div>

      <div className=\"grid grid-cols-1 md:grid-cols-4 gap-4 relative\">
        {steps.map((s, idx) => {
          const isActive = idx === activeIndex;
          const isDone = idx < activeIndex;

          return (
            <div
              key={s.id}
              onClick={() => setSelectedStep(s)}
              className={cursor-pointer p-4 rounded-xl border transition-all duration-300 relative \}
            >
              <div className=\"flex items-center justify-between mb-2\">
                <span className=\"text-2xl\">{s.icon}</span>
                <span className=\"text-[10px] font-mono text-gray-500\">STEP 0{idx + 1}</span>
              </div>
              <h4 className=\"text-white font-bold text-sm mb-1 font-mono\">{s.label}</h4>
              <p className=\"text-gray-400 text-xs\">{s.desc}</p>
            </div>
          );
        })}
      </div>

      {selectedStep && (
        <div className=\"mt-6 p-4 rounded-xl bg-black/60 border border-gray-800 text-xs font-mono text-gray-300\">
          <span className=\"text-red-500 font-bold uppercase\">Inspecting Node:</span> {selectedStep.label} ({selectedStep.desc})
        </div>
      )}
    </div>
  );
};

export default AutomationFlowVisualizer;
