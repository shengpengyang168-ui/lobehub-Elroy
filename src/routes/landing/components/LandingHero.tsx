'use client';

import { Button } from '@lobehub/ui';
import { ArrowRight } from 'lucide-react';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const LandingHero = memo(() => {
  const navigate = useNavigate();
  const { t } = useTranslation('landing');

  const handleEnterConsole = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  return (
    <section
      style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '120px 24px 80px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '9999px',
          background: 'rgba(15, 23, 42, 0.05)',
          border: '1px solid rgba(15, 23, 42, 0.08)',
          marginBottom: '32px',
          fontSize: '13px',
          fontWeight: 500,
          color: '#475569',
          letterSpacing: '0.02em',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#10B981',
            display: 'inline-block',
          }}
        />
        {t('hero.badge')}
      </div>

      <h1
        style={{
          fontSize: 'clamp(48px, 8vw, 80px)',
          fontWeight: 800,
          color: '#0F172A',
          letterSpacing: '-0.04em',
          lineHeight: 1.1,
          margin: '0 0 16px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {t('hero.title')}
      </h1>

      <h2
        style={{
          fontSize: 'clamp(18px, 3vw, 28px)',
          fontWeight: 500,
          color: '#64748B',
          letterSpacing: '-0.02em',
          lineHeight: 1.4,
          margin: '0 0 16px',
          maxWidth: '600px',
        }}
      >
        {t('hero.subtitle')}
      </h2>

      <p
        style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          fontWeight: 400,
          color: '#94A3B8',
          lineHeight: 1.6,
          margin: '0 0 48px',
          maxWidth: '500px',
        }}
      >
        {t('hero.description')}
      </p>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Button
          icon={<ArrowRight size={18} />}
          size="large"
          style={{
            background: '#0F172A',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '12px',
            padding: '14px 32px',
            fontSize: '16px',
            fontWeight: 600,
            height: 'auto',
            boxShadow: '0 4px 14px rgba(15, 23, 42, 0.15)',
          }}
          onClick={handleEnterConsole}
        >
          {t('hero.button')}
        </Button>
      </div>
    </section>
  );
});

export default LandingHero;
