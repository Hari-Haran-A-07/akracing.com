import React, { useRef, useEffect } from 'react';

const TrackMapCanvas = ({ width = 280, height = 200, carProgress = 0.65 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    // Draw stylized racing line path (Autodrome loop)
    ctx.beginPath();
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.moveTo(40, 150);
    ctx.lineTo(240, 150);
    ctx.bezierCurveTo(260, 150, 260, 50, 220, 50);
    ctx.lineTo(80, 50);
    ctx.bezierCurveTo(40, 50, 40, 150, 40, 150);
    ctx.stroke();

    // Car position dot calculation
    const carX = 40 + (240 - 40) * Math.min(1, carProgress);
    const carY = 150;

    // Draw car indicator
    ctx.beginPath();
    ctx.arc(carX, carY, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#dc2626';
    ctx.shadowColor = '#dc2626';
    ctx.shadowBlur = 10;
    ctx.fill();
  }, [width, height, carProgress]);

  return (
    <div className=\"p-4 rounded-2xl bg-gray-900/60 border border-gray-800 text-center font-mono\">
      <span className=\"text-[10px] text-gray-500 font-bold uppercase tracking-widest block mb-2\">
        GPS Circuit Tracker
      </span>
      <canvas ref={canvasRef} width={width} height={height} className=\"mx-auto\" />
    </div>
  );
};

export default TrackMapCanvas;
