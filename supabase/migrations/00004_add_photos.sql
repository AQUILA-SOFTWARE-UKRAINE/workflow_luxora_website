-- Migration 00004: add photos column to leads
ALTER TABLE leads ADD COLUMN IF NOT EXISTS photos text[] NOT NULL DEFAULT '{}';
