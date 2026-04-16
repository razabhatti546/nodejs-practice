const db = require("../config/db");

const initDb = async () => {
  const client = await db.getClient();

  try {
    await client.query("BEGIN");

    await client.query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 0
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL
      )
    `);

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

if (require.main === module) {
  initDb()
    .then(() => {
      console.log("Database schema initialized successfully");
      return db.closeDb();
    })
    .catch(async (error) => {
      console.error("Failed to initialize database schema:", error);
      await db.closeDb();
      process.exit(1);
    });
}

module.exports = initDb;
