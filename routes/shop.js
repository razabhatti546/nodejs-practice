const express = require("express");
const router = express.Router();
const product = require("../models/productModels");

router.get("/", async (req, res) => {
  const products = await product.getAll();
  res.json(products);
});
router.post("/", async (req, res) => {
  const body = req.body;
  const newProduct = await product.postProduct(
    body.name,
    body.price,
    body.quantity,
  );
  res.status(201).json(newProduct);
});

module.exports = router;
