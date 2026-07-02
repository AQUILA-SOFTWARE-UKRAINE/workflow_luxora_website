-- ============================================================
-- Migration 00002: pg_net webhook — notify bot on INSERT to leads
-- ============================================================
--
-- Before applying this migration, set per-environment settings
-- in the Supabase SQL Editor (Project → SQL Editor):
--
--   ALTER DATABASE postgres SET app.bot_webhook_url    = 'https://<bot-host>/webhook/supabase';
--   ALTER DATABASE postgres SET app.bot_webhook_secret = '<32-char random secret>';
--   SELECT pg_reload_conf();
--
-- The same secret must be in the bot's .env as WEBHOOK_SECRET.
-- These settings live outside the repo so secrets never touch version control.
--
-- To verify the settings are applied:
--   SELECT current_setting('app.bot_webhook_url'), current_setting('app.bot_webhook_secret');
-- ============================================================

CREATE OR REPLACE FUNCTION notify_bot_new_lead()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  _url    text := current_setting('app.bot_webhook_url',    true);
  _secret text := current_setting('app.bot_webhook_secret', true);
BEGIN
  IF _url IS NULL OR _url = '' THEN
    RAISE WARNING 'notify_bot_new_lead: app.bot_webhook_url is not configured — lead % not forwarded to bot', NEW.id;
    RETURN NEW;
  END IF;

  PERFORM net.http_post(
    url     := _url,
    headers := jsonb_build_object(
      'Content-Type',  'application/json',
      'Authorization', 'Bearer ' || coalesce(_secret, '')
    ),
    body := jsonb_build_object(
      'type',       'INSERT',
      'table',      TG_TABLE_NAME,
      'schema',     TG_TABLE_SCHEMA,
      'record',     to_jsonb(NEW),
      'old_record', NULL::jsonb
    ),
    timeout_milliseconds := 5000
  );

  RETURN NEW;
END;
$$;

CREATE TRIGGER leads_notify_bot
  AFTER INSERT ON leads
  FOR EACH ROW EXECUTE FUNCTION notify_bot_new_lead();
