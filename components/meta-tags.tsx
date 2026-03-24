'use client';

import { useEffect } from 'react';
import { useTranslation } from '@/lib/i18n/i18n-context';

export function MetaTags() {
  const { t } = useTranslation();
  const tagline = t.meta.tagline;

  useEffect(() => {
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        const [attrName, attrValue] = selector.replace('meta[', '').replace(']', '').split('=');
        el.setAttribute(attrName, attrValue.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', tagline);
    setMeta('meta[property="og:description"]', 'content', tagline);
    setMeta('meta[name="twitter:description"]', 'content', tagline);
  }, [tagline]);

  return null;
}
