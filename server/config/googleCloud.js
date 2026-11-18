/**
 * AKR Google Cloud Platform Configuration Specifications
 * Centralizes project credentials, region topology, and service parameters.
 */
export const googleCloudConfig = {
  projectId: process.env.GOOGLE_CLOUD_PROJECT || 'akr-motorsport-cloud',
  region: process.env.GOOGLE_CLOUD_REGION || 'europe-west1',
  workflows: {
    location: 'europe-west1',
    executionTimeoutMs: 300000
  },
  pubsub: {
    telemetryTopic: 'akr-telemetry-live',
    paddockTopic: 'akr-paddock-alerts'
  },
  cloudTasks: {
    queueName: 'akr-race-strategy-queue',
    maxConcurrentDispatches: 10
  },
  bigQuery: {
    dataset: 'akr_telemetry_dw',
    location: 'EU'
  },
  vertexAI: {
    endpointId: process.env.VERTEX_ENDPOINT_ID || 'endpoint-akr-gt3-01'
  }
};

export default googleCloudConfig;
