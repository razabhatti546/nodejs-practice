import "dotenv/config";

import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

const query = (text, params) => pool.query(text, params);

const getClient = () => pool.connect();

const connectDb = async () => {
  const client = await getClient();

  try {
    await client.query("SELECT 1");
  } finally {
    client.release();
  }
};

const closeDb = async () => {
  await pool.end();
};

export { pool, query, getClient, connectDb, closeDb };
