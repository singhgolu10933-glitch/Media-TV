import dotenv from "dotenv";
import pg from "pg";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = path.resolve(
  __dirname,
  "../../database/schema.sql"
);

async function setupDatabase() {
  try {
    console.log("Reading schema.sql...");

    const schema = fs.readFileSync(
      schemaPath,
      "utf8"
    );

    console.log("Connecting to PostgreSQL...");

    await pool.query(schema);

    console.log(
      "Media TV database schema created successfully."
    );

    const result = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM stories) AS stories,
        (SELECT COUNT(*) FROM episodes) AS episodes,
        (SELECT COUNT(*) FROM users) AS users
    `);

    console.log(
      "Database counts:",
      result.rows[0]
    );

  } catch (error) {
    console.error(
      "Database setup failed:",
      error
    );

    process.exitCode = 1;

  } finally {
    await pool.end();
  }
}

setupDatabase();
