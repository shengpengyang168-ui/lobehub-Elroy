'use client';

import { memo } from 'react';

interface RelayOSLogoProps {
  size?: number;
  className?: string;
}

const RelayOSLogo = memo<RelayOSLogoProps>(({ size = 32, className }) => {
  return (
    <svg
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 128 128"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#F5F7FB" height="128" rx="28" width="128" />
      <path d="M36 42L62 42L92 72L66 72L36 42Z" fill="url(#paint0_linear)" />
      <path d="M36 86L62 86L92 56L66 56L36 86Z" fill="url(#paint1_linear)" />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear"
          x1="36"
          x2="92"
          y1="42"
          y2="72"
        >
          <stop stopColor="#0F172A" />
          <stop offset="1" stopColor="#64748B" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint1_linear"
          x1="36"
          x2="92"
          y1="86"
          y2="56"
        >
          <stop stopColor="#1E293B" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
      </defs>
    </svg>
  );
});

export default RelayOSLogo;
