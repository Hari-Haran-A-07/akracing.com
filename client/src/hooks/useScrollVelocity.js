import { useState, useEffect, useRef } from 'react';

/**
 * useScrollVelocity
 * Calculates real-time scroll velocity and maps it smoothly to vehicle physics:
 * speed (0-350 KM/H), RPM (900-9800 RPM), gear (N/1-6), throttle & brake percentages.
 */
export const useScrollVelocity = (options = {}) => {
  const {
    idleSpeed = 0,
    maxSpeed = 330,
    idleRpm = 900,
    maxRpm = 9600,
    decay = 0.94,
    accelerationFactor = 0.65
  } = options;

  const [physics, setPhysics] = useState({
    speed: 0,
    rpm: idleRpm,
    gear: 'N',
    throttle: 0,
    brake: 0,
    gForce: 0.1,
    isRedline: false
  });

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const velocity = useRef(0);
  const currentSpeed = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    lastTime.current = performance.now();

    const handleScroll = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime.current);
      const dy = Math.abs(window.scrollY - lastScrollY.current);
      
      // Calculate instantaneous scroll velocity (px/ms)
      const instantVelocity = (dy / dt) * 100;
      velocity.current = Math.min(100, velocity.current * 0.4 + instantVelocity * 0.6);

      lastScrollY.current = window.scrollY;
      lastTime.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    let animFrame;
    const updatePhysics = () => {
      // Smooth decay of velocity when user stops scrolling
      velocity.current *= decay;
      if (velocity.current < 0.05) velocity.current = 0;

      // Target speed from velocity
      const targetSpeed = Math.min(maxSpeed, velocity.current * accelerationFactor * 12);
      
      // Smoothly interpolate current speed towards target speed
      if (targetSpeed > currentSpeed.current) {
        currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.18; // Accelerate
      } else {
        currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.08; // Coast down
      }

      const spd = Math.max(idleSpeed, currentSpeed.current);

      // Compute Gear according to Speed
      let gear = 'N';
      let rpmFraction = 0;
      let gearMinSpeed = 0;
      let gearMaxSpeed = 40;

      if (spd < 3) {
        gear = 'N';
        rpmFraction = 0;
      } else if (spd <= 45) {
        gear = '1';
        gearMinSpeed = 0;
        gearMaxSpeed = 45;
        rpmFraction = (spd - gearMinSpeed) / (gearMaxSpeed - gearMinSpeed);
      } else if (spd <= 90) {
        gear = '2';
        gearMinSpeed = 40;
        gearMaxSpeed = 90;
        rpmFraction = (spd - gearMinSpeed) / (gearMaxSpeed - gearMinSpeed);
      } else if (spd <= 145) {
        gear = '3';
        gearMinSpeed = 85;
        gearMaxSpeed = 145;
        rpmFraction = (spd - gearMinSpeed) / (gearMaxSpeed - gearMinSpeed);
      } else if (spd <= 205) {
        gear = '4';
        gearMinSpeed = 140;
        gearMaxSpeed = 205;
        rpmFraction = (spd - gearMinSpeed) / (gearMaxSpeed - gearMinSpeed);
      } else if (spd <= 265) {
        gear = '5';
        gearMinSpeed = 200;
        gearMaxSpeed = 265;
        rpmFraction = (spd - gearMinSpeed) / (gearMaxSpeed - gearMinSpeed);
      } else {
        gear = '6';
        gearMinSpeed = 260;
        gearMaxSpeed = maxSpeed;
        rpmFraction = Math.min(1, (spd - gearMinSpeed) / (gearMaxSpeed - gearMinSpeed));
      }

      // Compute RPM with realistic curve per gear
      let rpm = idleRpm;
      if (gear !== 'N') {
        const gearRpmBase = 3200;
        rpm = Math.min(maxRpm, Math.round(gearRpmBase + (maxRpm - gearRpmBase) * Math.min(1, Math.max(0, rpmFraction))));
      } else {
        rpm = Math.round(idleRpm + Math.random() * 50); // slight idle flutter
      }

      const throttle = spd > 5 ? Math.min(100, Math.round((velocity.current / 8) * 100)) : 0;
      const isRedline = rpm >= 8900;
      const gForce = parseFloat((0.2 + (spd / 300) * 3.4).toFixed(1));

      setPhysics({
        speed: Math.round(spd),
        rpm,
        gear,
        throttle: Math.min(100, throttle),
        brake: targetSpeed < currentSpeed.current && currentSpeed.current > 60 ? Math.min(75, Math.round((currentSpeed.current - targetSpeed) * 1.5)) : 0,
        gForce,
        isRedline
      });

      animFrame = requestAnimationFrame(updatePhysics);
    };

    animFrame = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animFrame);
    };
  }, [idleSpeed, maxSpeed, idleRpm, maxRpm, decay, accelerationFactor]);

  return physics;
};
