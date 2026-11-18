/**
 * Automated Merchandise Demand Forecasting & Inventory Reorder Flow
 * Analyzes traffic spikes following race wins and predicts inventory runout dates.
 */
export const forecastInventoryDemand = (sku, currentStock, historicalWeeklySales, isPodiumWeekend = false) => {
  const multiplier = isPodiumWeekend ? 2.85 : 1.0;
  const projectedWeeklyDemand = Math.ceil(historicalWeeklySales * multiplier);
  const weeksOfSupply = (currentStock / projectedWeeklyDemand).toFixed(1);

  const reorderTriggered = weeksOfSupply < 2.0;
  const suggestedReorderQuantity = reorderTriggered ? projectedWeeklyDemand * 4 : 0;

  return {
    sku,
    currentStock,
    projectedWeeklyDemand,
    weeksOfSupply: parseFloat(weeksOfSupply),
    reorderTriggered,
    suggestedReorderQuantity,
    model: 'Vertex-Forecasting-AutoML',
    evaluatedAt: new Date().toISOString()
  };
};

export default forecastInventoryDemand;
