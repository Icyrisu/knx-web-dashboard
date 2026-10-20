CREATE TABLE IF NOT EXISTS point_history (
  id BIGSERIAL PRIMARY KEY,
  point_id TEXT NOT NULL,
  point_name TEXT NOT NULL,
  area TEXT,
  point_kind TEXT NOT NULL,
  numeric_value DOUBLE PRECISION,
  text_value TEXT,
  unit TEXT,
  quality TEXT NOT NULL DEFAULT 'good',
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_point_history_point_time
  ON point_history (point_id, recorded_at DESC);

CREATE TABLE IF NOT EXISTS point_configuration (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  area TEXT NOT NULL DEFAULT 'Unassigned',
  point_kind TEXT NOT NULL,
  unit TEXT,
  enabled BOOLEAN NOT NULL DEFAULT TRUE,
  mapping JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
