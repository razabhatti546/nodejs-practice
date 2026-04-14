const db = require("../db/connection");

const Product = {
  getAll: async () => {
    const result = await db.query("SELECT * FROM products");
    return result.rows;
  },
  postProduct: async () => {
    const result = await db.query(
      "INSERT INTO products (name, price, quantity) VALUES ($1, $2, $3) RETURNING *",
      [name, price, quantity],
    );
    return result.rows[0];
  },
};

module.exports = Product;
