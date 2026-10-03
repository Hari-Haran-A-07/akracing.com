import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';

// Providers
import { AuthProvider } from './context/AuthContext';
import { AudioProvider } from './context/AudioContext';
import { CartProvider } from './context/CartContext';
import { TelemetryProvider } from './context/TelemetryContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { CartDrawer } from './components/common/CartDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { RacingPage } from './pages/RacingPage';
import { DriverPage } from './pages/DriverPage';
import { CarsPage } from './pages/CarsPage';
import { CarDetailPage } from './pages/CarDetailPage';
import { ChampionshipsPage } from './pages/ChampionshipsPage';
import { CalendarPage } from './pages/CalendarPage';
import { ResultsPage } from './pages/ResultsPage';
import { LiveRacePage } from './pages/LiveRacePage';
import { TechnologyPage } from './pages/TechnologyPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { StoriesPage } from './pages/StoriesPage';
import { StoryDetailPage } from './pages/StoryDetailPage';
import { MediaPage } from './pages/MediaPage';
import { TeamPage } from './pages/TeamPage';
import { AboutPage } from './pages/AboutPage';
import { PartnersPage } from './pages/PartnersPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';

function AppContent() {
  useLenis();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-racing-black text-white flex flex-col justify-between selection:bg-racing-red selection:text-white">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Global Navigation */}
      <Navbar />

      {/* Cart Slide-over Drawer */}
      <CartDrawer />

      {/* Main Routed Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/racing" element={<RacingPage />} />
          <Route path="/driver" element={<DriverPage />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/cars/:id" element={<CarDetailPage />} />
          <Route path="/championships" element={<ChampionshipsPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/live" element={<LiveRacePage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/:slug" element={<NewsDetailPage />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/stories/:slug" element={<StoryDetailPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/heritage" element={<AboutPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:slug" element={<ProductDetailPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Luxury Footer */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AudioProvider>
        <CartProvider>
          <TelemetryProvider>
            <AppContent />
          </TelemetryProvider>
        </CartProvider>
      </AudioProvider>
    </AuthProvider>
  );
}
