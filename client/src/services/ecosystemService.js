import apiClient from './apiClient';

export const ecosystemService = {
  getEcosystemHealth: async () => {
    return apiClient.get('/ecosystem/health');
  },
};

export default ecosystemService;
