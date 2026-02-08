'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RichTextEditor } from './rich-text-editor';
import { useTranslation } from '@/lib/i18n/i18n-context';
import { Sparkles, Lock, FileCheck } from 'lucide-react';

interface FinalVersionEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  biographyId: string;
  isLocked: boolean;
  onPublish: () => void;
  editorFontSize?: number;
}

export function FinalVersionEditor({
  content,
  onContentChange,
  biographyId,
  isLocked,
  onPublish,
  editorFontSize = 16,
}: FinalVersionEditorProps) {
  const { t, language } = useTranslation();

  const finalVersionTitle = {
    en: 'Final Complete Version',
    it: 'Versione Finale Completa',
    fr: 'Version Finale Complète',
    de: 'Endgültige Vollversion',
  }[language] || 'Final Complete Version';

  const publishButtonText = {
    en: 'Publish Definitively',
    it: 'Pubblica Definitivamente',
    fr: 'Publier Définitivement',
    de: 'Endgültig Veröffentlichen',
  }[language] || 'Publish Definitively';

  const lockedMessage = {
    en: 'This biography has been published and is now locked. No further edits are allowed.',
    it: 'Questa biografia è stata pubblicata ed è ora bloccata. Non sono consentite ulteriori modifiche.',
    fr: 'Cette biographie a été publiée et est maintenant verrouillée. Aucune autre modification n\'est autorisée.',
    de: 'Diese Biografie wurde veröffentlicht und ist jetzt gesperrt. Weitere Bearbeitungen sind nicht erlaubt.',
  }[language] || 'This biography has been published and is now locked.';

  const editInstructionsText = {
    en: 'This is your final combined biography. You can continue editing and refining this version with AI assistance until you\'re completely satisfied. Once published, no further changes will be possible.',
    it: 'Questa è la tua biografia finale combinata. Puoi continuare a modificare e perfezionare questa versione con l\'assistenza dell\'IA fino a quando non sei completamente soddisfatto. Una volta pubblicata, non saranno possibili ulteriori modifiche.',
    fr: 'Ceci est votre biographie finale combinée. Vous pouvez continuer à modifier et affiner cette version avec l\'assistance de l\'IA jusqu\'à ce que vous soyez complètement satisfait. Une fois publiée, aucune autre modification ne sera possible.',
    de: 'Dies ist Ihre endgültige kombinierte Biografie. Sie können diese Version weiterhin mit KI-Unterstützung bearbeiten und verfeinern, bis Sie vollständig zufrieden sind. Nach der Veröffentlichung sind keine weiteren Änderungen möglich.',
  }[language] || 'This is your final combined biography.';

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="border-b border-border/50 px-6 py-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              {isLocked && <Lock className="h-5 w-5 text-primary" />}
              {finalVersionTitle}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isLocked ? lockedMessage : editInstructionsText}
            </p>
          </div>
          {!isLocked && (
            <Button
              onClick={onPublish}
              size="lg"
              className="gap-2"
              disabled={!content || content.trim().length < 100}
            >
              <FileCheck className="h-5 w-5" />
              {publishButtonText}
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-6">
        <Card className="max-w-4xl mx-auto p-6">
          {isLocked ? (
            <div
              className="prose prose-sm dark:prose-invert max-w-none"
              style={{ fontSize: `${editorFontSize}px` }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <RichTextEditor
              content={content}
              onChange={onContentChange}
              placeholder={
                language === 'it' ? 'La tua versione finale apparirà qui...' :
                language === 'fr' ? 'Votre version finale apparaîtra ici...' :
                language === 'de' ? 'Ihre endgültige Version erscheint hier...' :
                'Your final version will appear here...'
              }
              editorFontSize={editorFontSize}
            />
          )}
        </Card>
      </div>
    </div>
  );
}
