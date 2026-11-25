import React, { useRef, useEffect } from 'react';

const ThrottleBrakeTrace = ({ throttle = 0, brake = 0, width = 320, height = 100 }) => {
  const canvasRef = useRef(null);
  const historyRef = useRef({ throttle: new Array(50).fill(0), brake: new Array(50).fill(0) });

  useEffect(() => {
    const hist = historyRef.current;
    hist.throttle.push(throttle);
    hist.throttle.shift();
    hist.brake.push(brake);
    hist.brake.shift();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    // Background grid
    ctx.strokeStyle = '#1f2937';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();

    const step = width / (hist.throttle.length - 1);

    // Throttle trace (Green)
    ctx.beginPath();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    hist.throttle.forEach((val, i) => {
      const y = height - (val / 100) * height;
      if (i === 0) ctx.moveTo(0, y);
      else ctx.lineTo(i * step, y);
    });
    ctx.stroke();

    // Brake trace (Red)
    ctx.beginPath();
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    hist.brake.forEach((val, i) => {
      const y = height - (val / 100) * height;
      if (i === 0) ctx.moveTo(0, y);
      else ctx.lineTo(i * step, y);
    });
    ctx.stroke();
  }, [throttle, brake, width, height]);

  return (
    <div className=\"p-3 bg-gray-900/60 border border-gray-800 rounded-xl font-mono\">
      <div className=\"flex justify-between text-[10px] text-gray-400 mb-1\">
        <span className=\"text-emerald-400 font-bold\">THROTTLE TRACE</span>
        <span className=\"text-red-400 font-bold\">BRAKE TRACE</span>
      </div>
      <canvas ref={canvasRef} width={width} height={height} className=\"w-full rounded bg-black/60\" />
    </div>
  );
};

export default ThrottleBrakeTrace;
