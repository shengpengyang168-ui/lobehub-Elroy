'use client';

import { Flexbox, Tag, Text } from '@lobehub/ui';
import { cx } from 'antd-style';
import { memo } from 'react';

import Actions from './components/Actions';
import Avatar from './components/Avatar';
import ErrorContent from './components/ErrorContent';
import MessageContent from './components/MessageContent';
import Title from './components/Title';
import { styles } from './style';
import { type ChatItemProps } from './type';

const ChatItem = memo<ChatItemProps>(
  ({
    onAvatarClick,
    avatarProps,
    customAvatarRender,
    actions,
    className,
    loading,
    message,
    placeholderMessage = '...',
    placement = 'left',
    avatar,
    error,
    showTitle,
    time,
    editing,
    messageExtra,
    children,
    customErrorRender,
    onDoubleClick,
    aboveMessage,
    belowMessage,
    showAvatar = true,
    titleAddon,
    disabled = false,
    id,
    style,
    ...rest
  }) => {
    const isUser = placement === 'right';
    const isEmptyMessage =
      !message || String(message).trim() === '' || message === placeholderMessage;
    const errorContent = error && (
      <ErrorContent customErrorRender={customErrorRender} error={error} id={id} />
    );

    const avatarContent = (
      <Avatar
        alt={avatarProps?.alt || avatar.title || 'avatar'}
        loading={loading}
        shape={'square'}
        onClick={onAvatarClick}
        {...avatarProps}
        avatar={avatar}
      />
    );

    const method = isUser ? 'POST' : 'RESPONSE';
    const endpoint = isUser ? '/v1/chat/completions' : '/v1/chat/completions';
    const latency = isUser ? undefined : '342ms';
    const provider = isUser ? undefined : 'openai';
    const tokens = isUser ? undefined : '1,250';
    const timestamp = time
      ? new Date(time).toLocaleTimeString('en-US', { hour12: false })
      : '--:--:--';

    const methodColor = isUser ? '#1D4ED8' : '#059669';
    const methodBg = isUser ? '#EFF6FF' : '#F0FDF4';
    const methodBorder = isUser ? '#BFDBFE' : '#BBF7D0';

    return (
      <Flexbox
        align={isUser ? 'flex-end' : 'flex-start'}
        className={cx('message-wrapper', styles.container, className)}
        data-message-id={id}
        gap={8}
        paddingBlock={8}
        style={{
          paddingInlineStart: isUser ? 0 : 0,
          maxWidth: '100%',
          width: '100%',
          ...style,
        }}
        {...rest}
      >
        <div className={styles.card} style={{ maxWidth: isUser ? '85%' : '100%', width: '100%' }}>
          {/* Card Header */}
          <div className={styles.cardHeader}>
            <span
              className={styles.methodBadge}
              style={{
                background: methodBg,
                color: methodColor,
                border: `1px solid ${methodBorder}`,
              }}
            >
              {isUser ? '→ Request' : '← Response'}
            </span>
            <Text style={{ fontSize: 11, color: '#6B7280', fontFamily: "'SF Mono', 'JetBrains Mono', monospace" }}>
              {endpoint}
            </Text>
            {latency && (
              <Text style={{ fontSize: 10, color: '#9CA3AF', marginLeft: 'auto', fontFamily: "'SF Mono', 'JetBrains Mono', monospace" }}>
                {latency}
              </Text>
            )}
          </div>

          {/* Card Body */}
          <div className={styles.cardBody}>
            <Flexbox
              className={'message-body'}
              gap={8}
              style={{
                maxWidth: '100%',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {aboveMessage}
              {error && isEmptyMessage ? (
                errorContent
              ) : (
                <MessageContent
                  disabled={disabled}
                  editing={editing}
                  id={id!}
                  message={message}
                  variant={undefined}
                  messageExtra={
                    <>
                      {errorContent}
                      {messageExtra}
                    </>
                  }
                  onDoubleClick={onDoubleClick}
                >
                  {children}
                </MessageContent>
              )}
              {belowMessage}
            </Flexbox>
          </div>

          {/* Card Footer */}
          <div className={styles.cardFooter}>
            <Flexbox horizontal gap={8} align="center">
              {provider && (
                <>
                  <span
                    style={{
                      display: 'inline-block',
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#059669',
                    }}
                  />
                  <span>{provider}</span>
                </>
              )}
              {tokens && <span>{tokens} tokens</span>}
            </Flexbox>
            <span>{timestamp}</span>
          </div>
        </div>

        {actions && <Actions actions={actions} placement={placement} />}
      </Flexbox>
    );
  },
);

export default ChatItem;
