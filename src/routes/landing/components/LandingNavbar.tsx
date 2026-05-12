'use client';

import { createModal, useModalContext } from '@lobehub/ui/base-ui';
import { Button, DropdownMenu, Input } from '@lobehub/ui';
import { Globe, Mail } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { LOBE_LOCALE_COOKIE } from '@/const/locale';
import { localeOptions, normalizeLocale } from '@/locales/resources';

import RelayOSLogo from './RelayOSLogo';

const setCookieSimple = (key: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 86_400_000).toUTCString();
  document.cookie = `${key}=${value};expires=${expires};path=/;`;
};

const LoginContent = memo(() => {
  const { close } = useModalContext();
  const { t } = useTranslation('landing');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!email.trim()) return;
    setLoading(true);
    try {
      close();
    } catch {
      setLoading(false);
    }
  }, [email, close]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '8px 0' }}>
      <div style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6 }}>
        {t('login.description')}
      </div>
      <Input
        onChange={(e) => setEmail(e.target.value)}
        onPressEnter={handleSubmit}
        placeholder={t('login.placeholder')}
        prefix={<Mail size={16} style={{ color: '#94A3B8' }} />}
        size="large"
        style={{ borderRadius: '10px' }}
        type="email"
        value={email}
      />
      <Button
        block
        disabled={!email.trim()}
        loading={loading}
        onClick={handleSubmit}
        size="large"
        style={{
          background: '#0F172A',
          border: 'none',
          borderRadius: '10px',
          color: '#FFFFFF',
          fontWeight: 600,
          height: '44px',
        }}
        type="primary"
      >
        {t('login.submit')}
      </Button>
    </div>
  );
});

const createLoginModal = (title: string) =>
  createModal({
    content: <LoginContent />,
    footer: null,
    maskClosable: true,
    styles: {
      content: { padding: '24px 28px' },
    },
    title,
    width: 'min(90%, 420px)',
  });

const LandingNavbar = memo(() => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation('landing');
  const browserLanguage = typeof navigator !== 'undefined' ? navigator.language : 'en-US';
  const current = normalizeLocale(i18n.resolvedLanguage || i18n.language || browserLanguage);

  const langItems = useMemo(
    () =>
      localeOptions.map((item) => ({
        checked: current === item.value,
        closeOnClick: true,
        key: item.value,
        label: item.label,
        onCheckedChange: (checked: boolean) => {
          if (!checked) return;
          i18n.changeLanguage(item.value);
          document.documentElement.lang = item.value;
          setCookieSimple(LOBE_LOCALE_COOKIE, item.value, 365);
        },
        type: 'checkbox' as const,
      })),
    [current, i18n],
  );

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        background: 'rgba(250, 251, 252, 0.8)',
        borderBottom: '1px solid rgba(226, 232, 240, 0.6)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
          }}
          onClick={() => navigate('/')}
        >
          <RelayOSLogo size={36} />
          <span
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#0F172A',
              letterSpacing: '-0.02em',
            }}
          >
            RelayOS
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <DropdownMenu
            items={langItems}
            popupProps={{ style: { maxHeight: 360, minWidth: 200, overflow: 'auto' } }}
          >
            <Button
              icon={<Globe size={16} />}
              style={{
                color: '#475569',
                background: 'transparent',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 500,
                padding: '8px 16px',
                cursor: 'pointer',
              }}
            >
              {current === 'zh-CN' ? '中文' : 'EN'}
            </Button>
          </DropdownMenu>
          <Button
            onClick={() => createLoginModal(t('login.title'))}
            style={{
              background: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              padding: '8px 20px',
              cursor: 'pointer',
            }}
          >
            {t('login.button')}
          </Button>
        </div>
      </div>
    </nav>
  );
});

export default LandingNavbar;
