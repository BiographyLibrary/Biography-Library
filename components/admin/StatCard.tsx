'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | null;
  secondary?: string;
  accent?: 'sky' | 'emerald' | 'amber' | 'red' | 'neutral';
}

const accentMap = {
  sky: 'bg-[#C4DAEB] text-[#121212] dark:bg-[#C4DAEB]/20 dark:text-[#C4DAEB]',
  emerald: 'bg-[#C8DFBE] text-[#121212] dark:bg-[#C8DFBE]/20 dark:text-[#C8DFBE]',
  amber: 'bg-[#944454]/15 text-[#944454] dark:bg-[#944454]/20 dark:text-[#944454]',
  red: 'bg-[#6D323E]/15 text-[#6D323E] dark:bg-[#6D323E]/20 dark:text-[#FDFBF7]',
  neutral: 'bg-[#ECE9E4] text-[#121212] dark:bg-[#2A2825] dark:text-[#FDFBF7]',
};

export function StatCard({ icon, label, value, secondary, accent = 'sky' }: StatCardProps) {
  return (
    <Card className="border-border/60 shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className={cn('p-2.5 rounded-xl shrink-0', accentMap[accent])}>
            {icon}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-3xl font-bold text-foreground tabular-nums tracking-tight">
            {value === null ? '—' : value.toLocaleString()}
          </p>
          <p className="text-sm font-medium text-foreground mt-1">{label}</p>
          {secondary && (
            <p className="text-xs text-muted-foreground mt-1">{secondary}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
