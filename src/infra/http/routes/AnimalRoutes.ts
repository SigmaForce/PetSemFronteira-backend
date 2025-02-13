import { Router } from "express";
import {
  createAnimal,
  deleteAnimal,
  getAnimal,
} from "../controllers/AnimalController";

const AnimalRoutes = Router();

AnimalRoutes.get("/:id", getAnimal);
AnimalRoutes.post("/", createAnimal);
AnimalRoutes.delete("/:id", deleteAnimal);

export default AnimalRoutes;
