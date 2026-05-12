import { createStaticStyles } from 'antd-style';

export const styles = createStaticStyles(({ css, cssVar }) => {
  return {
    container: css`
      position: relative;
      max-width: 100%;

      time,
      div[role='menubar'] {
        pointer-events: none;
        opacity: 0;
        transition: opacity 200ms ${cssVar.motionEaseOut};
      }

      time {
        display: inline-block;
        white-space: nowrap;
      }

      div[role='menubar'] {
        display: flex;
      }

      &:has([data-popup-open]) {
        div[role='menubar'] {
          pointer-events: unset;
          opacity: 1;
        }
      }

      &:hover {
        time,
        div[role='menubar'] {
          pointer-events: unset;
          opacity: 1;
        }
      }
    `,
    card: css`
      width: 100%;
      background: #ffffff;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
      overflow: hidden;
      transition: box-shadow 200ms ease, border-color 200ms ease;

      &:hover {
        border-color: #d1d5db;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      }
    `,
    cardHeader: css`
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 14px;
      background: #f9fafb;
      border-bottom: 1px solid #f3f4f6;
      font-family: 'SF Mono', 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 500;
      color: #6b7280;
    `,
    methodBadge: css`
      display: inline-flex;
      align-items: center;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    `,
    cardBody: css`
      padding: 14px;
      font-size: 13px;
      line-height: 1.6;
      color: #374151;
    `,
    cardFooter: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 14px;
      background: #f9fafb;
      border-top: 1px solid #f3f4f6;
      font-family: 'SF Mono', 'JetBrains Mono', monospace;
      font-size: 10px;
      color: #9ca3af;
    `,
    loading: css`
      position: absolute;
      inset-block-end: 0;
      inset-inline-start: -4px;
      inset-inline-end: unset;

      width: 16px;
      height: 16px;
      border-radius: 50%;

      color: ${cssVar.colorBgLayout};

      background: ${cssVar.colorPrimary};
    `,
  };
});
