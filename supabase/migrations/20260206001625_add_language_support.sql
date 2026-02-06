/*
  # Add Multi-Language Support

  1. Changes to `profiles` table
    - Add `language` column to store user's UI language preference
    - Supported languages: en (English), it (Italiano), fr (Français), de (Deutsch)
    - Default value: 'en'
    - Includes constraint to ensure only valid language codes
  
  2. Changes to `biographies` table
    - Add `content_language` column to store the language the biography is written in
    - Allows each biography to have its own language independent of UI language
    - Default value: 'en'
    - Includes constraint to ensure only valid language codes
  
  3. Notes
    - User can write biography in one language while UI is in another
    - Language preference persists across sessions
    - Existing records will default to 'en'
*/

-- Add language column to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'language'
  ) THEN
    ALTER TABLE profiles ADD COLUMN language text DEFAULT 'en' NOT NULL;
    ALTER TABLE profiles ADD CONSTRAINT profiles_language_check 
      CHECK (language IN ('en', 'it', 'fr', 'de'));
  END IF;
END $$;

-- Add content_language column to biographies table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biographies' AND column_name = 'content_language'
  ) THEN
    ALTER TABLE biographies ADD COLUMN content_language text DEFAULT 'en' NOT NULL;
    ALTER TABLE biographies ADD CONSTRAINT biographies_content_language_check 
      CHECK (content_language IN ('en', 'it', 'fr', 'de'));
  END IF;
END $$;

-- Create index for better query performance on language columns
CREATE INDEX IF NOT EXISTS idx_profiles_language ON profiles(language);
CREATE INDEX IF NOT EXISTS idx_biographies_content_language ON biographies(content_language);