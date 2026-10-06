<?php
/**
 * AJITH KUMAR RACING (AKR) — POLYGLOT MOTORSPORT PLATFORM
 * PHP Global Motorsport Logistics, Fuel Allocation & Superlicense Engine
 * Language: PHP 8.x
 */

namespace Akr\Logistics;

class LogisticsEngine
{
    private array $circuitProfiles = [
        'DUBAI_AUTODROME' => ['distance_km' => 5.39, 'fuel_per_lap_liters' => 2.85, 'tire_wear_factor' => 1.35],
        'YAS_MARINA' => ['distance_km' => 5.28, 'fuel_per_lap_liters' => 2.72, 'tire_wear_factor' => 1.20],
        'SILVERSTONE' => ['distance_km' => 5.89, 'fuel_per_lap_liters' => 3.10, 'tire_wear_factor' => 1.45],
        'SPA_FRANCORCHAMPS' => ['distance_km' => 7.00, 'fuel_per_lap_liters' => 3.65, 'tire_wear_factor' => 1.50],
        'NURBURGRING_24H' => ['distance_km' => 25.37, 'fuel_per_lap_liters' => 12.8, 'tire_wear_factor' => 1.80],
    ];

    public function calculateWeekendFuelAndTireManifest(string $circuitKey, int $scheduledLaps, int $allocatedTireSets): array
    {
        $circuit = $this->circuitProfiles[$circuitKey] ?? $this->circuitProfiles['DUBAI_AUTODROME'];
        
        $baseFuel = $scheduledLaps * $circuit['fuel_per_lap_liters'];
        $safetyMarginFuel = $baseFuel * 0.12; // 12% contingency
        $totalFuelRequired = round($baseFuel + $safetyMarginFuel, 1);
        
        $totalDistanceKm = round($scheduledLaps * $circuit['distance_km'], 1);
        $lapsPerTireSet = round($scheduledLaps / max(1, $allocatedTireSets), 1);

        return [
            'circuit' => $circuitKey,
            'track_length_km' => $circuit['distance_km'],
            'total_scheduled_laps' => $scheduledLaps,
            'total_race_distance_km' => $totalDistanceKm,
            'fuel_manifest' => [
                'base_fuel_liters' => round($baseFuel, 1),
                'safety_reserve_liters' => round($safetyMarginFuel, 1),
                'total_barrel_allocation_liters' => $totalFuelRequired,
                'standard_drums_200l' => ceil($totalFuelRequired / 200.0)
            ],
            'tire_manifest' => [
                'total_sets_allocated' => $allocatedTireSets,
                'slick_sets_dry' => round($allocatedTireSets * 0.7),
                'intermediate_sets' => round($allocatedTireSets * 0.15),
                'full_wet_sets' => round($allocatedTireSets * 0.15),
                'target_laps_per_stint' => $lapsPerTireSet
            ],
            'freight_routing' => [
                'container_type' => '40ft High-Cube Motorsport Air/Sea Freight',
                'customs_carnet' => 'ATA-CARNET-FIA-2026-AKR',
                'status' => 'DISPATCH_CONFIRMED'
            ]
        ];
    }
}
