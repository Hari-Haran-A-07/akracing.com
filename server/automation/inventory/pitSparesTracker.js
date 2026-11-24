/**
 * Pit Lane Emergency Crash Spares Inventory Tracker
 * Tracks available fast-swap components during endurance pit stops.
 */
export const checkPitSparesAvailability = (requestedComponent = 'FRONT_SPLITTER') => {
  const sparesInventory = {
    FRONT_SPLITTER: { inStock: 3, swapTimeSec: 24.0, readyInBox: true },
    REAR_WING_ASSEMBLY: { inStock: 2, swapTimeSec: 45.0, readyInBox: true },
    STEERING_RACK: { inStock: 1, swapTimeSec: 180.0, readyInBox: false },
    BRAKE_CALIPER_CORNER: { inStock: 4, swapTimeSec: 65.0, readyInBox: true },
  };

  const item = sparesInventory[requestedComponent] || { inStock: 0, swapTimeSec: 0, readyInBox: false };

  return {
    component: requestedComponent,
    available: item.inStock > 0,
    remainingStock: item.inStock,
    estimatedSwapTimeSec: item.swapTimeSec,
    crewReady: item.readyInBox,
  };
};

export default checkPitSparesAvailability;
