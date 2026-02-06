/*
  # Biography Library - Initial Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, not null)
      - `name` (text, defaults to empty string)
      - `created_at` (timestamptz, defaults to now)
    - `biographies`
      - `id` (uuid, primary key, auto-generated)
      - `user_id` (uuid, references profiles, not null)
      - `title` (text, not null, defaults to empty string)
      - `content` (jsonb, defaults to empty object)
      - `privacy` (text, constrained to private/family/public, defaults to private)
      - `status` (text, constrained to draft/completed, defaults to draft)
      - `created_at` (timestamptz, defaults to now)
      - `updated_at` (timestamptz, defaults to now)
    - `biography_sections`
      - `id` (uuid, primary key, auto-generated)
      - `biography_id` (uuid, references biographies, not null)
      - `section_name` (text, not null, defaults to empty string)
      - `content` (text, defaults to empty string)
      - `audio_transcript` (text, defaults to empty string)
      - `created_at` (timestamptz, defaults to now)

  2. Security
    - Enable RLS on all tables
    - Profiles: Users can read, insert, and update their own profile
    - Biographies: Users can read, insert, update, and delete their own biographies
    - Biography sections: Users can read, insert, update, and delete sections of their own biographies

  3. Triggers
    - Auto-create profile when new user signs up via auth
    - Auto-update updated_at timestamp on biography modifications

  4. Indexes
    - biographies(user_id) for efficient user biography lookups
    - biography_sections(biography_id) for efficient section lookups
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION handle_new_user();
  END IF;
END $$;

-- Biographies table
CREATE TABLE IF NOT EXISTS biographies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT '',
  content jsonb DEFAULT '{}',
  privacy text NOT NULL DEFAULT 'private' CHECK (privacy IN ('private', 'family', 'public')),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'completed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE biographies ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_biographies_user_id ON biographies(user_id);

CREATE POLICY "Users can read own biographies"
  ON biographies FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own biographies"
  ON biographies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own biographies"
  ON biographies FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own biographies"
  ON biographies FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'biographies_updated_at'
  ) THEN
    CREATE TRIGGER biographies_updated_at
      BEFORE UPDATE ON biographies
      FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  END IF;
END $$;

-- Biography sections table
CREATE TABLE IF NOT EXISTS biography_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  biography_id uuid NOT NULL REFERENCES biographies(id) ON DELETE CASCADE,
  section_name text NOT NULL DEFAULT '',
  content text DEFAULT '',
  audio_transcript text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE biography_sections ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_biography_sections_biography_id ON biography_sections(biography_id);

CREATE POLICY "Users can read own biography sections"
  ON biography_sections FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM biographies
      WHERE biographies.id = biography_sections.biography_id
      AND biographies.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own biography sections"
  ON biography_sections FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM biographies
      WHERE biographies.id = biography_sections.biography_id
      AND biographies.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update own biography sections"
  ON biography_sections FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM biographies
      WHERE biographies.id = biography_sections.biography_id
      AND biographies.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM biographies
      WHERE biographies.id = biography_sections.biography_id
      AND biographies.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own biography sections"
  ON biography_sections FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM biographies
      WHERE biographies.id = biography_sections.biography_id
      AND biographies.user_id = auth.uid()
    )
  );