import express from "express";
import { auth } from "../../middleware/auth";
import { insertCart, userCartItem } from "./cart-controller";
const router = express.Router();

//Create Products
router.post("/new/:id", auth, insertCart);

//Get all Products
router.route("/").get(auth, userCartItem);

router.route("/:id").get(auth).delete(auth);

export default router;
