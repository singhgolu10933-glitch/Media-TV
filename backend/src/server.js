import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

const app = express();
const { Pool } = pg;

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false
    })
  : null;

app.use(cors());
app.use(express.json());

/* =========================================================
   HEALTH
   ========================================================= */

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "media-tv-backend",
    version: "1.0.0"
  });
});

/* =========================================================
   STORIES
   ========================================================= */

app.get("/api/stories", async (req, res) => {

  if (!pool) {
    return res.json([
      {
        id: 1,
        title: "The Last Letter",
        description:
          "A mysterious letter changes everything.",
        thumbnail_url: "",
        category: "Drama"
      },
      {
        id: 2,
        title: "Midnight Mystery",
        description:
          "A strange mystery begins at midnight.",
        thumbnail_url: "",
        category: "Mystery"
      }
    ]);
  }

  try {

    const result = await pool.query(`
      SELECT
        id,
        title,
        description,
        thumbnail_url,
        category,
        created_at
      FROM stories
      ORDER BY created_at DESC
    `);

    res.json(result.rows);

  } catch (error) {

    console.error(
      "GET /api/stories error:",
      error
    );

    res.status(500).json({
      error: "Database error"
    });
  }
});

/* =========================================================
   SINGLE STORY
   ========================================================= */

app.get("/api/stories/:id", async (req, res) => {

  if (!pool) {
    return res.status(404).json({
      error: "Story not found"
    });
  }

  try {

    const result = await pool.query(
      `
      SELECT
        id,
        title,
        description,
        thumbnail_url,
        category,
        created_at
      FROM stories
      WHERE id = $1
      `,
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Story not found"
      });
    }

    res.json(result.rows[0]);

  } catch (error) {

    console.error(
      "GET /api/stories/:id error:",
      error
    );

    res.status(500).json({
      error: "Database error"
    });
  }
});

/* =========================================================
   EPISODES
   ========================================================= */

app.get(
  "/api/stories/:id/episodes",
  async (req, res) => {

    if (!pool) {
      return res.json([]);
    }

    try {

      const result = await pool.query(
        `
        SELECT
          id,
          story_id,
          episode_number,
          title,
          description,
          video_url,
          duration_seconds,
          created_at
        FROM episodes
        WHERE story_id = $1
        ORDER BY episode_number ASC
        `,
        [req.params.id]
      );

      res.json(result.rows);

    } catch (error) {

      console.error(
        "GET episodes error:",
        error
      );

      res.status(500).json({
        error: "Database error"
      });
    }
  }
);

/* =========================================================
   404
   ========================================================= */

app.use((req, res) => {

  res.status(404).json({
    error: "API endpoint not found"
  });
});

/* =========================================================
   SERVER
   ========================================================= */

const PORT =
  Number(process.env.PORT) || 3000;

app.listen(PORT, () => {

  console.log(
    `Media TV API running on port ${PORT}`
  );

});
