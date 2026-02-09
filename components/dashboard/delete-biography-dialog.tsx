'use client';

import { useState, useEffect } from 'react';
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
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { Loader2 } from 'lucide-react';
import type { Biography } from '@/lib/biographies';

interface DeleteBiographyDialogProps {
  biography: Biography | null;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteBiographyDialog({
  biography,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteBiographyDialogProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState<1 | 2>(1);
  const [isChecked, setIsChecked] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  useEffect(() => {
    if (!biography) {
      setStep(1);
      setIsChecked(false);
      setConfirmText('');
    }
  }, [biography]);

  const handleCancel = () => {
    setStep(1);
    setIsChecked(false);
    setConfirmText('');
    onCancel();
  };

  const handleContinue = () => {
    setStep(2);
  };

  const handleConfirm = () => {
    onConfirm();
  };

  const isConfirmValid = isChecked && confirmText.toUpperCase() === 'DELETE';

  return (
    <AlertDialog open={!!biography} onOpenChange={(open) => !open && handleCancel()}>
      <AlertDialogContent>
        {step === 1 ? (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>{t.deleteDialog.bioModal1Title}</AlertDialogTitle>
              <AlertDialogDescription className="space-y-2">
                <p>{t.deleteDialog.bioModal1Message}</p>
                {biography && (
                  <p className="font-medium text-foreground">
                    {biography.title || t.dashboard.untitledBiography}
                  </p>
                )}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>
                {t.deleteDialog.buttonCancel}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  handleContinue();
                }}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                {t.deleteDialog.buttonContinue}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>{t.deleteDialog.bioModal2Title}</AlertDialogTitle>
              <AlertDialogDescription className="space-y-4">
                <p>{t.deleteDialog.bioModal2Message}</p>

                <div className="flex items-start space-x-2 pt-2">
                  <Checkbox
                    id="confirm-irreversible"
                    checked={isChecked}
                    onCheckedChange={(checked) => setIsChecked(checked === true)}
                  />
                  <Label
                    htmlFor="confirm-irreversible"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {t.deleteDialog.checkboxIrreversible}
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-text" className="text-sm">
                    {t.deleteDialog.bioInputPlaceholder}
                  </Label>
                  <Input
                    id="confirm-text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    placeholder={t.deleteDialog.bioInputPlaceholder}
                    className="font-mono"
                  />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancel}>
                {t.deleteDialog.buttonCancel}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirm}
                disabled={!isConfirmValid || isDeleting}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.biography.deleting}
                  </>
                ) : (
                  t.deleteDialog.buttonDeleteBio
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
