# ðŸš€ Google Flow Technologies & Automation Architecture
## Ajith Kumar Racing (AKR) Motorsport Platform

The AKR digital platform leverages **Google Flow Technologies** (Google Cloud Workflows, Cloud Pub/Sub, Cloud Tasks, BigQuery, Vertex AI & Gemini) to engineer a high-frequency, resilient, event-driven motorsport automation ecosystem.

---

### ðŸ›ï¸ Architecture Overview

\\\
[ Vehicle Telemetry Sensors (100Hz) ]
                â”‚
                â–¼
  [ Google Cloud Pub/Sub Topic ]
   (akr-telemetry-live)
                â”‚
         â”Œâ”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
         â–¼                                  â–¼
[ BigQuery Streamer ]             [ Google Cloud Workflows ]
(Telemetry Partitioned DW)          (raceStrategyFlow.yaml)
                                            â”‚
                                â”Œâ”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”´â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”
                                â–¼                       â–¼
                       [ Vertex AI Anomaly ]   [ Cloud Tasks Queue ]
                       (Brake / Oil / G-Force)  (Rate-Limited Actions)
                                â”‚                       â”‚
                                â””â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”¬â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”˜
                                            â–¼
                               [ Paddock Alert & Radio ]
                                 (Google Chat Webhooks)
\\\

---

### âš™ï¸ Component Breakdown

1. **Google Cloud Workflows Orchestration Engine:**
   - Declarative YAML definitions for multi-stage pipelines.
   - Fault-tolerant retries, exponential backoffs, and execution state persistence.
   - Sample flow: \aceStrategyFlow.yaml\ evaluates tire wear and simulates optimal pit windows.

2. **Google Cloud Pub/Sub Real-time Messaging:**
   - Ingests high-frequency telemetry frames at 100Hz.
   - Decouples pit-wall streaming from background analytical workers.

3. **Google Cloud Tasks:**
   - Rate-governed task queues ensuring smooth dispatch of customer newsletters, inventory alerts, and delayed telemetry analyses.

4. **Vertex AI & Gemini-1.5 AI Models:**
   - **Gemini Lap Commentary:** Generates dynamic, contextual race broadcast commentary.
   - **Vertex Tabular Anomaly Diagnosis:** Pinpoints micro-fluctuations in brake line pressure and cooling temperatures.
   - **Multilingual Press Localizer:** Translates dispatches into Tamil, French, German, and Arabic.

5. **BigQuery Telemetry Analytics:**
   - High-throughput buffer streaming directly into partitioned BigQuery tables.
   - Automated lap delta calculation and driver consistency benchmarking.

---

Â© 2026 Ajith Kumar Racing. Engineered for performance and precision.
