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
  const sql = `CREATE TABLE IF NOT EXISTS products(
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   price DECIMAL(10, 2) NOT NULL,
   description TEXT
  )`;
  await db.query(sql);
});

app.use((req, res, next) => {
  res.status(404).send("Page not found");
  next();
});

app.listen(3010);
