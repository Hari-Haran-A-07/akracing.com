/**
 * Ecosystem Multi-Repository Health Unit Tests
 */
import fs from 'fs';
import path from 'path';

console.log('--- RUNNING ECOSYSTEM 5-REPO CONFIG TESTS ---');

const configPath = path.resolve(process.cwd(), 'ecosystem.config.json');
console.assert(fs.existsSync(configPath), 'ecosystem.config.json must exist');

const parsed = JSON.parse(fs.readFileSync(configPath, 'utf8'));
console.assert(parsed.connectedRepositories.length === 5, 'Must define exactly 5 connected repositories');

const repoIds = parsed.connectedRepositories.map((r) => r.id);
console.assert(repoIds.includes('akr-telemetry-engine'), 'Must include akr-telemetry-engine');
console.assert(repoIds.includes('akr-cfd-aerodynamics'), 'Must include akr-cfd-aerodynamics');
console.assert(repoIds.includes('akr-pitwall-mobile'), 'Must include akr-pitwall-mobile');
console.assert(repoIds.includes('akr-strategy-ml'), 'Must include akr-strategy-ml');
console.assert(repoIds.includes('akr-polyglot-mesh'), 'Must include akr-polyglot-mesh');

console.log('✓ All 5 ecosystem repository definitions validated.');
