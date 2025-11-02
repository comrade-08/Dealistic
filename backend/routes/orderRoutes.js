import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { createOrder, getOrders, updateOrderStatus } from "../controllers/orderController.js";

const router = express.Router();

router.route("/")
  .post(protect, authorizeRoles("user", "admin"), createOrder)
  .get(protect, getOrders);

router.route("/my")
  .get(protect, getOrders);

router.route("/:id/status")
  .put(protect, authorizeRoles("admin"), updateOrderStatus);

export default router;
