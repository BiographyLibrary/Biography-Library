/*
  # Create AI rate limits table

  1. New Tables
    - `ai_rate_limits`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `action` (text) - the AI action performed
      - `created_at` (timestamptz) - when the request was made

  2. Security
    - Enable RLS on `ai_rate_limits` table
    - Policy: authenticated users can insert their own rate limit records
    - Policy: authenticated users can read their own rate limit records

  3. Indexes
    - Composite index on (user_id, created_at) for efficient rate limit queries

  4. Notes
    - Used by the ai-assistant edge function to enforce 5 requests per minute per user
    - Old records can be periodically cleaned up
*/

CREATE TABLE IF NOT EXISTS ai_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_rate_limits_user_created
  ON ai_rate_limits (user_id, created_at DESC);

ALTER TABLE ai_rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert own rate limit records"
  ON ai_rate_limits
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own rate limit records"
  ON ai_rate_limits
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);
