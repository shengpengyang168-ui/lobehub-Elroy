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
    transition: box-shadow 200ms ease, border-color 200ms ease;

    &:hover {
      border-color: #d1d5db;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    }
  `,
  logRow: css`
    padding: 6px 0;
    border-bottom: 1px solid #f3f4f6;
    font-family: 'SF Mono', 'JetBrains Mono', monospace;
    font-size: 11px;
    transition: background 100ms ease;

    &:hover {
      background: #f9fafb;
      margin: 0 -8px;
      padding: 6px 8px;
      border-radius: 4px;
    }

    &:last-child {
      border-bottom: none;
    }
  `,
  statusDot: css`
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
  `,
  timestamp: css`
    color: #9ca3af;
    font-size: 10px;
  `,
  model: css`
    color: #6b7280;
    font-size: 10px;
  `,
  message: css`
    color: #374151;
    font-size: 11px;
  `,
  latency: css`
    font-size: 10px;
    font-weight: 500;
  `,
}));

interface LogEntry {
  id: string;
  timestamp: string;
  method: string;
  path: string;
  provider: string;
  model: string;
  status: number;
  latency: number;
  tokens: number;
  cost: number;
}

const recentLogs: LogEntry[] = [
  { id: '1', timestamp: '14:23:45.122', method: 'POST', path: '/v1/chat/completions', provider: 'openai', model: 'gpt-4o', status: 200, latency: 342, tokens: 1250, cost: 0.0063 },
  { id: '2', timestamp: '14:23:44.891', method: 'POST', path: '/v1/chat/completions', provider: 'anthropic', model: 'claude-3-haiku', status: 200, latency: 265, tokens: 890, cost: 0.0004 },
  { id: '3', timestamp: '14:23:44.567', method: 'POST', path: '/v1/chat/completions', provider: 'azure', model: 'gpt-4o-mini', status: 200, latency: 198, tokens: 2100, cost: 0.0011 },
  { id: '4', timestamp: '14:23:44.233', method: 'POST', path: '/v1/chat/completions', provider: 'google', model: 'gemini-1.5-pro', status: 502, latency: 8230, tokens: 0, cost: 0 },
  { id: '5', timestamp: '14:23:43.998', method: 'POST', path: '/v1/chat/completions', provider: 'openai', model: 'gpt-4o', status: 200, latency: 412, tokens: 3400, cost: 0.0170 },
  { id: '6', timestamp: '14:23:43.654', method: 'POST', path: '/v1/chat/completions', provider: 'mistral', model: 'mistral-large', status: 200, latency: 445, tokens: 1560, cost: 0.0047 },
  { id: '7', timestamp: '14:23:43.321', method: 'POST', path: '/v1/chat/completions', provider: 'groq', model: 'llama-3.1-70b', status: 429, latency: 0, tokens: 0, cost: 0 },
  { id: '8', timestamp: '14:23:42.987', method: 'POST', path: '/v1/chat/completions', provider: 'openai', model: 'gpt-4o-mini', status: 200, latency: 156, tokens: 780, cost: 0.0004 },
];

const statusColor = (status: number) => {
  if (status >= 200 && status < 300) return '#059669';
  if (status >= 400 && status < 500) return '#D97706';
  if (status >= 500) return '#DC2626';
  return '#6B7280';
};

const LiveRequestLogs = memo(() => {
  return (
    <Flexbox className={styles.card} gap={8}>
      <Flexbox horizontal align="center" justify="space-between">
        <Flexbox gap={4}>
          <Text style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>Live Request Logs</Text>
          <Text style={{ fontSize: 11, color: '#6B7280' }}>Real-time stream of API requests processed by the relay</Text>
        </Flexbox>
        <Flexbox horizontal gap={12}>
          <Flexbox horizontal gap={4} align="center">
            <span className={styles.statusDot} style={{ background: '#059669' }} />
            <Text style={{ fontSize: 10, color: '#6B7280' }}>6 Success</Text>
          </Flexbox>
          <Flexbox horizontal gap={4} align="center">
            <span className={styles.statusDot} style={{ background: '#D97706' }} />
            <Text style={{ fontSize: 10, color: '#6B7280' }}>1 Rate-limited</Text>
          </Flexbox>
          <Flexbox horizontal gap={4} align="center">
            <span className={styles.statusDot} style={{ background: '#DC2626' }} />
            <Text style={{ fontSize: 10, color: '#6B7280' }}>1 Error</Text>
          </Flexbox>
        </Flexbox>
      </Flexbox>

      <Flexbox gap={0}>
        <Flexbox horizontal gap={8} style={{ padding: '4px 0', borderBottom: '1px solid #E5E7EB' }}>
          <Text style={{ width: 80, fontSize: 9, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Timestamp</Text>
          <Text style={{ width: 36, fontSize: 9, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</Text>
          <Text style={{ width: 60, fontSize: 9, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Provider</Text>
          <Text style={{ flex: 1, fontSize: 9, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Model</Text>
          <Text style={{ width: 52, fontSize: 9, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Latency</Text>
          <Text style={{ width: 48, fontSize: 9, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Tokens</Text>
          <Text style={{ width: 48, fontSize: 9, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Cost</Text>
        </Flexbox>
        {recentLogs.map((log) => (
          <Flexbox key={log.id} className={styles.logRow} horizontal gap={8} align="center">
            <Text className={styles.timestamp} style={{ width: 80 }}>{log.timestamp}</Text>
            <Flexbox style={{ width: 36 }} align="center">
              <Tag style={{ fontSize: 9, padding: '0 4px', lineHeight: '16px', background: `${statusColor(log.status)}15`, color: statusColor(log.status), border: `1px solid ${statusColor(log.status)}30` }}>
                {log.status}
              </Tag>
            </Flexbox>
            <Text className={styles.model} style={{ width: 60 }}>{log.provider}</Text>
            <Text className={styles.message} style={{ flex: 1 }}>{log.model}</Text>
            <Text className={styles.latency} style={{ width: 52, textAlign: 'right', color: log.latency > 1000 ? '#DC2626' : '#6B7280' }}>
              {log.latency > 0 ? `${log.latency}ms` : '—'}
            </Text>
            <Text style={{ width: 48, textAlign: 'right', fontSize: 10, color: '#6B7280' }}>
              {log.tokens > 0 ? log.tokens.toLocaleString() : '—'}
            </Text>
            <Text style={{ width: 48, textAlign: 'right', fontSize: 10, color: '#6B7280', fontFamily: "'SF Mono', 'JetBrains Mono', monospace" }}>
              {log.cost > 0 ? `$${log.cost.toFixed(4)}` : '—'}
            </Text>
          </Flexbox>
        ))}
      </Flexbox>
    </Flexbox>
  );
});

export default LiveRequestLogs;
