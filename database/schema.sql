CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stories (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    category VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS episodes (
    id BIGSERIAL PRIMARY KEY,
    story_id BIGINT NOT NULL
        REFERENCES stories(id)
        ON DELETE CASCADE,

    episode_number INTEGER NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    video_url TEXT NOT NULL,
    duration_seconds INTEGER DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(story_id, episode_number)
);

CREATE TABLE IF NOT EXISTS watch_history (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    episode_id BIGINT NOT NULL
        REFERENCES episodes(id)
        ON DELETE CASCADE,

    position_seconds INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(user_id, episode_id)
);

CREATE TABLE IF NOT EXISTS watchlist (
    user_id BIGINT NOT NULL
        REFERENCES users(id)
        ON DELETE CASCADE,

    story_id BIGINT NOT NULL
        REFERENCES stories(id)
        ON DELETE CASCADE,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    PRIMARY KEY(user_id, story_id)
);

INSERT INTO stories (
    title,
    description,
    thumbnail_url,
    category
)
SELECT
    'The Last Letter',
    'A sample story for development.',
    'https://placehold.co/800x450',
    'Drama'
WHERE NOT EXISTS (
    SELECT 1
    FROM stories
    WHERE title = 'The Last Letter'
);

INSERT INTO episodes (
    story_id,
    episode_number,
    title,
    description,
    video_url,
    duration_seconds
)
SELECT
    id,
    1,
    'Episode 1',
    'Sample episode.',
    'https://example.com/sample.m3u8',
    300
FROM stories
WHERE title = 'The Last Letter'
AND NOT EXISTS (
    SELECT 1
    FROM episodes e
    WHERE e.story_id = stories.id
    AND e.episode_number = 1
);
