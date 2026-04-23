import "dotenv/config";

import express from "express";
import { connectDb, closeDb } from "./config/db.js";
import routes from "./routes/index.js";
import notFound from "./middlewares/notFound.js";
import { globalErrorMiddleware } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(notFound);
app.use(globalErrorMiddleware);

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {});
  } catch (error) {
    console.error("Failed to start application:", error);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  await closeDb();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await closeDb();
  process.exit(0);
});

startServer();
