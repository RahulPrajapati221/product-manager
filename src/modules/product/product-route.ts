import express from "express";
import { auth, authRoles } from "../../middleware/auth";
import {
  createProduct,
  getAllProduct,
  updateProduct,
  getProductById,
  deleteProduct,
} from "./product-controller";
const router = express.Router();

//Create Products
router.post("/new", createProduct);

//Get all Products
router.route("/").get(auth, authRoles("admin"), getAllProduct);

router
  .route("/:id")
  .get(getProductById)
  .patch(updateProduct)
  .delete(deleteProduct);

export default router;
