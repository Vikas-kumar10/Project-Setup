import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import { adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getProducts);

// Admin Only
router.post("/", adminAuth, addProduct);
router.put("/:id", adminAuth, updateProduct);
router.delete("/:id", adminAuth, deleteProduct);

export default router;