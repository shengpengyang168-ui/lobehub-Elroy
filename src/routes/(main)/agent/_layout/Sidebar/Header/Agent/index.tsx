'use client';

import { ActionIcon, Block, Flexbox, Text } from '@lobehub/ui';
import { ChevronsUpDownIcon, ServerIcon } from 'lucide-react';
import { type PropsWithChildren } from 'react';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { SkeletonItem } from '@/features/NavPanel/components/SkeletonList';
import { useAgentStore } from '@/store/agent';
import { agentSelectors } from '@/store/agent/selectors';

import SwitchPanel from './SwitchPanel';

const ProviderNode = memo<PropsWithChildren>(() => {
  const { t } = useTranslation(['chat', 'common']);

  const [isLoading, title, provider] = useAgentStore((s) => [
    agentSelectors.isAgentConfigLoading(s),
    agentSelectors.currentAgentTitle(s),
    agentSelectors.currentAgentModelProvider(s),
  ]);

  const displayTitle = title || t('defaultSession', { ns: 'common' });
  const displayProvider = provider || 'OpenAI';

  if (isLoading) return <SkeletonItem height={32} padding={0} />;

  return (
    <SwitchPanel>
      <Block
        clickable
        horizontal
        align={'center'}
        gap={8}
        padding={2}
        variant={'borderless'}
        style={{
          minWidth: 32,
          overflow: 'hidden',
        }}
      >
        <ServerIcon size={20} color="#6B7280" />
        <Flexbox gap={0} style={{ overflow: 'hidden' }}>
          <Text ellipsis weight={500} style={{ fontSize: 13 }}>
            {displayTitle}
          </Text>
          <Text ellipsis style={{ fontSize: 11, color: '#9CA3AF', fontFamily: "'SF Mono', 'JetBrains Mono', monospace" }}>
            {displayProvider}
          </Text>
        </Flexbox>
        <ActionIcon
          icon={ChevronsUpDownIcon}
          size={{
            blockSize: 28,
            size: 16,
          }}
          style={{
            width: 24,
          }}
        />
      </Block>
    </SwitchPanel>
  );
});

export default ProviderNode;
