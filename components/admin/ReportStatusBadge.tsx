'use client';

import { ReportStatus } from '@/lib/moderation/types';
import { useTranslation } from '@/lib/i18n/i18n-context';

interface ReportStatusBadgeProps {
  status: ReportStatus;
}

const STATUS_STYLES: Record<ReportStatus, string> = {
  unassigned: 'bg-[#ECE9E4] text-[#121212] dark:bg-[#2A2825] dark:text-[#FDFBF7]',
  assigned: 'bg-[#C4DAEB] text-[#121212] dark:bg-[#C4DAEB] dark:text-[#121212]',
  in_review: 'bg-[#C4DAEB] text-[#121212] dark:bg-[#C4DAEB] dark:text-[#121212]',
  decided: 'bg-[#C8DFBE] text-[#121212] dark:bg-[#C8DFBE] dark:text-[#121212]',
};

function getStatusLabel(status: ReportStatus, t: ReturnType<typeof useTranslation>['t']): string {
  switch (status) {
    case 'unassigned': return t.admin.statusUnassigned;
    case 'assigned': return t.admin.statusUnassigned;
    case 'in_review': return t.admin.statusInReview;
    case 'decided': return t.admin.statusDecided;
  }
}

export function ReportStatusBadge({ status }: ReportStatusBadgeProps) {
  const { t } = useTranslation();
  const style = STATUS_STYLES[status];
  const label = getStatusLabel(status, t);

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${style}`}>
      {label}
    </span>
  );
}
