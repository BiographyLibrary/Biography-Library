'use client';

import { Lock, Users, Globe, Clock, CheckCircle, Pen, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import type { Biography } from '@/lib/biographies';

interface BiographyCardProps {
  biography: Biography;
  onEdit: (id: string) => void;
  onDelete: (biography: Biography) => void;
}

const privacyConfig = {
  private: {
    icon: Lock,
    label: 'Private',
    className: 'bg-muted text-muted-foreground',
  },
  family: {
    icon: Users,
    label: 'Family',
    className: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  },
  public: {
    icon: Globe,
    label: 'Public',
    className: 'bg-primary/10 text-primary',
  },
};

const statusConfig = {
  draft: {
    icon: Clock,
    label: 'Draft',
    className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  completed: {
    icon: CheckCircle,
    label: 'Completed',
    className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
};

export function BiographyCard({ biography, onEdit, onDelete }: BiographyCardProps) {
  const privacy = privacyConfig[biography.privacy];
  const status = statusConfig[biography.status];
  const PrivacyIcon = privacy.icon;
  const StatusIcon = status.icon;

  return (
    <div className="group rounded-xl border border-border bg-card p-5 flex flex-col gap-3 transition-all hover:shadow-md hover:border-primary/20">
      <div>
        <h3 className="font-semibold text-base truncate">
          {biography.title || 'Untitled'}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Updated{' '}
          {formatDistanceToNow(new Date(biography.updated_at), {
            addSuffix: true,
          })}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${status.className}`}
        >
          <StatusIcon className="h-3 w-3" />
          {status.label}
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${privacy.className}`}
        >
          <PrivacyIcon className="h-3 w-3" />
          {privacy.label}
        </span>
      </div>

      <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border/50">
        <Button
          size="sm"
          className="flex-1 gap-1.5"
          onClick={() => onEdit(biography.id)}
        >
          <Pen className="h-3.5 w-3.5" />
          Continue Writing
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
          onClick={() => onDelete(biography)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
