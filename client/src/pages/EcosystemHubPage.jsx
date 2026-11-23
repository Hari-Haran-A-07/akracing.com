import React from 'react';
import MultiRepoStatusGrid from '../components/ecosystem/MultiRepoStatusGrid';
import CFDAirflowVisualizer from '../components/telemetry/CFDAirflowVisualizer';
import MobileSyncQR from '../components/ecosystem/MobileSyncQR';
import MLConfidenceGauge from '../components/ecosystem/MLConfidenceGauge';
import RustEngineThroughputMeter from '../components/ecosystem/RustEngineThroughputMeter';

const mockRepos = [
  { id: '1', name: 'akr-telemetry-engine', language: 'Rust / C++', role: '100Hz CAN-bus ingestion gateway', port: 50051, url: 'https://github.com/Hari-Haran-A-07/akr-telemetry-engine' },
  { id: '2', name: 'akr-cfd-aerodynamics', language: 'Python / Wasm', role: 'Airflow & downforce Navier-Stokes solver', port: 8081, url: 'https://github.com/Hari-Haran-A-07/akr-cfd-aerodynamics' },
  { id: '3', name: 'akr-pitwall-mobile', language: 'React Native', role: 'Paddock companion tablet & radio app', port: 8082, url: 'https://github.com/Hari-Haran-A-07/akr-pitwall-mobile' },
  { id: '4', name: 'akr-strategy-ml', language: 'PyTorch / Python', role: 'Neural pit stop optimization engine', port: 8083, url: 'https://github.com/Hari-Haran-A-07/akr-strategy-ml' },
  { id: '5', name: 'akr-polyglot-mesh', language: 'Go / Envoy', role: 'Distributed RPC service mesh & mTLS bus', port: 9090, url: 'https://github.com/Hari-Haran-A-07/akr-polyglot-mesh' },
];

const EcosystemHubPage = () => {
  return (
    <div className=\"min-h-screen bg-black text-white pt-24 pb-16 px-6 max-w-7xl mx-auto font-mono\">
      <div className=\"mb-8 border-b border-gray-800 pb-6\">
        <span className=\"text-xs text-red-500 font-bold uppercase tracking-widest\">
          Multi-Repository Architecture
        </span>
        <h1 className=\"text-3xl md:text-5xl font-black mt-1\">
          5-MICROSERVICE ECOSYSTEM
        </h1>
        <p className=\"text-gray-400 text-sm mt-2 font-sans\">
          Orchestrated integration connecting AKR core web platform with 5 specialized motorsport engineering repositories.
        </p>
      </div>

      <div className=\"mb-10\">
        <MultiRepoStatusGrid repositories={mockRepos} />
      </div>

      <div className=\"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10\">
        <RustEngineThroughputMeter />
        <MLConfidenceGauge />
        <CFDAirflowVisualizer />
        <MobileSyncQR />
      </div>
    </div>
  );
};

export default EcosystemHubPage;
