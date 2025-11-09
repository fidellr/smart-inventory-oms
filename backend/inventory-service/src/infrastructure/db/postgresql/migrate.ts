import fs from "fs";
import path from "path";
import { Pool } from "pg";
import { dbConfig } from "./config";

const pool = new Pool(dbConfig);
const MIGRATIONS_DIR = path.join(__dirname, "migrations");

(async () => {
  const client = await pool.connect();
  await client.query(
    "CREATE TABLE IF NOT EXISTS _migrations (filename TEXT PRIMARY KEY, applied_at TIMESTAMP DEFAULT NOW())"
  );

  const applied = (
    await client.query("SELECT filename FROM _migrations")
  ).rows.map((r) => r.filename);
  const migrations = fs.readdirSync(MIGRATIONS_DIR).sort();

  for (const file of migrations) {
    if (!applied.includes(file)) {
      const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), "utf8");
      console.log(`⏳ Running migration: ${file}`);
      await client.query("BEGIN");
      try {
        await client.query(sql);
        await client.query("INSERT INTO _migrations (filename) VALUES ($1)", [
          file,
        ]);
        await client.query("COMMIT");
        console.log(`✅ Applied ${file}`);
      } catch (err) {
        await client.query("ROLLBACK");
        console.error(`❌ Failed migration ${file}:`, err);
        process.exit(1);
      }
    }
  }

  client.release();
  pool.end();
})();
