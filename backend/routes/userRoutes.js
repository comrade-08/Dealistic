import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { getUsers, getProfile, updateUserRole } from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), getUsers);
router.get("/profile", protect, getProfile);
router.put("/:id/role", protect, authorizeRoles("admin"), updateUserRole);

export default router;
