import { Request, Response } from "express";
import { z, ZodError } from "zod";
import AuthenticateUser from "../../../application/usecase/User/AuthenticateUser";
import CreateUser from "../../../application/usecase/User/CreateUser";
import { BadRequestError } from "../../../shared/errors/Errors";
import { pgPromiseAdapter } from "../../database/config/DatabaseConnection";
import UserRepositoryDatabase from "../../database/repository/UserRepositoryDatabase";
import { createUserSchema } from "../schemas/CreateUserSchema";

const paramSchema = z.object({
  id: z.string().min(1, "Need to provide a identifier."),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Need to provide a password."),
});

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    let input;
    try {
      input = signInSchema.parse(req.body);
    } catch (err) {
      console.error(err);
      if (err instanceof ZodError) {
        throw new BadRequestError({ cause: err });
      }
      throw err;
    }

    const databaseConnection = new pgPromiseAdapter();
    const userRepository = new UserRepositoryDatabase(databaseConnection);
    const auth = new AuthenticateUser(userRepository);

    const token = await auth.execute(input);
    res.status(200).json(token);
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

export const createUser = async (req: Request, res: Response) => {
  try {
    let input;
    try {
      input = createUserSchema.parse(req.body);
    } catch (err) {
      if (err instanceof ZodError) {
        throw new BadRequestError({ cause: err });
      }
      throw err;
    }
    const databaseConnection = new pgPromiseAdapter();
    const userRepository = new UserRepositoryDatabase(databaseConnection);
    const createUser = new CreateUser(userRepository);
    const userId = await createUser.execute(input);

    res.status(201).json({
      userId: userId?.userId,
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

export const getUser = async (req: Request, res: Response) => {
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
    const userRepository = new UserRepositoryDatabase(databaseConnection);
    const user = await userRepository.findById(input.id);

    if (!user) res.status(204).json(user);

    if (user) res.status(200).json(user);
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

export const deleteUser = async (req: Request, res: Response) => {
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
    const userRepository = new UserRepositoryDatabase(databaseConnection);
    await userRepository.delete(input.id);
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
