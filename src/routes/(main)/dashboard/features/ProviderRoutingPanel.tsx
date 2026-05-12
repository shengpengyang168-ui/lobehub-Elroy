'use client';

import { Flexbox, Tag, Text } from '@lobehub/ui';
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
  providerRow: css`
    padding: 8px 0;
    border-bottom: 1px solid #f3f4f6;
    cursor: pointer;
    transition: background 100ms ease;

    &:hover {
      background: #f9fafb;
      margin: 0 -8px;
      padding: 8px;
      border-radius: 6px;
    }

    &:last-child {
      border-bottom: none;
    }
  `,
  dot: css`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-inline-end: 6px;
  `,
  metricValue: css`
    font-family: 'SF Mono', 'JetBrains Mono', monospace;
    font-size: 12px;
    font-weight: 600;
    color: #111827;
  `,
  routeBadge: css`
    font-family: 'SF Mono', 'JetBrains Mono', monospace;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 500;
  `,
}));

interface RouteProvider {
  id: string;
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  weight: number;
  latency: number;
  errorRate: number;
}

const routeProviders: RouteProvider[] = [
  { id: 'openai', name: 'OpenAI', status: 'healthy', weight: 50, latency: 342, errorRate: 0.3 },
  { id: 'anthropic', name: 'Anthropic', status: 'healthy', weight: 25, latency: 512, errorRate: 0.5 },
  { id: 'azure', name: 'Azure OpenAI', status: 'healthy', weight: 15, latency: 298, errorRate: 0.1 },
  { id: 'google', name: 'Google AI', status: 'degraded', weight: 10, latency: 823, errorRate: 2.1 },
];

const statusColors: Record<string, string> = {
  healthy: '#059669',
  degraded: '#D97706',
  down: '#DC2626',
};

const ProviderRoutingPanel = memo(() => {
  return (
    <Flexbox className={styles.card} gap={12}>
      <Flexbox gap={4}>
        <Text style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>Provider Routing</Text>
        <Text style={{ fontSize: 11, color: '#6B7280' }}>Active route rules and provider distribution</Text>
      </Flexbox>

      <Flexbox gap={0}>
        <Flexbox horizontal gap={8} style={{ padding: '6px 0', borderBottom: '1px solid #E5E7EB' }}>
          <Text style={{ flex: 1, fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Provider</Text>
          <Text style={{ width: 48, fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Weight</Text>
          <Text style={{ width: 56, fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Latency</Text>
          <Text style={{ width: 56, fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Errors</Text>
        </Flexbox>
        {routeProviders.map((p) => (
          <Flexbox key={p.id} className={styles.providerRow} horizontal gap={8} align="center">
            <Flexbox horizontal align="center" style={{ flex: 1 }}>
              <span className={styles.dot} style={{ background: statusColors[p.status] }} />
              <Text style={{ fontSize: 12, fontWeight: 500, color: '#374151' }}>{p.name}</Text>
            </Flexbox>
            <Flexbox style={{ width: 48 }} align="end">
              <span className={styles.routeBadge} style={{ background: '#EFF6FF', color: '#1D4ED8' }}>{p.weight}%</span>
            </Flexbox>
            <Text className={styles.metricValue} style={{ width: 56, textAlign: 'right' }}>{p.latency}ms</Text>
            <Text
              className={styles.metricValue}
              style={{ width: 56, textAlign: 'right', color: p.errorRate > 1 ? '#DC2626' : '#6B7280' }}
            >
              {p.errorRate}%
            </Text>
          </Flexbox>
        ))}
      </Flexbox>

      <Flexbox
        style={{
          marginTop: 4,
          padding: '8px 12px',
          background: '#F9FAFB',
          borderRadius: 8,
          border: '1px solid #E5E7EB',
        }}
        gap={4}
      >
        <Text style={{ fontSize: 11, fontWeight: 500, color: '#6B7280' }}>Active Route: gpt-4o</Text>
        <Text style={{ fontFamily: "'SF Mono', 'JetBrains Mono', monospace", fontSize: 11, color: '#374151' }}>
          Strategy: <Tag style={{ fontSize: 10 }}>weighted-round-robin</Tag>
          {' '}Fallback: <Tag style={{ fontSize: 10 }}>openai → azure → anthropic</Tag>
        </Text>
      </Flexbox>
    </Flexbox>
  );
});

export default ProviderRoutingPanel;
