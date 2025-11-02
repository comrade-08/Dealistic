import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { createProduct, getProducts, updateProduct, deleteProduct, getVendorProducts } from "../controllers/productController.js";

const router = express.Router();

router.route("/")
  .get(getProducts)
  .post(protect, authorizeRoles("vendor", "admin"), createProduct);

router
  .get("/vendor-products",protect, authorizeRoles("vendor", "admin"), getVendorProducts)

router.route("/:id")
  .put(protect, authorizeRoles("vendor", "admin"), updateProduct)
  .delete(protect, authorizeRoles("vendor", "admin"), deleteProduct);

export default router;
