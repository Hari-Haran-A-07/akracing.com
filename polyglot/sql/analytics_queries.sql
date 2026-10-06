-- ==========================================================
-- AJITH KUMAR RACING (AKR) — ADVANCED SQL TELEMETRY QUERIES
-- ==========================================================

-- 1. Stint Telemetry Benchmark & Lap Delta vs Rolling Average
SELECT 
    l.lap_number,
    l.lap_time_seconds,
    l.sector1_seconds,
    l.sector2_seconds,
    l.sector3_seconds,
    l.top_speed_kmh,
    l.tire_wear_pct,
    ROUND(l.lap_time_seconds - LAG(l.lap_time_seconds, 1) OVER (ORDER BY l.lap_number), 3) AS delta_previous_lap,
    ROUND(AVG(l.lap_time_seconds) OVER (ORDER BY l.lap_number ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 3) AS rolling_3lap_avg,
    RANK() OVER (ORDER BY l.lap_time_seconds ASC) AS stint_pace_rank
FROM lap_telemetry l
WHERE l.event_id = 'EVT_DUBAI_24H_2026' AND l.driver_id = 'DRV_09'
ORDER BY l.lap_number ASC;

-- 2. Theoretical Best Lap (Purple Microsector Matrix)
SELECT 
    MIN(sector1_seconds) AS best_s1,
    MIN(sector2_seconds) AS best_s2,
    MIN(sector3_seconds) AS best_s3,
    ROUND(MIN(sector1_seconds) + MIN(sector2_seconds) + MIN(sector3_seconds), 3) AS theoretical_best_lap,
    MIN(lap_time_seconds) AS actual_fastest_lap,
    ROUND(MIN(lap_time_seconds) - (MIN(sector1_seconds) + MIN(sector2_seconds) + MIN(sector3_seconds)), 3) AS potential_time_gain
FROM lap_telemetry
WHERE event_id = 'EVT_DUBAI_24H_2026';

-- 3. High-G Cornering Load vs Tire Degradation Index
SELECT 
    tire_compound,
    COUNT(*) as total_laps,
    ROUND(AVG(peak_lateral_g), 2) as avg_lateral_g,
    ROUND(MAX(peak_lateral_g), 2) as peak_g_recorded,
    ROUND(MAX(tire_wear_pct) - MIN(tire_wear_pct), 2) as total_wear_drop,
    ROUND(AVG(top_speed_kmh), 1) as avg_speed_trap_kmh
FROM lap_telemetry
GROUP BY tire_compound;
