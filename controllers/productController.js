const productModel = require("../models/productModel");

const getProducts = async (req, res, next) => {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { name, price, quantity } = req.body;

    if (!name || price === undefined || quantity === undefined) {
      return res.status(400).json({
        message: "name, price and quantity are required",
      });
    }

    const newProduct = await productModel.createProduct({
      name,
      price,
      quantity,
    });

    return res.status(201).json(newProduct);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createProduct,
  getProducts,
};
