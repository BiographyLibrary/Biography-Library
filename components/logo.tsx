'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface LogoProps {
  height?: number;
  className?: string;
}

export function Logo({ height = 48, className = '' }: LogoProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ width: height * 0.83, height }} className={className} />;
  }

  const logoSrc = resolvedTheme === 'dark' ? '/logo-white.svg' : '/logo-black.svg';

  return (
    <Image
      src={logoSrc}
      alt="Biography Library"
      width={height * 0.83}
      height={height}
      className={className}
      priority
    />
  );
}
