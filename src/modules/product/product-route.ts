import express from "express";
import { auth } from "../../middleware/auth";
import {
  createProduct,
  getAllProduct,
  updateProduct,
  getProductById,
  deleteProduct,
} from "./product-controller";
const router = express.Router();

//Create Products
router.post("/new", auth, createProduct);

//Get all Products
router.route("/").get(auth, getAllProduct);

router
  .route("/:id")
  .get(auth, getProductById)
  .patch(auth, updateProduct)
  .delete(auth, deleteProduct);

export default router;
