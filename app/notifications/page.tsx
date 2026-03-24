'use client';

import { Bell } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/i18n-context';

export default function NotificationsPage() {
  const { t } = useTranslation();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col items-center justify-center text-center gap-4">
        <div className="rounded-full bg-muted p-4">
          <Bell className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">{t.nav.notifications}</h1>
        <p className="text-muted-foreground text-sm max-w-sm">
          You have no notifications right now. Check back later.
        </p>
      </div>
    </div>
  );
}
