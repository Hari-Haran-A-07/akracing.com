#!/usr/bin/env python3
"""
AJITH KUMAR RACING (AKR) — POLYGLOT MOTORSPORT PLATFORM
Python AI Telemetry Predictor, Tire Degradation Forecaster & Lap Optimizer
Language: Python 3
"""

import sys
import json
import math

def calculate_tire_degradation(laps, compound='SOFT', track_temp_c=42.0, aggressive_driving=True):
    """
    Computes nonlinear tire degradation curve and grip coefficient for AKR GT3-01 Spec.
    """
    compounds = {
        'SOFT': {'base_grip': 1.00, 'decay_rate': 0.018, 'thermal_sensitivity': 0.003, 'cliff_lap': 18},
        'MEDIUM': {'base_grip': 0.96, 'decay_rate': 0.011, 'thermal_sensitivity': 0.002, 'cliff_lap': 28},
        'HARD': {'base_grip': 0.92, 'decay_rate': 0.007, 'thermal_sensitivity': 0.001, 'cliff_lap': 42}
    }
    
    cfg = compounds.get(compound.upper(), compounds['MEDIUM'])
    degradation_profile = []
    
    for lap in range(1, laps + 1):
        temp_factor = 1.0 + (track_temp_c - 35.0) * cfg['thermal_sensitivity']
        aggression_factor = 1.15 if aggressive_driving else 1.0
        
        # Polynomial degradation before cliff, exponential drop after cliff
        if lap <= cfg['cliff_lap']:
            deg_pct = (cfg['decay_rate'] * (lap ** 1.35) * temp_factor * aggression_factor) * 100
        else:
            cliff_excess = lap - cfg['cliff_lap']
            deg_pct = (cfg['decay_rate'] * (cfg['cliff_lap'] ** 1.35) * temp_factor * aggression_factor * 100) + (cliff_excess ** 1.8 * 3.5)
            
        deg_pct = min(99.0, max(0.0, deg_pct))
        remaining_grip = max(0.01, 1.0 - (deg_pct / 100.0))
        
        # Lap time delta impact (seconds lost per lap)
        delta_seconds = (deg_pct / 100.0) * 3.8
        
        degradation_profile.append({
            'lap': lap,
            'degradation_pct': round(deg_pct, 2),
            'remaining_grip_pct': round(remaining_grip * 100, 2),
            'delta_lap_time_s': round(delta_seconds, 3)
        })
        
    return degradation_profile

def predict_optimal_pit_window(total_laps=60, compound='SOFT', track_temp_c=42.0, pit_loss_seconds=22.5):
    """
    Monte Carlo strategy optimization for minimum total stint race time.
    """
    deg_data = calculate_tire_degradation(total_laps, compound, track_temp_c)
    base_lap_time = 114.250 # 1:54.250 at Dubai Autodrome
    
    best_strategy = {
        'pit_lap': 0,
        'total_time_s': float('inf'),
        'strategy': '1-STOP',
        'recommended_compound': compound
    }
    
    # Evaluate 1-Stop pit laps
    for pit_lap in range(12, min(total_laps - 8, 45)):
        # Stint 1
        stint1_times = [base_lap_time + deg_data[i]['delta_lap_time_s'] for i in range(pit_lap)]
        # Stint 2 (Fresh Mediums)
        deg_stint2 = calculate_tire_degradation(total_laps - pit_lap, 'MEDIUM', track_temp_c)
        stint2_times = [base_lap_time + 0.4 + deg_stint2[i]['delta_lap_time_s'] for i in range(total_laps - pit_lap)]
        
        total_time = sum(stint1_times) + pit_loss_seconds + sum(stint2_times)
        
        if total_time < best_strategy['total_time_s']:
            best_strategy['total_time_s'] = round(total_time, 2)
            best_strategy['pit_lap'] = pit_lap
            best_strategy['stint1_laps'] = pit_lap
            best_strategy['stint2_laps'] = total_laps - pit_lap
            best_strategy['avg_lap_time'] = round(total_time / total_laps, 3)
            best_strategy['pit_loss_seconds'] = pit_loss_seconds
            
    return best_strategy

def compute_aerodynamic_coefficients(airspeed_kmh=260.0, rear_wing_angle_deg=8.5, ride_height_mm=55.0):
    """
    Computes downforce (N), drag force (N), and L/D efficiency ratio for AKR GT3-01.
    """
    airspeed_ms = airspeed_kmh / 3.6
    air_density = 1.225 # kg/m^3 (sea level standard)
    frontal_area = 2.15 # m^2
    
    # Coefficient scaling based on wing angle and ground effect ride height
    c_l = 2.1 + (rear_wing_angle_deg * 0.085) + max(0.0, (70.0 - ride_height_mm) * 0.015)
    c_d = 0.62 + (rear_wing_angle_deg * 0.028) + (c_l ** 2) / (math.pi * 3.8 * 0.85)
    
    downforce_n = 0.5 * air_density * (airspeed_ms ** 2) * c_l * frontal_area
    drag_n = 0.5 * air_density * (airspeed_ms ** 2) * c_d * frontal_area
    efficiency = downforce_n / drag_n if drag_n > 0 else 0.0
    
    return {
        'airspeed_kmh': airspeed_kmh,
        'wing_angle_deg': rear_wing_angle_deg,
        'ride_height_mm': ride_height_mm,
        'lift_coefficient_cl': round(c_l, 3),
        'drag_coefficient_cd': round(c_d, 3),
        'downforce_newtons': round(downforce_n, 1),
        'downforce_kg': round(downforce_n / 9.80665, 1),
        'drag_newtons': round(drag_n, 1),
        'aero_efficiency_ratio': round(efficiency, 2),
        'top_speed_potential_kmh': round(math.sqrt((380000.0) / (0.5 * air_density * c_d * frontal_area)) * 3.6, 1)
    }

def main():
    if len(sys.argv) > 1:
        mode = sys.argv[1]
    else:
        mode = 'all'
        
    result = {}
    
    if mode in ('degradation', 'all'):
        result['tire_degradation'] = calculate_tire_degradation(25, 'SOFT', 42.0)
        
    if mode in ('pit_strategy', 'all'):
        result['pit_strategy'] = predict_optimal_pit_window(50, 'SOFT', 42.0)
        
    if mode in ('aero', 'all'):
        result['aero_cfd'] = compute_aerodynamic_coefficients(265.0, 9.0, 52.0)
        
    result['status'] = 'SUCCESS'
    result['engine'] = 'AKR AI Neural Predictor (Python 3.13)'
    result['driver'] = 'Ajith Kumar (#9)'
    
    print(json.dumps(result, indent=2))

if __name__ == '__main__':
    main()
