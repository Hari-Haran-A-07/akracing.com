/**
 * AJITH KUMAR RACING (AKR) — POLYGLOT MOTORSPORT ROUTES
 * Languages: TypeScript, JavaScript, Java, Go, C#, Python, Rust, Kotlin, PHP, Ruby, SQL
 */

import express from 'express';
import {
  getPolyglotStatus,
  executeCode,
  executeSqlQuery,
  getSqlSchema,
  predictAiTelemetry,
  runMassiveAutomationPipeline
} from '../controllers/polyglotController.js';

const router = express.Router();

router.get('/status', getPolyglotStatus);
router.post('/run', executeCode);
router.post('/sql/query', executeSqlQuery);
router.get('/sql/schema', getSqlSchema);
router.post('/ai/predict', predictAiTelemetry);
router.post('/automation/pipeline', runMassiveAutomationPipeline);

export default router;
