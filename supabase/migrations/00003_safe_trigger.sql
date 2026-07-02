-- ============================================================
-- Migration 00003: make trigger safe without pg_net
-- ============================================================
--
-- pg_net extension is not enabled on this project, so calling
-- net.http_post() inside the trigger causes every INSERT to fail.
-- Bot notification is now handled directly by the submit-lead
-- Edge Function, so the trigger becomes a no-op.
--
-- To re-enable pg_net later: enable the extension in the Supabase
-- Dashboard (Extensions tab) and restore notify_bot_new_lead to
-- the pg_net version from migration 00002.
-- ============================================================

CREATE OR REPLACE FUNCTION notify_bot_new_lead()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  RETURN NEW;
END;
$$;
