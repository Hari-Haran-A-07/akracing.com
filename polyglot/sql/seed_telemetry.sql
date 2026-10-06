-- ==========================================================
-- AJITH KUMAR RACING (AKR) — SQL TELEMETRY SEED DATA
-- ==========================================================

INSERT INTO drivers (driver_id, name, racing_number, country_code, superlicense_id, fia_ranking_grade) VALUES
('DRV_09', 'Ajith Kumar', 9, 'IND', 'FIA-SL-AK-09-PRO', 'PLATINUM'),
('DRV_11', 'Cameron McLeod', 11, 'AUS', 'FIA-SL-CM-11-SILVER', 'GOLD'),
('DRV_04', 'Mathieu Jaminet', 4, 'FRA', 'FIA-SL-MJ-04-PRO', 'PLATINUM');

INSERT INTO cars (car_id, model_name, chassis_code, engine_spec, horsepower, torque_nm, curb_weight_kg) VALUES
('CAR_GT3_01', 'AKR GT3-01 SPEC', 'CHASSIS-AKR-992-001', '4.0L Naturally Aspirated Flat-6', 510, 470, 1260.0),
('CAR_GT4_02', 'AKR GT4 Challenge', 'CHASSIS-AKR-718-002', '3.8L Mid-Engine Flat-6', 425, 420, 1320.0);

INSERT INTO race_events (event_id, event_name, circuit_name, location, track_length_km, total_laps, event_date, status) VALUES
('EVT_DUBAI_24H_2026', '24H Dubai 2026', 'Dubai Autodrome', 'Dubai, UAE', 5.390, 250, '2026-01-18', 'COMPLETED'),
('EVT_ABU_DHABI_6H_2026', '6H Abu Dhabi 2026', 'Yas Marina Circuit', 'Abu Dhabi, UAE', 5.281, 150, '2026-01-25', 'COMPLETED'),
('EVT_MUGELLO_12H_2026', '12H Mugello 2026', 'Autodromo Internazionale del Mugello', 'Scarperia, Italy', 5.245, 180, '2026-03-22', 'COMPLETED');

-- Seed 15 Realistic Laps for Ajith Kumar (#9) at Dubai Autodrome
INSERT INTO lap_telemetry (event_id, driver_id, car_id, lap_number, lap_time_seconds, sector1_seconds, sector2_seconds, sector3_seconds, top_speed_kmh, avg_speed_kmh, peak_lateral_g, tire_compound, tire_wear_pct, fuel_remaining_liters, is_fastest_lap) VALUES
('EVT_DUBAI_24H_2026', 'DRV_09', 'CAR_GT3_01', 1, 118.420, 39.120, 41.500, 37.800, 278.4, 163.8, 2.85, 'SOFT', 4.2, 116.5, 0),
('EVT_DUBAI_24H_2026', 'DRV_09', 'CAR_GT3_01', 2, 115.850, 38.250, 40.400, 37.200, 284.1, 167.4, 3.12, 'SOFT', 8.5, 113.8, 0),
('EVT_DUBAI_24H_2026', 'DRV_09', 'CAR_GT3_01', 3, 114.920, 37.890, 40.120, 36.910, 287.5, 168.8, 3.34, 'SOFT', 12.8, 111.0, 0),
('EVT_DUBAI_24H_2026', 'DRV_09', 'CAR_GT3_01', 4, 114.310, 37.650, 39.920, 36.740, 289.2, 169.7, 3.48, 'SOFT', 17.2, 108.2, 0),
('EVT_DUBAI_24H_2026', 'DRV_09', 'CAR_GT3_01', 5, 113.890, 37.420, 39.810, 36.660, 291.0, 170.3, 3.65, 'SOFT', 21.9, 105.4, 1),
('EVT_DUBAI_24H_2026', 'DRV_09', 'CAR_GT3_01', 6, 114.120, 37.510, 39.890, 36.720, 290.4, 170.0, 3.52, 'SOFT', 26.8, 102.6, 0),
('EVT_DUBAI_24H_2026', 'DRV_09', 'CAR_GT3_01', 7, 114.450, 37.640, 40.010, 36.800, 289.8, 169.5, 3.44, 'SOFT', 31.9, 99.8, 0),
('EVT_DUBAI_24H_2026', 'DRV_09', 'CAR_GT3_01', 8, 114.780, 37.780, 40.150, 36.850, 288.6, 169.0, 3.38, 'SOFT', 37.2, 97.0, 0),
('EVT_DUBAI_24H_2026', 'DRV_09', 'CAR_GT3_01', 9, 115.100, 37.900, 40.280, 36.920, 287.9, 168.5, 3.30, 'SOFT', 42.8, 94.2, 0),
('EVT_DUBAI_24H_2026', 'DRV_09', 'CAR_GT3_01', 10, 115.520, 38.050, 40.450, 37.020, 286.7, 167.9, 3.22, 'SOFT', 48.6, 91.4, 0),
('EVT_DUBAI_24H_2026', 'DRV_09', 'CAR_GT3_01', 11, 115.980, 38.220, 40.620, 37.140, 285.4, 167.2, 3.15, 'SOFT', 54.7, 88.6, 0),
('EVT_DUBAI_24H_2026', 'DRV_09', 'CAR_GT3_01', 12, 116.450, 38.390, 40.810, 37.250, 284.2, 166.5, 3.08, 'SOFT', 61.0, 85.8, 0),
('EVT_DUBAI_24H_2026', 'DRV_09', 'CAR_GT3_01', 13, 117.120, 38.620, 41.080, 37.420, 282.8, 165.6, 2.98, 'SOFT', 67.5, 83.0, 0),
('EVT_DUBAI_24H_2026', 'DRV_09', 'CAR_GT3_01', 14, 117.890, 38.900, 41.350, 37.640, 281.5, 164.5, 2.88, 'SOFT', 74.3, 80.2, 0),
('EVT_DUBAI_24H_2026', 'DRV_09', 'CAR_GT3_01', 15, 142.300, 39.100, 58.200, 45.000, 180.0, 136.2, 1.80, 'SOFT', 81.4, 77.4, 0);

INSERT INTO pit_stops (event_id, driver_id, lap_number, stationary_time_seconds, total_pitlane_time_seconds, old_compound, new_compound, fuel_added_liters, driver_change) VALUES
('EVT_DUBAI_24H_2026', 'DRV_09', 15, 21.8, 38.4, 'SOFT', 'MEDIUM', 45.0, 0);
