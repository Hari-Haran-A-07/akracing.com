import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';

// Vehicle Components
import { VehicleHero } from '../components/vehicle/VehicleHero';
import { VehiclePerformanceDashboard } from '../components/vehicle/VehiclePerformanceDashboard';
import { CockpitSpeedometer } from '../components/telemetry/CockpitSpeedometer';
import { VehicleTechnicalNav } from '../components/vehicle/VehicleTechnicalNav';
import { VehicleTeamStatement } from '../components/vehicle/VehicleTeamStatement';
import { VehicleEngineSection } from '../components/vehicle/VehicleEngineSection';
import { VehicleTransmissionSection } from '../components/vehicle/VehicleTransmissionSection';
import { VehicleSuspensionSection } from '../components/vehicle/VehicleSuspensionSection';
import { VehicleBrakingSection } from '../components/vehicle/VehicleBrakingSection';
import { VehicleAeroSection } from '../components/vehicle/VehicleAeroSection';
import { VehicleBodyShellSection } from '../components/vehicle/VehicleBodyShellSection';
import { VehicleCockpitSection } from '../components/vehicle/VehicleCockpitSection';
import { VehicleSteeringWheelUI } from '../components/vehicle/VehicleSteeringWheelUI';
import { VehicleDesignSection } from '../components/vehicle/VehicleDesignSection';
import { VehicleHistoryTimeline } from '../components/vehicle/VehicleHistoryTimeline';
import { VehicleGallerySection } from '../components/vehicle/VehicleGallerySection';
import { VehicleCTASection } from '../components/vehicle/VehicleCTASection';
import { CarViewer360 } from '../components/3d/CarViewer360';

export const CarDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCar = async () => {
      try {
        const res = await api.getCarById(id || 'akr-gt3-01');
        if (res.success) {
          setCar(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  if (loading || !car) {
    return (
      <div className="min-h-screen bg-racing-black flex items-center justify-center text-white font-mono">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-racing-red animate-ping" />
          <span>LOADING 911 GT3 CUP VEHICLE DOSSIER...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-racing-black text-white selection:bg-racing-red selection:text-white">
      {/* 01: Fullscreen Vehicle Hero */}
      <VehicleHero car={car} />

      {/* 02: Performance Metric Numbers */}
      <VehiclePerformanceDashboard />

      {/* 03: Interactive MoTeC Cockpit Speedometer / RPM Instrument Cluster */}
      <section className="py-16 px-6 sm:px-12 bg-racing-black border-b border-racing-border">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-racing-red" />
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
              MOTEC C187 DASH INSTRUMENTATION
            </span>
          </div>
          <CockpitSpeedometer />
        </div>
      </section>

      {/* 04: Sticky Technical Navigation */}
      <VehicleTechnicalNav />

      {/* 05: Team Philosophy Statement */}
      <VehicleTeamStatement />

      {/* 06: Engine Section */}
      <VehicleEngineSection />

      {/* 07: Transmission Section */}
      <VehicleTransmissionSection />

      {/* 08: Suspension Section */}
      <VehicleSuspensionSection />

      {/* 09: Braking Section */}
      <VehicleBrakingSection />

      {/* 10: Aerodynamics Section */}
      <VehicleAeroSection />

      {/* 11: Body Shell Section */}
      <VehicleBodyShellSection />

      {/* 12: Cockpit Hotspots */}
      <VehicleCockpitSection />

      {/* 13: Interactive Steering Wheel Simulator */}
      <VehicleSteeringWheelUI />

      {/* 14: Special Vehicle Design */}
      <VehicleDesignSection />

      {/* 15: Racing History Timeline */}
      <VehicleHistoryTimeline />

      {/* 16: Interactive 360 Degree Vehicle View */}
      <section className="py-24 px-6 sm:px-12 bg-racing-surface border-b border-racing-border">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[2px] bg-racing-red" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-gray-400">
                INTERACTIVE 360° INSPECTION
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              360° <span className="text-racing-red">EXTERIOR VIEW</span>
            </h2>
          </div>
          <CarViewer360 car={car} />
        </div>
      </section>

      {/* 17: Cinematic Media Gallery */}
      <VehicleGallerySection car={car} />

      {/* 18: Final Call to Action */}
      <VehicleCTASection />
    </div>
  );
};
