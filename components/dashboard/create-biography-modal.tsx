'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Users, Globe, Loader2, AlertCircle } from 'lucide-react';

interface CreateBiographyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (
    title: string,
    privacy: 'private' | 'family' | 'public'
  ) => Promise<void>;
}

const privacyOptions = [
  {
    value: 'private' as const,
    label: 'Private',
    description: 'Only you can access',
    icon: Lock,
  },
  {
    value: 'family' as const,
    label: 'Family',
    description: 'Share with verified family members',
    icon: Users,
  },
  {
    value: 'public' as const,
    label: 'Public',
    description: 'Anyone with link can view',
    icon: Globe,
  },
];

export function CreateBiographyModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateBiographyModalProps) {
  const [title, setTitle] = useState('');
  const [privacy, setPrivacy] = useState<'private' | 'family' | 'public'>(
    'private'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }
    setError('');
    setIsLoading(true);
    try {
      await onSubmit(title.trim(), privacy);
      setTitle('');
      setPrivacy('private');
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to create biography';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (value: boolean) => {
    if (!isLoading) {
      onOpenChange(value);
      if (!value) {
        setTitle('');
        setPrivacy('private');
        setError('');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Biography</DialogTitle>
          <DialogDescription>
            Start a new biography to capture and preserve a life story.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="bio-title">Title</Label>
            <Input
              id="bio-title"
              placeholder="My Life Story"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label>Privacy</Label>
            <div className="grid gap-2">
              {privacyOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = privacy === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPrivacy(option.value)}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                        : 'border-border hover:border-primary/30 hover:bg-muted/50'
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center h-9 w-9 rounded-lg shrink-0 ${
                        isSelected
                          ? 'bg-primary/10 text-primary'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{option.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                    <div
                      className={`ml-auto h-4 w-4 rounded-full border-2 shrink-0 transition-colors ${
                        isSelected
                          ? 'border-primary bg-primary'
                          : 'border-muted-foreground/30'
                      }`}
                    >
                      {isSelected && (
                        <div className="h-full w-full flex items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Start Writing'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
