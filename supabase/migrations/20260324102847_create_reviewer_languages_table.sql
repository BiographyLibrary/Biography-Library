/*
  # Create reviewer_languages table

  ## Summary
  Creates a table to track which languages each reviewer is assigned to moderate/review.

  ## New Tables
  - `reviewer_languages`
    - `id` (uuid, PK, auto-generated)
    - `user_id` (uuid, FK → profiles, cascade delete) — the reviewer
    - `language_code` (text, NOT NULL) — one of 'en', 'it', 'fr', 'de'
    - `assigned_by` (uuid, nullable, FK → profiles) — admin who made the assignment
    - `assigned_at` (timestamptz, default now())
    - UNIQUE constraint on (user_id, language_code)
    - CHECK constraint on language_code values

  ## Security
  - RLS enabled
  - SELECT: authenticated users can read their own rows; admin and super_admin can read all rows
  - INSERT: admin and super_admin only
  - DELETE: admin and super_admin only
  - No UPDATE policy (assignments are replaced via delete + insert)
*/

CREATE TABLE IF NOT EXISTS reviewer_languages (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  language_code text        NOT NULL CHECK (language_code IN ('en', 'it', 'fr', 'de')),
  assigned_by   uuid        REFERENCES profiles(id),
  assigned_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, language_code)
);

ALTER TABLE reviewer_languages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own language assignments"
  ON reviewer_languages FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can insert language assignments"
  ON reviewer_languages FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'super_admin')
    )
  );

CREATE POLICY "Admins can delete language assignments"
  ON reviewer_languages FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'super_admin')
    )
  );
