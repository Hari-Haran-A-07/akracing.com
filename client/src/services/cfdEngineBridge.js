/**
 * AKR CFD Aerodynamics Solver Bridge (akr-cfd-aerodynamics connector)
 * Dispatches aerodynamic grid simulations to Python/Wasm solver.
 */
import apiClient from './apiClient';

export const cfdEngineBridge = {
  runAirflowSimulation: async ({ airspeedKmh, wingAngleDeg, rakeAngleDeg }) => {
    return apiClient.post('/cfd/simulate', {
      airspeedKmh,
      wingAngleDeg,
      rakeAngleDeg,
      solver: 'akr-cfd-navier-stokes-v2',
      meshDensity: 'HIGH_RESOLUTION_128',
    });
  },

  getPressureDistribution: async (carPart = 'rear-wing') => {
    return apiClient.get(/cfd/pressure?part=\);
  },
};

export default cfdEngineBridge;
