'use client';

import { Flexbox } from '@lobehub/ui';
import { Activity,Brain, Shield, Zap } from 'lucide-react';
import { memo } from 'react';

const features = [
  {
    icon: Zap,
    title: 'Stability',
    description: 'High-speed and stable API relay with 99.99% uptime guarantee.',
    color: '#F59E0B',
  },
  {
    icon: Shield,
    title: 'Secure Routing',
    description: 'Enterprise-grade encryption and secure routing protocols.',
    color: '#3B82F6',
  },
  {
    icon: Brain,
    title: 'Smart Scheduling',
    description: 'Intelligent load balancing and automatic failover.',
    color: '#8B5CF6',
  },
  {
    icon: Activity,
    title: 'Full-chain Monitoring',
    description: 'Complete observability across the entire request lifecycle.',
    color: '#10B981',
  },
];

const LandingFeatureCards = memo(() => {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '80px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <Flexbox
        horizontal
        gap={24}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        }}
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(226, 232, 240, 0.5)',
              borderRadius: '20px',
              padding: '32px',
              transition: 'all 0.3s ease',
              cursor: 'default',
            }}
          >
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: `${feature.color}10`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <feature.icon color={feature.color} size={24} strokeWidth={2} />
              </div>
            </div>
            <h3
              style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#0F172A',
                margin: '0 0 12px',
                letterSpacing: '-0.02em',
              }}
            >
              {feature.title}
            </h3>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: '#64748B',
                margin: 0,
              }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </Flexbox>
    </section>
  );
});

export default LandingFeatureCards;
