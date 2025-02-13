import express, { Request, Response } from "express";
import { ZodError } from "zod";
import CreateAnimal from "./application/usecase/CreateAnimal";
import { pgPromiseAdapter } from "./infra/database/config/DatabaseConnection";
import AnimalRepositoryDatabase from "./infra/database/repository/AnimalRepositoryDatabase";
import { createAnimalSchema } from "./infra/http/schemas/AnimalSchema";
import { BadRequestError } from "./shared/errors/Errors";

async function main() {
  const app = express();
  app.use(express.json());
  app.post("/animal", async (req: Request, res: Response) => {
    try {
      let input;
      try {
        input = createAnimalSchema.parse(req.body);
      } catch (err) {
        if (err instanceof ZodError) {
          throw new BadRequestError({ cause: err });
        }
        throw err;
      }

      const databaseConnection = new pgPromiseAdapter();
      const animalRepository = new AnimalRepositoryDatabase(databaseConnection);
      const createAnimal = new CreateAnimal(animalRepository);
      const animalId = await createAnimal.execute(input);

      res.status(201).json({
        animalId: animalId?.animalId,
      });
    } catch (err: any) {
      console.error(err);
      res.status(err.statusCode).json({
        name: err.name,
        message: err.message,
        action: err.action,
        status: err.statusCode,
      });
    }
  });

  app.get("/animal/:animalId", (req: Request, res: Response) => {
    res.json({
      animalId: 1,
      name: "Joca",
      species: "Cachorro",
      breed: "SRD",
      age: 4,
      size: "Pequeno Porte",
      status: "Disponivel",
      description: "Animal docil",
      image_url: "/image.png",
      location: "-22.55785, -22.55785",
      user_id: 1,
    });
  });

  app.listen(3000);
}

main();
