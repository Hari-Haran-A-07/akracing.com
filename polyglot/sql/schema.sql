-- ==========================================================
-- AJITH KUMAR RACING (AKR) — RELATIONAL TELEMETRY SCHEMA
-- Language: SQL (PostgreSQL / SQLite Compatible)
-- ==========================================================

DROP TABLE IF EXISTS microsectors;
DROP TABLE IF EXISTS lap_telemetry;
DROP TABLE IF EXISTS pit_stops;
DROP TABLE IF EXISTS race_events;
DROP TABLE IF EXISTS drivers;
DROP TABLE IF EXISTS cars;

CREATE TABLE drivers (
    driver_id VARCHAR(32) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    racing_number INT NOT NULL,
    country_code VARCHAR(3) NOT NULL,
    superlicense_id VARCHAR(50) NOT NULL,
    fia_ranking_grade VARCHAR(10) DEFAULT 'PLATINUM'
);

CREATE TABLE cars (
    car_id VARCHAR(32) PRIMARY KEY,
    model_name VARCHAR(100) NOT NULL,
    chassis_code VARCHAR(50) UNIQUE NOT NULL,
    engine_spec VARCHAR(100) NOT NULL,
    horsepower INT NOT NULL,
    torque_nm INT NOT NULL,
    curb_weight_kg DECIMAL(6,2) NOT NULL
);

CREATE TABLE race_events (
    event_id VARCHAR(32) PRIMARY KEY,
    event_name VARCHAR(150) NOT NULL,
    circuit_name VARCHAR(150) NOT NULL,
    location VARCHAR(100) NOT NULL,
    track_length_km DECIMAL(5,3) NOT NULL,
    total_laps INT NOT NULL,
    event_date DATE NOT NULL,
    status VARCHAR(30) DEFAULT 'SCHEDULED'
);

CREATE TABLE lap_telemetry (
    lap_id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id VARCHAR(32) NOT NULL,
    driver_id VARCHAR(32) NOT NULL,
    car_id VARCHAR(32) NOT NULL,
    lap_number INT NOT NULL,
    lap_time_seconds DECIMAL(6,3) NOT NULL,
    sector1_seconds DECIMAL(5,3) NOT NULL,
    sector2_seconds DECIMAL(5,3) NOT NULL,
    sector3_seconds DECIMAL(5,3) NOT NULL,
    top_speed_kmh DECIMAL(5,1) NOT NULL,
    avg_speed_kmh DECIMAL(5,1) NOT NULL,
    peak_lateral_g DECIMAL(4,2) NOT NULL,
    tire_compound VARCHAR(20) NOT NULL,
    tire_wear_pct DECIMAL(5,2) NOT NULL,
    fuel_remaining_liters DECIMAL(5,2) NOT NULL,
    is_fastest_lap BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES drivers(driver_id),
    FOREIGN KEY (car_id) REFERENCES cars(car_id),
    FOREIGN KEY (event_id) REFERENCES race_events(event_id)
);

CREATE TABLE pit_stops (
    pit_stop_id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_id VARCHAR(32) NOT NULL,
    driver_id VARCHAR(32) NOT NULL,
    lap_number INT NOT NULL,
    stationary_time_seconds DECIMAL(5,2) NOT NULL,
    total_pitlane_time_seconds DECIMAL(5,2) NOT NULL,
    old_compound VARCHAR(20) NOT NULL,
    new_compound VARCHAR(20) NOT NULL,
    fuel_added_liters DECIMAL(5,2) NOT NULL,
    driver_change BOOLEAN DEFAULT 0
);

CREATE INDEX idx_laps_driver ON lap_telemetry(driver_id, lap_number);
CREATE INDEX idx_laps_event ON lap_telemetry(event_id, lap_number);
