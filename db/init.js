const db = require("../config/db");

const initDb = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price DECIMAL(10, 2) NOT NULL
    )
  `);

  await db.query(`
    ALTER TABLE products
    ADD COLUMN IF NOT EXISTS quantity INTEGER NOT NULL DEFAULT 0
  `);
};

module.exports = initDb;
