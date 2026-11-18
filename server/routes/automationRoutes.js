import express from 'express';
import {
  getAutomationStatus,
  triggerWorkflowExecution,
  listWorkflowExecutions,
  getSimulationDiagnostics
} from '../controllers/automationController.js';

const router = express.Router();

// GET /api/automation/status - Status of Google Flow Automation engines
router.get('/status', getAutomationStatus);

// POST /api/automation/workflows/trigger - Execute a workflow DAG
router.post('/workflows/trigger', triggerWorkflowExecution);

// GET /api/automation/workflows/executions - Execution history
router.get('/workflows/executions', listWorkflowExecutions);

// POST /api/automation/simulate - Live simulation and diagnostic endpoint
router.post('/simulate', getSimulationDiagnostics);

export default router;
