'use client';

import { Flexbox, Text } from '@lobehub/ui';
import { createStaticStyles } from 'antd-style';
import { memo } from 'react';

const styles = createStaticStyles(({ css }) => ({
  card: css`
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    padding: 20px;
    height: 100%;
    transition: box-shadow 200ms ease, border-color 200ms ease;

    &:hover {
      border-color: #d1d5db;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    }
  `,
  flowNode: css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
  `,
  flowArrow: css`
    font-family: 'SF Mono', 'JetBrains Mono', monospace;
    font-size: 14px;
    color: #9ca3af;
    margin: 0 8px;
  `,
  pulse: css`
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  `,
  metricValue: css`
    font-family: 'SF Mono', 'JetBrains Mono', monospace;
    font-size: 13px;
    font-weight: 600;
    color: #111827;
  `,
  metricLabel: css`
    font-size: 10px;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,
}));

const flowSteps = [
  { label: 'API Gateway', color: '#EFF6FF', textColor: '#1D4ED8', border: '#BFDBFE' },
  { label: 'Router', color: '#F5F3FF', textColor: '#6D28D9', border: '#DDD6FE' },
  { label: 'Rate Limiter', color: '#FFF7ED', textColor: '#C2410C', border: '#FED7AA' },
  { label: 'Provider', color: '#F0FDF4', textColor: '#15803D', border: '#BBF7D0' },
  { label: 'Model', color: '#FDF2F8', textColor: '#BE185D', border: '#FBCFE8' },
  { label: 'Response', color: '#F0F9FF', textColor: '#0369A1', border: '#BAE6FD' },
];

const RealtimeRequestFlow = memo(() => {
  return (
    <Flexbox className={styles.card} gap={16} justify="center">
      <Flexbox gap={4}>
        <Text style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>Realtime Request Flow</Text>
        <Text style={{ fontSize: 11, color: '#6B7280' }}>Live trace of the most recent request through the relay pipeline</Text>
      </Flexbox>

      <Flexbox horizontal align="center" justify="center" gap={0} style={{ padding: '16px 0' }}>
        {flowSteps.map((step, i) => (
          <Flexbox key={step.label} horizontal align="center">
            <Flexbox
              className={styles.flowNode}
              style={{
                background: step.color,
                border: `1px solid ${step.border}`,
                color: step.textColor,
              }}
            >
              {step.label}
            </Flexbox>
            {i < flowSteps.length - 1 && (
              <span className={styles.flowArrow}>→</span>
            )}
          </Flexbox>
        ))}
      </Flexbox>

      <Flexbox horizontal gap={32} justify="center" style={{ paddingTop: 8 }}>
        <Flexbox gap={2} align="center">
          <Text className={styles.metricLabel}>Active Requests</Text>
          <Flexbox horizontal gap={4} align="center">
            <span className={styles.pulse} style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#059669' }} />
            <Text className={styles.metricValue}>23</Text>
          </Flexbox>
        </Flexbox>
        <Flexbox gap={2} align="center">
          <Text className={styles.metricLabel}>Throughput</Text>
          <Text className={styles.metricValue}>47.2/s</Text>
        </Flexbox>
        <Flexbox gap={2} align="center">
          <Text className={styles.metricLabel}>Last Request</Text>
          <Text className={styles.metricValue}>0.3s ago</Text>
        </Flexbox>
        <Flexbox gap={2} align="center">
          <Text className={styles.metricLabel}>Queue Depth</Text>
          <Text className={styles.metricValue}>12</Text>
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
});

export default RealtimeRequestFlow;
