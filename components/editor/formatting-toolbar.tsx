'use client';

import { Bold, Italic, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditorFontSizeControl } from './editor-font-size-control';

interface FormattingToolbarProps {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  onTextChange: (text: string) => void;
  biographyId?: string;
  editorFontSize?: number;
  onEditorFontSizeChange?: (size: number) => void;
}

function wrapSelection(
  textarea: HTMLTextAreaElement,
  before: string,
  after: string,
  onTextChange: (text: string) => void
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  const selected = text.substring(start, end);
  const newText =
    text.substring(0, start) + before + selected + after + text.substring(end);
  onTextChange(newText);

  requestAnimationFrame(() => {
    textarea.focus();
    textarea.setSelectionRange(start + before.length, end + before.length);
  });
}

function toggleListLines(
  textarea: HTMLTextAreaElement,
  onTextChange: (text: string) => void
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  const lineStart = text.lastIndexOf('\n', start - 1) + 1;
  const lineEnd = text.indexOf('\n', end);
  const actualEnd = lineEnd === -1 ? text.length : lineEnd;
  const selectedLines = text.substring(lineStart, actualEnd);
  const lines = selectedLines.split('\n');
  const allHaveBullets = lines.every((l) => l.trimStart().startsWith('- '));
  const newLines = lines
    .map((line) => {
      if (allHaveBullets) {
        return line.replace(/^(\s*)- /, '$1');
      }
      return `- ${line}`;
    })
    .join('\n');
  const newText =
    text.substring(0, lineStart) + newLines + text.substring(actualEnd);
  onTextChange(newText);

  requestAnimationFrame(() => {
    textarea.focus();
  });
}

export function FormattingToolbar({
  textareaRef,
  onTextChange,
  biographyId,
  editorFontSize = 16,
  onEditorFontSizeChange,
}: FormattingToolbarProps) {
  return (
    <div className="flex items-center gap-0.5">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => {
          if (textareaRef.current) {
            wrapSelection(textareaRef.current, '**', '**', onTextChange);
          }
        }}
      >
        <Bold className="h-4 w-4" />
        <span className="sr-only">Bold</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => {
          if (textareaRef.current) {
            wrapSelection(textareaRef.current, '*', '*', onTextChange);
          }
        }}
      >
        <Italic className="h-4 w-4" />
        <span className="sr-only">Italic</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-8 w-8 p-0"
        onClick={() => {
          if (textareaRef.current) {
            toggleListLines(textareaRef.current, onTextChange);
          }
        }}
      >
        <List className="h-4 w-4" />
        <span className="sr-only">Bullet list</span>
      </Button>
      {biographyId && onEditorFontSizeChange && (
        <>
          <div className="h-5 w-px bg-border mx-1" />
          <EditorFontSizeControl
            biographyId={biographyId}
            currentSize={editorFontSize}
            onSizeChange={onEditorFontSizeChange}
          />
        </>
      )}
    </div>
  );
}
