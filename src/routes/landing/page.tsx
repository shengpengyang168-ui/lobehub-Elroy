'use client';

import { memo } from 'react';

import LandingBackground from './components/LandingBackground';
import LandingHero from './components/LandingHero';
import LandingNavbar from './components/LandingNavbar';

const LandingPage = memo(() => {
  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#FAFBFC',
      }}
    >
      <LandingBackground />
      <LandingNavbar />
      <LandingHero />
    </div>
  );
});

export default LandingPage;
