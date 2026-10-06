/**
 * AJITH KUMAR RACING (AKR) — POLYGLOT MOTORSPORT PLATFORM
 * TypeScript High-Performance Telemetry & Strategy Types Engine
 * Language: TypeScript
 */

export interface TelemetryPacket {
  packetId: number;
  timestamp: string;
  carNumber: string;
  driverName: string;
  chassis: string;
  speedKmh: number;
  engineRpm: number;
  gear: number;
  throttlePct: number;
  brakePressureBar: number;
  steeringAngleDeg: number;
  lateralG: number;
  longitudinalG: number;
  tirePressuresPsi: [number, number, number, number]; // FL, FR, RL, RR
  tireTemperaturesC: [number, number, number, number];
  brakeTemperaturesC: [number, number, number, number];
  fuelRemainingLiters: number;
  drsActive: boolean;
  batterySocPct: number;
  ersDeployMode: 'BALANCED' | 'OVERTAKE' | 'HOTLAP' | 'HARVEST';
}

export interface SectorDelta {
  sector: 1 | 2 | 3;
  driverTimeMs: number;
  benchmarkTimeMs: number;
  deltaMs: number;
  isPurple: boolean;
}

export interface LapTelemetry {
  lapNumber: number;
  lapTimeSeconds: number;
  sector1TimeSeconds: number;
  sector2TimeSeconds: number;
  sector3TimeSeconds: number;
  topSpeedKmh: number;
  avgSpeedKmh: number;
  fuelConsumedLiters: number;
  tireWearPct: number;
  isPersonalBest: boolean;
  isOverallBest: boolean;
}

export interface PitStrategyRecommendation {
  recommendedLap: number;
  currentCompound: 'SOFT' | 'MEDIUM' | 'HARD' | 'INTERMEDIATE' | 'WET';
  nextCompound: 'SOFT' | 'MEDIUM' | 'HARD' | 'INTERMEDIATE' | 'WET';
  estimatedPitLossSeconds: number;
  projectedTrackPosition: number;
  gapAheadSeconds: number;
  gapBehindSeconds: number;
  confidenceScore: number;
  strategyRationale: string;
}

export class AKRTelemetryEngine {
  private packetBuffer: TelemetryPacket[] = [];
  private readonly maxBufferSize: number = 10000;

  constructor(public readonly sessionName: string = '24H_SERIES_DUBAI_2026') {}

  public ingestPacket(packet: TelemetryPacket): void {
    if (this.packetBuffer.length >= this.maxBufferSize) {
      this.packetBuffer.shift();
    }
    this.packetBuffer.push(packet);
  }

  public calculateAverageSpeed(): number {
    if (this.packetBuffer.length === 0) return 0;
    const sum = this.packetBuffer.reduce((acc, p) => acc + p.speedKmh, 0);
    return Math.round((sum / this.packetBuffer.length) * 10) / 10;
  }

  public getPeakGForces(): { peakLateralG: number; peakLongitudinalG: number } {
    let peakLat = 0;
    let peakLong = 0;
    for (const p of this.packetBuffer) {
      if (Math.abs(p.lateralG) > peakLat) peakLat = Math.abs(p.lateralG);
      if (Math.abs(p.longitudinalG) > peakLong) peakLong = Math.abs(p.longitudinalG);
    }
    return { peakLateralG: peakLat, peakLongitudinalG: peakLong };
  }

  public analyzeLapDeltas(lap: LapTelemetry, benchmark: LapTelemetry): SectorDelta[] {
    const s1Delta = Math.round((lap.sector1TimeSeconds - benchmark.sector1TimeSeconds) * 1000);
    const s2Delta = Math.round((lap.sector2TimeSeconds - benchmark.sector2TimeSeconds) * 1000);
    const s3Delta = Math.round((lap.sector3TimeSeconds - benchmark.sector3TimeSeconds) * 1000);

    return [
      {
        sector: 1,
        driverTimeMs: Math.round(lap.sector1TimeSeconds * 1000),
        benchmarkTimeMs: Math.round(benchmark.sector1TimeSeconds * 1000),
        deltaMs: s1Delta,
        isPurple: s1Delta <= 0
      },
      {
        sector: 2,
        driverTimeMs: Math.round(lap.sector2TimeSeconds * 1000),
        benchmarkTimeMs: Math.round(benchmark.sector2TimeSeconds * 1000),
        deltaMs: s2Delta,
        isPurple: s2Delta <= 0
      },
      {
        sector: 3,
        driverTimeMs: Math.round(lap.sector3TimeSeconds * 1000),
        benchmarkTimeMs: Math.round(benchmark.sector3TimeSeconds * 1000),
        deltaMs: s3Delta,
        isPurple: s3Delta <= 0
      }
    ];
  }
}
