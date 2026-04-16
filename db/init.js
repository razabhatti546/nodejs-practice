const db = require("../config/db");
const createProductsTable = require("./schema/products");
const createUsersTable = require("./schema/users");

const initDb = async () => {
  const client = await db.getClient();

  try {
    await client.query("BEGIN");
    await createProductsTable(client);
    await createUsersTable(client);

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
