/*
  # Add ai_screening_status to biographies

  ## Summary
  Adds a single column to the biographies table to track the outcome of
  automated AI content screening at submission time.

  ## New Column
  - `biographies.ai_screening_status` (text, default 'pending')
    Records which branch of the AI screening pipeline was taken:
    - 'pending'     — biography has not yet been screened (default for all existing rows)
    - 'passed'      — AI found no issues and the biography was auto-published
    - 'flagged'     — AI found flagged passages; biography was sent to manual review
    - 'parse_error' — AI response could not be parsed as JSON; biography was
                      auto-published as a safe fallback (may need manual review)

  ## Notes
  - Uses IF NOT EXISTS guard so the migration is idempotent.
  - A CHECK constraint enforces the four allowed values.
  - All existing rows receive the default value 'pending', which is correct
    since those biographies were submitted before this tracking existed.
  - No RLS changes needed — this column inherits the existing biographies policies.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biographies' AND column_name = 'ai_screening_status'
  ) THEN
    ALTER TABLE biographies
      ADD COLUMN ai_screening_status TEXT
      DEFAULT 'pending'
      CHECK (ai_screening_status IN ('pending', 'passed', 'flagged', 'parse_error'));
  END IF;
END $$;
