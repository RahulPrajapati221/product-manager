import express from "express";
import { SuperAdmin, auth } from "../../middleware/auth";
import {
  registerUser,
  loginUser,
  userProfile,
  updateUser,
  deleteUser,
  allUsers,
  getAllUsersById,
  deleteUserByAdmin,
} from "./user-controller";
import { deleteUserAdmin } from "./user-service";
const router = express.Router();

//Register user
router.post("/register", registerUser);

// login user
router.post("/login", loginUser);

// // logout user
// router.post("/logout", auth, logOutUser);

// // logout user from all sessions
// router.post("/logoutAll", auth, logOutAll);

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
  .get(SuperAdmin, getAllUsersById)
  .delete(SuperAdmin, deleteUserByAdmin);

export default router;
