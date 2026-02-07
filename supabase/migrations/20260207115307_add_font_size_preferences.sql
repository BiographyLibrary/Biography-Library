/*
  # Add Font Size Accessibility Preferences

  1. Changes to Existing Tables
    - `profiles`
      - Add `ui_font_size` (varchar) - Global UI font size preference (small, normal, large, extra-large)

    - `biographies`
      - Add `editor_font_size` (integer) - Per-biography editor font size in pixels (14-24)

  2. Notes
    - ui_font_size defaults to 'normal' for existing users
    - editor_font_size defaults to 16px for existing biographies
    - These preferences improve accessibility for users with vision difficulties
*/

-- Add UI font size preference to profiles
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'ui_font_size'
  ) THEN
    ALTER TABLE profiles ADD COLUMN ui_font_size VARCHAR(20) DEFAULT 'normal';
  END IF;
END $$;

-- Add editor font size preference to biographies
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'biographies' AND column_name = 'editor_font_size'
  ) THEN
    ALTER TABLE biographies ADD COLUMN editor_font_size INTEGER DEFAULT 16;
  END IF;
END $$;

-- Add check constraint to ensure editor font size is within reasonable range
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'biographies_editor_font_size_check'
  ) THEN
    ALTER TABLE biographies ADD CONSTRAINT biographies_editor_font_size_check
      CHECK (editor_font_size >= 14 AND editor_font_size <= 24);
  END IF;
END $$;

-- Add check constraint to ensure UI font size is valid
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'profiles_ui_font_size_check'
  ) THEN
    ALTER TABLE profiles ADD CONSTRAINT profiles_ui_font_size_check
      CHECK (ui_font_size IN ('small', 'normal', 'large', 'extra-large'));
  END IF;
END $$;
