#!/bin/bash
set -e

echo "⏳ Waiting for PostgreSQL to finish starting up..."

# Wait until the internal server process is ready
until pg_isready -U "$POSTGRES_USER" -h /var/run/postgresql; do
  sleep 1
done

echo "🚀 PostgreSQL is ready, starting schema initialization..."

for sql_file in /docker-entrypoint-initdb.d/backend/*/sql/schema.sql; do
  if [ -f "$sql_file" ]; then
    echo "🔹 Executing schema: $sql_file"
    psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -f "$sql_file"
  fi
done

echo "✅ All schemas initialized successfully."
