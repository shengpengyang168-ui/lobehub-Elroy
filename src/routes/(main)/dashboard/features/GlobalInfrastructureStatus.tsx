'use client';

import { Flexbox, Tag, Text } from '@lobehub/ui';
import { createStaticStyles, cssVar } from 'antd-style';
import { memo } from 'react';

const styles = createStaticStyles(({ css }) => ({
  card: css`
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    padding: 16px 20px;
    transition: box-shadow 200ms ease, border-color 200ms ease;

    &:hover {
      border-color: #d1d5db;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
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
    font-size: 20px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #111827;
  `,
  metricLabel: css`
    font-size: 11px;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,
}));

interface ProviderStatus {
  id: string;
  name: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
  uptime: number;
}

const providers: ProviderStatus[] = [
  { id: 'openai', name: 'OpenAI', status: 'healthy', latency: 342, uptime: 99.97 },
  { id: 'anthropic', name: 'Anthropic', status: 'healthy', latency: 512, uptime: 99.95 },
  { id: 'google', name: 'Google AI', status: 'degraded', latency: 823, uptime: 98.21 },
  { id: 'azure', name: 'Azure OpenAI', status: 'healthy', latency: 298, uptime: 99.99 },
  { id: 'mistral', name: 'Mistral', status: 'healthy', latency: 445, uptime: 99.88 },
  { id: 'groq', name: 'Groq', status: 'down', latency: 0, uptime: 95.12 },
];

const statusColors: Record<string, string> = {
  healthy: '#059669',
  degraded: '#D97706',
  down: '#DC2626',
};

const GlobalInfrastructureStatus = memo(() => {
  const healthyCount = providers.filter((p) => p.status === 'healthy').length;
  const degradedCount = providers.filter((p) => p.status === 'degraded').length;
  const downCount = providers.filter((p) => p.status === 'down').length;

  return (
    <Flexbox className={styles.card} gap={16}>
      <Flexbox horizontal align="center" justify="space-between">
        <Flexbox gap={8}>
          <Text style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>Global Infrastructure Status</Text>
          <Flexbox horizontal gap={16} align="center">
            <Flexbox horizontal gap={4} align="center">
              <span className={styles.dot} style={{ background: '#059669' }} />
              <Text style={{ fontSize: 12, color: '#6B7280' }}>{healthyCount} Healthy</Text>
            </Flexbox>
            <Flexbox horizontal gap={4} align="center">
              <span className={styles.dot} style={{ background: '#D97706' }} />
              <Text style={{ fontSize: 12, color: '#6B7280' }}>{degradedCount} Degraded</Text>
            </Flexbox>
            <Flexbox horizontal gap={4} align="center">
              <span className={styles.dot} style={{ background: '#DC2626' }} />
              <Text style={{ fontSize: 12, color: '#6B7280' }}>{downCount} Down</Text>
            </Flexbox>
          </Flexbox>
        </Flexbox>
        <Flexbox horizontal gap={24}>
          <Flexbox gap={2} align="end">
            <Text className={styles.metricLabel}>Avg Latency</Text>
            <Text className={styles.metricValue}>421ms</Text>
          </Flexbox>
          <Flexbox gap={2} align="end">
            <Text className={styles.metricLabel}>Total Uptime</Text>
            <Text className={styles.metricValue}>99.3%</Text>
          </Flexbox>
          <Flexbox gap={2} align="end">
            <Text className={styles.metricLabel}>Requests/min</Text>
            <Text className={styles.metricValue}>2,847</Text>
          </Flexbox>
        </Flexbox>
      </Flexbox>
      <Flexbox horizontal gap={8} wrap>
        {providers.map((p) => (
          <Flexbox
            key={p.id}
            horizontal
            align="center"
            gap={6}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              background: p.status === 'down' ? '#FEF2F2' : p.status === 'degraded' ? '#FFFBEB' : '#F0FDF4',
              border: `1px solid ${p.status === 'down' ? '#FECACA' : p.status === 'degraded' ? '#FDE68A' : '#BBF7D0'}`,
            }}
          >
            <span className={styles.dot} style={{ background: statusColors[p.status] }} />
            <Text style={{ fontSize: 12, fontWeight: 500, color: '#374151' }}>{p.name}</Text>
            <Text style={{ fontFamily: "'SF Mono', 'JetBrains Mono', monospace", fontSize: 11, color: '#6B7280' }}>
              {p.status === 'down' ? '—' : `${p.latency}ms`}
            </Text>
            <Tag style={{ fontSize: 10, padding: '0 4px', lineHeight: '18px' }}>{p.uptime}%</Tag>
          </Flexbox>
        ))}
      </Flexbox>
    </Flexbox>
  );
});

export default GlobalInfrastructureStatus;
