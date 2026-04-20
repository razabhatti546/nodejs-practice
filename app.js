require("dotenv").config();

const express = require("express");
const { connectDb, closeDb } = require("./config/db");
const routes = require("./routes");
const notFound = require("./middlewares/notFound");
const { globalErrorMiddleware } = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(globalErrorMiddleware);
app.use(notFound);

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
