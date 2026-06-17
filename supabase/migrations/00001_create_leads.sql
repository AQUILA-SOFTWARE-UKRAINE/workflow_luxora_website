-- ============================================================
-- Migration 00001: leads table, enums, RLS, and indexes
-- ============================================================

-- Service types offered (used in the request form and manager view)
CREATE TYPE service_type AS ENUM (
  'dry_cleaning',
  'laundry',
  'ironing',
  'leather',
  'carpet',
  'curtains',
  'other'
);

-- Manager workflow states (see glob_PLAN.md §4 — Lead lifecycle)
CREATE TYPE lead_status AS ENUM (
  'new',
  'contacted',
  'assessed',
  'in_progress',
  'completed',
  'declined'
);

CREATE TABLE leads (
  id                   uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at           timestamptz  NOT NULL DEFAULT now(),
  updated_at           timestamptz  NOT NULL DEFAULT now(),

  -- Customer contact (form fields)
  name                 text         NOT NULL CHECK (char_length(trim(name))    BETWEEN 2 AND 100),
  phone                text         NOT NULL CHECK (phone                      ~ '^\+?[\d\s\-(]{7,20}$'),
  city                 text         NOT NULL CHECK (char_length(trim(city))    BETWEEN 2 AND 100),
  address              text         NOT NULL CHECK (char_length(trim(address)) BETWEEN 5 AND 300),

  -- Service request
  service              service_type NOT NULL,
  description          text         CHECK (char_length(description) <= 1000),

  -- Photo stored in Supabase Storage private bucket "lead-photos".
  -- Value is the Storage object path, e.g. "leads/<uuid>/<filename>".
  -- Null when the customer did not attach a photo.
  photo_path           text,

  -- Workflow
  status               lead_status  NOT NULL DEFAULT 'new',

  -- Telegram delivery tracking.
  -- Set by the bot after it sends the lead message so it can edit the message on status change.
  tg_chat_id           bigint,
  tg_message_id        bigint,

  -- Anti-spam / audit trail (no raw PII stored here)
  ip_hash              text,                        -- SHA-256 of client IP for rate-limit audit
  turnstile_verified   boolean      NOT NULL DEFAULT false
);

-- ── Triggers ────────────────────────────────────────────────

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

-- ── Indexes ─────────────────────────────────────────────────

CREATE INDEX leads_status_idx     ON leads (status);
CREATE INDEX leads_created_at_idx ON leads (created_at DESC);

-- ── Row-Level Security ───────────────────────────────────────
--
-- RLS is enabled from day one. The service_role key (used by Edge Functions
-- and the bot) bypasses RLS automatically in Supabase — no policy needed for it.
--
-- Explicit RESTRICTIVE deny policies for anon and authenticated make the intent
-- unambiguous and prevent accidental grants if other permissive policies are
-- added later.

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "deny_anon"          ON leads AS RESTRICTIVE FOR ALL TO anon          USING (false);
CREATE POLICY "deny_authenticated" ON leads AS RESTRICTIVE FOR ALL TO authenticated USING (false);
