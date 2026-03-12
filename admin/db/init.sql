CREATE SCHEMA IF NOT EXISTS public;

DO $$ BEGIN
    CREATE TYPE activity_type AS ENUM (
        'cultural', 'favorite', 'history', 'nature', 'gastronomy',
        'craft', 'sport', 'event', 'wellness', 'family', 'nocturnal', 'tech'
    );
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Add missing enum values if upgrading an existing DB
DO $$ BEGIN ALTER TYPE activity_type ADD VALUE IF NOT EXISTS 'history';   EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE activity_type ADD VALUE IF NOT EXISTS 'nature';    EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE activity_type ADD VALUE IF NOT EXISTS 'gastronomy'; EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE activity_type ADD VALUE IF NOT EXISTS 'craft';     EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE activity_type ADD VALUE IF NOT EXISTS 'sport';     EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE activity_type ADD VALUE IF NOT EXISTS 'event';     EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE activity_type ADD VALUE IF NOT EXISTS 'wellness';  EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE activity_type ADD VALUE IF NOT EXISTS 'family';    EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE activity_type ADD VALUE IF NOT EXISTS 'nocturnal'; EXCEPTION WHEN others THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE activity_type ADD VALUE IF NOT EXISTS 'tech';      EXCEPTION WHEN others THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    image_path VARCHAR(2048),
    category VARCHAR(255),
    link VARCHAR(2048),
    description TEXT,
    intro TEXT,
    history TEXT,
    partner BOOLEAN NOT NULL DEFAULT FALSE,
    partner_name VARCHAR(255),
    is_current_event BOOLEAN NOT NULL DEFAULT FALSE,
    type activity_type NOT NULL DEFAULT 'cultural',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS learn_more (
    id SERIAL PRIMARY KEY,
    activity_id INTEGER NOT NULL REFERENCES activities(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    position SMALLINT NOT NULL DEFAULT 1
);
