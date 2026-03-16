/*
  # Add author_name to biographies table

  ## Problem
  The application uses `author_name` on biography records for exports (PDF, Word, RTF)
  and display, but this column does not exist in the database.

  ## Changes
  - Add `author_name` (text) column to `biographies` with default empty string
  - Backfill existing rows from the related profiles table
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biographies' AND column_name = 'author_name'
  ) THEN
    ALTER TABLE biographies ADD COLUMN author_name text NOT NULL DEFAULT '';
  END IF;
END $$;

UPDATE biographies b
SET author_name = COALESCE(p.name, '')
FROM profiles p
WHERE b.user_id = p.id
  AND b.author_name = '';
