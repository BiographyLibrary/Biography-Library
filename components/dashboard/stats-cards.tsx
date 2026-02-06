'use client';

import { FileText, Clock, BookOpen } from 'lucide-react';
import type { Biography } from '@/lib/biographies';

interface StatsCardsProps {
  biographies: Biography[];
}

export function StatsCards({ biographies }: StatsCardsProps) {
  const total = biographies.length;
  const drafts = biographies.filter((b) => b.status === 'draft').length;
  const completed = biographies.filter((b) => b.status === 'completed').length;

  const cards = [
    { label: 'Total Biographies', value: total, icon: FileText },
    { label: 'Drafts', value: drafts, icon: Clock },
    { label: 'Completed', value: completed, icon: BookOpen },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="rounded-xl border border-border bg-card p-5 space-y-2 transition-shadow hover:shadow-sm"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Icon className="h-4 w-4" />
              <span className="text-sm font-medium">{card.label}</span>
            </div>
            <p className="text-3xl font-semibold">{card.value}</p>
          </div>
        );
      })}
    </div>
  );
}
