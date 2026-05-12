'use client';

import { type ChatInputProps } from '@lobehub/editor/react';
import { ChatInput, ChatInputActionBar } from '@lobehub/editor/react';
import { Center, Flexbox, Text } from '@lobehub/ui';
import { createStaticStyles, cx } from 'antd-style';
import { type ReactNode, use } from 'react';
import { memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import { useChatInputStore } from '@/features/ChatInput/store';
import { LayoutContainerContext } from '@/routes/(main)/_layout/DesktopLayoutContainer/LayoutContainerContext';
import { useChatStore } from '@/store/chat';
import { chatSelectors } from '@/store/chat/selectors';
import { fileChatSelectors, useFileStore } from '@/store/file';
import { useGlobalStore } from '@/store/global';
import { systemStatusSelectors } from '@/store/global/selectors';

import { type ActionToolbarProps } from '../ActionBar';
import ActionBar from '../ActionBar';
import InputEditor from '../InputEditor';
import { type PlaceholderVariant } from '../InputEditor/Placeholder';
import RuntimeConfig from '../RuntimeConfig';
import SendArea from '../SendArea';
import TypoBar from '../TypoBar';
import ContextContainer from './ContextContainer';

const styles = createStaticStyles(({ css, cssVar }) => ({
  container: css`
    .show-on-hover {
      opacity: 0;
    }

    &:hover {
      .show-on-hover {
        opacity: 1;
      }
    }
  `,
  footnote: css`
    font-size: 10px;
  `,
  fullscreen: css`
    position: absolute;
    z-index: 100;
    inset: 0;

    width: 100%;
    height: 100%;
    margin-block-start: 0;

    background: ${cssVar.colorBgContainer};
  `,
  inputFullscreen: css`
    border: none;
    border-radius: 0 !important;
  `,
  consoleWrapper: css`
    background: #1e1e1e;
    border: 1px solid #333;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  `,
  consoleHeader: css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    background: #2d2d2d;
    border-bottom: 1px solid #333;
    font-family: 'SF Mono', 'JetBrains Mono', monospace;
    font-size: 11px;
    color: #9ca3af;
  `,
  consoleDot: css`
    width: 10px;
    height: 10px;
    border-radius: 50%;
  `,
  consoleBody: css`
    background: #1e1e1e;
    padding: 12px;
  `,
  consoleFooter: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 14px;
    background: #2d2d2d;
    border-top: 1px solid #333;
    font-family: 'SF Mono', 'JetBrains Mono', monospace;
    font-size: 10px;
    color: #6b7280;
  `,
  sendButton: css`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 14px;
    border-radius: 6px;
    background: #2563eb;
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: background 150ms ease;

    &:hover {
      background: #1d4ed8;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,
}));

interface DesktopChatInputProps extends ActionToolbarProps {
  actionBarStyle?: React.CSSProperties;
  extentHeaderContent?: ReactNode;
  inputContainerProps?: ChatInputProps;
  leftContent?: ReactNode;
  placeholder?: ReactNode;
  placeholderVariant?: PlaceholderVariant;
  runtimeConfigSlot?: ReactNode;
  sendAreaPrefix?: ReactNode;
  showFootnote?: boolean;
  showRuntimeConfig?: boolean;
}

const DesktopChatInput = memo<DesktopChatInputProps>(
  ({
    showFootnote,
    showRuntimeConfig = true,
    runtimeConfigSlot,
    inputContainerProps,
    extentHeaderContent,
    actionBarStyle,
    borderRadius,
    extraActionItems,
    dropdownPlacement,
    leftContent,
    placeholder,
    placeholderVariant,
    sendAreaPrefix,
  }) => {
    const { t } = useTranslation('chat');
    const layoutContainerRef = use(LayoutContainerContext);
    const [chatInputHeight, updateSystemStatus] = useGlobalStore((s) => [
      systemStatusSelectors.chatInputHeight(s),
      s.updateSystemStatus,
    ]);
    const hasContextSelections = useFileStore(fileChatSelectors.chatContextSelectionHasItem);
    const hasFiles = useFileStore(fileChatSelectors.chatUploadFileListHasItem);
    const [slashMenuRef, expand, showTypoBar, editor, leftActions] = useChatInputStore((s) => [
      s.slashMenuRef,
      s.expand,
      s.showTypoBar,
      s.editor,
      s.leftActions,
    ]);

    const chatKey = useChatStore(chatSelectors.currentChatKey);

    const setExpand = useChatInputStore((s) => s.setExpand);

    useEffect(() => {
      if (editor) editor.focus();
      setExpand(false);
    }, [chatKey, editor, setExpand]);

    const shouldShowContextContainer =
      leftActions.flat().includes('fileUpload') || hasContextSelections || hasFiles;
    const contextContainerNode = shouldShowContextContainer && <ContextContainer />;

    const content = (
      <Flexbox
        className={cx(styles.container, expand && styles.fullscreen)}
        gap={8}
        paddingBlock={expand ? 0 : showFootnote ? '0 12px' : '0 8px'}
      >
        {/* API Control Console Wrapper */}
        <div className={styles.consoleWrapper}>
          {/* Terminal Header */}
          <div className={styles.consoleHeader}>
            <span className={styles.consoleDot} style={{ background: '#ff5f56' }} />
            <span className={styles.consoleDot} style={{ background: '#ffbd2e' }} />
            <span className={styles.consoleDot} style={{ background: '#27c93f' }} />
            <Text style={{ fontSize: 11, color: '#9CA3AF', fontFamily: "'SF Mono', 'JetBrains Mono', monospace", marginLeft: 8 }}>
              API Control Console
            </Text>
            <Text style={{ fontSize: 10, color: '#6B7280', marginLeft: 'auto', fontFamily: "'SF Mono', 'JetBrains Mono', monospace" }}>
              POST /v1/chat/completions
            </Text>
          </div>

          {/* Provider / Model Selector Bar */}
          <Flexbox horizontal align="center" gap={8} style={{ padding: '8px 14px', background: '#252525', borderBottom: '1px solid #333' }}>
            <Text style={{ fontSize: 10, color: '#6B7280', fontFamily: "'SF Mono', 'JetBrains Mono', monospace" }}>
              Provider:
            </Text>
            <span style={{ padding: '2px 8px', borderRadius: 4, background: '#333', color: '#E5E7EB', fontSize: 11, fontFamily: "'SF Mono', 'JetBrains Mono', monospace" }}>
              openai
            </span>
            <Text style={{ fontSize: 10, color: '#6B7280', fontFamily: "'SF Mono', 'JetBrains Mono', monospace", marginLeft: 12 }}>
              Model:
            </Text>
            <span style={{ padding: '2px 8px', borderRadius: 4, background: '#333', color: '#E5E7EB', fontSize: 11, fontFamily: "'SF Mono', 'JetBrains Mono', monospace" }}>
              gpt-4o
            </span>
          </Flexbox>

          {/* Console Body */}
          <div className={styles.consoleBody}>
            <ChatInput
              data-testid="chat-input"
              defaultHeight={chatInputHeight || 32}
              fullscreen={expand}
              maxHeight={320}
              minHeight={36}
              resize={true}
              slashMenuRef={slashMenuRef}
              footer={
                <ChatInputActionBar
                  style={actionBarStyle ?? { paddingRight: 8 }}
                  left={
                    leftContent ?? (
                      <ActionBar
                        borderRadius={borderRadius}
                        dropdownPlacement={dropdownPlacement}
                        extraActionItems={extraActionItems}
                      />
                    )
                  }
                  right={
                    sendAreaPrefix ? (
                      <Flexbox horizontal align={'center'} gap={6}>
                        {sendAreaPrefix}
                        <SendArea />
                      </Flexbox>
                    ) : (
                      <SendArea />
                    )
                  }
                />
              }
              header={
                <Flexbox gap={0}>
                  {extentHeaderContent}
                  {showTypoBar && <TypoBar />}
                  {contextContainerNode}
                </Flexbox>
              }
              onSizeChange={(height) => {
                updateSystemStatus({ chatInputHeight: height });
              }}
              {...inputContainerProps}
              className={cx(expand && styles.inputFullscreen, inputContainerProps?.className)}
            >
              <InputEditor placeholder={placeholder} placeholderVariant={placeholderVariant} />
            </ChatInput>
          </div>

          {/* Console Footer */}
          <div className={styles.consoleFooter}>
            <Flexbox horizontal gap={8} align="center">
              <span style={{ color: '#059669' }}>●</span>
              <span>openai / gpt-4o</span>
              <span style={{ color: '#4B5563' }}>|</span>
              <span>Strategy: weighted-round-robin</span>
            </Flexbox>
            <span>Latency: 342ms | Tokens: 0</span>
          </div>
        </div>

        {runtimeConfigSlot ?? (showRuntimeConfig && <RuntimeConfig />)}
        {showFootnote && !expand && (
          <Center style={{ pointerEvents: 'none', zIndex: 100 }}>
            <Text className={styles.footnote} type={'secondary'}>
              {t('input.disclaimer')}
            </Text>
          </Center>
        )}
      </Flexbox>
    );

    if (expand && layoutContainerRef.current)
      return createPortal(content, layoutContainerRef.current);

    return content;
  },
);

DesktopChatInput.displayName = 'DesktopChatInput';

export default DesktopChatInput;
