import apiClient from './apiClient';

export const automationService = {
  getStatus: async () => {
    return apiClient.get('/automation/status');
  },

  triggerWorkflow: async (workflowName, payload) => {
    return apiClient.post('/automation/workflows/trigger', { workflowName, payload });
  },

  getExecutions: async () => {
    return apiClient.get('/automation/workflows/executions');
  },

  runSimulation: async (params) => {
    return apiClient.post('/automation/simulate', params);
  }
};

export default automationService;
