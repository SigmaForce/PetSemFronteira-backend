import { Router } from "express";
import {
  authenticateUser,
  changePassword,
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/UserController";

const UserRoutes = Router();

UserRoutes.get("/:id", getUser);
UserRoutes.post("/signIn", authenticateUser);
UserRoutes.post("/", createUser);
UserRoutes.delete("/:id", deleteUser);
UserRoutes.put("/changePassword/:id", changePassword);
UserRoutes.put("/:id", updateUser);

export default UserRoutes;
