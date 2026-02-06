/*
  # Add Privacy and Status Fields to Biographies

  1. Changes
    - Add `privacy_level` column to biographies table
      - Values: 'private', 'family', 'public'
      - Default: 'private'
    - Add `share_token` column for generating shareable links
      - Unique random token for public/family sharing
      - Nullable (only populated when sharing is enabled)
    - Add `status` column for biography completion tracking
      - Values: 'draft', 'completed'
      - Default: 'draft'
    - Add `completed_at` timestamp for tracking completion date

  2. Security
    - Update RLS policies to handle privacy levels
    - Public biographies accessible via share token
*/

-- Add new columns to biographies table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biographies' AND column_name = 'privacy_level'
  ) THEN
    ALTER TABLE biographies ADD COLUMN privacy_level text DEFAULT 'private' CHECK (privacy_level IN ('private', 'family', 'public'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biographies' AND column_name = 'share_token'
  ) THEN
    ALTER TABLE biographies ADD COLUMN share_token text UNIQUE;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biographies' AND column_name = 'status'
  ) THEN
    ALTER TABLE biographies ADD COLUMN status text DEFAULT 'draft' CHECK (status IN ('draft', 'completed'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biographies' AND column_name = 'completed_at'
  ) THEN
    ALTER TABLE biographies ADD COLUMN completed_at timestamptz;
  END IF;
END $$;

-- Create index on share_token for faster lookups
CREATE INDEX IF NOT EXISTS biographies_share_token_idx ON biographies(share_token);

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "Public biographies accessible via share token" ON biographies;
DROP POLICY IF EXISTS "Authenticated users can view public biographies" ON biographies;
DROP POLICY IF EXISTS "Users can view own biographies" ON biographies;

-- Policy for public access via share token (anonymous users)
CREATE POLICY "Public biographies accessible via share token"
  ON biographies
  FOR SELECT
  TO anon
  USING (
    privacy_level = 'public' AND share_token IS NOT NULL
  );

-- Policy for authenticated users to view public biographies and their own
CREATE POLICY "Authenticated users can view public biographies"
  ON biographies
  FOR SELECT
  TO authenticated
  USING (
    privacy_level = 'public' 
    OR user_id = auth.uid()
  );