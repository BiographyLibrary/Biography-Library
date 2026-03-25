/*
  # Staff read policy for ai_rate_limits + 30-day cleanup function

  ## Summary
  1. Adds a SELECT policy so staff (reviewer, admin, super_admin) can read all
     ai_rate_limits rows — needed to power the AI stats admin page.
  2. Creates a cleanup function `cleanup_ai_rate_limits_30d()` that deletes
     records older than 30 days, replacing any prior 24-hour cleanup logic.
     Call this via pg_cron or a scheduled edge function to keep the table tidy.

  ## Changes
  - New RLS policy on ai_rate_limits: staff can read all rows
  - New SQL function: cleanup_ai_rate_limits_30d()

  ## Notes
  - The existing per-user insert/select policies are untouched
  - 30-day retention gives meaningful stats history
*/

CREATE POLICY "Staff can read all ai_rate_limits"
  ON ai_rate_limits FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role IN ('reviewer', 'admin', 'super_admin')
    )
  );

CREATE OR REPLACE FUNCTION cleanup_ai_rate_limits_30d()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM ai_rate_limits WHERE created_at < now() - interval '30 days';
$$;
