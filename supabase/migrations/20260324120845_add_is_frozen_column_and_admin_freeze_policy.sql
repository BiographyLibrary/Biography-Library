/*
  # Add is_frozen column and admin freeze RLS policy

  ## Summary
  Adds the `is_frozen` boolean column to the biographies table and creates a
  dedicated RLS policy that allows admin and super_admin users to freeze any
  biography by setting is_frozen, frozen_at, and frozen_reason.

  ## Changes to biographies

  ### New Column
  - `is_frozen` (boolean, NOT NULL, default false) — when true the biography
    is fully read-only for the author regardless of other status flags

  ## Security
  - New UPDATE policy: only admin / super_admin can set is_frozen = true
    (checked via profiles.role)
  - Existing author UPDATE policy is unchanged; authors can only update their
    own rows (user_id = auth.uid()), but cannot set is_frozen / frozen_at /
    frozen_reason (those columns are outside the author's permitted set and are
    only touched by this admin policy)

  ## Notes
  - frozen_at and frozen_reason columns already exist from a prior migration
  - The is_frozen flag is the primary read-only gate in the frontend; the
    frontend checks this flag and renders a non-editable view + banner
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biographies' AND column_name = 'is_frozen'
  ) THEN
    ALTER TABLE biographies ADD COLUMN is_frozen boolean NOT NULL DEFAULT false;
  END IF;
END $$;

CREATE POLICY "Admins can freeze biographies"
  ON biographies FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'super_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role IN ('admin', 'super_admin')
    )
  );
