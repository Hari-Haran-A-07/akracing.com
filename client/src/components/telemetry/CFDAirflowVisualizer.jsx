import React, { useRef, useEffect } from 'react';

const CFDAirflowVisualizer = ({ airspeedKmh = 240, width = 360, height = 180 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;
    let offset = 0;

    const render = () => {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);

      // Draw stylized car profile silhouette
      ctx.fillStyle = '#1f2937';
      ctx.beginPath();
      ctx.moveTo(60, 130);
      ctx.lineTo(120, 130);
      ctx.lineTo(150, 90);
      ctx.lineTo(240, 90);
      ctx.lineTo(290, 120);
      ctx.lineTo(310, 130);
      ctx.lineTo(60, 130);
      ctx.fill();

      // Flow streamlines
      ctx.lineWidth = 1.5;
      const speedFactor = (airspeedKmh / 100) * 2;
      offset = (offset + speedFactor) % 40;

      for (let y = 30; y < 160; y += 18) {
        ctx.beginPath();
        ctx.strokeStyle = y < 90 ? '#3b82f6' : '#ef4444';
        ctx.setLineDash([12, 8]);
        ctx.lineDashOffset = -offset;
        ctx.moveTo(20, y);
        ctx.bezierCurveTo(140, y - 10, 220, y - 5, 340, y);
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [airspeedKmh, width, height]);

  return (
    <div className=\"p-4 rounded-2xl bg-gray-900/60 border border-gray-800 text-center font-mono\">
      <div className=\"flex justify-between items-center mb-2 text-xs text-gray-400\">
        <span>WIND TUNNEL CFD SOLVER</span>
        <span className=\"text-red-400 font-bold\">{airspeedKmh} KM/H</span>
      </div>
      <canvas ref={canvasRef} width={width} height={height} className=\"mx-auto rounded-lg\" />
    </div>
  );
};

export default CFDAirflowVisualizer;
