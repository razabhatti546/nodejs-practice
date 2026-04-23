import {
  createProduct as createProductRecord,
  deleteProduct as deleteProductRecord,
  getAllProducts,
  getProductById as findProductById,
  updateProduct as updateProductRecord,
} from "../models/productModel.js";
import AppError from "../utils/AppError.js";

const getProductInput = ({ name, price, quantity } = {}) => {
  if (!name || price === undefined || quantity === undefined) {
    throw new AppError("name, price and quantity are required", 400);
  }

  return { name, price, quantity };
};

export const getProducts = async (req, res) => {
  const products = await getAllProducts();
  res.json(products);
};

export const createProduct = async (req, res) => {
  const productInput = getProductInput(req.body);
  const product = await createProductRecord(productInput);

  res.status(201).json(product);
};

export const updateProduct = async (req, res) => {
  const productInput = getProductInput(req.body);
  const product = await updateProductRecord(req.params.id, productInput);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.json(product);
};

export const deleteProduct = async (req, res) => {
  const product = await deleteProductRecord(req.params.id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.status(200).json({
    message: "Product deleted successfully",
    product,
  });
};

export const getProductById = async (req, res) => {
  const product = await findProductById(req.params.id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.json(product);
};
