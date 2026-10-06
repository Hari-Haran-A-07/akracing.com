// AJITH KUMAR RACING (AKR) — POLYGLOT MOTORSPORT PLATFORM
// Go Microservice Stream Gateway Main Runner
// Language: Go

package main

import (
	"context"
	"fmt"
	"time"

	"github.com/ajithkumarracing/polyglot-streamer/streamer"
)

func main() {
	fmt.Println("🏎️ AJITH KUMAR RACING — Go High-Concurrency Stream Engine")
	broker := streamer.NewTelemetryBroker(16, 50000)
	ctx, cancel := context.WithTimeout(context.Background(), 500*time.Millisecond)
	defer cancel()

	broker.Start(ctx)

	// Stream simulation: 100,000 packets
	for i := uint64(0); i < 100000; i++ {
		broker.Ingest(streamer.CANTelemetryPacket{
			PacketID:     i + 1,
			Timestamp:    time.Now(),
			CarNumber:    "AKR-09",
			EngineRPM:    7850,
			SpeedKMH:     268.4,
			Gear:         5,
			ThrottlePct:  98.5,
			BrakeBar:     0.0,
			OilPressure:  5.4,
			CoolantTempC: 88.5,
			BatteryVolts: 13.8,
			CRCValid:     true,
		})
	}

	time.Sleep(100 * time.Millisecond)
	fmt.Printf("Engine Status: ONLINE\n%s\n", broker.ExportJSON())
}
