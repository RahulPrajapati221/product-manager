import express from "express";
import { SuperAdmin, auth } from "../../middleware/auth";
import {
  createProduct,
  getAllProduct,
  updateProduct,
  getProductById,
  deleteProduct,
  getSellerProduct,
  productBySellerId,
} from "./product-controller";
const router = express.Router();

//Create Products
router.post("/new", auth, createProduct);

//Get all Products
router.route("/").get(getAllProduct);

router.route("/seller").get(auth, getSellerProduct);

router
  .route("/:id")
  .get(auth, getProductById)
  .patch(auth, updateProduct)
  .delete(auth, deleteProduct);

router.route("/admin/seller/:id").get(SuperAdmin, productBySellerId);

export default router;
