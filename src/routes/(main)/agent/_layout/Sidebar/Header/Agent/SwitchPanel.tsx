'use client';

import { Flexbox, Popover, Text } from '@lobehub/ui';
import { createStaticStyles } from 'antd-style';
import { type PropsWithChildren } from 'react';
import { memo, useCallback } from 'react';

import { useAgentStore } from '@/store/agent';
import { agentSelectors } from '@/store/agent/selectors';

const styles = createStaticStyles(({ cssVar, css }) => ({
  trigger: css`
    &[data-popup-open] {
      background: ${cssVar.colorFillTertiary};
    }
  `,
  providerCard: css`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 150ms ease;

    &:hover {
      background: ${cssVar.colorFillTertiary};
    }
  `,
  statusDot: css`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  `,
  providerInfo: css`
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
  `,
  providerMeta: css`
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'SF Mono', 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #9ca3af;
  `,
}));

interface ProviderNodeData {
  id: string;
  name: string;
  endpoint: string;
  status: 'healthy' | 'degraded' | 'down';
  latency: number;
}

const providers: ProviderNodeData[] = [
  { id: 'openai', name: 'OpenAI', endpoint: 'api.openai.com', status: 'healthy', latency: 342 },
  { id: 'anthropic', name: 'Anthropic', endpoint: 'api.anthropic.com', status: 'healthy', latency: 512 },
  { id: 'azure', name: 'Azure OpenAI', endpoint: 'azure.openai.com', status: 'healthy', latency: 298 },
  { id: 'google', name: 'Google AI', endpoint: 'generativelanguage.googleapis.com', status: 'degraded', latency: 823 },
  { id: 'groq', name: 'Groq', endpoint: 'api.groq.com', status: 'down', latency: 0 },
];

const statusColors: Record<string, string> = {
  healthy: '#059669',
  degraded: '#D97706',
  down: '#DC2626',
};

const ProviderNodeList = memo(() => {
  const [currentProvider, updateAgentConfig] = useAgentStore((s) => [
    agentSelectors.currentAgentModelProvider(s),
    s.updateAgentConfig,
  ]);

  const handleSelect = useCallback(
    (providerId: string) => {
      updateAgentConfig({ provider: providerId });
    },
    [updateAgentConfig],
  );

  return (
    <Flexbox gap={2} padding={8} style={{ maxHeight: '50vh', overflowY: 'auto', width: 260 }}>
      <Text style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', padding: '4px 8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Provider Nodes
      </Text>
      {providers.map((p) => (
        <div
          key={p.id}
          className={styles.providerCard}
          style={{
            background: currentProvider === p.id ? '#EFF6FF' : undefined,
            border: currentProvider === p.id ? '1px solid #BFDBFE' : '1px solid transparent',
          }}
          onClick={() => handleSelect(p.id)}
        >
          <span
            className={styles.statusDot}
            style={{ background: statusColors[p.status] }}
          />
          <div className={styles.providerInfo}>
            <Text ellipsis weight={500} style={{ fontSize: 12, color: '#374151' }}>
              {p.name}
            </Text>
            <div className={styles.providerMeta}>
              <span>{p.endpoint}</span>
              <span style={{ color: p.latency > 500 ? '#DC2626' : '#9CA3AF' }}>
                {p.status === 'down' ? '—' : `${p.latency}ms`}
              </span>
            </div>
          </div>
        </div>
      ))}
    </Flexbox>
  );
});

const SwitchPanel = memo<PropsWithChildren>(({ children }) => {
  return (
    <Popover
      classNames={{ trigger: styles.trigger }}
      content={<ProviderNodeList />}
      nativeButton={false}
      placement="bottomLeft"
      trigger="click"
      styles={{
        content: {
          padding: 0,
          width: 260,
        },
      }}
    >
      {children}
    </Popover>
  );
});

export default SwitchPanel;
