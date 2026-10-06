// AJITH KUMAR RACING (AKR) — POLYGLOT MOTORSPORT PLATFORM
// C# Diagnostic Stream Entry Point
// Language: C#

using System;
using AkrMotorsport.ECU;

namespace AkrMotorsport
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("🏎️ AJITH KUMAR RACING — C# Motec CAN-Bus Diagnostic Engine");
            var decoder = new MotecCanBusDecoder();

            // Sample Motec CAN 2.0B frame: 0x0E0 (Engine RPM 8,250, Throttle 100%, Gear 5)
            var frame = new CanFrame
            {
                CanId = 0x0E0,
                Dlc = 8,
                Data = new byte[] { 0x20, 0x3A, 0xC8, 0x96, 0x05, 0x00, 0x00, 0x00 },
                TimestampUs = 1775472000000
            };

            var state = decoder.DecodeFrame(frame);
            Console.WriteLine(decoder.SerializeDiagnostics(state));
        }
    }
}
