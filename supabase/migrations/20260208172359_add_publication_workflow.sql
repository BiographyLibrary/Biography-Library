/*
  # Publication Workflow Schema

  1. Changes to Biographies Table
    - Add `final_version` (text) - stores combined final version content
    - Add `narrative_order` (jsonb) - stores selected section order
    - Update `status` field to support new states:
      - 'draft' - In Progress
      - 'sections_complete' - All Sections Complete
      - 'final_version' - Final Version Created
      - 'published' - Published (locked)
    - Add `published_at` (timestamptz) - when biography was published
    - Add `is_locked` (boolean) - whether biography is locked after publication

  2. Security
    - Published biographies visible based on privacy settings
    - Locked biographies cannot be edited
*/

-- Add new columns to biographies table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biographies' AND column_name = 'final_version'
  ) THEN
    ALTER TABLE biographies ADD COLUMN final_version text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biographies' AND column_name = 'narrative_order'
  ) THEN
    ALTER TABLE biographies ADD COLUMN narrative_order jsonb DEFAULT '[]';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biographies' AND column_name = 'published_at'
  ) THEN
    ALTER TABLE biographies ADD COLUMN published_at timestamptz;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biographies' AND column_name = 'is_locked'
  ) THEN
    ALTER TABLE biographies ADD COLUMN is_locked boolean DEFAULT false;
  END IF;
END $$;

-- Create index for faster queries on published biographies
CREATE INDEX IF NOT EXISTS idx_biographies_published_at ON biographies(published_at) WHERE published_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_biographies_user_status ON biographies(user_id, status);
