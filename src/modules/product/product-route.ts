import express from "express";
import { SuperAdmin, auth } from "../../middleware/auth";
import {
  createProduct,
  getAllProduct,
  updateProduct,
  getProductById,
  deleteProduct,
  getSellerProduct,
} from "./product-controller";
const router = express.Router();

//Create Products
router.post("/new", auth, createProduct);

//Get all Products
router.route("/").get(getAllProduct);

//Get Seller Product
router.route("/seller").get(auth, getSellerProduct);

router
  .route("/:id")
  .get(auth, getProductById)
  .patch(auth, updateProduct)
  .delete(auth, deleteProduct);

//SuperAdmin--get Seller Products by sellerId
router.route("/admin/seller/:id").get(SuperAdmin, getSellerProduct);

export default router;
