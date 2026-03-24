'use client';

import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useTranslation } from '@/lib/i18n/i18n-context';

interface FreezeConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void>;
}

export function FreezeConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
}: FreezeConfirmationDialogProps) {
  const { t } = useTranslation();
  const [isFreezing, setIsFreezing] = useState(false);

  const handleConfirm = async () => {
    setIsFreezing(true);
    await onConfirm();
    setIsFreezing(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t.admin.freezeConfirmTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {t.admin.freezeConfirmMessage}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isFreezing}>
            {t.common.cancel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            disabled={isFreezing}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isFreezing ? t.admin.freezing : t.admin.freezeBiography}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
