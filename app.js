require("dotenv").config();

const express = require("express");
const db = require("./config/db");
const initDb = require("./db/init");
const routes = require("./routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", async (req, res, next) => {
  try {
    await db.query("SELECT NOW()");
    res.json({ message: "Server and database are running" });
  } catch (error) {
    next(error);
  }
});

app.use(routes);
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start application:", error);
    process.exit(1);
  }
};

startServer();
