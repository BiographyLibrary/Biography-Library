/*
  # Add biography_mode and content_freeflow to biographies

  ## Changes
  - `biographies` table: new column `biography_mode text NOT NULL DEFAULT 'sections'`
    - Allowed values: 'sections' | 'freeflow'
    - Enforced via CHECK constraint
  - `biographies` table: new column `content_freeflow text`
    - Nullable; stores free-form biography text when mode is 'freeflow'
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biographies' AND column_name = 'biography_mode'
  ) THEN
    ALTER TABLE biographies
      ADD COLUMN biography_mode text NOT NULL DEFAULT 'sections'
        CONSTRAINT biographies_biography_mode_check CHECK (biography_mode IN ('sections', 'freeflow'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biographies' AND column_name = 'content_freeflow'
  ) THEN
    ALTER TABLE biographies
      ADD COLUMN content_freeflow text;
  END IF;
END $$;
