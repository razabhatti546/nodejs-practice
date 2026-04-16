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
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, price, quantity } = req.body;

    if (!name || price === undefined || quantity === undefined) {
      return res.status(400).json({
        message: "name, price and quantity are required",
      });
    }

    const updatedProduct = await productModel.updateProduct(id, {
      name,
      price,
      quantity,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.json(updatedProduct);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedProduct = await productModel.deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Item deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await productModel.getProductById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.json(product);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
};
