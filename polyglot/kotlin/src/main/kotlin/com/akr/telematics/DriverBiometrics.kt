// AJITH KUMAR RACING (AKR) — POLYGLOT MOTORSPORT PLATFORM
// Kotlin Multiplatform Driver Biometric Telematics & Reflex Monitor
// Language: Kotlin

package com.akr.telematics

data class BiometricSnapshot(
    val driverId: String = "AKR_DRIVER_09",
    val driverName: String = "Ajith Kumar",
    val heartRateBpm: Int,
    val heartRateVariabilityMs: Double,
    val coreBodyTempC: Double,
    val sweatLossRateLitersHour: Double,
    val gForceLoadEnduranceIndex: Double, // 0.0 - 100.0
    val cognitiveReflexLatencyMs: Double,
    val stressLevel: StressLevel,
    val hydrationStatus: HydrationStatus
)

enum class StressLevel {
    OPTIMAL_FLOW_STATE,
    ELEVATED_AWARENESS,
    HIGH_STRESS_THRESHOLD,
    EXHAUSTION_WARNING
}

enum class HydrationStatus {
    OPTIMAL,
    MILD_DEHYDRATION,
    CRITICAL_FLUID_DEFICIT
}

class DriverBiometricsEngine {

    fun evaluateDriverFitness(
        currentBpm: Int,
        sustainedLateralG: Double,
        ambientCockpitTempC: Double,
        stintDurationMinutes: Double
    ): BiometricSnapshot {
        val hrv = 65.0 - (stintDurationMinutes * 0.45).coerceAtLeast(15.0)
        val coreTemp = 37.0 + (stintDurationMinutes * 0.025) + (ambientCockpitTempC - 30.0) * 0.015
        val sweatRate = 1.2 + (ambientCockpitTempC / 40.0) * 0.6
        val reflexLatency = 185.0 + (stintDurationMinutes * 0.8)

        val enduranceScore = (100.0 - (sustainedLateralG * 8.5) - (stintDurationMinutes * 0.4)).coerceIn(10.0, 100.0)

        val stress = when {
            currentBpm < 145 -> StressLevel.OPTIMAL_FLOW_STATE
            currentBpm < 165 -> StressLevel.ELEVATED_AWARENESS
            currentBpm < 180 -> StressLevel.HIGH_STRESS_THRESHOLD
            else -> StressLevel.EXHAUSTION_WARNING
        }

        val hydration = when {
            stintDurationMinutes < 45 -> HydrationStatus.OPTIMAL
            stintDurationMinutes < 90 -> HydrationStatus.MILD_DEHYDRATION
            else -> HydrationStatus.CRITICAL_FLUID_DEFICIT
        }

        return BiometricSnapshot(
            heartRateBpm = currentBpm,
            heartRateVariabilityMs = Math.round(hrv * 10.0) / 10.0,
            coreBodyTempC = Math.round(coreTemp * 10.0) / 10.0,
            sweatLossRateLitersHour = Math.round(sweatRate * 10.0) / 10.0,
            gForceLoadEnduranceIndex = Math.round(enduranceScore * 10.0) / 10.0,
            cognitiveReflexLatencyMs = Math.round(reflexLatency * 10.0) / 10.0,
            stressLevel = stress,
            hydrationStatus = hydration
        )
    }
}
