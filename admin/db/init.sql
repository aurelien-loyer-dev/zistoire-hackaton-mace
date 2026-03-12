CREATE SCHEMA IF NOT EXISTS public;

DO $$ BEGIN
    CREATE TYPE activity_type AS ENUM ('cultural', 'favorite');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    link VARCHAR(2048),
    description TEXT,
    intro TEXT,
    history TEXT,
    partner BOOLEAN NOT NULL DEFAULT FALSE,
    type activity_type NOT NULL DEFAULT 'cultural',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS learn_more (
    id SERIAL PRIMARY KEY,
    activity_id INTEGER NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    position SMALLINT NOT NULL DEFAULT 1
);
