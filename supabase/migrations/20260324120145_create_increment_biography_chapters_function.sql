/*
  # Create increment_biography_chapters RPC function

  ## Purpose
  Provides a single atomic operation called immediately after a biography's
  status is set to 'published'. It updates two fields on the biographies row:

  1. New columns updated
     - `last_chapter_published_at` — set to the current server timestamp (now())
     - `chapters_count` — incremented by 1

  The existing database trigger reads `last_chapter_published_at` and
  automatically computes `next_chapter_available_at`, so no extra logic is
  needed here.

  ## Security
  - Defined with SECURITY DEFINER so it runs with elevated privileges
  - Restricted to authenticated users only via a GRANT
  - The WHERE clause ensures callers can only update their own biographies
    (auth.uid() = user_id)
*/

CREATE OR REPLACE FUNCTION public.increment_biography_chapters(biography_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE biographies
  SET
    last_chapter_published_at = now(),
    chapters_count = chapters_count + 1
  WHERE id = biography_id
    AND user_id = auth.uid();
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_biography_chapters(uuid) TO authenticated;
