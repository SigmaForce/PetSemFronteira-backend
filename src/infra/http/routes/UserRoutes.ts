import { Router } from "express";
import { createUser, deleteUser, getUser } from "../controllers/UserController";

const UserRoutes = Router();

UserRoutes.get("/:id", getUser);
UserRoutes.post("/", createUser);
UserRoutes.delete("/:id", deleteUser);

export default UserRoutes;
