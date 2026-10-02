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

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "story-tv-backend"
  });
});

app.get("/api/stories", async (req, res) => {

  if (!pool) {
    return res.json([
      {
        id: 1,
        title: "The Last Letter",
        description: "A sample short story series.",
        thumbnail_url: "https://placehold.co/800x450",
        category: "Drama"
      }
    ]);
  }

  try {

    const result = await pool.query(
      `SELECT id, title, description,
              thumbnail_url, category
       FROM stories
       ORDER BY created_at DESC`
    );

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Database error"
    });
  }
});

app.get("/api/stories/:id/episodes", async (req, res) => {

  if (!pool) {
    return res.json([]);
  }

  try {

    const result = await pool.query(
      `SELECT id,
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

    console.error(error);

    res.status(500).json({
      error: "Database error"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Story TV API running on port ${PORT}`);
});
