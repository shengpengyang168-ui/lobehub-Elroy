'use client';

import { Flexbox } from '@lobehub/ui';
import { Activity, Brain, Shield, Zap } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import DailyBrief from '@/features/DailyBrief';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';
import { useUserStore } from '@/store/user';
import { authSelectors } from '@/store/user/slices/auth/selectors';

import AgentSelect from './AgentSelect';
import CommunityAgents from './CommunityAgents';
import InputArea from './InputArea';
import WelcomeText from './WelcomeText';

const features = [
  { icon: Zap, titleKey: 'feature.stability', descKey: 'feature.stability.desc', color: '#F59E0B' },
  {
    icon: Shield,
    titleKey: 'feature.secureRouting',
    descKey: 'feature.secureRouting.desc',
    color: '#3B82F6',
  },
  {
    icon: Brain,
    titleKey: 'feature.smartScheduling',
    descKey: 'feature.smartScheduling.desc',
    color: '#8B5CF6',
  },
  {
    icon: Activity,
    titleKey: 'feature.fullChainMonitoring',
    descKey: 'feature.fullChainMonitoring.desc',
    color: '#10B981',
  },
];

const FeatureCards = memo(() => {
  const { t } = useTranslation('landing');

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
      }}
    >
      {features.map((feature) => (
        <div
          key={feature.titleKey}
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(226, 232, 240, 0.5)',
            borderRadius: '16px',
            padding: '24px',
            transition: 'all 0.3s ease',
            cursor: 'default',
          }}
        >
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: `${feature.color}10`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <feature.icon color={feature.color} size={20} strokeWidth={2} />
            </div>
          </div>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#0F172A',
              margin: '0 0 8px',
              letterSpacing: '-0.02em',
            }}
          >
            {t(feature.titleKey)}
          </h3>
          <p
            style={{
              fontSize: '13px',
              lineHeight: 1.6,
              color: '#64748B',
              margin: 0,
            }}
          >
            {t(feature.descKey)}
          </p>
        </div>
      ))}
    </div>
  );
});

const Home = memo(() => {
  const isLogin = useUserStore(authSelectors.isLogin);
  const { enableAgentTask } = useServerConfigStore(featureFlagsSelectors);

  return (
    <Flexbox gap={40}>
      <Flexbox gap={24}>
        <Flexbox gap={8}>
          <AgentSelect />
          <WelcomeText />
        </Flexbox>
        <InputArea />
      </Flexbox>

      <FeatureCards />

      {isLogin && enableAgentTask && (
        <Flexbox gap={40}>
          <DailyBrief />
        </Flexbox>
      )}
      {!enableAgentTask && <CommunityAgents />}
    </Flexbox>
  );
});

export default Home;
