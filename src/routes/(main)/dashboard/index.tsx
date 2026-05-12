'use client';

import { Flexbox } from '@lobehub/ui';
import { createStaticStyles } from 'antd-style';
import { memo } from 'react';

import GlobalInfrastructureStatus from './features/GlobalInfrastructureStatus';
import LatencyAndTokenAnalytics from './features/LatencyAndTokenAnalytics';
import LiveRequestLogs from './features/LiveRequestLogs';
import ProviderRoutingPanel from './features/ProviderRoutingPanel';
import RealtimeRequestFlow from './features/RealtimeRequestFlow';

const styles = createStaticStyles(({ css }) => ({
  container: css`
    overflow-y: auto;
    padding: 24px 32px 32px;
    height: 100%;
  `,
  grid: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  `,
  centerFull: css`
    grid-column: 1 / -1;
  `,
}));

const DashboardHome = memo(() => {
  return (
    <Flexbox className={styles.container} gap={16} height="100%" width="100%">
      {/* Top Zone: Global Infrastructure Status */}
      <GlobalInfrastructureStatus />

      {/* Center Zone: Realtime Request Flow Visualization */}
      <RealtimeRequestFlow />

      {/* Middle Row: Left (Provider Routing) + Right (Latency & Token Analytics) */}
      <div className={styles.grid}>
        <ProviderRoutingPanel />
        <LatencyAndTokenAnalytics />
      </div>

      {/* Bottom Zone: Live Request Logs */}
      <LiveRequestLogs />
    </Flexbox>
  );
});

export default DashboardHome;
