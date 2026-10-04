import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Preloader } from '../components/common/Preloader';

// Homepage Sections
import { HeroSection } from '../components/home/HeroSection';
import { IntroMissionSection } from '../components/home/IntroMissionSection';
import { UpcomingRaceHighlight } from '../components/home/UpcomingRaceHighlight';
import { KeyStrengthsSection } from '../components/home/KeyStrengthsSection';
import { CollaborationsSection } from '../components/home/CollaborationsSection';
import { DriverShowcase } from '../components/home/DriverShowcase';
import { MachineShowcase } from '../components/home/MachineShowcase';
import { CarBlueprintSection } from '../components/home/CarBlueprintSection';
import { ChampionshipsSection } from '../components/home/ChampionshipsSection';
import { RacingJourneySection } from '../components/home/RacingJourneySection';
import { RaceCalendarSection } from '../components/home/RaceCalendarSection';
import { ResultsSection } from '../components/home/ResultsSection';
import { LiveRaceSimulator } from '../components/home/LiveRaceSimulator';
import { TechnologySection } from '../components/home/TechnologySection';
import { MerchandiseShowcase } from '../components/home/MerchandiseShowcase';
import { LatestNewsSection } from '../components/home/LatestNewsSection';
import { MagazineStoriesSection } from '../components/home/MagazineStoriesSection';
import { MediaShowcase } from '../components/home/MediaShowcase';
import { TeamSection } from '../components/home/TeamSection';
import { PartnersSection } from '../components/home/PartnersSection';
import { BecomePartnerCTA } from '../components/home/BecomePartnerCTA';
import { ContactSection } from '../components/home/ContactSection';
import { ExperiencesSection } from '../components/home/ExperiencesSection';

export const HomePage = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const [data, setData] = useState({
    driver: null,
    cars: [],
    championships: [],
    races: [],
    results: [],
    news: [],
    stories: [],
    media: [],
    team: [],
    partners: [],
    experiences: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session storage for preloader
    const hasSeen = sessionStorage.getItem('akr_intro_completed');
    if (hasSeen) {
      setShowPreloader(false);
    }

    const fetchAllData = async () => {
      try {
        const [
          driverRes,
          carsRes,
          champsRes,
          racesRes,
          resultsRes,
          newsRes,
          storiesRes,
          mediaRes,
          teamRes,
          partnersRes,
          expRes
        ] = await Promise.all([
          api.getDriver(),
          api.getCars(),
          api.getChampionships(),
          api.getRaces(),
          api.getResults(),
          api.getNews(),
          api.getStories(),
          api.getMedia(),
          api.getTeam(),
          api.getPartners(),
          api.getExperiences()
        ]);

        setData({
          driver: driverRes.data || null,
          cars: carsRes.data || [],
          championships: champsRes.data || [],
          races: racesRes.data || [],
          results: resultsRes.data || [],
          news: newsRes.data || [],
          stories: storiesRes.data || [],
          media: mediaRes.data || [],
          team: teamRes.data || [],
          partners: partnersRes.data || [],
          experiences: expRes.data || []
        });
      } catch (err) {
        console.error('Error loading homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <div className="relative w-full bg-racing-black overflow-hidden selection:bg-racing-red selection:text-white">
      {/* 01. Cinematic Intro Preloader */}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      {/* 02. Fullscreen Racing Hero */}
      <HeroSection />

      {/* 03. Passion / Ambition / Vision & Introduction */}
      <IntroMissionSection />

      {/* 04. Upcoming Race Highlight with Live Countdown */}
      <UpcomingRaceHighlight />

      {/* 05. Key Strengths (01, 02, 03 Pillars) */}
      <KeyStrengthsSection />

      {/* 06. Strategic Collaborations */}
      <CollaborationsSection />

      {/* 07. Drivers Showcase: Ajith Kumar & Cameron McLeod */}
      <DriverShowcase driver={data.driver} />

      {/* 08. The Machine: AKR GT3-01 */}
      <MachineShowcase car={data.cars[0]} />

      {/* 08.1. Interactive Engineering Blueprint */}
      <CarBlueprintSection />

      {/* 09. Championships & Racing Series */}
      <ChampionshipsSection championships={data.championships} />

      {/* 10. Racing Journey & Programs */}
      <RacingJourneySection />

      {/* 11. Race Calendar & Schedule */}
      <RaceCalendarSection races={data.races} />

      {/* 12. Latest Results */}
      <ResultsSection results={data.results} />

      {/* 13. Virtual Pit Wall & Live Simulator */}
      <LiveRaceSimulator />

      {/* 14. Technology & CFD Aerodynamics */}
      <TechnologySection />

      {/* 15. Official Merchandise & Apparel Store */}
      <MerchandiseShowcase />

      {/* 16. Latest News & Editorials */}
      <LatestNewsSection news={data.news} />

      {/* 17. Magazine Feature Stories */}
      <MagazineStoriesSection stories={data.stories} />

      {/* 18. Media Gallery & 4K Vault */}
      <MediaShowcase media={data.media} />

      {/* 19. The Team Squad & Management */}
      <TeamSection team={data.team} />

      {/* 20. Experiences */}
      <ExperiencesSection experiences={data.experiences} />

      {/* 21. Strategic Partners */}
      <PartnersSection partners={data.partners} />

      {/* 22. Become Part of the Race CTA */}
      <BecomePartnerCTA />

      {/* 23. Integrated Paddock Contact Form */}
      <ContactSection />
    </div>
  );
};
