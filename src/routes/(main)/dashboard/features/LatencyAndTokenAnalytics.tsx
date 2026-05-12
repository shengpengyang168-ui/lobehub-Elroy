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
  metricValue: css`
    font-family: 'SF Mono', 'JetBrains Mono', monospace;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #111827;
  `,
  metricLabel: css`
    font-size: 10px;
    font-weight: 500;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,
  barContainer: css`
    width: 100%;
    height: 8px;
    background: #f3f4f6;
    border-radius: 4px;
    overflow: hidden;
  `,
  barFill: css`
    height: 100%;
    border-radius: 4px;
    transition: width 500ms ease;
  `,
  statRow: css`
    padding: 8px 0;
    border-bottom: 1px solid #f3f4f6;

    &:last-child {
      border-bottom: none;
    }
  `,
}));

interface ModelStat {
  model: string;
  tokens: number;
  cost: number;
  requests: number;
  latency: number;
}

const modelStats: ModelStat[] = [
  { model: 'gpt-4o', tokens: 12_450_000, cost: 62.25, requests: 8_421, latency: 342 },
  { model: 'claude-3-opus', tokens: 8_230_000, cost: 123.45, requests: 3_210, latency: 512 },
  { model: 'gpt-4o-mini', tokens: 24_100_000, cost: 12.05, requests: 22_450, latency: 198 },
  { model: 'claude-3-haiku', tokens: 15_800_000, cost: 7.90, requests: 14_200, latency: 265 },
  { model: 'gemini-1.5-pro', tokens: 6_700_000, cost: 33.50, requests: 4_100, latency: 823 },
];

const maxTokens = Math.max(...modelStats.map((m) => m.tokens));

const LatencyAndTokenAnalytics = memo(() => {
  const totalTokens = modelStats.reduce((s, m) => s + m.tokens, 0);
  const totalCost = modelStats.reduce((s, m) => s + m.cost, 0);
  const avgLatency = Math.round(modelStats.reduce((s, m) => s + m.latency, 0) / modelStats.length);

  return (
    <Flexbox className={styles.card} gap={12}>
      <Flexbox gap={4}>
        <Text style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>Latency & Token Analytics</Text>
        <Text style={{ fontSize: 11, color: '#6B7280' }}>Last 24 hours by model</Text>
      </Flexbox>

      <Flexbox horizontal gap={24}>
        <Flexbox gap={2}>
          <Text className={styles.metricLabel}>Total Tokens</Text>
          <Text className={styles.metricValue}>{(totalTokens / 1_000_000).toFixed(1)}M</Text>
        </Flexbox>
        <Flexbox gap={2}>
          <Text className={styles.metricLabel}>Total Cost</Text>
          <Text className={styles.metricValue}>${totalCost.toFixed(2)}</Text>
        </Flexbox>
        <Flexbox gap={2}>
          <Text className={styles.metricLabel}>Avg Latency</Text>
          <Text className={styles.metricValue}>{avgLatency}ms</Text>
        </Flexbox>
      </Flexbox>

      <Flexbox gap={0} style={{ marginTop: 4 }}>
        <Flexbox horizontal gap={8} style={{ padding: '6px 0', borderBottom: '1px solid #E5E7EB' }}>
          <Text style={{ flex: 1, fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Model</Text>
          <Text style={{ width: 60, fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Tokens</Text>
          <Text style={{ width: 48, fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Cost</Text>
          <Text style={{ width: 52, fontSize: 10, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Latency</Text>
        </Flexbox>
        {modelStats.map((m) => (
          <Flexbox key={m.model} className={styles.statRow} gap={4}>
            <Flexbox horizontal align="center" gap={8}>
              <Text style={{ flex: 1, fontSize: 12, fontWeight: 500, color: '#374151' }}>{m.model}</Text>
              <Text className={styles.metricValue} style={{ width: 60, fontSize: 12, textAlign: 'right' }}>
                {(m.tokens / 1_000_000).toFixed(1)}M
              </Text>
              <Text style={{ width: 48, fontSize: 12, color: '#6B7280', textAlign: 'right', fontFamily: "'SF Mono', 'JetBrains Mono', monospace" }}>
                ${m.cost.toFixed(1)}
              </Text>
              <Text style={{ width: 52, fontSize: 12, color: m.latency > 500 ? '#DC2626' : '#6B7280', textAlign: 'right', fontFamily: "'SF Mono', 'JetBrains Mono', monospace" }}>
                {m.latency}ms
              </Text>
            </Flexbox>
            <div className={styles.barContainer}>
              <div
                className={styles.barFill}
                style={{
                  width: `${(m.tokens / maxTokens) * 100}%`,
                  background: m.latency > 500
                    ? 'linear-gradient(90deg, #FCA5A5, #EF4444)'
                    : 'linear-gradient(90deg, #93C5FD, #3B82F6)',
                }}
              />
            </div>
          </Flexbox>
        ))}
      </Flexbox>
    </Flexbox>
  );
});

export default LatencyAndTokenAnalytics;
