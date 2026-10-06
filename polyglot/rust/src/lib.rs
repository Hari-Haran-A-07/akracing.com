//! AJITH KUMAR RACING (AKR) — POLYGLOT MOTORSPORT PLATFORM
//! Rust High-Performance Physics & Downforce Matrix Core
//! Language: Rust

pub mod physics_engine;

pub use physics_engine::{
    AeroVector, BrakeThermalDynamics, PhysicsSimulationInput, PhysicsSimulationOutput,
    TireFrictionCircle, VehicleDynamicsEngine,
};

#[no_mangle]
pub extern "C" fn akr_calculate_downforce(speed_kmh: f64, wing_angle: f64) -> f64 {
    let engine = VehicleDynamicsEngine::default();
    engine.calculate_downforce(speed_kmh, wing_angle).total_downforce_n
}

#[no_mangle]
pub extern "C" fn akr_calculate_lateral_g(speed_kmh: f64, corner_radius_m: f64) -> f64 {
    let v_ms = speed_kmh / 3.6;
    (v_ms * v_ms) / (corner_radius_m * 9.80665)
}
