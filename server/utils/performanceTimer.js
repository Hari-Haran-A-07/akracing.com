/**
 * High-Resolution Performance Benchmarking Utility
 */
export const startTimer = () => {
  const start = process.hrtime.bigint();
  return {
    stopMs: () => {
      const diff = process.hrtime.bigint() - start;
      return Number(diff / 1000000n);
    },
  };
};

export default startTimer;
