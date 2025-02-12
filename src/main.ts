import express, { Request, Response } from "express";
import CreateAnimal from "./application/usecase/CreateAnimal";
import { pgPromiseAdapter } from "./infra/database/config/DatabaseConnection";
import AnimalRepositoryDatabase from "./infra/database/repository/AnimalRepositoryDatabase";

async function main() {
  const app = express();
  app.use(express.json());
  app.post("/animal", async (req: Request, res: Response) => {
    try {
      const databaseConnection = new pgPromiseAdapter();
      const animalRepository = new AnimalRepositoryDatabase(databaseConnection);
      const createAnimal = new CreateAnimal(animalRepository);
      const input = req.body;
      const animalId = await createAnimal.execute(input);

      res.status(201).json({
        animalId: animalId?.animalId,
      });
    } catch (err) {
      console.error(err);
      const publicError = err;
      res.status(500).json({});
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
