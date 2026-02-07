/*
  # Add Section Status Tracking

  1. Changes to biography_sections table
    - Add `status` column (VARCHAR(30)) - tracks current status of the section
    - Add `draft_version` column (INTEGER) - tracks revision number
    - Add `approved_at` column (TIMESTAMPTZ) - timestamp when section was approved
    - Add `revision_history` column (JSONB) - stores history of revisions and AI feedback

  2. Status Values
    - 'in_progress': Initial writing phase
    - 'draft_1': Ready for first AI review
    - 'draft_2': After first revision
    - 'draft_3': After second revision
    - 'approved': User approved the content
    - 'locked': Published and locked for editing

  3. Revision History Format
    - Array of objects: [{version: 1, timestamp: '...', ai_suggestions: [...], user_action: 'approved'}]
*/

DO $$
BEGIN
  -- Add status column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biography_sections' AND column_name = 'status'
  ) THEN
    ALTER TABLE biography_sections
    ADD COLUMN status VARCHAR(30) DEFAULT 'in_progress';
  END IF;

  -- Add draft_version column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biography_sections' AND column_name = 'draft_version'
  ) THEN
    ALTER TABLE biography_sections
    ADD COLUMN draft_version INTEGER DEFAULT 1;
  END IF;

  -- Add approved_at column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biography_sections' AND column_name = 'approved_at'
  ) THEN
    ALTER TABLE biography_sections
    ADD COLUMN approved_at TIMESTAMPTZ;
  END IF;

  -- Add revision_history column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biography_sections' AND column_name = 'revision_history'
  ) THEN
    ALTER TABLE biography_sections
    ADD COLUMN revision_history JSONB DEFAULT '[]'::jsonb;
  END IF;
END $$;

-- Create index on status for faster queries
CREATE INDEX IF NOT EXISTS idx_biography_sections_status
ON biography_sections(status);

-- Create index on approved_at for sorting
CREATE INDEX IF NOT EXISTS idx_biography_sections_approved_at
ON biography_sections(approved_at);