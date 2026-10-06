// AJITH KUMAR RACING (AKR) — POLYGLOT MOTORSPORT PLATFORM
// C# Motec M1 CAN 2.0B Frame Decoder & ECU Diagnostics
// Language: C# (.NET)

using System;
using System.Collections.Generic;
using System.Text.Json;

namespace AkrMotorsport.ECU
{
    public struct CanFrame
    {
        public uint CanId { get; set; }
        public byte Dlc { get; set; }
        public byte[] Data { get; set; }
        public long TimestampUs { get; set; }
    }

    public class DecodedEcuState
    {
        public int EngineRpm { get; set; }
        public double ThrottlePercent { get; set; }
        public double ManifoldPressureKpa { get; set; }
        public double LambdaAirFuelRatio { get; set; }
        public double EngineOilTempC { get; set; }
        public double FuelPressureBar { get; set; }
        public int SelectedGear { get; set; }
        public bool TractionControlIntervention { get; set; }
        public bool PitLimiterActive { get; set; }
        public double BatteryVolts { get; set; }
        public List<string> ActiveDiagnosticCodes { get; set; } = new();
    }

    public class MotecCanBusDecoder
    {
        public DecodedEcuState DecodeFrame(CanFrame frame)
        {
            var state = new DecodedEcuState();

            switch (frame.CanId)
            {
                case 0x0E0: // Engine Basic: RPM, Throttle, MAP, Air Temp
                    if (frame.Data.Length >= 8)
                    {
                        state.EngineRpm = (frame.Data[0] << 8) | frame.Data[1];
                        state.ThrottlePercent = frame.Data[2] * 0.5;
                        state.ManifoldPressureKpa = frame.Data[3] * 1.2;
                        state.SelectedGear = frame.Data[4] & 0x0F;
                        state.PitLimiterActive = (frame.Data[4] & 0x80) != 0;
                    }
                    break;

                case 0x0E1: // Fuel & Lambda Dynamics
                    if (frame.Data.Length >= 8)
                    {
                        state.LambdaAirFuelRatio = 0.70 + ((frame.Data[0] << 8 | frame.Data[1]) * 0.001);
                        state.FuelPressureBar = frame.Data[2] * 0.1;
                        state.EngineOilTempC = frame.Data[3] - 40;
                        state.BatteryVolts = frame.Data[4] * 0.1;
                    }
                    break;

                case 0x0E2: // Chassis & Traction Control
                    if (frame.Data.Length >= 8)
                    {
                        state.TractionControlIntervention = (frame.Data[0] & 0x01) != 0;
                        if (state.TractionControlIntervention)
                        {
                            state.ActiveDiagnosticCodes.Add("DTC_TC_SLIP_CUT");
                        }
                    }
                    break;
            }

            return state;
        }

        public string SerializeDiagnostics(DecodedEcuState state)
        {
            return JsonSerializer.Serialize(state, new JsonSerializerOptions { WriteIndented = true });
        }
    }
}
