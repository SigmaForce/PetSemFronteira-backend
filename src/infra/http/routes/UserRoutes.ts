import { Router } from "express";
import {
  authenticateUser,
  changePassword,
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from "../controllers/UserController";
import { authMiddleware } from "../middlewares/authMiddleware";

const UserRoutes = Router();

UserRoutes.get("/user/:id", authMiddleware, getUser);
UserRoutes.post("/user/signIn", authenticateUser);
UserRoutes.post("/user/", createUser);
UserRoutes.delete("/user/:id", deleteUser);
UserRoutes.put("/user/changePassword/:id", changePassword);
UserRoutes.put("/user/:id", updateUser);
UserRoutes.get("/users", listUsers);

export default UserRoutes;
