const db = require("../config/db");

const getAllProducts = async () => {
  const result = await db.query(
    "SELECT id, name, price, quantity FROM products ORDER BY id ASC",
  );
  return result.rows;
};

const createProduct = async ({ name, price, quantity }) => {
  const result = await db.query(
    `INSERT INTO products (name, price, quantity)
     VALUES ($1, $2, $3)
     RETURNING id, name, price, quantity`,
    [name, price, quantity],
  );

  return result.rows[0];
};

module.exports = {
  createProduct,
  getAllProducts,
};
