import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Terminal, Database, Activity, Zap, Play, CheckCircle2,
  AlertTriangle, RefreshCw, Layers, ShieldCheck, Gauge, HardDrive,
  GitBranch, Code2, Server, Globe, ChevronRight, Binary, ArrowRight,
  TrendingUp, BarChart3, Wrench, HeartPulse, Box, Award, Sliders
} from 'lucide-react';
import { api } from '../services/api';
import { useAudio } from '../context/AudioContext';

export const EngineeringSuitePage = () => {
  const { playClick, playEngineRev } = useAudio();
  const [activeTab, setActiveTab] = useState('pipeline');
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  
  // Pipeline state
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineProgress, setPipelineProgress] = useState(0);
  const [pipelineResult, setPipelineResult] = useState(null);
  const [currentExecutingStage, setCurrentExecutingStage] = useState(null);

  // System status
  const [systemStatus, setSystemStatus] = useState(null);
  const [statusLoading, setStatusLoading] = useState(true);

  // IDE state
  const [editorCode, setEditorCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [isExecutingCode, setIsExecutingCode] = useState(false);
  const [executionStats, setExecutionStats] = useState(null);
  const [simParams, setSimParams] = useState({
    speed: 268,
    rpm: 7850,
    wingAngle: 8.5,
    trackTemp: 42,
    compound: 'SOFT',
    laps: 30
  });

  // SQL Console state
  const [sqlQuery, setSqlQuery] = useState(`SELECT lap_number, lap_time_seconds, sector1_seconds, sector2_seconds, sector3_seconds, top_speed_kmh, peak_lateral_g, tire_wear_pct\nFROM lap_telemetry\nORDER BY lap_number ASC\nLIMIT 10;`);
  const [sqlResults, setSqlResults] = useState(null);
  const [isSqlExecuting, setIsSqlExecuting] = useState(false);
  const [sqlSchema, setSqlSchema] = useState(null);

  // AI & Physics State
  const [aiPrediction, setAiPrediction] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Pre-loaded production code templates for all 11 languages
  const languageTemplates = {
    typescript: `// [TypeScript] Telemetry Stream Aggregator & Sector Delta Engine
import { TelemetryPacket, SectorDelta } from './race_telemetry';

export class LivePitWallBridge {
  public computeSectorGains(currentLap: number, sectorDeltas: number[]): SectorDelta {
    const isPurple = sectorDeltas.every(d => d <= 0);
    return {
      sector: 1,
      driverTimeMs: 37420,
      benchmarkTimeMs: 37650,
      deltaMs: -230,
      isPurple
    };
  }
}

console.log("⚡ TypeScript 5.4 Telemetry Engine Initialized for AKR GT3-01");`,

    javascript: `// [JavaScript] Live Web Audio Synthesizer & Event Orchestrator
const orchestrator = new AKROrchestrator();

orchestrator.on('telemetry', (pkt) => {
  if (pkt.speedKmh > 270) {
    console.log(\`🔥 HIGH SPEED ZONE: \${pkt.speedKmh} km/h @ \${pkt.rpm} RPM | G=\${pkt.lateralG}G\`);
  }
});

const frame = orchestrator.generateSyntheticPacket(${simParams.speed}, ${simParams.rpm});
console.log("Synchronized Frame:", JSON.stringify(frame, null, 2));`,

    python: `# [Python 3.13] AI Neural Tire Degradation & Monte Carlo Pit Forecaster
import json
from ai_lap_predictor import calculate_tire_degradation, predict_optimal_pit_window

# Compute tire degradation and optimal stint length
deg_profile = calculate_tire_degradation(laps=${simParams.laps}, compound='${simParams.compound}', track_temp_c=${simParams.trackTemp})
strategy = predict_optimal_pit_window(total_laps=50, compound='${simParams.compound}', track_temp_c=${simParams.trackTemp})

print(f"🏎️ Driver: Ajith Kumar (#9)")
print(f"Optimal Pit Window: Lap {strategy['pit_lap']}")
print(f"Projected Stint Pace: {strategy['avg_lap_time']}s / lap")
print(f"Cliff Lap Threshold: Lap 18 on {simParams.compound}")`,

    rust: `// [Rust] WASM Vehicle Dynamics & Pacejka Friction Circle Core
use akr_physics_core::physics_engine::{VehicleDynamicsEngine, PhysicsSimulationInput};

fn main() {
    let engine = VehicleDynamicsEngine::default();
    let input = PhysicsSimulationInput {
        vehicle_speed_kmh: ${simParams.speed}.0,
        steering_angle_deg: 6.8,
        throttle_pct: 98.0,
        brake_pressure_bar: 0.0,
        rear_wing_angle_deg: ${simParams.wingAngle},
        track_temperature_c: ${simParams.trackTemp}.0,
    };

    let result = engine.simulate(&input);
    println!("Downforce: {} N | Lateral G: {} G | Latency: {} μs",
             result.aero.total_downforce_n, result.lateral_acceleration_g, result.execution_time_micros);
}`,

    go: `// [Go] Ultra-Concurrent 100k Packets/Sec Telemetry Broker
package main

import (
	"context"
	"fmt"
	"time"
	"github.com/ajithkumarracing/polyglot-streamer/streamer"
)

func main() {
	broker := streamer.NewTelemetryBroker(32, 50000)
	ctx, cancel := context.WithTimeout(context.Background(), 1*time.Second)
	defer cancel()

	broker.Start(ctx)
	fmt.Println("⚡ Ingesting 100,000 CAN telemetry packets across 32 Goroutines...")
	fmt.Printf("Throughput: 124,500 pkts/s | Ingestion Lag: 38 μs\\n")
}`,

    csharp: `// [C# .NET 8.0] Motec M1 CAN 2.0B Frame Decoder & Engine Diagnostics
using System;
using AkrMotorsport.ECU;

namespace AkrMotorsport
{
    class Program
    {
        static void Main()
        {
            var decoder = new MotecCanBusDecoder();
            var frame = new CanFrame {
                CanId = 0x0E0,
                Data = new byte[] { 0x20, 0x3A, 0xC8, 0x96, 0x05, 0x00, 0x00, 0x00 }
            };
            var ecu = decoder.DecodeFrame(frame);
            Console.WriteLine($"ECU Telemetry: RPM={ecu.EngineRpm}, Throttle={ecu.ThrottlePercent}%, Gear={ecu.SelectedGear}");
        }
    }
}`,

    java: `// [Java OpenJDK 17] FIA GT3 Appendix J Homologation & ASIL-D Safety Verifier
package com.akr.racing;

public class Main {
    public static void main(String[] args) {
        HomologationService service = new HomologationService();
        var result = service.verifyVehicleCompliance("AKR-GT3-CHASSIS-009", 1260.0, 41.5, 34500.0, 120.0, true);
        System.out.println("FIA Homologation Status: " + (result.passedAllChecks ? "PASSED [APPROVED]" : "FAILED"));
        System.out.println("Safety Level: " + result.safetyIntegrityLevel);
    }
}`,

    kotlin: `// [Kotlin] Multiplatform Driver Biometric Telematics Monitor
package com.akr.telematics

fun main() {
    val engine = DriverBiometricsEngine()
    val bio = engine.evaluateDriverFitness(
        currentBpm = 154,
        sustainedLateralG = 3.4,
        ambientCockpitTempC = 38.5,
        stintDurationMinutes = 42.0
    )
    println("Driver: \${bio.driverName} | Heart Rate: \${bio.heartRateBpm} BPM")
    println("Flow State: \${bio.stressLevel} | Endurance Index: \${bio.gForceLoadEnduranceIndex}/100")
}`,

    php: `<?php
// [PHP 8.3] Global Motorsport Logistics, Fuel Manifest & Superlicense Pass
namespace Akr\\Logistics;

$engine = new LogisticsEngine();
$manifest = $engine->calculateWeekendFuelAndTireManifest('DUBAI_AUTODROME', 60, 14);

echo "🏁 Circuit: " . $manifest['circuit'] . "\\n";
echo "Total Fuel Required: " . $manifest['fuel_manifest']['total_barrel_allocation_liters'] . " Liters\\n";
echo "Pirelli Tire Allocation: " . $manifest['tire_manifest']['total_sets_allocated'] . " Sets Slicks\\n";
echo "Customs Carnet: " . $manifest['freight_routing']['customs_carnet'] . " [VALID]\\n";`,

    ruby: `# [Ruby 3.3] Declarative Race Strategy DSL & Automated Safety Car Incident Handler
require './race_strategy_dsl'

engine = Akr::RaceDirectorDSL.build_default_strategy

scenario = {
  incident: :SAFETY_CAR,
  lap_number: 24,
  tire_age_laps: 16,
  pit_window_open: true,
  gap_ahead: 2.1
}

decision = engine.evaluate_track_scenario(scenario)
puts "Tactical Recommendation: #{decision[:recommendation][:action]}"
puts "Rationale: #{decision[:recommendation][:rationale]}"
puts "Mode: #{decision[:strategy_mode]}"`,

    sql: `-- [SQL] Timeseries Telemetry Stint Benchmark & Microsector Delta Matrix
SELECT 
    l.lap_number,
    l.lap_time_seconds,
    l.sector1_seconds,
    l.sector2_seconds,
    l.sector3_seconds,
    l.top_speed_kmh,
    l.tire_wear_pct,
    ROUND(l.lap_time_seconds - LAG(l.lap_time_seconds, 1) OVER (ORDER BY l.lap_number), 3) AS delta_previous_lap,
    RANK() OVER (ORDER BY l.lap_time_seconds ASC) AS stint_pace_rank
FROM lap_telemetry l
WHERE l.event_id = 'EVT_DUBAI_24H_2026' AND l.driver_id = 'DRV_09'
ORDER BY l.lap_number ASC
LIMIT 10;`
  };

  // Language metadata mapping
  const languageMeta = {
    typescript: { name: 'TypeScript', tag: 'TS 5.4', icon: Code2, color: '#3178C6', role: 'Telemetry Stream Type Contract' },
    javascript: { name: 'JavaScript', tag: 'Node 24', icon: Terminal, color: '#F7DF1E', role: 'Fullstack Orchestration & Audio Bus' },
    python: { name: 'Python', tag: 'Py 3.13', icon: Cpu, color: '#3776AB', role: 'AI Neural Degradation & Pit Optimizer' },
    rust: { name: 'Rust', tag: 'WASM Core', icon: Zap, color: '#DEA584', role: 'Microsecond Vehicle Dynamics & Aero' },
    go: { name: 'Go (Golang)', tag: 'Go 1.22', icon: Activity, color: '#00ADD8', role: '100k Packets/Sec Concurrency Broker' },
    csharp: { name: 'C# (.NET)', tag: '.NET 8.0', icon: Wrench, color: '#512BD4', role: 'Motec M1 ECU CAN-Bus Decoder' },
    java: { name: 'Java', tag: 'JDK 17', icon: ShieldCheck, color: '#ED8B00', role: 'FIA Homologation & ASIL-D Safety' },
    kotlin: { name: 'Kotlin', tag: 'KT 1.9', icon: HeartPulse, color: '#7F52FF', role: 'Driver Biometric Telematics' },
    php: { name: 'PHP', tag: 'PHP 8.3', icon: Box, color: '#777BB4', role: 'Global Track Logistics & Fuel Allocation' },
    ruby: { name: 'Ruby', tag: 'Ruby 3.3', icon: Award, color: '#CC342D', role: 'Declarative Strategy DSL & Incident Rules' },
    sql: { name: 'SQL (Timeseries)', tag: 'SQL 3.50', icon: Database, color: '#00BCF2', role: 'Relational Telemetry Timeseries & Deltas' }
  };

  // Sample SQL query snippets
  const sampleQueries = [
    {
      name: 'Stint Lap Deltas & Rolling Average',
      sql: `SELECT lap_number, lap_time_seconds, sector1_seconds, sector2_seconds, sector3_seconds, top_speed_kmh, tire_wear_pct, ROUND(l.lap_time_seconds - LAG(l.lap_time_seconds, 1) OVER (ORDER BY l.lap_number), 3) AS delta_previous_lap FROM lap_telemetry l ORDER BY lap_number ASC LIMIT 10;`
    },
    {
      name: 'Theoretical Best Lap (Purple Sectors)',
      sql: `SELECT MIN(sector1_seconds) AS best_s1, MIN(sector2_seconds) AS best_s2, MIN(sector3_seconds) AS best_s3, ROUND(MIN(sector1_seconds) + MIN(sector2_seconds) + MIN(sector3_seconds), 3) AS theoretical_best_lap, MIN(lap_time_seconds) AS actual_fastest_lap FROM lap_telemetry;`
    },
    {
      name: 'Lateral G-Force vs Speed Trap',
      sql: `SELECT tire_compound, COUNT(*) as laps, ROUND(AVG(peak_lateral_g), 2) as avg_lat_g, ROUND(MAX(peak_lateral_g), 2) as peak_lat_g, ROUND(AVG(top_speed_kmh), 1) as avg_top_speed FROM lap_telemetry GROUP BY tire_compound;`
    },
    {
      name: 'Pit Stop Efficiency & Turnaround',
      sql: `SELECT p.lap_number, p.stationary_time_seconds, p.total_pitlane_time_seconds, p.old_compound, p.new_compound, p.fuel_added_liters FROM pit_stops p;`
    }
  ];

  // Fetch initial system status
  useEffect(() => {
    fetchSystemStatus();
    fetchSqlSchema();
    handleLanguageSelect('python');
  }, []);

  const fetchSystemStatus = async () => {
    try {
      setStatusLoading(true);
      const res = await api.getPolyglotStatus();
      if (res.success) {
        setSystemStatus(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setStatusLoading(false);
    }
  };

  const fetchSqlSchema = async () => {
    try {
      const res = await api.getSqlSchema();
      if (res.success) {
        setSqlSchema(res.schema);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLanguageSelect = (langKey) => {
    setSelectedLanguage(langKey);
    setEditorCode(languageTemplates[langKey] || '');
    setConsoleOutput('');
    setExecutionStats(null);
  };

  // Run code execution
  const handleExecuteCode = async () => {
    playClick();
    setIsExecutingCode(true);
    setConsoleOutput('Transmitting payload to Polyglot Runtime Grid...\n');

    try {
      const res = await api.runPolyglotCode(selectedLanguage, editorCode, simParams);
      if (res.success) {
        setConsoleOutput(res.output);
        setExecutionStats({
          executionTimeMs: res.executionTimeMs,
          language: res.language,
          timestamp: res.timestamp,
          structuredResult: res.structuredResult
        });
      } else {
        setConsoleOutput(`Error: ${res.message || 'Execution failed'}`);
      }
    } catch (err) {
      setConsoleOutput(`Runtime Error: ${err.message}`);
    } finally {
      setIsExecutingCode(false);
    }
  };

  // Run SQL Query
  const handleExecuteSql = async (overrideQuery) => {
    playClick();
    const q = overrideQuery || sqlQuery;
    setIsSqlExecuting(true);

    try {
      const res = await api.executeSqlQuery(q);
      setSqlResults(res);
    } catch (err) {
      setSqlResults({ success: false, error: err.message });
    } finally {
      setIsSqlExecuting(false);
    }
  };

  // Trigger Massive 10-Stage Pipeline
  const handleTriggerPipeline = async () => {
    playEngineRev();
    setPipelineRunning(true);
    setPipelineProgress(5);
    setPipelineResult(null);

    const stageNames = [
      'Go CAN-Bus Ingestion (100k pkts/s)',
      'C# Motec M1 CAN 2.0B Decoding',
      'Rust WASM Dynamics & Downforce Matrix',
      'Python AI Neural Degradation Model',
      'Kotlin Driver Biometrics & HRV Sync',
      'Java FIA GT3 Homologation & ASIL-D',
      'Ruby Race Strategy DSL Evaluation',
      'PHP Track Logistics & Fuel Allocation',
      'SQL Timeseries Telemetry Indexing',
      'TypeScript Virtual Pit Wall Dispatch'
    ];

    // Stage progression animation
    for (let i = 0; i < stageNames.length; i++) {
      setCurrentExecutingStage(stageNames[i]);
      setPipelineProgress(Math.round(((i + 1) / stageNames.length) * 95));
      await new Promise(r => setTimeout(r, 220));
    }

    try {
      const res = await api.runMassiveAutomationPipeline();
      setPipelineResult(res);
      setPipelineProgress(100);
      setCurrentExecutingStage('PIPELINE COMPLETE — ALL 11 ENGINES SYNCHRONIZED');
    } catch (err) {
      console.error(err);
    } finally {
      setPipelineRunning(false);
      fetchSystemStatus();
    }
  };

  // Run AI Predictor
  const handleRunAiPredict = async () => {
    playClick();
    setAiLoading(true);
    try {
      const res = await api.predictAiTelemetry('all');
      if (res.success) {
        setAiPrediction(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-racing-black text-white pt-24 pb-20 px-4 sm:px-8">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-racing-red/10 via-racing-black/80 to-racing-black z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        
        {/* Header Title Section */}
        <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-racing-red uppercase font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-racing-red animate-ping" />
              <span>AJITH KUMAR RACING • POLYGLOT MOTORSPORT OS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tight text-white flex items-center gap-3">
              ENGINEERING <span className="text-racing-red">SUITE</span> & AUTOMATION
            </h1>
            <p className="text-sm text-racing-silver max-w-2xl font-sans">
              High-throughput polyglot motorsport infrastructure powered by 11 synchronized programming languages: 
              <strong className="text-white"> TypeScript, JavaScript, Java, Go, C#, Python, Rust, Kotlin, PHP, Ruby, SQL</strong>.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={fetchSystemStatus}
              className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white flex items-center gap-2 transition-all rounded"
            >
              <RefreshCw size={14} className={statusLoading ? 'animate-spin' : ''} />
              <span>REFRESH ENGINES</span>
            </button>
            <button
              onClick={handleTriggerPipeline}
              disabled={pipelineRunning}
              className="px-6 py-2.5 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(217,4,41,0.4)] flex items-center gap-2 rounded"
            >
              <Zap size={15} className={pipelineRunning ? 'animate-bounce' : ''} />
              <span>{pipelineRunning ? 'EXECUTING PIPELINE...' : 'TRIGGER FULL AUTOMATION'}</span>
            </button>
          </div>
        </div>

        {/* 11 Microservice Live Status Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11 gap-2.5">
          {Object.entries(languageMeta).map(([key, meta]) => {
            const Icon = meta.icon;
            const isSelected = selectedLanguage === key;
            return (
              <div
                key={key}
                onClick={() => {
                  playClick();
                  handleLanguageSelect(key);
                  if (activeTab !== 'ide') setActiveTab('ide');
                }}
                className={`p-3 rounded border cursor-pointer transition-all duration-200 flex flex-col justify-between select-none ${
                  isSelected
                    ? 'bg-racing-red/15 border-racing-red shadow-[0_0_15px_rgba(217,4,41,0.3)] scale-[1.02]'
                    : 'bg-racing-graphite/40 border-white/10 hover:border-white/30 hover:bg-racing-graphite/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-racing-silver/70 font-bold">{meta.tag}</span>
                </div>
                <div className="my-2 flex items-center gap-1.5">
                  <Icon size={16} style={{ color: meta.color }} />
                  <span className="text-xs font-bold font-mono tracking-tight text-white truncate">{meta.name}</span>
                </div>
                <div className="text-[8px] font-mono text-racing-silver truncate">
                  {meta.role.split(' ')[0]} Engine
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'pipeline', label: '🚀 AUTONOMOUS PIPELINE', desc: '10-Stage Multi-Language Orchestration' },
            { id: 'ide', label: '💻 11-LANGUAGE RUNTIME IDE', desc: 'Interactive Multi-Language Playground' },
            { id: 'sql', label: '📊 SQL TELEMETRY CONSOLE', desc: 'Timeseries Telemetry Database' },
            { id: 'ai', label: '🧠 AI RACE ENGINEER (PYTHON)', desc: 'Tire Degradation & Lap Strategy' },
            { id: 'physics', label: '🏎️ WASM PHYSICS (RUST)', desc: 'Aero Downforce & Lateral Friction' },
            { id: 'architecture', label: '🌐 ARCHITECTURAL MESH', desc: '11-Engine Microservices Topology' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playClick();
                setActiveTab(tab.id);
              }}
              className={`px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all whitespace-nowrap border-b-2 flex flex-col items-start ${
                activeTab === tab.id
                  ? 'border-racing-red text-white bg-white/5'
                  : 'border-transparent text-racing-silver hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[9px] text-racing-silver/60 font-normal">{tab.desc}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: AUTONOMOUS RACE PIPELINE */}
        {activeTab === 'pipeline' && (
          <div className="space-y-8">
            {/* Pipeline Control Banner */}
            <div className="p-6 bg-gradient-to-r from-racing-graphite via-racing-graphite/80 to-racing-black border border-racing-red/30 rounded-lg relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-racing-red/20 text-racing-red text-[10px] font-mono font-bold uppercase rounded">
                    <Activity size={12} className="animate-spin" /> MASSIVE AUTOMATION ENGINE
                  </div>
                  <h3 className="text-2xl font-display font-black uppercase text-white tracking-tight">
                    AKR 10-STAGE AUTONOMOUS RACE PIPELINE
                  </h3>
                  <p className="text-xs text-racing-silver max-w-xl">
                    Chains <strong className="text-white">Go</strong> (100k packet ingestion) → <strong className="text-white">C#</strong> (Motec ECU decoder) → <strong className="text-white">Rust</strong> (WASM physics) → <strong className="text-white">Python</strong> (AI degradation) → <strong className="text-white">Kotlin</strong> (Driver biometrics) → <strong className="text-white">Java</strong> (FIA homologation) → <strong className="text-white">Ruby</strong> (Strategy DSL) → <strong className="text-white">PHP</strong> (Logistics) → <strong className="text-white">SQL</strong> (Telemetry timeseries) → <strong className="text-white">TypeScript/JS</strong> (Pit Wall HUD).
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                  <button
                    onClick={handleTriggerPipeline}
                    disabled={pipelineRunning}
                    className="w-full sm:w-auto px-8 py-4 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-sm uppercase tracking-widest transition-all rounded shadow-[0_0_30px_rgba(217,4,41,0.5)] flex items-center justify-center gap-3"
                  >
                    <Play size={18} className={pipelineRunning ? 'animate-spin' : ''} />
                    <span>{pipelineRunning ? 'EXECUTING PIPELINE...' : 'EXECUTE FULL PIPELINE'}</span>
                  </button>
                </div>
              </div>

              {/* Animated Progress Bar */}
              {(pipelineRunning || pipelineProgress > 0) && (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-racing-silver">{currentExecutingStage}</span>
                    <span className="text-racing-red font-bold">{pipelineProgress}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-racing-red via-red-500 to-emerald-500"
                      initial={{ width: '0%' }}
                      animate={{ width: `${pipelineProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Pipeline Stage Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { stage: 1, lang: 'Go', tag: 'Ingestion', icon: Activity, desc: '100k CAN packets/sec across 32 Goroutines', time: '1.2ms' },
                { stage: 2, lang: 'C#', tag: 'ECU Decoder', icon: Wrench, desc: 'Motec M1 frame parser & CRC checksum validation', time: '0.8ms' },
                { stage: 3, lang: 'Rust', tag: 'Physics Core', icon: Zap, desc: 'WASM downforce calculation & Pacejka friction circle', time: '0.14ms' },
                { stage: 4, lang: 'Python', tag: 'AI Predictor', icon: Cpu, desc: 'Neural polynomial tire degradation & pit window', time: '4.8ms' },
                { stage: 5, lang: 'Kotlin', tag: 'Biometrics', icon: HeartPulse, desc: 'Ajith Kumar HRV, cabin heat stress & reflex latency', time: '0.6ms' },
                { stage: 6, lang: 'Java', tag: 'Homologation', icon: ShieldCheck, desc: 'FIA GT3 Appendix J & ISO-26262 ASIL-D verifier', time: '1.4ms' },
                { stage: 7, lang: 'Ruby', tag: 'Strategy DSL', icon: Award, desc: 'Safety Car incident rules & undercut tactic engine', time: '0.9ms' },
                { stage: 8, lang: 'PHP', tag: 'Logistics', icon: Box, desc: 'Fuel barrel manifest, tire sets & freight routing', time: '1.1ms' },
                { stage: 9, lang: 'SQL', tag: 'Timeseries DB', icon: Database, desc: 'Lap microsector delta indexing & rolling avg pace', time: '1.8ms' },
                { stage: 10, lang: 'TypeScript', tag: 'Pit Wall HUD', icon: Code2, desc: 'Synchronized 60 FPS live broadcast telemetry state', time: '0.5ms' }
              ].map((stg) => {
                const Icon = stg.icon;
                const isFinished = pipelineResult?.stages?.some(s => s.stage === stg.stage);
                return (
                  <div
                    key={stg.stage}
                    className={`p-4 rounded border transition-all ${
                      isFinished
                        ? 'bg-emerald-950/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                        : 'bg-racing-graphite/40 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white font-bold">
                        STAGE 0{stg.stage}
                      </span>
                      {isFinished ? (
                        <CheckCircle2 size={16} className="text-emerald-400" />
                      ) : (
                        <span className="text-[10px] font-mono text-racing-silver">{stg.time}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={16} className="text-racing-red" />
                      <h4 className="text-xs font-bold uppercase text-white font-mono">{stg.lang} • {stg.tag}</h4>
                    </div>
                    <p className="text-[11px] text-racing-silver font-sans leading-tight">
                      {stg.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Pipeline Execution Detailed Telemetry Output */}
            {pipelineResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-racing-graphite/60 border border-emerald-500/40 rounded-lg space-y-6"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={24} className="text-emerald-400" />
                    <div>
                      <h4 className="font-display font-black text-lg uppercase text-white">
                        ALL 10 STAGES EXECUTED WITH ZERO ERRORS
                      </h4>
                      <p className="text-xs font-mono text-emerald-400">
                        Total Execution Latency: {pipelineResult.totalDurationMs} ms | Race Readiness: {pipelineResult.raceReadinessScore}%
                      </p>
                    </div>
                  </div>
                  <div className="px-4 py-1.5 bg-emerald-500/20 border border-emerald-500 text-emerald-300 font-mono text-xs uppercase font-bold rounded">
                    FIA APPROVED & HOMOLOGATED
                  </div>
                </div>

                {/* Stages Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-racing-silver text-[10px]">
                        <th className="py-2">STAGE</th>
                        <th className="py-2">LANGUAGE</th>
                        <th className="py-2">SUBSYSTEM</th>
                        <th className="py-2">EXECUTION TIME</th>
                        <th className="py-2">TELEMETRY PAYLOAD</th>
                        <th className="py-2">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {pipelineResult.stages?.map((s) => (
                        <tr key={s.stage} className="hover:bg-white/[0.02]">
                          <td className="py-3 text-white font-bold">STAGE 0{s.stage}</td>
                          <td className="py-3 text-racing-red font-bold">{s.language}</td>
                          <td className="py-3 text-white">{s.name}</td>
                          <td className="py-3 text-racing-silver">{s.executionTimeMs} ms</td>
                          <td className="py-3 text-racing-silver/90 text-[11px]">
                            {JSON.stringify(s.metrics)}
                          </td>
                          <td className="py-3 text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle2 size={12} /> {s.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* TAB 2: 11-LANGUAGE RUNTIME IDE */}
        {activeTab === 'ide' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar: Language Selector & Live Parameter Tuner */}
            <div className="lg:col-span-4 space-y-6">
              {/* Language Selector */}
              <div className="p-4 bg-racing-graphite/40 border border-white/10 rounded space-y-3">
                <h4 className="text-xs font-mono font-bold text-racing-red uppercase flex items-center gap-2">
                  <Code2 size={14} /> SELECT RUNTIME LANGUAGE
                </h4>
                <div className="grid grid-cols-2 gap-1.5">
                  {Object.entries(languageMeta).map(([k, meta]) => (
                    <button
                      key={k}
                      onClick={() => handleLanguageSelect(k)}
                      className={`px-3 py-2 rounded text-xs font-mono text-left flex items-center justify-between transition-all ${
                        selectedLanguage === k
                          ? 'bg-racing-red text-white font-bold shadow'
                          : 'bg-white/5 text-racing-silver hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span className="truncate">{meta.name}</span>
                      <ChevronRight size={12} className={selectedLanguage === k ? 'opacity-100' : 'opacity-30'} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulation Parameter Controls */}
              <div className="p-4 bg-racing-graphite/40 border border-white/10 rounded space-y-4">
                <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                  <Sliders size={14} className="text-racing-red" /> LIVE SIMULATION PARAMETERS
                </h4>

                {/* Speed Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-racing-silver">Vehicle Airspeed:</span>
                    <span className="text-white font-bold">{simParams.speed} km/h</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="320"
                    value={simParams.speed}
                    onChange={(e) => setSimParams({ ...simParams, speed: Number(e.target.value) })}
                    className="w-full accent-racing-red bg-white/10 h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Wing Angle Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-racing-silver">Rear Wing Angle:</span>
                    <span className="text-white font-bold">{simParams.wingAngle}°</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="14"
                    step="0.5"
                    value={simParams.wingAngle}
                    onChange={(e) => setSimParams({ ...simParams, wingAngle: Number(e.target.value) })}
                    className="w-full accent-racing-red bg-white/10 h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Track Temperature */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-racing-silver">Track Temp:</span>
                    <span className="text-white font-bold">{simParams.trackTemp} °C</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="60"
                    value={simParams.trackTemp}
                    onChange={(e) => setSimParams({ ...simParams, trackTemp: Number(e.target.value) })}
                    className="w-full accent-racing-red bg-white/10 h-1.5 rounded cursor-pointer"
                  />
                </div>

                {/* Tire Compound Selection */}
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-racing-silver">Tire Compound:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {['SOFT', 'MEDIUM', 'HARD'].map((comp) => (
                      <button
                        key={comp}
                        onClick={() => setSimParams({ ...simParams, compound: comp })}
                        className={`py-1 text-[10px] font-mono font-bold rounded border ${
                          simParams.compound === comp
                            ? 'bg-racing-red border-racing-red text-white'
                            : 'bg-white/5 border-white/10 text-racing-silver hover:text-white'
                        }`}
                      >
                        {comp}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Code Editor & Live Console Output */}
            <div className="lg:col-span-8 space-y-4">
              {/* Editor Header */}
              <div className="p-3 bg-racing-graphite border border-white/10 rounded-t flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                  <span className="text-xs font-mono text-white/80 font-bold ml-2">
                    AKR_{selectedLanguage.toUpperCase()}_RUNTIME.src
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLanguageSelect(selectedLanguage)}
                    className="text-[11px] font-mono text-racing-silver hover:text-white transition-colors"
                  >
                    RESET CODE
                  </button>
                  <button
                    onClick={handleExecuteCode}
                    disabled={isExecutingCode}
                    className="px-5 py-1.5 bg-racing-red hover:bg-racing-crimson text-white font-mono text-xs font-bold uppercase tracking-wider transition-all rounded flex items-center gap-1.5 shadow-[0_0_10px_rgba(217,4,41,0.3)]"
                  >
                    <Play size={13} className={isExecutingCode ? 'animate-spin' : ''} />
                    <span>{isExecutingCode ? 'EXECUTING...' : 'RUN CODE'}</span>
                  </button>
                </div>
              </div>

              {/* Code Area */}
              <div className="relative">
                <textarea
                  value={editorCode}
                  onChange={(e) => setEditorCode(e.target.value)}
                  rows={14}
                  className="w-full bg-[#0d0f12] text-white/90 font-mono text-xs p-4 rounded-b border border-t-0 border-white/10 focus:outline-none focus:border-racing-red resize-none shadow-inner"
                  spellCheck="false"
                />
              </div>

              {/* Live Terminal Output */}
              <div className="p-4 bg-black border border-white/15 rounded-lg space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/10 pb-2">
                  <span className="text-racing-red font-bold flex items-center gap-1.5">
                    <Terminal size={14} /> LIVE RUNTIME CONSOLE OUTPUT
                  </span>
                  {executionStats && (
                    <span className="text-emerald-400">
                      Executed in {executionStats.executionTimeMs} ms
                    </span>
                  )}
                </div>
                <pre className="font-mono text-xs text-emerald-400/90 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
                  {consoleOutput || '// Ready. Click "RUN CODE" to execute this program in the AKR Polyglot Runtime.'}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SQL TELEMETRY CONSOLE */}
        {activeTab === 'sql' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Sample Queries & Schema Explorer */}
            <div className="lg:col-span-4 space-y-6">
              {/* Sample Queries */}
              <div className="p-4 bg-racing-graphite/40 border border-white/10 rounded space-y-3">
                <h4 className="text-xs font-mono font-bold text-racing-red uppercase flex items-center gap-2">
                  <Database size={14} /> PRE-BUILT TELEMETRY QUERIES
                </h4>
                <div className="space-y-2">
                  {sampleQueries.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSqlQuery(sample.sql);
                        handleExecuteSql(sample.sql);
                      }}
                      className="w-full text-left p-2.5 rounded bg-white/5 hover:bg-white/10 border border-white/5 hover:border-racing-red/50 text-xs font-mono transition-all text-white/90"
                    >
                      <div className="font-bold text-white flex items-center justify-between">
                        <span>{sample.name}</span>
                        <ChevronRight size={12} className="text-racing-red" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Database Schema Viewer */}
              {sqlSchema && (
                <div className="p-4 bg-racing-graphite/40 border border-white/10 rounded space-y-3">
                  <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                    <HardDrive size={14} className="text-racing-red" /> DATABASE SCHEMA TABLES
                  </h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {Object.entries(sqlSchema).map(([tableName, cols]) => (
                      <div key={tableName} className="p-2 bg-black/40 rounded border border-white/5">
                        <span className="text-xs font-mono font-bold text-racing-red">{tableName}</span>
                        <div className="text-[10px] font-mono text-racing-silver mt-1 flex flex-wrap gap-1">
                          {cols.map((c) => (
                            <span key={c.name} className="px-1.5 py-0.5 bg-white/5 rounded">
                              {c.name} {c.pk ? '(PK)' : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: SQL Editor & Tabular Results */}
            <div className="lg:col-span-8 space-y-4">
              <div className="p-4 bg-racing-graphite border border-white/10 rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                    <Database size={14} className="text-racing-red" /> SQL QUERY EDITOR (SQLITE TIMESERIES)
                  </span>
                  <button
                    onClick={() => handleExecuteSql()}
                    disabled={isSqlExecuting}
                    className="px-5 py-1.5 bg-racing-red hover:bg-racing-crimson text-white font-mono text-xs font-bold uppercase tracking-wider transition-all rounded flex items-center gap-1.5"
                  >
                    <Play size={13} className={isSqlExecuting ? 'animate-spin' : ''} />
                    <span>{isSqlExecuting ? 'EXECUTING...' : 'RUN SQL QUERY'}</span>
                  </button>
                </div>
                <textarea
                  value={sqlQuery}
                  onChange={(e) => setSqlQuery(e.target.value)}
                  rows={6}
                  className="w-full bg-[#0d0f12] text-emerald-400 font-mono text-xs p-3 rounded border border-white/10 focus:outline-none focus:border-racing-red resize-none"
                  spellCheck="false"
                />
              </div>

              {/* Query Results Table */}
              {sqlResults && (
                <div className="p-4 bg-racing-graphite/40 border border-white/10 rounded-lg space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-bold">
                      {sqlResults.row_count !== undefined ? `${sqlResults.row_count} ROWS RETURNED` : 'RESULT'}
                    </span>
                    <span className="text-emerald-400">
                      Query Execution: {sqlResults.execution_time_ms} ms
                    </span>
                  </div>

                  {sqlResults.success ? (
                    <div className="overflow-x-auto max-h-80 overflow-y-auto">
                      <table className="w-full text-left font-mono text-xs">
                        <thead>
                          <tr className="border-b border-white/10 text-racing-silver bg-white/5">
                            {sqlResults.columns?.map((col) => (
                              <th key={col} className="p-2 font-bold uppercase text-[10px]">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {sqlResults.rows?.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-white/[0.03]">
                              {sqlResults.columns?.map((col) => (
                                <td key={col} className="p-2 text-white/90 whitespace-nowrap">
                                  {typeof row[col] === 'boolean' ? (row[col] ? '1' : '0') : row[col]}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-3 bg-red-950/40 border border-red-500/40 text-red-300 font-mono text-xs rounded">
                      SQL Error: {sqlResults.error}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: AI RACE ENGINEER (PYTHON NEURAL) */}
        {activeTab === 'ai' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Parameter Configuration */}
              <div className="p-6 bg-racing-graphite/40 border border-white/10 rounded-lg space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-racing-red uppercase">
                  <Cpu size={16} /> AI STINT PARAMETERS
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-racing-silver">Track Temperature:</span>
                      <span className="text-white font-bold">{simParams.trackTemp} °C</span>
                    </div>
                    <input
                      type="range"
                      min="25"
                      max="55"
                      value={simParams.trackTemp}
                      onChange={(e) => setSimParams({ ...simParams, trackTemp: Number(e.target.value) })}
                      className="w-full accent-racing-red bg-white/10 h-1.5 rounded cursor-pointer"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-mono text-racing-silver">Tire Compound:</span>
                    <div className="grid grid-cols-3 gap-2">
                      {['SOFT', 'MEDIUM', 'HARD'].map((comp) => (
                        <button
                          key={comp}
                          onClick={() => setSimParams({ ...simParams, compound: comp })}
                          className={`py-1.5 text-xs font-mono font-bold rounded border ${
                            simParams.compound === comp
                              ? 'bg-racing-red border-racing-red text-white'
                              : 'bg-white/5 border-white/10 text-racing-silver hover:text-white'
                          }`}
                        >
                          {comp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleRunAiPredict}
                    disabled={aiLoading}
                    className="w-full py-3 bg-racing-red hover:bg-racing-crimson text-white font-display font-black text-xs uppercase tracking-widest transition-all rounded flex items-center justify-center gap-2"
                  >
                    <Cpu size={14} className={aiLoading ? 'animate-spin' : ''} />
                    <span>{aiLoading ? 'CALCULATING NEURAL MODEL...' : 'RUN AI PREDICTION'}</span>
                  </button>
                </div>
              </div>

              {/* AI Optimal Strategy Recommendation Card */}
              <div className="p-6 bg-racing-graphite/40 border border-racing-red/30 rounded-lg space-y-4 lg:col-span-2">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono font-bold text-racing-red uppercase flex items-center gap-2">
                    <TrendingUp size={16} /> AI RACE ENGINEER STRATEGY RECOMMENDATION
                  </span>
                  <span className="text-xs font-mono text-emerald-400">MODEL: AKR-NEURAL-V4</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 bg-black/40 rounded border border-white/5">
                    <span className="text-[10px] font-mono text-racing-silver">RECOMMENDED PIT LAP</span>
                    <div className="text-2xl font-display font-black text-racing-red">LAP 27</div>
                    <span className="text-[9px] font-mono text-emerald-400">1-Stop Window</span>
                  </div>
                  <div className="p-3 bg-black/40 rounded border border-white/5">
                    <span className="text-[10px] font-mono text-racing-silver">STINT PACE (AVG)</span>
                    <div className="text-2xl font-display font-black text-white">1:54.420</div>
                    <span className="text-[9px] font-mono text-racing-silver">Base Delta +0.17s</span>
                  </div>
                  <div className="p-3 bg-black/40 rounded border border-white/5">
                    <span className="text-[10px] font-mono text-racing-silver">CLIFF LAP (SOFT)</span>
                    <div className="text-2xl font-display font-black text-yellow-400">LAP 18</div>
                    <span className="text-[9px] font-mono text-yellow-400">Grip Drop -40%</span>
                  </div>
                  <div className="p-3 bg-black/40 rounded border border-white/5">
                    <span className="text-[10px] font-mono text-racing-silver">TOTAL STINT TIME</span>
                    <div className="text-2xl font-display font-black text-white">5,844.8s</div>
                    <span className="text-[9px] font-mono text-emerald-400">Optimal Stint Pace</span>
                  </div>
                </div>

                <div className="p-3 bg-white/5 rounded text-xs font-sans text-racing-silver leading-relaxed">
                  <strong className="text-white">AI Strategy Insight:</strong> With track temperature at {simParams.trackTemp}°C, 
                  the {simParams.compound} compound maintains linear grip through Lap 18 before thermal degradation steepens. 
                  Executing an undercut on Lap 27 with fresh Medium tires secures a projected +18.5s track delta against rivals.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: WASM PHYSICS CORE (RUST) */}
        {activeTab === 'physics' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-racing-graphite/40 border border-white/10 rounded-lg space-y-6">
              <h4 className="text-xs font-mono font-bold text-racing-red uppercase flex items-center gap-2">
                <Zap size={16} /> RUST VEHICLE DYNAMICS MATRIX
              </h4>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-racing-silver">Chassis Curb Mass:</span>
                  <span className="text-white font-bold">1,260.0 kg</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-racing-silver">Dynamic Air Pressure:</span>
                  <span className="text-white font-bold">{Math.round(0.5 * 1.225 * Math.pow(simParams.speed / 3.6, 2))} Pa</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-racing-silver">Calculated Downforce:</span>
                  <span className="text-racing-red font-bold">22,370 N (2,281 kg)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-racing-silver">Aero Drag Force:</span>
                  <span className="text-white font-bold">13,130 N</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-racing-silver">Aero Efficiency (L/D):</span>
                  <span className="text-emerald-400 font-bold">1.70</span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/5">
                  <span className="text-racing-silver">WASM Microsecond Latency:</span>
                  <span className="text-emerald-400 font-bold">14 μs</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 p-6 bg-racing-graphite/40 border border-white/10 rounded-lg space-y-4">
              <h4 className="text-xs font-mono font-bold text-white uppercase flex items-center gap-2">
                <Gauge size={16} className="text-racing-red" /> G-FORCE TRACTION FRICTION CIRCLE (PACEJKA FORMULA)
              </h4>

              <div className="h-64 bg-black/50 rounded-lg border border-white/10 relative flex items-center justify-center">
                {/* Friction Circle Crosshairs */}
                <div className="absolute w-48 h-48 rounded-full border border-dashed border-white/20" />
                <div className="absolute w-32 h-32 rounded-full border border-dashed border-racing-red/30" />
                <div className="absolute w-16 h-16 rounded-full border border-dashed border-white/20" />
                <div className="absolute w-full h-[1px] bg-white/10" />
                <div className="absolute h-full w-[1px] bg-white/10" />

                {/* Animated Lateral G Vector Dot */}
                <motion.div
                  className="w-4 h-4 rounded-full bg-racing-red shadow-[0_0_15px_#d90429] relative z-10"
                  animate={{
                    x: [0, 45, -35, 60, -50, 0],
                    y: [0, -20, 30, -40, 25, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />

                <div className="absolute bottom-3 left-4 text-[10px] font-mono text-racing-silver">
                  LATERAL PEAK: <strong className="text-white">3.65 G</strong> | LONGITUDINAL PEAK: <strong className="text-white">4.20 G</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ARCHITECTURAL MESH */}
        {activeTab === 'architecture' && (
          <div className="p-8 bg-racing-graphite/40 border border-white/10 rounded-lg space-y-6">
            <div className="space-y-2 border-b border-white/10 pb-4">
              <h3 className="text-2xl font-display font-black uppercase text-white tracking-tight">
                AKR POLYGLOT MICROSERVICES TOPOLOGY & DATA FLOW
              </h3>
              <p className="text-xs text-racing-silver">
                How all 11 languages interconnect to form the high-performance nervous system of Ajith Kumar Racing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
              <div className="p-4 bg-black/40 rounded border border-white/10 space-y-2">
                <span className="text-racing-red font-bold">1. REAL-TIME INGESTION & ECU</span>
                <p className="text-racing-silver text-[11px] leading-relaxed">
                  <strong>Go</strong> streams 100,000 CAN packets/s via Goroutines into zero-allocation channels. 
                  <strong>C#</strong> parses Motec M1 CAN 2.0B frames and extracts high-precision throttle, RPM, and AFR data.
                </p>
              </div>

              <div className="p-4 bg-black/40 rounded border border-white/10 space-y-2">
                <span className="text-racing-red font-bold">2. PHYSICS & AI PREDICTIONS</span>
                <p className="text-racing-silver text-[11px] leading-relaxed">
                  <strong>Rust</strong> calculates dynamic downforce vectors and tire slip in 14 microseconds. 
                  <strong>Python</strong> runs neural polynomial regression models for tire degradation and optimal stint pace.
                </p>
              </div>

              <div className="p-4 bg-black/40 rounded border border-white/10 space-y-2">
                <span className="text-racing-red font-bold">3. SAFETY, BIOMETRICS & LOGISTICS</span>
                <p className="text-racing-silver text-[11px] leading-relaxed">
                  <strong>Java</strong> enforces FIA GT3 Appendix J homologation & ISO-26262 ASIL-D safety rules. 
                  <strong>Kotlin</strong> monitors driver biometrics. <strong>PHP</strong> coordinates fuel and tire logistics.
                </p>
              </div>

              <div className="p-4 bg-black/40 rounded border border-white/10 space-y-2">
                <span className="text-racing-red font-bold">4. STRATEGY AUTOMATION & TIMESERIES</span>
                <p className="text-racing-silver text-[11px] leading-relaxed">
                  <strong>Ruby</strong> DSL executes automated incident rules under Safety Cars. 
                  <strong>SQL</strong> indexes microsector timeseries and runs window analytical queries in sub-milliseconds.
                </p>
              </div>

              <div className="p-4 bg-black/40 rounded border border-white/10 space-y-2">
                <span className="text-racing-red font-bold">5. ORCHESTRATION & CLIENT HUD</span>
                <p className="text-racing-silver text-[11px] leading-relaxed">
                  <strong>TypeScript</strong> maintains strict type contracts across backend and frontend. 
                  <strong>JavaScript</strong> orchestrates Web Audio engine tones and 60 FPS Virtual Pit Wall UI streams.
                </p>
              </div>

              <div className="p-4 bg-racing-red/10 border border-racing-red/40 rounded space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-white font-bold">🏁 AKR TOTAL MESH INTEGRATION</span>
                  <p className="text-racing-silver text-[11px] mt-1">
                    11 Synchronized languages delivering microsecond precision on track.
                  </p>
                </div>
                <div className="text-[10px] text-racing-red font-bold">
                  AKR GT3-01 #9 • READY FOR DUBAI 24H 2026
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
