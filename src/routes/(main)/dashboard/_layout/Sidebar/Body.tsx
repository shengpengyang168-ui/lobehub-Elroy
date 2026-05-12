'use client';

import { Flexbox } from '@lobehub/ui';
import {
  ActivityIcon,
  BarChart3Icon,
  GitBranchIcon,
  LayoutDashboardIcon,
  ScrollTextIcon,
  ServerIcon,
} from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import NavItem from '@/features/NavPanel/components/NavItem';
import { usePathname } from '@/libs/router/navigation';

const useActiveKey = () => {
  const pathname = usePathname();
  if (pathname === '/dashboard') return 'overview';
  if (pathname.startsWith('/dashboard/providers')) return 'providers';
  if (pathname.startsWith('/dashboard/routing')) return 'routing';
  if (pathname.startsWith('/dashboard/monitoring')) return 'monitoring';
  if (pathname.startsWith('/dashboard/logs')) return 'logs';
  return 'overview';
};

const Body = memo(() => {
  const activeKey = useActiveKey();
  const navigate = useNavigate();
  const { t } = useTranslation('dashboard');

  const navItems = [
    { icon: LayoutDashboardIcon, key: 'overview', path: '/dashboard', title: t('nav.overview') },
    { icon: ServerIcon, key: 'providers', path: '/dashboard/providers', title: t('nav.providers') },
    { icon: GitBranchIcon, key: 'routing', path: '/dashboard/routing', title: t('nav.routing') },
    { icon: BarChart3Icon, key: 'monitoring', path: '/dashboard/monitoring', title: t('nav.monitoring') },
    { icon: ScrollTextIcon, key: 'logs', path: '/dashboard/logs', title: t('nav.logs') },
    { icon: ActivityIcon, key: 'health', path: '/dashboard/health', title: t('nav.health') },
  ];

  return (
    <Flexbox gap={1} paddingInline={4}>
      {navItems.map((item) => (
        <Link
          key={item.key}
          to={item.path}
          onClick={(e) => {
            e.preventDefault();
            navigate(item.path);
          }}
        >
          <NavItem
            active={activeKey === item.key}
            icon={item.icon}
            title={item.title}
          />
        </Link>
      ))}
    </Flexbox>
  );
});

export default Body;
