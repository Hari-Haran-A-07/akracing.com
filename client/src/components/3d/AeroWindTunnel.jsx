import React, { useRef, useEffect, useState } from 'react';
import { Wind, Gauge, Activity, Sliders } from 'lucide-react';

export const AeroWindTunnel = () => {
  const canvasRef = useRef(null);
  const [velocity, setVelocity] = useState(250); // km/h
  const [showVortices, setShowVortices] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrame;

    // Set canvas dimensions
    const width = (canvas.width = canvas.parentElement.clientWidth || 800);
    const height = (canvas.height = 360);

    // Streamline particles
    const particleCount = 140;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: (Math.random() * 2 + 3) * (velocity / 180),
        length: Math.random() * 30 + 15,
        opacity: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.3 ? '#D90429' : '#FFFFFF',
      });
    }

    const drawCarSilhouette = () => {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.fillStyle = 'rgba(15, 15, 15, 0.9)';

      // Outline of GT3 car
      const cx = width * 0.45;
      const cy = height * 0.65;

      ctx.beginPath();
      ctx.moveTo(cx - 160, cy); // Front splitter
      ctx.lineTo(cx - 140, cy - 20); // Front nose
      ctx.lineTo(cx - 80, cy - 35); // Hood
      ctx.lineTo(cx - 20, cy - 65); // Windshield
      ctx.lineTo(cx + 60, cy - 65); // Roof
      ctx.lineTo(cx + 120, cy - 25); // Rear glass
      ctx.lineTo(cx + 150, cy - 50); // Rear swan-neck wing
      ctx.lineTo(cx + 170, cy - 50);
      ctx.lineTo(cx + 160, cy); // Rear diffuser
      ctx.closePath();

      ctx.fill();
      ctx.stroke();

      // Front splitter highlight
      ctx.strokeStyle = '#D90429';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 165, cy);
      ctx.lineTo(cx - 135, cy);
      ctx.stroke();

      // Rear wing highlight
      ctx.beginPath();
      ctx.moveTo(cx + 130, cy - 52);
      ctx.lineTo(cx + 175, cy - 52);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.fillStyle = '#0A0A0A';
      ctx.fillRect(0, 0, width, height);

      // Grid background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      drawCarSilhouette();

      // Update & Draw Wind Streamlines
      const cx = width * 0.45;
      const cy = height * 0.65;

      particles.forEach((p) => {
        p.speed = (velocity / 50) * 1.5;
        p.x += p.speed;

        if (p.x > width) {
          p.x = 0;
          p.y = Math.random() * height;
        }

        // Deflect airflow over vehicle profile
        const distToCarX = p.x - cx;
        const distToCarY = p.y - cy;

        if (distToCarX > -180 && distToCarX < 180 && distToCarY > -90 && distToCarY < 20) {
          if (p.y < cy - 20) {
            p.y -= 1.2; // Upwash over roof & wing
          } else {
            p.y += 0.8; // Downforce ground effect
          }
        }

        ctx.strokeStyle = p.color === '#D90429' ? 'rgba(217, 4, 41, 0.7)' : 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.length, p.y);
        ctx.stroke();
      });

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrame);
  }, [velocity, showVortices]);

  // Derived physics
  const calculatedDownforce = Math.round(850 * Math.pow(velocity / 250, 2));
  const calculatedDragCoeff = (0.34 + (velocity > 260 ? 0.02 : 0)).toFixed(3);

  return (
    <div className="w-full bg-racing-black border border-racing-border text-white">
      {/* Header */}
      <div className="p-6 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-racing-graphite/40">
        <div className="flex items-center gap-3">
          <Wind size={20} className="text-racing-red animate-pulse" />
          <div>
            <h4 className="font-display text-lg font-black uppercase tracking-tight">
              CFD DIGITAL WIND TUNNEL SIMULATION
            </h4>
            <p className="text-[10px] font-mono text-racing-silver uppercase tracking-widest">
              LAMINAR AIRFLOW &bull; GROUND-EFFECT SUCTION &bull; DOWNFORCE VECTOR ANALYSIS
            </p>
          </div>
        </div>

        {/* Velocity Slider */}
        <div className="flex items-center gap-4 bg-black/60 px-4 py-2 border border-white/10">
          <span className="text-xs font-mono text-racing-silver">AIRSPEED:</span>
          <input
            type="range"
            min="100"
            max="320"
            value={velocity}
            onChange={(e) => setVelocity(Number(e.target.value))}
            className="accent-racing-red cursor-pointer w-32"
          />
          <span className="font-mono text-xs font-bold text-racing-red">{velocity} KM/H</span>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative w-full h-[360px] overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Telemetry Overlay readout */}
        <div className="absolute top-4 left-4 p-3 bg-black/80 border border-white/10 backdrop-blur-md font-mono text-xs space-y-1">
          <div className="text-racing-silver text-[10px] uppercase tracking-widest">AERO BALANCE METRICS</div>
          <div className="text-white">DOWNFORCE: <strong className="text-racing-red">{calculatedDownforce} KG</strong></div>
          <div className="text-white">DRAG COEFF (Cd): <strong className="text-white">{calculatedDragCoeff}</strong></div>
          <div className="text-white">FRONT/REAR AERO BIAS: <strong className="text-white">46% / 54%</strong></div>
        </div>
      </div>
    </div>
  );
};
