/*
  # Add AI Features Preference to User Profiles

  1. Changes
    - Add `ai_features_enabled` column to `profiles` table
      - Type: boolean
      - Default: false (AI features are OFF by default on first visit)
      - Not nullable
    
  2. Purpose
    - Store user preference for AI features in the editor
    - Default to disabled, requiring manual activation
    - Persist preference across sessions

  3. Security
    - No RLS changes needed (inherits from profiles table)
*/

-- Add ai_features_enabled column to profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'ai_features_enabled'
  ) THEN
    ALTER TABLE profiles ADD COLUMN ai_features_enabled boolean NOT NULL DEFAULT false;
  END IF;
END $$;