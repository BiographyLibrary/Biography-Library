/*
  # Create moderation_reports and moderation_messages tables

  ## Summary
  Creates two tables to support a full content moderation workflow for biographies.

  ## New Tables

  ### 1. moderation_reports
  Stores reports filed against biographies, tracking the full lifecycle from submission
  through assignment, review, and final decision.
    - `id` (uuid, PK)
    - `biography_id` (uuid, FK → biographies, cascade delete)
    - `reporter_id` (uuid, nullable FK → profiles, set null on delete)
    - `report_type` (text, NOT NULL) — one of 7 enumerated categories
    - `description` (text, nullable) — optional free-text details
    - `status` (text, NOT NULL, default 'unassigned') — workflow stage
    - `assigned_to` (uuid, nullable FK → profiles, set null on delete)
    - `ai_analysis` (jsonb, default '{}') — AI pre-screening results
    - `ai_violation_level` (integer, nullable) — AI severity score
    - `decision` (text, nullable) — final moderation outcome
    - `decision_reason` (text, nullable) — explanation of decision
    - `decided_by` (uuid, nullable FK → profiles, set null on delete)
    - `decided_at` (timestamptz, nullable)
    - `created_at` / `updated_at` (timestamptz, default now())

  ### 2. moderation_messages
  Stores threaded messages within a moderation report, supporting both internal
  moderator notes and external communications to authors.
    - `id` (uuid, PK)
    - `report_id` (uuid, FK → moderation_reports, cascade delete)
    - `sender_id` (uuid, FK → profiles, cascade delete)
    - `recipient_id` (uuid, nullable FK → profiles, set null on delete)
    - `message` (text, NOT NULL)
    - `is_internal` (boolean, NOT NULL, default false) — hides from biography authors when true
    - `created_at` (timestamptz, default now())

  ## Security
  - RLS enabled on both tables
  - moderation_reports:
    - INSERT: any authenticated user
    - SELECT: reporter sees own reports; reviewer/admin/super_admin see all
    - UPDATE: reviewer/admin/super_admin only
  - moderation_messages:
    - INSERT: any authenticated user
    - SELECT (internal=true): reviewer/admin/super_admin only
    - SELECT (internal=false): also visible to the biography author
*/

-- ─── moderation_reports ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS moderation_reports (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  biography_id        uuid        NOT NULL REFERENCES biographies(id) ON DELETE CASCADE,
  reporter_id         uuid        REFERENCES profiles(id) ON DELETE SET NULL,
  report_type         text        NOT NULL CHECK (report_type IN (
                                    'level1_content',
                                    'level2_content',
                                    'living_person',
                                    'right_to_oblivion',
                                    'impersonation',
                                    'copyright',
                                    'other'
                                  )),
  description         text,
  status              text        NOT NULL DEFAULT 'unassigned'
                                  CHECK (status IN ('unassigned','assigned','in_review','decided')),
  assigned_to         uuid        REFERENCES profiles(id) ON DELETE SET NULL,
  ai_analysis         jsonb       NOT NULL DEFAULT '{}',
  ai_violation_level  integer,
  decision            text        CHECK (decision IN (
                                    'publish','hide','remove','request_edit','no_action'
                                  )),
  decision_reason     text,
  decided_by          uuid        REFERENCES profiles(id) ON DELETE SET NULL,
  decided_at          timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE moderation_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Any authenticated user can file a report"
  ON moderation_reports FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Reporters see own reports; staff see all"
  ON moderation_reports FOR SELECT
  TO authenticated
  USING (
    auth.uid() = reporter_id
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role IN ('reviewer', 'admin', 'super_admin')
    )
  );

CREATE POLICY "Staff can update reports"
  ON moderation_reports FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role IN ('reviewer', 'admin', 'super_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role IN ('reviewer', 'admin', 'super_admin')
    )
  );

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_moderation_reports_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_moderation_reports_updated_at
  BEFORE UPDATE ON moderation_reports
  FOR EACH ROW EXECUTE FUNCTION update_moderation_reports_updated_at();


-- ─── moderation_messages ──────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS moderation_messages (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id     uuid        NOT NULL REFERENCES moderation_reports(id) ON DELETE CASCADE,
  sender_id     uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_id  uuid        REFERENCES profiles(id) ON DELETE SET NULL,
  message       text        NOT NULL,
  is_internal   boolean     NOT NULL DEFAULT false,
  created_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE moderation_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Any authenticated user can send a message"
  ON moderation_messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Internal messages visible to staff only"
  ON moderation_messages FOR SELECT
  TO authenticated
  USING (
    CASE
      WHEN is_internal = true THEN
        EXISTS (
          SELECT 1 FROM profiles
          WHERE profiles.id = auth.uid()
            AND profiles.role IN ('reviewer', 'admin', 'super_admin')
        )
      ELSE
        -- Non-internal: staff OR the biography author can see
        EXISTS (
          SELECT 1 FROM profiles
          WHERE profiles.id = auth.uid()
            AND profiles.role IN ('reviewer', 'admin', 'super_admin')
        )
        OR EXISTS (
          SELECT 1
          FROM moderation_reports mr
          JOIN biographies b ON b.id = mr.biography_id
          WHERE mr.id = moderation_messages.report_id
            AND b.user_id = auth.uid()
        )
    END
  );
