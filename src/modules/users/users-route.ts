import express from "express";
import { SuperAdmin, auth } from "../../middleware/auth";
import {
  registerUser,
  loginUser,
  userProfile,
  updateUser,
  deleteUser,
  allUsers,
  getUserById,
} from "./user-controller";
const router = express.Router();

//Register user
router.post("/register", registerUser);

// login user
router.post("/login", loginUser);

//User profile
router
  .route("/me")
  .get(auth, userProfile)
  .patch(auth, updateUser)
  .delete(auth, deleteUser);

//All Users--super-admin
router.route("/admin/allUser").get(SuperAdmin, allUsers);

//delete Users--super-admin
router
  .route("/admin/:id")
  .get(SuperAdmin, getUserById)
  .delete(SuperAdmin, deleteUser);

export default router;
