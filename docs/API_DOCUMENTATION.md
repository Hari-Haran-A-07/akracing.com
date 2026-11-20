# ðŸŽï¸ AKR Motorsport Platform â€” API Reference Manual

Welcome to the **Ajith Kumar Racing (AKR)** REST API documentation.

---

## Base URL
\https://api.ajithkumarracing.com/api\ (Production)
\http://localhost:5000/api\ (Development)

---

## Authentication
Authentication is managed via JSON Web Tokens (Bearer Auth) or Hardware API Keys for on-board transponders:
- \Authorization: Bearer <token>\
- \X-API-Key: <hardware-api-key>\

---

## Core Endpoints

### 1. Telemetry & Virtual Pit Wall
- \GET /api/telemetry/live\ â€” Real-time 100Hz telemetry feed
- \POST /api/telemetry/ingest\ â€” On-board hardware stream ingest
- \GET /api/telemetry/analytics\ â€” Lap delta and friction circle summary

### 2. Google Flow Automation
- \GET /api/automation/status\ â€” Orchestration engine status
- \POST /api/automation/workflows/trigger\ â€” Dispatches Cloud Workflow DAG
- \GET /api/automation/workflows/executions\ â€” Execution run history

### 3. Fleet & Racing Calendar
- \GET /api/cars\ â€” Fleet specifications (GT3-01 SPEC)
- \GET /api/races\ â€” Race schedule and calendar
- \GET /api/news\ â€” Press releases and race reports

---

Â© 2026 Ajith Kumar Racing. All Rights Reserved.
