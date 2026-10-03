import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const app = express();
const { Pool } = pg;

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL
    })
  : null;

app.use(cors());
app.use(express.json());

/*
 * =========================
 * MEDIA TV HEALTH
 * =========================
 */

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "media-tv-backend"
  });
});

/*
 * =========================
 * GET ALL STORIES
 * =========================
 */

app.get("/api/stories", async (req, res) => {

  // Development fallback
  // Database connect na hone par sample data milega.
  if (!pool) {
    return res.json([
      {
        id: 1,
        title: "The Last Letter",
        description: "A sample short story series for Media TV.",
        thumbnail_url: "",
        category: "Drama"
      }
    ]);
  }

  try {

    const result = await pool.query(
      `SELECT
          id,
          title,
          description,
          thumbnail_url,
          category
       FROM stories
       ORDER BY created_at DESC`
    );

    res.json(result.rows);

  } catch (error) {

    console.error("Stories API error:", error);

    res.status(500).json({
      error: "Database error"
    });
  }
});

/*
 * =========================
 * GET STORY EPISODES
 * =========================
 */

app.get("/api/stories/:id/episodes", async (req, res) => {

  // Development fallback
  if (!pool) {
    return res.json([
      {
        id: 1,
        story_id: Number(req.params.id),
        episode_number: 1,
        title: "Episode 1",
        description: "Sample episode for Media TV.",
        video_url: "",
        duration_seconds: 300
      },
      {
        id: 2,
        story_id: Number(req.params.id),
        episode_number: 2,
        title: "Episode 2",
        description: "Second sample episode.",
        video_url: "",
        duration_seconds: 300
      }
    ]);
  }

  try {

    const result = await pool.query(
      `SELECT
          id,
          story_id,
          episode_number,
          title,
          description,
          video_url,
          duration_seconds
       FROM episodes
       WHERE story_id = $1
       ORDER BY episode_number`,
      [req.params.id]
    );

    res.json(result.rows);

  } catch (error) {

    console.error("Episodes API error:", error);

    res.status(500).json({
      error: "Database error"
    });
  }
});

/*
 * =========================
 * SERVER
 * =========================
 */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Media TV API running on port ${PORT}`);
});
