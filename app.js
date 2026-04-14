const express = require("express");
const shopRouter = require("./routes/shop");
const bodyParser = require("body-parser");

const db = require("./db/connection");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/shop", shopRouter);

app.use("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json({ message: "Database connection successful" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching products");
  }
});

app.use((req, res, next) => {
  res.status(404).send("Page not found");
  next();
});

app.listen(3010);
