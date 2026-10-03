import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Preloader } from '../components/common/Preloader';
import { HeroSection } from '../components/home/HeroSection';
import { RacingJourneySection } from '../components/home/RacingJourneySection';
import { DriverShowcase } from '../components/home/DriverShowcase';
import { MachineShowcase } from '../components/home/MachineShowcase';
import { ChampionshipsSection } from '../components/home/ChampionshipsSection';
import { RaceCalendarSection } from '../components/home/RaceCalendarSection';
import { ResultsSection } from '../components/home/ResultsSection';
import { LiveRaceSimulator } from '../components/home/LiveRaceSimulator';
import { TechnologySection } from '../components/home/TechnologySection';
import { LatestNewsSection } from '../components/home/LatestNewsSection';
import { MagazineStoriesSection } from '../components/home/MagazineStoriesSection';
import { MediaShowcase } from '../components/home/MediaShowcase';
import { TeamSection } from '../components/home/TeamSection';
import { PartnersSection } from '../components/home/PartnersSection';
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
    <div className="relative w-full bg-racing-black overflow-hidden">
      {/* Cinematic Intro Preloader */}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      {/* 1. Fullscreen Racing Hero */}
      <HeroSection />

      {/* 2. Racing Journey & Programs */}
      <RacingJourneySection />

      {/* 3. The Driver: Ajith Kumar */}
      <DriverShowcase driver={data.driver} />

      {/* 4. The Machine: AKR GT3-01 Spec */}
      <MachineShowcase car={data.cars[0]} />

      {/* 5. Championships & Standings */}
      <ChampionshipsSection championships={data.championships} />

      {/* 6. Race Calendar */}
      <RaceCalendarSection races={data.races} />

      {/* 7. Latest Results */}
      <ResultsSection results={data.results} />

      {/* 8. Live Racing / Virtual Pit Wall */}
      <LiveRaceSimulator />

      {/* 9. Technology & Engineering */}
      <TechnologySection />

      {/* 10. Latest News */}
      <LatestNewsSection news={data.news} />

      {/* 11. Magazine Stories */}
      <MagazineStoriesSection stories={data.stories} />

      {/* 12. Media Gallery */}
      <MediaShowcase media={data.media} />

      {/* 13. The Team */}
      <TeamSection team={data.team} />

      {/* 14. Experiences */}
      <ExperiencesSection experiences={data.experiences} />

      {/* 15. Partners */}
      <PartnersSection partners={data.partners} />
    </div>
  );
};
