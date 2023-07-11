import express from "express";
import { auth } from "../../middleware/auth";
import {
  cartItemById,
  deleteCartItem,
  insertCart,
  //   updateCartItem,
  userCartItem,
} from "./cart-controller";
const router = express.Router();

//Create Products
router.post("/new/:id", auth, insertCart);

//Get all Products
router.route("/").get(auth, userCartItem);

router
  .route("/:id")
  .get(auth, cartItemById)
  .patch(auth)
  .delete(auth, deleteCartItem);

export default router;
