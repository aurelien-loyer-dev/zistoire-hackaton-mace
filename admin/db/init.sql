CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    link VARCHAR(2048),
    description TEXT,
    intro TEXT,
    history TEXT,
    learn_more_1 TEXT,
    learn_more_2 TEXT,
    learn_more_3 TEXT,
    learn_more_4 TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
