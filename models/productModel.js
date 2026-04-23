import { query } from "../config/db.js";

export const getAllProducts = async () => {
  const result = await query(
    "SELECT id, name, price, quantity FROM products ORDER BY id ASC",
  );
  return result.rows;
};

export const createProduct = async ({ name, price, quantity }) => {
  const result = await query(
    `INSERT INTO products (name, price, quantity)
     VALUES ($1, $2, $3)
     RETURNING id, name, price, quantity`,
    [name, price, quantity],
  );

  return result.rows[0];
};

export const updateProduct = async (id, { name, price, quantity }) => {
  const result = await query(
    `UPDATE products
     SET name = $1, price = $2, quantity = $3
     WHERE id = $4
     RETURNING id, name, price, quantity`,
    [name, price, quantity, id],
  );

  return result.rows[0];
};

export const deleteProduct = async (id) => {
  const result = await query(
    `DELETE FROM products
     WHERE id = $1
     RETURNING id, name, price, quantity`,
    [id],
  );

  return result.rows[0];
};

export const getProductById = async (id) => {
  const result = await query(
    `SELECT id, name, price, quantity
     FROM products
     WHERE id = $1`,
    [id],
  );

  return result.rows[0];
};
