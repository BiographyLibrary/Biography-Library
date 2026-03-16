/*
  # Fix biography status CHECK constraint

  ## Problem
  The `biographies_status_check` constraint only allows 'draft' and 'completed',
  but the publication workflow (added in a later migration) requires additional
  statuses: 'sections_complete', 'final_version', and 'published'.

  Any attempt to save a biography with these statuses fails with a constraint
  violation, breaking the entire publication flow.

  ## Changes
  - Drop the old status CHECK constraint
  - Add a new constraint that allows all five valid status values:
    'draft', 'completed', 'sections_complete', 'final_version', 'published'
*/

ALTER TABLE biographies DROP CONSTRAINT IF EXISTS biographies_status_check;

ALTER TABLE biographies
  ADD CONSTRAINT biographies_status_check
  CHECK (status = ANY (ARRAY[
    'draft'::text,
    'completed'::text,
    'sections_complete'::text,
    'final_version'::text,
    'published'::text
  ]));
