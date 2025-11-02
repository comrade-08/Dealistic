import Product from "../models/Product.js";

// Create a new product (Vendor or Admin)
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, vendor: req.user._id });
    res.status(201).json(product);
  } catch (error) {
    console.log(error, 'createProduct')
    res.status(400).json({ message: error.message });
  }
};

// Get all products (Public)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("vendor", "name email");
    res.json(products);
  } catch (error) {
    console.log(error, 'getProducts')
    res.status(500).json({ message: error.message });
  }
};

export const getVendorProducts = async (req, res) => {
  try {
    const products = await Product.find({vendor: req.user._id}).populate("vendor", "name email");
    res.json(products);
  } catch (error) {
    console.log(error, 'getVendorProducts')
    res.status(500).json({ message: error.message });
  }
};

// Update product (Vendor/Admin)
export const updateProduct = async (req, res) => {
  try {
    console.log(req.body, req.params.id, 'updateProduct')
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    console.log(product.vendor.toString(), 'updateProduct', req.user._id)
    if (
      req.user.role !== "admin" &&
      product.vendor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error, 'updateProduct')
    res.status(500).json({ message: error.message });
  }
};

// Delete product (Admin or Vendor who created it)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (
      req.user.role !== "admin" &&
      product.vendor.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await product.deleteOne();
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error, 'deleteProduct')
    res.status(500).json({ message: error.message });
  }
};
