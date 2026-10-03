export const initialData = {
  driver: {
    id: "ajith-kumar",
    name: "AJITH KUMAR",
    number: "9",
    nationality: "Indian",
    team: "AJITH KUMAR RACING (AKR)",
    role: "Lead Driver & Team Principal",
    status: "Active - International GT Competition",
    bio: "Ajith Kumar is one of India's most accomplished and dedicated international racing drivers. With a motorsport career spanning over two decades, from Formula Maruti and British Formula 3 to the FIA Formula Two Championship and modern international GT3 endurance racing, his relentless discipline and engineering intellect define the ethos of Ajith Kumar Racing.",
    philosophy: "Motorsport is pure truth. The telemetry never lies. On the track, your discipline, mental composure, and technical synchronization with the machine are everything.",
    stats: {
      raceStarts: 74,
      podiums: 18,
      wins: 7,
      polePositions: 5,
      fastestLaps: 12,
      championships: 2,
      careerKm: "48,500+ KM",
      maxGForce: "3.8 G"
    },
    specs: {
      height: "178 cm",
      weight: "74 kg",
      bloodType: "O+",
      homeCircuit: "Madras International Circuit / Dubai Autodrome",
      preferredSetup: "Sharp front-end bite with controlled trail-braking stability"
    },
    images: {
      portrait: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
      racingSuit: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
      helmet: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1200&auto=format&fit=crop",
      action: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1400&auto=format&fit=crop",
      cockpit: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop"
    },
    careerTimeline: [
      {
        year: "2002 - 2003",
        period: "EARLY YEARS & FORMULA BMW",
        category: "Formula BMW Asia",
        circuit: "Sepang & Asian Circuits",
        description: "Competed in the inaugural Formula BMW Asia championship, battling premier open-wheel prospects across the Asia-Pacific region.",
        achievement: "Multiple top-6 finishes, consistent points scoring.",
        image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop"
      },
      {
        year: "2004",
        period: "BRITISH FORMULA 3",
        category: "British F3 Championship (National Class)",
        circuit: "Donington Park, Knockhill & Silverstone",
        description: "Raced for Scholarship Class in the prestigious British Formula 3 series against international factory drivers.",
        achievement: "2 International Podiums (3rd at Donington Park & Knockhill).",
        image: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=800&auto=format&fit=crop"
      },
      {
        year: "2010",
        period: "FIA FORMULA TWO",
        category: "FIA Formula Two Championship",
        circuit: "Silverstone, Monza, Brands Hatch, Circuit de Spa",
        description: "Represented India on the FIA world championship stage, piloting Williams-designed Formula 2 high-downforce single-seaters.",
        achievement: "Consistent European finishes, 1:44 lap times at Silverstone.",
        image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop"
      },
      {
        year: "2024 - 2025",
        period: "INTERNATIONAL GT & 24H ENDURANCE",
        category: "24H Series / European GT & Creventic",
        circuit: "Dubai Autodrome, Mugello, Circuit Paul Ricard, Barcelona",
        description: "Established AJITH KUMAR RACING (AKR) as a premier international racing organization competing in GT3/GT4 endurance championships.",
        achievement: "Podium finishes in 24H Series Middle East & European Championship.",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop"
      },
      {
        year: "2026",
        period: "GLOBAL ENDURANCE CAMPAIGN",
        category: "Middle East & European GT Championship",
        circuit: "Abu Dhabi, Dubai, Spa-Francorchamps, Monza",
        description: "Leading AKR's flagship international endurance program with advanced telemetry and engineering operations.",
        achievement: "Active Championship Contender.",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },

  cars: [
    {
      id: "akr-gt3-01",
      name: "AKR GT3-01 SPEC",
      modelCode: "AKR-GT3-EVO-2026",
      class: "FIA GT3 Homologated / Endurance Cup",
      season: "2026",
      subtitle: "THE CARBON-FIBER BEAST ENGINEERED FOR 24-HOUR PRECISION",
      description: "The AKR GT3-01 is the pinnacle of Ajith Kumar Racing's competitive stable. Built on an ultra-rigid carbon-composite monocoque with advanced aero-channeling, sequential 6-speed pneumatic paddle shift, and high-frequency Motec telemetry logging 120 parameters at 1000Hz.",
      specs: {
        engine: "4.0L Naturally Aspirated Flat-6 / High-Revving GT-Spec",
        power: "510 BHP @ 8,400 RPM",
        torque: "470 Nm @ 6,150 RPM",
        topSpeed: "305 KM/H (Aero-dependent)",
        acceleration: "0-100 km/h in 3.1s",
        weight: "1,260 KG (Dry, Homologated Minimum)",
        transmission: "6-Speed Sequential Dog-Ring with Pneumatic Paddle Shift",
        brakes: "6-Piston Front / 4-Piston Rear Monobloc Aluminum with Racing ABS",
        downforce: "850 KG @ 250 KM/H in high-downforce trim",
        electronics: "Bosch Motorsport MS6 Engine Management & Multi-Level Traction Control"
      },
      images: {
        hero: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1600&auto=format&fit=crop",
        front: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop",
        side: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1400&auto=format&fit=crop",
        cockpit: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1400&auto=format&fit=crop",
        engine: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1400&auto=format&fit=crop",
        track: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1600&auto=format&fit=crop"
      },
      hotspots: [
        {
          id: "aero",
          title: "AERODYNAMICS & CARBON SPLITTER",
          category: "AERODYNAMICS",
          x: 22,
          y: 72,
          summary: "Front carbon splitter paired with swan-neck rear wing delivering 850kg of downforce.",
          detail: "Computational fluid dynamics (CFD) optimized underbody vortex generators and dive planes maximize front-axle bite in high-speed apexes without inducing parasitic drag."
        },
        {
          id: "engine",
          title: "POWERTRAIN & DRY SUMP",
          category: "ENGINE",
          x: 68,
          y: 45,
          summary: "4.0-liter racing powertrain generating 510 BHP with instantaneous throttle response.",
          detail: "Multi-stage dry sump lubrication with rigid valve train capable of sustaining continuous 8,500+ RPM under 3.5+ G lateral loads across 24-hour endurance stints."
        },
        {
          id: "brakes",
          title: "MONOBLOC BRAKING SYSTEM",
          category: "BRAKING SYSTEM",
          x: 35,
          y: 65,
          summary: "380mm slotted steel racing discs with 12-stage adjustable Bosch Motorsport ABS.",
          detail: "Dual-circuit master cylinders with driver-adjustable cockpit brake bias control, carbon cooling ducts, and instant thermal dissipation."
        },
        {
          id: "suspension",
          title: "KW 4-WAY ADJUSTABLE DAMPING",
          category: "SUSPENSION",
          x: 48,
          y: 58,
          summary: "Double wishbone front axle with uniball spherical bearings and blade anti-roll bars.",
          detail: "Separate high/low-speed compression and rebound adjustment allowing micro-tuning for curbs, track degradation, and varying fuel loads."
        },
        {
          id: "cockpit",
          title: "CARBON-KEVLAR SAFETY CELL",
          category: "COCKPIT",
          x: 52,
          y: 38,
          summary: "FIA 8862-2009 homologated composite seat, integrated roll cage, and multifunction steering wheel.",
          detail: "Color OLED telemetry display, rapid driver-change pedal box, drink system, and fire suppression direct nozzles."
        },
        {
          id: "telemetry",
          title: "HIGH-SPEED DATA TELEMETRY",
          category: "DATA SYSTEM",
          x: 62,
          y: 32,
          summary: "Real-time 4G/5G encrypted pit-to-car telemetry streaming tyre pressure, brake temps, and suspension travel.",
          detail: "Direct live interface to the AKR Virtual Pit Wall analyzing tyre degradation deltas and fuel consumption strategies in real-time."
        }
      ]
    },
    {
      id: "akr-gt4-cup",
      name: "AKR GT4 CHALLENGE",
      modelCode: "AKR-GT4-CLUB-2025",
      class: "GT4 European Series / Clubsport",
      season: "2025-2026",
      subtitle: "PURIST MECHANICAL PURSUIT FOR SPRINT AND ENDURANCE BATTLES",
      description: "Engineered for pure driver engagement and customer racing development, the GT4 platform delivers razor-sharp feedback with reduced running costs while upholding AKR's relentless standards.",
      specs: {
        engine: "3.8L Twin-Turbo / Naturally Aspirated Track Spec",
        power: "425 BHP @ 7,800 RPM",
        torque: "425 Nm @ 5,500 RPM",
        topSpeed: "285 KM/H",
        acceleration: "0-100 km/h in 3.9s",
        weight: "1,320 KG",
        transmission: "6-Speed PDK Dual-Clutch with Optimized Racing Mapping",
        brakes: "380mm Front / 355mm Rear Cast-Iron Discs",
        downforce: "320 KG @ 200 KM/H",
        electronics: "Motorsport Stability Management with switchable modes"
      },
      images: {
        hero: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1600&auto=format&fit=crop",
        front: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1400&auto=format&fit=crop",
        side: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1400&auto=format&fit=crop",
        cockpit: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop",
        engine: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1400&auto=format&fit=crop",
        track: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1600&auto=format&fit=crop"
      },
      hotspots: []
    }
  ],

  championships: [
    {
      id: "champ-2026-24h",
      title: "24H SERIES MIDDLE EAST TROPHY 2026",
      season: "2026",
      category: "GT3 Endurance Championship",
      driver: "Ajith Kumar & International Pro-Am Lineup",
      car: "AKR GT3-01 SPEC (#9)",
      currentPosition: "2nd in Class",
      points: 84,
      totalRounds: 6,
      status: "In Progress",
      banner: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1400&auto=format&fit=crop",
      description: "The premier multi-class endurance series spanning 12-hour and 24-hour non-stop battles across Middle Eastern and European circuits."
    },
    {
      id: "champ-2026-euro-gt",
      title: "EUROPEAN GT CHALLENGE 2026",
      season: "2026",
      category: "Pro-Am GT3 Championship",
      driver: "Ajith Kumar",
      car: "AKR GT3-01 SPEC (#9)",
      currentPosition: "3rd Overall",
      points: 62,
      totalRounds: 8,
      status: "Active",
      banner: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1400&auto=format&fit=crop",
      description: "High-octane sprint and endurance rounds across iconic European cathedrals of speed including Spa-Francorchamps, Monza, and Paul Ricard."
    },
    {
      id: "champ-2025-dubai",
      title: "24H DUBAI ENDURANCE CUP 2025",
      season: "2025",
      category: "GT3 Pro-Am",
      driver: "Ajith Kumar",
      car: "AKR GT3-01 SPEC",
      currentPosition: "P3 (Podium Finish)",
      points: 45,
      totalRounds: 1,
      status: "Completed",
      banner: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1400&auto=format&fit=crop",
      description: "A monumental 24-hour endurance pursuit at Dubai Autodrome culminating in an international podium finish for Ajith Kumar Racing."
    }
  ],

  races: [
    {
      id: "race-2026-01",
      round: "ROUND 01",
      title: "24H DUBAI 2026",
      circuit: "Dubai Autodrome",
      country: "UAE",
      location: "Dubai",
      date: "Jan 16 - 18, 2026",
      status: "completed",
      trackLength: "5.390 KM",
      lapCount: "582 Laps",
      weather: "Clear / 22°C Night",
      championship: "24H SERIES MIDDLE EAST TROPHY 2026",
      circuitMapUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "race-2026-02",
      round: "ROUND 02",
      title: "6H ABU DHABI 2026",
      circuit: "Yas Marina Circuit",
      country: "UAE",
      location: "Abu Dhabi",
      date: "Feb 07 - 08, 2026",
      status: "completed",
      trackLength: "5.281 KM",
      lapCount: "164 Laps",
      weather: "Dry / 26°C",
      championship: "24H SERIES MIDDLE EAST TROPHY 2026",
      circuitMapUrl: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "race-2026-03",
      round: "ROUND 03",
      title: "12H MUGELLO 2026",
      circuit: "Autodromo Internazionale del Mugello",
      country: "ITALY",
      location: "Scarperia e San Piero, Tuscany",
      date: "Mar 20 - 22, 2026",
      status: "completed",
      trackLength: "5.245 KM",
      lapCount: "330 Laps",
      weather: "Overcast / 18°C",
      championship: "24H SERIES EUROPE 2026",
      circuitMapUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "race-2026-04",
      round: "ROUND 04",
      title: "12H SPA-FRANCORCHAMPS 2026",
      circuit: "Circuit de Spa-Francorchamps",
      country: "BELGIUM",
      location: "Stavelot, Ardennes",
      date: "Apr 24 - 26, 2026",
      status: "live",
      trackLength: "7.004 KM",
      lapCount: "250 Laps",
      weather: "Damp / 14°C (Optimal Tyre Temp 85°C)",
      championship: "24H SERIES EUROPE 2026",
      circuitMapUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "race-2026-05",
      round: "ROUND 05",
      title: "12H MONZA 2026",
      circuit: "Autodromo Nazionale Monza",
      country: "ITALY",
      location: "Monza, Lombardy",
      date: "May 22 - 24, 2026",
      status: "upcoming",
      trackLength: "5.793 KM",
      lapCount: "280 Laps",
      weather: "TBD",
      championship: "EUROPEAN GT CHALLENGE 2026",
      circuitMapUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "race-2026-06",
      round: "ROUND 06",
      title: "24H BARCELONA 2026",
      circuit: "Circuit de Barcelona-Catalunya",
      country: "SPAIN",
      location: "Montmeló, Catalonia",
      date: "Sep 18 - 20, 2026",
      status: "upcoming",
      trackLength: "4.675 KM",
      lapCount: "640 Laps",
      weather: "TBD",
      championship: "24H SERIES EUROPE 2026",
      circuitMapUrl: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=800&auto=format&fit=crop"
    }
  ],

  results: [
    {
      id: "res-01",
      round: "ROUND 01",
      season: "2026",
      raceTitle: "24H DUBAI 2026",
      circuit: "Dubai Autodrome",
      date: "Jan 18, 2026",
      qualifying: "P4",
      racePosition: "P2 (PODIUM)",
      points: 38,
      status: "Finished - 579 Laps",
      fastestLap: "1:58.421",
      gap: "+14.280s",
      sectorTimes: { s1: "36.842s", s2: "44.209s", s3: "37.370s" },
      highlights: "Stunning night stint by Ajith Kumar, making up 4 positions under treacherous conditions to seal a hard-fought P2 class podium."
    },
    {
      id: "res-02",
      round: "ROUND 02",
      season: "2026",
      raceTitle: "6H ABU DHABI 2026",
      circuit: "Yas Marina Circuit",
      date: "Feb 08, 2026",
      qualifying: "P2",
      racePosition: "P1 (VICTORY)",
      points: 25,
      status: "Winner - 164 Laps",
      fastestLap: "2:04.112",
      gap: "LEADER",
      sectorTimes: { s1: "38.102s", s2: "47.880s", s3: "38.130s" },
      highlights: "Flawless pit-stop execution and masterclass stint management delivering an emotional first-place class victory at Yas Marina."
    },
    {
      id: "res-03",
      round: "ROUND 03",
      season: "2026",
      raceTitle: "12H MUGELLO 2026",
      circuit: "Autodromo Internazionale del Mugello",
      date: "Mar 22, 2026",
      qualifying: "P3",
      racePosition: "P3 (PODIUM)",
      points: 21,
      status: "Finished - 328 Laps",
      fastestLap: "1:49.760",
      gap: "+31.850s",
      sectorTimes: { s1: "32.140s", s2: "41.020s", s3: "36.600s" },
      highlights: "High-speed masterclass through Arrabbiata 1 & 2 curves, holding off relentless pressure from European factory outfits to secure P3."
    }
  ],

  telemetry: {
    liveStatus: {
      session: "12H SPA-FRANCORCHAMPS - LIVE RACE",
      driver: "AJITH KUMAR",
      car: "AKR GT3-01 (#9)",
      currentPosition: 2,
      currentLap: 84,
      totalLaps: 250,
      lapTime: "2:17.382",
      bestLap: "2:16.890",
      gapToLeader: "+2.418s",
      lastPitStop: "Lap 62 (Fuel + Tyres / 42.1s)",
      currentSpeed: 278,
      rpm: 8250,
      gear: 5,
      throttlePct: 98,
      brakePressureBar: 0,
      steeringAngleDeg: -2.4,
      lateralG: 2.8,
      longitudinalG: 0.9,
      tyrePressure: { fl: 2.05, fr: 2.08, rl: 2.02, rr: 2.04 }, // Bar
      tyreTemp: { fl: 88, fr: 94, rl: 86, rr: 91 }, // °C
      brakeTemp: { fl: 540, fr: 560, rl: 480, rr: 495 }, // °C
      fuelRemainingLiters: 48.5,
      fuelPerLap: 3.42,
      sectors: {
        s1: { current: "41.820s", best: "41.650s", status: "purple" },
        s2: { current: "1:03.110s", best: "1:02.940s", status: "green" },
        s3: { current: "32.452s", best: "32.300s", status: "green" }
      }
    }
  },

  news: [
    {
      id: "news-01",
      slug: "akr-claims-monumental-victory-at-yas-marina",
      title: "AJITH KUMAR RACING CLAIMS HISTORIC CLASS VICTORY AT YAS MARINA CIRCUIT",
      category: "Racing",
      excerpt: "A tactical masterclass in pit strategy and flawless high-speed stint execution delivers AKR's finest endurance triumph under the Abu Dhabi lights.",
      content: `In a scintillating display of raw speed, tire preservation, and unyielding tactical discipline, Ajith Kumar Racing (AKR) clinched a historic Class Victory at the 6H Abu Dhabi at Yas Marina Circuit.
      
Piloting the #9 AKR GT3-01, lead driver and team principal Ajith Kumar executed a breathless triple-stint during the critical sunset-to-dark transition, systematically cutting down a 19-second deficit to seize the race lead on Lap 124.

"This victory belongs to our relentless engineering crew, mechanics, and every single supporter across India and the globe," said Ajith Kumar in the post-race conference. "We came here with one objective: zero mistakes, maximum mechanical precision, and unwavering faith in our telemetry setup. The car was on absolute rails from the opening corner."

The victory catapults AKR into the top tier of the 24H Series Middle East standings as the team prepares its shipping logistics for the European leg beginning at Mugello.`,
      coverImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop",
      author: "AKR Motorsport Communications",
      publishDate: "February 09, 2026",
      readTime: "4 MIN READ",
      tags: ["VICTORY", "YAS MARINA", "GT3", "ENDURANCE", "AJITH KUMAR"],
      featured: true
    },
    {
      id: "news-02",
      slug: "unveiling-the-akr-gt3-01-aerodynamic-evolution",
      title: "ENGINEERED FOR DOWNFORCE: INSIDE THE AKR GT3-01 EVO UPGRADE",
      category: "Technology",
      excerpt: "Deep dive into the wind-tunnel refined aerodynamics, swan-neck carbon wing, and multi-stage dry-sump lubrication propelling AKR's 2026 campaign.",
      content: `Continuous technical evolution is the lifeblood of endurance motorsport. At AKR's technical center, our engineering division has unleashed the 2026 aerodynamic package for the AKR GT3-01.

Featuring a redesigned front carbon splitter with integrated underfloor channels and 3D-sculpted dive planes, the EVO package delivers an 8.4% increase in front-axle downforce at 200 km/h without introducing parasitic drag penalties.

The rear swan-neck carbon wing has been micro-profiled with 14 adjustable rake angles to tune aero balance across fast high-g sweeps like Spa's Blanchimont and Mugello's Arrabbiata.`,
      coverImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
      author: "AKR Aerodynamics Division",
      publishDate: "January 28, 2026",
      readTime: "6 MIN READ",
      tags: ["AERODYNAMICS", "ENGINEERING", "CARBON FIBER", "CFD"],
      featured: false
    },
    {
      id: "news-03",
      slug: "ajith-kumar-on-the-art-of-endurance-racing",
      title: "THE MENTAL DISCIPLINE OF 24-HOUR RACING: AN INTERVIEW WITH AJITH KUMAR",
      category: "Driver",
      excerpt: "Ajith Kumar reflects on two decades behind the wheel, heart rates in 50°C cockpits, and why telemetry is the ultimate truth teller.",
      content: `Behind the dark visor, inside a carbon safety cell where cabin temperatures routinely exceed 50°C and lateral forces batter the neck at 3.5 Gs for hours on end, racing becomes a meditation of extreme discipline.

"In sprint racing, you attack every corner with 100% aggression. In 24-hour endurance racing, you must be surgical," explains Ajith Kumar. "You have to calculate tyre degradation five laps ahead, protect the curbs, manage traffic in pitch blackness, and communicate split-second deltas with your race engineer. It demands total harmony of mind, body, and machine."`,
      coverImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
      author: "Motorsport Editorial Desk",
      publishDate: "January 12, 2026",
      readTime: "5 MIN READ",
      tags: ["INTERVIEW", "DRIVER", "PHILOSOPHY", "DISCIPLINE"],
      featured: false
    },
    {
      id: "news-04",
      slug: "akr-announces-european-gt-program",
      title: "AKR EXPANDS INTERNATIONAL FOOTPRINT TO EUROPEAN GT CHAMPIONSHIP",
      category: "Team",
      excerpt: "Ajith Kumar Racing confirms full-season entry into the European GT Endurance Challenge, taking on the legendary circuits of Spa, Monza, and Paul Ricard.",
      content: `Building upon its podium-sweeping Middle Eastern campaign, Ajith Kumar Racing has officially registered its multi-car assault for the 2026 European GT Challenge.

Operating out of dual engineering bases in Dubai and Europe, AKR will deploy advanced live telemetry streaming to its Chennai and European operations centers to maximize live race strategy simulation.`,
      coverImage: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1200&auto=format&fit=crop",
      author: "AKR Press Office",
      publishDate: "January 04, 2026",
      readTime: "3 MIN READ",
      tags: ["ANNOUNCEMENT", "EUROPE", "CALENDAR", "EXPANSION"],
      featured: false
    }
  ],

  stories: [
    {
      id: "story-01",
      slug: "the-pursuit-of-perfection-monza-to-spa",
      section: "RACING",
      title: "THE PURSUIT OF PERFECTION: FROM MONZA TO SPA",
      subtitle: "HOW 48 HOURS OF HIGH-SPEED SIMULATION PREPARES AKR FOR THE ARDENNES RAIN",
      excerpt: "An inside look into AKR's high-fidelity hardware-in-the-loop simulator, where tenths of a second are forged long before the rubber touches the tarmac.",
      heroImage: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1600&auto=format&fit=crop",
      readTime: "8 MIN READ",
      content: `Every Grand Prix circuit possesses a distinct heartbeat. Spa-Francorchamps is a roller-coaster through primeval pine forests where Eau Rouge demands unhesitating commitment at 260 km/h in sixth gear.

At Ajith Kumar Racing, race preparation begins weeks prior in the digital realm. Using high-resolution LiDAR-scanned circuit telemetry, AKR race engineers feed 2,000 real-world data points per second into our simulation rig. Ajith Kumar runs 150 simulated laps daily, calibrating damper rebound characteristics, brake balance bias deltas, and differential preloads.`,
      quotes: [
        "In modern motorsport, the race is won in the workshop and telemetry lab long before the green flag drops."
      ],
      gallery: [
        "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop"
      ]
    },
    {
      id: "story-02",
      slug: "carbon-and-sweat-the-human-engine",
      section: "PEOPLE",
      title: "CARBON & SWEAT: THE HUMAN ENGINE",
      subtitle: "THE UNSEEN PHYSICAL AND NEUROLOGICAL TRAINING OF AN ENDURANCE DRIVER",
      excerpt: "Neck harnesses resisting 40kg of force, peripheral vision reaction training, and heat acclimatization in the cockpit.",
      heroImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop",
      readTime: "7 MIN READ",
      content: `While fans marvel at the roar of the flat-six engine and the gleaming carbon fiber, the driver's body is the most heavily stressed component in the entire machine.

Inside the cockpit, heart rates hover at 165 to 175 BPM for ninety minutes straight. Ajith Kumar's rigorous training regimen combines high-intensity cardiovascular conditioning, neck isometric training resisting lateral G-loads, and neuro-visual drills with reaction lights to maintain sub-150 millisecond reaction times under extreme fatigue.`,
      quotes: [
        "Your mind must remain as calm as still water even as your body sustains 4Gs through the apex."
      ],
      gallery: [
        "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=1000&auto=format&fit=crop"
      ]
    },
    {
      id: "story-03",
      slug: "telemetry-the-language-of-speed",
      section: "TECHNOLOGY",
      title: "TELEMETRY: THE LANGUAGE OF SPEED",
      subtitle: "DECODING 1,000 SENSOR CHANNELS PRODUCING 2.4 GIGABYTES OF DATA PER STINT",
      excerpt: "Discover how AKR's pit wall transforms raw voltage readings into race-winning tire and aero decisions.",
      heroImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
      readTime: "6 MIN READ",
      content: `Every touch of the brake pedal, every millimeter of steering micro-correction, and every degree of tire carcass temperature is captured in real time.

AKR utilizes military-grade wireless telemetry links transmitting 120 key channels directly to the garage screens. By analyzing the delta between tire surface temperature and core carcass temperature, our chief strategist can alert the driver to alter their racing line by just three inches to preserve tire life for the final sprint.`,
      quotes: [
        "Data is emotionless. It tells us exactly where the hundredths of a second are hiding."
      ],
      gallery: [
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1000&auto=format&fit=crop"
      ]
    }
  ],

  media: [
    {
      id: "med-01",
      title: "NIGHT ATTACK: 24H DUBAI MIDNIGHT STINT",
      category: "PHOTOS",
      type: "photo",
      url: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1600&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=600&auto=format&fit=crop",
      caption: "Glowing carbon-ceramic brake rotors glowing bright cherry red into Turn 1 under the Dubai night sky.",
      location: "Dubai Autodrome",
      date: "Jan 2026"
    },
    {
      id: "med-02",
      title: "AJITH KUMAR: VISOR DOWN FOCUS",
      category: "DRIVER",
      type: "photo",
      url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
      caption: "Total mental focus on the starting grid 5 minutes prior to race formation.",
      location: "Yas Marina Circuit",
      date: "Feb 2026"
    },
    {
      id: "med-03",
      title: "CHALLENGING THE APEX: AKR GT3-01 AT SPEED",
      category: "CARS",
      type: "photo",
      url: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=1600&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?q=80&w=600&auto=format&fit=crop",
      caption: "High-speed aerodynamic balance through the technical chicane.",
      location: "Autodromo del Mugello",
      date: "Mar 2026"
    },
    {
      id: "med-04",
      title: "PIT-STOP CHOREOGRAPHY: 3.2 SECOND TIRE SWAP",
      category: "TEAM",
      type: "photo",
      url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop",
      caption: "The AKR pit crew executing precision fuel and tyre service in synchronized harmony.",
      location: "Circuit de Spa",
      date: "Apr 2026"
    },
    {
      id: "med-05",
      title: "CARBON ANATOMY: MONOCOQUE TEARDOWN",
      category: "BEHIND THE SCENES",
      type: "photo",
      url: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1600&auto=format&fit=crop",
      thumbnailUrl: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=600&auto=format&fit=crop",
      caption: "Post-race diagnostic inspection of the rear subframe and titanium exhaust geometry.",
      location: "AKR Technical Base",
      date: "Mar 2026"
    },
    {
      id: "med-06",
      title: "ONBOARD WITH AJITH KUMAR: 300 KM/H HOT LAP",
      category: "VIDEOS",
      type: "video",
      url: "https://assets.mixkit.co/videos/preview/mixkit-sports-car-racing-on-a-track-34676-large.mp4",
      thumbnailUrl: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=600&auto=format&fit=crop",
      caption: "Full helmet-cam onboard telemetry capture chasing the qualifying lap record.",
      location: "Spa-Francorchamps",
      date: "Apr 2026"
    }
  ],

  team: [
    {
      id: "team-01",
      name: "AJITH KUMAR",
      role: "Lead Driver & Team Principal",
      department: "MANAGEMENT",
      bio: "Visionary founder of AKR with 20+ years of professional open-wheel and GT racing expertise.",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop",
      experienceYears: "22 Years",
      accolades: "Multiple International Podiums, British F3 National Class, 24H Series Winner",
      quote: "Discipline is the foundation. Speed is the outcome."
    },
    {
      id: "team-02",
      name: "MARCUS VOGEL",
      role: "Chief Race Engineer & Technical Director",
      department: "ENGINEERING",
      bio: "Former European Le Mans technical director specializing in suspension kinematic optimization and aero balance.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      experienceYears: "18 Years",
      accolades: "3x 24H Series Technical Champion",
      quote: "We don't search for tenths in the corners; we engineer thousandths in the data."
    },
    {
      id: "team-03",
      name: "ELENA ROSTOVA",
      role: "Head of Race Strategy & Data Telemetry",
      department: "STRATEGY",
      bio: "Mathematical modeling specialist directing pit window strategies, safety car contingency, and tire life algorithms.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      experienceYears: "12 Years",
      accolades: "Lead Strategist for 14 International Endurance Podiums",
      quote: "Every second in the pit lane counts triple on the track."
    },
    {
      id: "team-04",
      name: "RAJESH SUNDARAM",
      role: "Chief Powertrain & Systems Specialist",
      department: "ENGINEERING",
      bio: "Specialist in high-revving naturally aspirated GT powerplants, engine mapping, and live throttle calibration.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      experienceYears: "15 Years",
      accolades: "National Motorsport Engineering Hall of Honor",
      quote: "Engine reliability across 24 hours demands flawless thermal management."
    },
    {
      id: "team-05",
      name: "DAVID MCDONALD",
      role: "Pit Crew Chief & Garage Coordinator",
      department: "PIT CREW",
      bio: "Coordinates the 18-person garage crew, high-speed tire shifts, pneumatic jack deployment, and fuel rig protocols.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop",
      experienceYears: "16 Years",
      accolades: "Recorded 3.1s Fastest Pit-Stop in Dubai 24H",
      quote: "In the pit box, calm execution is faster than frantic haste."
    },
    {
      id: "team-06",
      name: "VIKRAM NAIR",
      role: "Driver Performance & Physiotherapy Lead",
      department: "PERFORMANCE",
      bio: "Oversees biometric tracking, high-temperature cockpit hydration, isometric neck strengthening, and cognitive fatigue recovery.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
      experienceYears: "10 Years",
      accolades: "Physiologist for Elite Motorsport Athletes",
      quote: "Peak reaction time requires peak physiological endurance."
    }
  ],

  partners: [
    {
      id: "part-01",
      name: "MOTEC MOTORSPORT",
      tier: "TECHNICAL",
      category: "Data & Engine Management",
      description: "Official telemetry hardware and high-frequency data logging partner powering AKR's real-time telemetry systems.",
      logo: "MOTEC",
      website: "https://www.motec.com"
    },
    {
      id: "part-02",
      name: "BREMBO RACING",
      tier: "OFFICIAL",
      category: "Braking Systems",
      description: "High-performance monobloc calipers, carbon-ceramic friction materials, and race-proven thermal dissipation.",
      logo: "BREMBO",
      website: "https://www.brembo.com"
    },
    {
      id: "part-03",
      name: "MICHELIN MOTORSPORT",
      tier: "OFFICIAL",
      category: "Tire Technology",
      description: "Endurance slick and wet compound tire technology engineered for sustained grip and consistent lap deltas.",
      logo: "MICHELIN",
      website: "https://www.michelin.com"
    },
    {
      id: "part-04",
      name: "OMP RACING",
      tier: "OFFICIAL",
      category: "Safety & Apparel",
      description: "Custom FIA-homologated ultralight racing overalls, Nomex fireproof undergarments, and carbon safety seats.",
      logo: "OMP RACING",
      website: "https://www.ompracing.com"
    },
    {
      id: "part-05",
      name: "BELL RACING HELMETS",
      tier: "SUPPLIER",
      category: "Helmets & Head Protection",
      description: "Ultra-carbon HP77 helmets customized with AKR aerodynamic spoilers and integrated communications.",
      logo: "BELL HELMETS",
      website: "https://www.bellhelmets.com"
    },
    {
      id: "part-06",
      name: "STAND21 RACING",
      tier: "SUPPLIER",
      category: "Driver Ergonomics",
      description: "Tailored racing gloves and boots crafted for maximum pedal feel and tactile feedback.",
      logo: "STAND 21",
      website: "https://www.stand21.com"
    }
  ],

  experiences: [
    {
      id: "exp-01",
      title: "AKR VIP PADDOCK CLUB ACCESS",
      category: "Paddock",
      duration: "Full Race Weekend (3 Days)",
      location: "24H Series & European GT Weekends",
      description: "Experience the adrenaline of international endurance racing from inside the AKR inner circle with direct pit garage access, hospitality suite, and live radio headset feed.",
      includes: [
        "All-weekend VIP Paddock & Garage Pass",
        "Direct intercom headset connection to AKR Pit Wall",
        "Private garage walk & driver briefing with Ajith Kumar",
        "Gourmet international catering & champagne reception",
        "Exclusive AKR Official Team Cap & Carbon Badge"
      ],
      price: "€3,450 / VIP Pass",
      badge: "ULTRA EXCLUSIVE"
    },
    {
      id: "exp-02",
      title: "AKR TRACK DAY & TELEMETRY MASTERCLASS",
      category: "Track",
      duration: "1 Full Day",
      location: "Dubai Autodrome / Yas Marina Circuit",
      description: "Step into the driver's seat of our race-prepared track machines with 1-on-1 coaching from AKR race engineers and high-resolution telemetry review.",
      includes: [
        "6 x 20-minute hot track sessions",
        "Full Motec telemetry data overlay & coaching",
        "FIA homologated racing suit and helmet provided",
        "In-car HD video recording with telemetry HUD overlay",
        "Certificate of Completion signed by Ajith Kumar"
      ],
      price: "€4,800 / Participant",
      badge: "PERFORMANCE"
    },
    {
      id: "exp-03",
      title: "AKR VIRTUAL SIMULATOR EXPERIENCE",
      category: "Simulator",
      duration: "3 Hours",
      location: "AKR Technology Center / Online Rig Connect",
      description: "Pilot our 6-DOF dynamic motion simulator calibrated with real LiDAR scans and authentic AKR GT3 physics.",
      includes: [
        "1-hour setup and circuit orientation",
        "2-hour intense qualifying & endurance race simulation",
        "Full telemetry graph comparison with Ajith Kumar's benchmark lap"
      ],
      price: "€850 / Session",
      badge: "SIMULATION"
    }
  ],

  products: [
    {
      id: "prod-01",
      name: "AKR OFFICIAL 2026 TEAM SOFTSHELL JACKET",
      slug: "akr-2026-team-softshell-jacket",
      category: "Jackets",
      price: 185,
      currency: "EUR",
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop"
      ],
      description: "Official team apparel worn by Ajith Kumar and the AKR engineering crew during European endurance weekends. Engineered with waterproof breathable membranes, thermal fleece lining, and embroidered AKR carbon emblems.",
      sizes: ["S", "M", "L", "XL", "XXL"],
      inStock: true,
      featured: true,
      specs: ["10,000mm Waterproof Membrane", "High-density heat-sealed rubber badges", "Carbon-textured shoulder accents", "Windproof storm cuffs"]
    },
    {
      id: "prod-02",
      name: "AKR CARBON RACE CAP #9 LIMITED EDITION",
      slug: "akr-carbon-race-cap-9",
      category: "Caps",
      price: 55,
      currency: "EUR",
      images: [
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop"
      ],
      description: "Premium structured snapback featuring carbon-fiber weave textured peak, laser-cut ventilation eyelets, 3D embroidered #9 badge, and signature racing-red contrast stitching.",
      sizes: ["ONE SIZE (Adjustable Snapback)"],
      inStock: true,
      featured: true,
      specs: ["Carbon-textured visor", "3D Silicon AKR Shield", "Moisture-wicking inner headband", "Matte black metal buckle"]
    },
    {
      id: "prod-03",
      name: "AKR MOTORSPORT TELEMETRY TECHNICAL T-SHIRT",
      slug: "akr-telemetry-technical-tshirt",
      category: "T-Shirts",
      price: 65,
      currency: "EUR",
      images: [
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop"
      ],
      description: "Crafted from ultralight quick-dry athletic poly-elastane, featuring the authentic Monza sector telemetry vector graphic printed in reflective racing red.",
      sizes: ["S", "M", "L", "XL", "XXL"],
      inStock: true,
      featured: false,
      specs: ["92% Technical Polyester, 8% Elastane", "Laser-cut cooling zones on spine", "Reflective silver AKR logos", "Athletic ergonomic fit"]
    },
    {
      id: "prod-04",
      name: "AKR GT3-01 1:18 COLLECTOR'S DIE-CAST MODEL",
      slug: "akr-gt3-01-diecast-model",
      category: "Collectibles",
      price: 240,
      currency: "EUR",
      images: [
        "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=800&auto=format&fit=crop"
      ],
      description: "Ultra-precise 1:18 scale replica of the Abu Dhabi victory car. Features opening carbon doors, detailed flat-six engine bay with braided fuel lines, and authentic livery hand-applied.",
      sizes: ["1:18 SCALE"],
      inStock: true,
      featured: true,
      specs: ["Die-cast metal body with resin details", "Working steering wheel and front suspension", "Individual serialized collector certificate", "Mounted on carbon-finish acrylic base"]
    }
  ]
};
