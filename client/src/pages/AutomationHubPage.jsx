import React, { useState } from 'react';
import AutomationFlowVisualizer from '../components/automation/AutomationFlowVisualizer';
import WorkflowStepIndicator from '../components/automation/WorkflowStepIndicator';
import WorkflowRunLog from '../components/automation/WorkflowRunLog';
import WorkflowMetricsCard from '../components/automation/WorkflowMetricsCard';
import TelemetryAnomalyAlert from '../components/automation/TelemetryAnomalyAlert';
import useWorkflowExecution from '../hooks/useWorkflowExecution';

const sampleSteps = [
  { name: 'INGEST', title: 'Telemetry' },
  { name: 'ANALYZE', title: 'Vertex AI' },
  { name: 'DISPATCH', title: 'Cloud Tasks' },
  { name: 'ALERT', title: 'Pit Radio' }
];

const AutomationHubPage = () => {
  const { executions, loading, trigger } = useWorkflowExecution();
  const [activeStep] = useState(1);
  const [mockLogs] = useState([
    '[2026-11-18T15:20:00Z] Cloud Pub/Sub subscribed to topic: akr-telemetry-live',
    '[2026-11-18T15:20:02Z] Google Cloud Workflows dispatched: raceStrategyFlow (ID: exec-9831)',
    '[2026-11-18T15:20:04Z] Vertex AI Tabular model inference completed in 42ms',
    '[2026-11-18T15:20:05Z] Tire degradation calculation nominal: 38.4% on set 2'
  ]);

  const handleSimulate = async () => {
    await trigger('raceStrategyFlow', { circuit: 'Dubai Autodrome', lap: 24, car: 'AKR GT3-01' });
  };

  return (
    <div className=\"min-h-screen bg-black text-white pt-24 pb-16 px-6 max-w-7xl mx-auto\">
      <div className=\"flex flex-col md:flex-row items-start md:items-center justify-between pb-8 mb-8 border-b border-gray-800 gap-4\">
        <div>
          <span className=\"text-red-500 font-mono text-xs uppercase tracking-widest font-bold\">
            Google Flow Technologies
          </span>
          <h1 className=\"text-3xl md:text-5xl font-black tracking-tight mt-1\">
            AUTONOMOUS RACE OPERATIONS
          </h1>
          <p className=\"text-gray-400 text-sm mt-2\">
            Event-driven motorsport pipeline powered by Google Cloud Workflows, Pub/Sub & Vertex AI.
          </p>
        </div>

        <button
          onClick={handleSimulate}
          disabled={loading}
          className=\"px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-red-600/30\"
        >
          {loading ? 'EXECUTING PIPELINE...' : 'TRIGGER STRATEGY FLOW'}
        </button>
      </div>

      <div className=\"grid grid-cols-2 md:grid-cols-4 gap-4 mb-8\">
        <WorkflowMetricsCard title=\"Pipeline Latency\" value=\"42\" unit=\"ms\" trend=\"-14% vs baseline\" />
        <WorkflowMetricsCard title=\"Pub/Sub Throughput\" value=\"1,240\" unit=\"msgs/sec\" trend=\"100% delivered\" />
        <WorkflowMetricsCard title=\"Cloud Tasks Queued\" value=\"3\" unit=\"jobs\" trend=\"Concur: 5\" />
        <WorkflowMetricsCard title=\"Vertex AI Uptime\" value=\"99.98\" unit=\"%\" trend=\"Healthy\" />
      </div>

      <div className=\"mb-8\">
        <AutomationFlowVisualizer activeIndex={activeStep} />
      </div>

      <div className=\"mb-8 p-6 bg-gray-900/40 border border-gray-800 rounded-2xl\">
        <h3 className=\"text-xs font-mono text-gray-400 uppercase tracking-widest mb-4\">Active Pipeline Stage</h3>
        <WorkflowStepIndicator steps={sampleSteps} currentStepIndex={activeStep} />
      </div>

      <div className=\"grid grid-cols-1 md:grid-cols-2 gap-8\">
        <WorkflowRunLog logs={mockLogs} />
        <TelemetryAnomalyAlert
          anomaly={{
            status: 'ANOMALY_DETECTED',
            severityScore: 42,
            diagnostics: [
              {
                component: 'KW Dampers (Rear Right)',
                issue: 'Compression damping velocity anomaly detected over curb strike',
                recommendation: 'Soften high-speed compression by 2 clicks at next service'
              }
            ]
          }}
          onIntervene={() => alert('Safety protocol transmitted to paddock.')}
        />
      </div>
    </div>
  );
};

export default AutomationHubPage;
