'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  ArrowLeft,
  Check,
  CloudOff,
  Loader2,
  Lock,
  Users,
  Globe,
  FileDown,
  BookOpen,
} from 'lucide-react';

type SaveStatus = 'saved' | 'saving' | 'unsaved' | 'error';
type Privacy = 'private' | 'family' | 'public';

interface EditorTopBarProps {
  title: string;
  privacy: Privacy;
  saveStatus: SaveStatus;
  onTitleChange: (title: string) => void;
  onPrivacyChange: (privacy: Privacy) => void;
  onExportPDF: () => void;
}

const privacyOptions: { value: Privacy; icon: typeof Lock; label: string }[] = [
  { value: 'private', icon: Lock, label: 'Private' },
  { value: 'family', icon: Users, label: 'Family' },
  { value: 'public', icon: Globe, label: 'Public' },
];

const saveStatusConfig: Record<
  SaveStatus,
  { icon: typeof Check; text: string; className: string }
> = {
  saved: {
    icon: Check,
    text: 'Saved',
    className: 'text-emerald-600 dark:text-emerald-400',
  },
  saving: {
    icon: Loader2,
    text: 'Saving...',
    className: 'text-muted-foreground',
  },
  unsaved: {
    icon: CloudOff,
    text: 'Unsaved',
    className: 'text-amber-600 dark:text-amber-400',
  },
  error: {
    icon: CloudOff,
    text: 'Save failed',
    className: 'text-destructive',
  },
};

export function EditorTopBar({
  title,
  privacy,
  saveStatus,
  onTitleChange,
  onPrivacyChange,
  onExportPDF,
}: EditorTopBarProps) {
  const router = useRouter();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditingTitle]);

  const handleTitleSubmit = () => {
    const trimmed = editTitle.trim();
    if (trimmed && trimmed !== title) {
      onTitleChange(trimmed);
    } else {
      setEditTitle(title);
    }
    setIsEditingTitle(false);
  };

  const status = saveStatusConfig[saveStatus];
  const StatusIcon = status.icon;
  const currentPrivacy =
    privacyOptions.find((p) => p.value === privacy) || privacyOptions[0];
  const CurrentPrivacyIcon = currentPrivacy.icon;
  const nextPrivacyIndex =
    (privacyOptions.indexOf(currentPrivacy) + 1) % privacyOptions.length;

  return (
    <div className="border-b border-border/50 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="px-3 sm:px-4 h-14 flex items-center gap-2 sm:gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground hover:text-foreground shrink-0"
          onClick={() => router.push('/dashboard')}
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Dashboard</span>
        </Button>

        <div className="h-5 w-px bg-border shrink-0 hidden sm:block" />

        <BookOpen className="h-4 w-4 text-primary shrink-0 hidden sm:block" />

        {isEditingTitle ? (
          <Input
            ref={inputRef}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTitleSubmit();
              if (e.key === 'Escape') {
                setEditTitle(title);
                setIsEditingTitle(false);
              }
            }}
            className="h-8 text-sm font-medium max-w-[180px] sm:max-w-xs"
          />
        ) : (
          <button
            onClick={() => {
              setEditTitle(title);
              setIsEditingTitle(true);
            }}
            className="text-sm font-medium truncate max-w-[180px] sm:max-w-xs hover:text-primary transition-colors text-left"
          >
            {title || 'Untitled'}
          </button>
        )}

        <div className="ml-auto flex items-center gap-1">
          <div
            className={`hidden sm:flex items-center gap-1 text-xs mr-1 ${status.className}`}
          >
            <StatusIcon
              className={`h-3 w-3 ${saveStatus === 'saving' ? 'animate-spin' : ''}`}
            />
            <span>{status.text}</span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs h-8"
            onClick={() =>
              onPrivacyChange(privacyOptions[nextPrivacyIndex].value)
            }
          >
            <CurrentPrivacyIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{currentPrivacy.label}</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-xs h-8"
            onClick={onExportPDF}
          >
            <FileDown className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export PDF</span>
          </Button>

          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
