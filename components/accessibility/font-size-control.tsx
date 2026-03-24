'use client';

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

type FontSize = 'small' | 'normal' | 'large' | 'extra-large';

interface FontSizeControlProps {
  currentSize: FontSize;
  onSizeChange: (size: FontSize) => void;
  userId: string;
}

const fontSizeSteps: FontSize[] = ['small', 'normal', 'large', 'extra-large'];

const fontSizeMap: Record<FontSize, string> = {
  'small': '90%',
  'normal': '100%',
  'large': '115%',
  'extra-large': '130%',
};

export function FontSizeControl({ currentSize, onSizeChange, userId }: FontSizeControlProps) {
  const { t } = useTranslation();
  const [isUpdating, setIsUpdating] = useState(false);

  const currentIndex = fontSizeSteps.indexOf(currentSize);
  const canDecrease = currentIndex > 0;
  const canIncrease = currentIndex < fontSizeSteps.length - 1;

  const handleChange = async (newSize: FontSize) => {
    if (isUpdating) return;
    setIsUpdating(true);

    const { error } = await supabase
      .from('profiles')
      .update({ ui_font_size: newSize })
      .eq('id', userId);

    if (error) {
      toast.error(t.toast.error);
      console.error('Error updating font size:', error);
    } else {
      onSizeChange(newSize);
      document.documentElement.style.fontSize = fontSizeMap[newSize];
    }

    setIsUpdating(false);
  };

  return (
    <div className="flex items-center gap-0.5">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
        onClick={() => canDecrease && handleChange(fontSizeSteps[currentIndex - 1])}
        disabled={!canDecrease || isUpdating}
        title={t.nav.decreaseFontSize}
      >
        <Minus className="h-3.5 w-3.5" />
        <span className="sr-only">{t.nav.decreaseFontSize}</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
        onClick={() => canIncrease && handleChange(fontSizeSteps[currentIndex + 1])}
        disabled={!canIncrease || isUpdating}
        title={t.nav.increaseFontSize}
      >
        <Plus className="h-3.5 w-3.5" />
        <span className="sr-only">{t.nav.increaseFontSize}</span>
      </Button>
    </div>
  );
}

export { fontSizeMap };
export type { FontSize };
