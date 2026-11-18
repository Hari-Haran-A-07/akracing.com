import defaultWorkflowEngine from '../automation/workflows/workflowEngine.js';
import generateLapCommentary from '../automation/ai/lapCommentaryFlow.js';
import diagnoseTelemetryAnomaly from '../automation/ai/telemetryDiagnosisFlow.js';
import syncCircuitWeather from '../automation/weather/circuitWeatherFlow.js';
import calculateTireDegradation from '../automation/strategy/tireDegradationModel.js';

export const getAutomationStatus = (req, res) => {
  res.json({
    success: true,
    service: 'AKR Google Flow Automation Hub',
    status: 'ONLINE',
    activeWorkflows: ['raceStrategyFlow', 'telemetryAnomalyFlow', 'pressDispatchFlow'],
    cloudEngines: {
      workflows: 'ACTIVE',
      cloudTasks: 'ACTIVE',
      pubsub: 'ACTIVE',
      bigQuery: 'STREAMING',
      vertexAI: 'ACTIVE'
    },
    timestamp: new Date().toISOString()
  });
};

export const triggerWorkflowExecution = async (req, res) => {
  try {
    const { workflowName, payload } = req.body;
    const execution = await defaultWorkflowEngine.triggerWorkflow(workflowName || 'raceStrategyFlow', payload || {});
    res.status(202).json({ success: true, execution });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const listWorkflowExecutions = (req, res) => {
  const executions = defaultWorkflowEngine.listExecutions();
  res.json({ success: true, executions });
};

export const getSimulationDiagnostics = (req, res) => {
  const commentary = generateLapCommentary(req.body || {});
  const anomaly = diagnoseTelemetryAnomaly(req.body || {});
  const weather = syncCircuitWeather();
  const tire = calculateTireDegradation(18, 'MEDIUM', weather.trackC);

  res.json({
    success: true,
    simulation: {
      commentary,
      anomaly,
      weather,
      tire
    }
  });
};
