import "dotenv/config";

export const dbConfig = {
  user: process.env.POSTGRES_USER || "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DB || "smart_inventory",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  port: Number(process.env.POSTGRES_PORT) || 5432,
  ssl:
    process.env.POSTGRES_SSL === "true" ? { rejectUnauthorized: false } : false,
  max: Number(process.env.PG_POOL_MAX) || 10,
  idleTimeoutMillis: 30000,
};
