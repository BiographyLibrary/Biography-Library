'use client';

import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Type } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { supabase } from '@/lib/supabase';

interface EditorFontSizeControlProps {
  biographyId: string;
  currentSize: number;
  onSizeChange: (size: number) => void;
}

const fontSizes = [14, 15, 16, 17, 18, 19, 20, 22, 24];

export function EditorFontSizeControl({
  biographyId,
  currentSize,
  onSizeChange,
}: EditorFontSizeControlProps) {
  const { t } = useTranslation();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSizeChange = async (sizeStr: string) => {
    const size = parseInt(sizeStr, 10);
    setIsUpdating(true);

    const { error } = await supabase
      .from('biographies')
      .update({ editor_font_size: size })
      .eq('id', biographyId);

    if (!error) {
      onSizeChange(size);
    }

    setIsUpdating(false);
  };

  return (
    <div className="flex items-center gap-1.5">
      <Type className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
      <Select
        value={currentSize.toString()}
        onValueChange={handleSizeChange}
        disabled={isUpdating}
      >
        <SelectTrigger className="w-[70px] h-8 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {fontSizes.map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size}px
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
