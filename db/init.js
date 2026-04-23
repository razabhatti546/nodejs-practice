import { pathToFileURL } from "url";
import { closeDb, getClient } from "../config/db.js";
import createProductsTable from "./schema/products.js";
import createUsersTable from "./schema/users.js";

const initDb = async () => {
  const client = await getClient();

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

const isMainModule =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMainModule) {
  initDb()
    .then(() => {
      return closeDb();
    })
    .catch(async (error) => {
      console.error("Failed to initialize database schema:", error);
      await closeDb();
      process.exit(1);
    });
}

export default initDb;
