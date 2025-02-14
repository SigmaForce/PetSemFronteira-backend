import { Request, Response } from "express";
import { z, ZodError } from "zod";
import CreateAnimal from "../../../application/usecase/Animal/CreateAnimal";
import { BadRequestError } from "../../../shared/errors/Errors";
import { pgPromiseAdapter } from "../../database/config/DatabaseConnection";
import AnimalRepositoryDatabase from "../../database/repository/AnimalRepositoryDatabase";
import { createAnimalSchema } from "../schemas/AnimalSchema";

const paramSchema = z.object({
  id: z.string().min(1, "Need to provide a identifier."),
});

export const createAnimal = async (req: Request, res: Response) => {
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
    databaseConnection.close();
  } catch (err: any) {
    console.error(err);
    res.status(err.statusCode).json({
      name: err.name,
      message: err.message,
      action: err.action,
      status: err.statusCode,
    });
  }
};

export const getAnimal = async (req: Request, res: Response) => {
  try {
    let input;
    try {
      input = paramSchema.parse({ id: req.params.id });
    } catch (err) {
      if (err instanceof ZodError) {
        throw new BadRequestError({ cause: err });
      }
      throw err;
    }

    const databaseConnection = new pgPromiseAdapter();
    const animalRepository = new AnimalRepositoryDatabase(databaseConnection);
    const animal = await animalRepository.find(input.id);

    if (!animal) res.status(204).json(animal);

    if (animal) res.status(200).json(animal);
    databaseConnection.close();
  } catch (err: any) {
    console.error(err);
    res.status(err.statusCode).json({
      name: err.name,
      message: err.message,
      action: err.action,
      status: err.statusCode,
    });
  }
};

export const deleteAnimal = async (req: Request, res: Response) => {
  try {
    let input;
    try {
      input = paramSchema.parse({ id: req.params.id });
    } catch (err) {
      if (err instanceof ZodError) {
        throw new BadRequestError({ cause: err });
      }
      throw err;
    }
    const databaseConnection = new pgPromiseAdapter();
    const animalRepository = new AnimalRepositoryDatabase(databaseConnection);
    await animalRepository.delete(input.id);
    databaseConnection.close();
    res.status(204).send();
  } catch (err: any) {
    console.error(err);
    res.status(err.statusCode).json({
      name: err.name,
      message: err.message,
      action: err.action,
      status: err.statusCode,
    });
  }
};
