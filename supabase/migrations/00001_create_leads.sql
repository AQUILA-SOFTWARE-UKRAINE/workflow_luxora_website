-- ============================================================
-- Migration 00001: leads table, RLS, indexes, updated_at trigger
-- ============================================================

CREATE TABLE leads (
  id            uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at    timestamptz  NOT NULL DEFAULT now(),
  updated_at    timestamptz  NOT NULL DEFAULT now(),

  -- Form fields
  name          text         NOT NULL CHECK (char_length(trim(name))  BETWEEN 2 AND 100),
  phone         text         NOT NULL CHECK (phone ~ '^\+?[\d\s\-(]{7,20}$'),
  city          text         NOT NULL,
  address       text,
  message       text         CHECK (char_length(message) <= 1000),

  -- Multi-select services: array of ids (apartment, upholstery, windows, driveway, car, other)
  services      text[]       NOT NULL DEFAULT '{}',

  -- Manager workflow state
  status        text         NOT NULL DEFAULT 'new',

  -- Telegram tracking (set after bot delivers the notification message)
  tg_chat_id    bigint,
  tg_message_id bigint,

  -- Anti-spam audit (SHA-256 of client IP — no raw PII)
  ip_hash       text
);

-- ── updated_at trigger ───────────────────────────────────────

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER leads_set_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── Indexes ──────────────────────────────────────────────────

CREATE INDEX leads_status_idx     ON leads (status);
CREATE INDEX leads_created_at_idx ON leads (created_at DESC);

-- ── Row-Level Security ───────────────────────────────────────
--
-- service_role key (used by Edge Functions) bypasses RLS automatically.
-- Deny everything for anon / authenticated — no direct table access from the client.

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "deny_anon"          ON leads AS RESTRICTIVE FOR ALL TO anon          USING (false);
CREATE POLICY "deny_authenticated" ON leads AS RESTRICTIVE FOR ALL TO authenticated USING (false);
