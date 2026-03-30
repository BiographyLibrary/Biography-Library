export const HELP_TOPICS = [
  {
    topic: "Starting a biography",
    content: `
When you create a new biography you choose between two modes:

1. Sections mode — the biography is divided into structured chapters (Childhood, Family, Education, Career, Life Events, Relationships, Challenges, Passions, Legacy). Each section has its own editor, AI writing prompts, voice recording, grammar check, and AI suggestions. This is the recommended mode for most users.

2. Freeflow mode — you import an existing document (DOCX, TXT, RTF) or paste raw text that is then assigned to sections automatically. Freeflow mode has NO AI writing assistance by design; it is intended for users who already have a written biography they want to structure and publish.

You cannot switch between modes after the biography has been created. Choose sections mode if you want to write from scratch with AI guidance.
`,
  },
  {
    topic: "Sections mode vs Freeflow mode",
    content: `
Sections mode:
- Write each chapter one at a time in a guided editor.
- AI prompts help you remember stories and fill in each section.
- Grammar check, AI suggestions, voice recording, and conversation mode are all available.
- Sections can be marked as In Progress, Ready for Review, or Complete.
- The AI helps you with every step of writing.

Freeflow mode:
- Import a ready-made document (DOCX, TXT, RTF).
- The platform reads the document and automatically assigns paragraphs to the matching biography sections.
- There is NO AI writing assistance in freeflow mode — no prompts, no grammar check, no suggestions.
- Freeflow is ideal if you already have a written biography and just want to publish it.
- After import you can still edit the text manually in each section.
`,
  },
  {
    topic: "How to publish / submit for review",
    content: `
Publishing follows a review workflow:

1. Write and complete your biography sections in the workspace editor.
2. When ready, click "Submit for Review". The biography text goes through an automatic AI content screening first.
3. If the screening passes, the biography enters the "Under Review" queue for a human reviewer.
4. The reviewer approves or requests edits. You receive a notification either way.
5. If approved, the biography is published and becomes visible in the Biography Library according to its visibility setting (public, unlisted, or private).
6. If the reviewer requests edits, you receive feedback and can revise the biography before resubmitting.

Before submitting you can run the AI content pre-check yourself from the editor to catch potential issues early.
`,
  },
  {
    topic: "How to import text — DOCX, TXT, voice",
    content: `
There are three ways to import content into your biography:

Text file import (DOCX, TXT, RTF):
- Open the biography workspace.
- Click the Import button in the toolbar or the section editor.
- Upload a DOCX, TXT, or RTF file.
- The platform parses the document, splits it into chunks, and assigns each chunk to the most relevant biography section using AI.
- You review the assignments in the Section Assignment Wizard and can move chunks between sections before confirming.

Voice recording:
- In any section editor, click the microphone icon.
- Record your voice. The audio is sent to a transcription service and the text is inserted into the section.
- Review and edit the transcribed text after it is inserted.

Freeflow import:
- Only available when the biography is in Freeflow mode.
- Import a document from the Freeflow editor; the full document is processed and distributed across sections.
`,
  },
  {
    topic: "How to export — PDF, DOCX, TXT",
    content: `
You can export your biography in multiple formats from the workspace:

- Click the Export button in the editor top bar.
- Choose the format: PDF, DOCX, or TXT.

PDF export:
- Generates a formatted PDF using the Noto Serif font for readability.
- Includes section titles and all written content.
- Suitable for printing or sharing as a polished document.

DOCX export:
- Generates a Microsoft Word document.
- Preserves section titles and body text.
- Suitable for further editing in Word or Google Docs.

TXT export:
- Plain text with no formatting.
- All sections concatenated with titles as separators.

The Advanced Export dialog allows additional options such as choosing which sections to include.
`,
  },
  {
    topic: "How to manage photos",
    content: `
Each biography has a Photo Gallery where you can upload and manage images:

- Open the biography workspace.
- Click the Photo Gallery panel (camera icon in the sidebar or top bar).
- Upload photos from your device. Supported formats are common image types (JPEG, PNG, etc.).
- Photos are stored securely in Supabase Storage linked to your biography.
- You can view, reorder, and delete photos from the gallery panel.
- Photos appear in the biography when published (depending on the viewer's layout).

Note: Only the biography owner can add or remove photos. Reviewers and admin can view them during the review process.
`,
  },
  {
    topic: "What happens during AI review (AI screening)",
    content: `
When you submit a biography for review, it goes through two stages:

Stage 1 — Automatic AI content screening:
- The full biography text is analysed by AI for content policy violations.
- Violations are classified into three levels:
  Level 1 (automatic block): hate speech incitement, terrorism, CSAM, violence promotion, WMD content.
  Level 2 (requires human review): targeted harassment, graphic violence without narrative context, copyright concerns.
  Level 3 (publish with a note): controversial opinions, contested historical narratives.
- If the screening detects a Level 1 violation, the biography is automatically blocked and you are notified.
- If a Level 2 issue is found, it goes to a human moderator.
- If it passes (Level 3 or clean), it moves to Stage 2.

Stage 2 — Human review:
- A reviewer reads the biography and either approves it or requests edits.
- The AI screening result and any flagged passages are shown to the reviewer.
- You receive a notification with the outcome.

You can run the AI pre-publication check yourself from the editor before submitting, to see potential issues in advance.
`,
  },
  {
    topic: "How to handle a request edit rejection",
    content: `
If a reviewer requests edits:

1. You receive a notification in the Notifications page explaining what needs to be changed.
2. The biography status is set back to "Draft" or "Edit Requested".
3. Open the biography in the workspace editor and make the requested changes.
4. Once you are satisfied with the revisions, click "Submit for Review" again.
5. The revised biography goes through the AI screening and human review process again.

Tips:
- Read the reviewer's feedback carefully before making changes.
- If the feedback is unclear, check the flagged passages highlighted in the review notification.
- You can run the AI pre-publication check yourself after editing to verify the content passes screening before resubmitting.
`,
  },
];

export const HELP_KB_TEXT = HELP_TOPICS.map(
  (t) => `## ${t.topic}\n${t.content.trim()}`
).join("\n\n---\n\n");
