import { useState, useEffect, useRef } from 'react';

export const useFpsMonitor = () => {
  const [fps, setFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let animId;
    const loop = (time) => {
      frameCount.current++;
      if (time - lastTime.current >= 1000) {
        setFps(Math.round((frameCount.current * 1000) / (time - lastTime.current)));
        frameCount.current = 0;
        lastTime.current = time;
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  return fps;
};

export default useFpsMonitor;
