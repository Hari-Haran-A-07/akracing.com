import React, { useRef, useEffect } from 'react';
import { Activity, Gauge, Disc } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';

export const TelemetryCanvas = () => {
  const { telemetry } = useTelemetry();
  const gForceCanvasRef = useRef(null);
  const pedalCanvasRef = useRef(null);

  // Draw G-Force Traction Circle
  useEffect(() => {
    const canvas = gForceCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = (canvas.width = canvas.height = 200);
    const center = size / 2;
    const maxG = 4.0;

    // Clear
    ctx.clearRect(0, 0, size, size);

    // Outer grid circles (1G, 2G, 3G, 4G)
    [1, 2, 3, 4].forEach((g) => {
      const radius = (g / maxG) * (center - 15);
      ctx.strokeStyle = g === 4 ? 'rgba(217, 4, 41, 0.4)' : 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(center, center, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Label
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.font = '9px JetBrains Mono, monospace';
      ctx.fillText(`${g}G`, center + 3, center - radius + 10);
    });

    // Crosshairs
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(center, 10);
    ctx.lineTo(center, size - 10);
    ctx.moveTo(10, center);
    ctx.lineTo(size - 10, center);
    ctx.stroke();

    // Current G-force position
    const latG = parseFloat(telemetry.lateralG) || 2.8;
    const longG = parseFloat(telemetry.longitudinalG) || 0.8;

    const posX = center + (latG / maxG) * (center - 15);
    const posY = center - (longG / maxG) * (center - 15);

    // Draw active G-force point with glowing trail
    ctx.fillStyle = '#D90429';
    ctx.shadowColor = '#D90429';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(posX, posY, 6, 0, Math.PI * 2);
    ctx.fill();

    // Directional vector line
    ctx.strokeStyle = '#D90429';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(posX, posY);
    ctx.stroke();
  }, [telemetry]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 bg-racing-black border border-racing-border p-6 text-white">
      {/* G-Force Traction Circle */}
      <div className="flex flex-col items-center justify-center p-4 bg-racing-graphite border border-white/5">
        <div className="w-full flex items-center justify-between text-xs font-mono text-racing-silver mb-3">
          <span className="flex items-center gap-1 text-racing-red font-bold">
            <Disc size={14} className="animate-spin" /> LATERAL / LONGITUDINAL G-CIRCLE
          </span>
          <span>MAX: 4.0 G</span>
        </div>
        <canvas ref={gForceCanvasRef} className="w-[180px] h-[180px]" />
        <div className="w-full flex justify-around mt-3 text-xs font-mono">
          <div>LATERAL: <strong className="text-racing-red">{telemetry.lateralG} G</strong></div>
          <div>LONGITUDINAL: <strong className="text-white">{telemetry.longitudinalG} G</strong></div>
        </div>
      </div>

      {/* Live Pedal & Powertrain Load */}
      <div className="flex flex-col justify-between p-4 bg-racing-graphite border border-white/5 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between text-racing-silver">
          <span className="flex items-center gap-1.5 text-white font-bold">
            <Gauge size={14} className="text-racing-red" /> LIVE ACTUATION TELEMETRY
          </span>
          <span className="text-racing-red font-bold">MOTEC 1000HZ</span>
        </div>

        {/* Throttle Bar */}
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-racing-silver">THROTTLE POSITION:</span>
            <span className="text-green-400 font-bold">{telemetry.throttlePct}%</span>
          </div>
          <div className="w-full h-3 bg-black border border-white/10 overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-100"
              style={{ width: `${telemetry.throttlePct}%` }}
            />
          </div>
        </div>

        {/* Brake Pressure Bar */}
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-racing-silver">BRAKE HYDRAULIC PRESSURE:</span>
            <span className="text-racing-red font-bold">{telemetry.brakePressureBar} BAR</span>
          </div>
          <div className="w-full h-3 bg-black border border-white/10 overflow-hidden">
            <div
              className="h-full bg-racing-red transition-all duration-100"
              style={{ width: `${(telemetry.brakePressureBar / 100) * 100}%` }}
            />
          </div>
        </div>

        {/* RPM & Gear */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
          <div className="p-2.5 bg-black border border-white/5">
            <span className="text-[10px] text-racing-silver">CURRENT GEAR:</span>
            <div className="font-display text-2xl font-black text-racing-red mt-0.5">{telemetry.gear}</div>
          </div>
          <div className="p-2.5 bg-black border border-white/5">
            <span className="text-[10px] text-racing-silver">ENGINE SPEED:</span>
            <div className="font-display text-2xl font-black text-white mt-0.5">{telemetry.rpm} <span className="text-xs font-mono font-normal text-racing-silver">RPM</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};
