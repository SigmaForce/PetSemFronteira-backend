import { Request, Response } from "express";
import { z, ZodError } from "zod";
import AuthenticateUser from "../../../application/usecase/User/AuthenticateUser";
import ChangePassword from "../../../application/usecase/User/ChangePassword";
import CreateUser from "../../../application/usecase/User/CreateUser";
import { UpdateUser } from "../../../application/usecase/User/UpdateUser";
import { BadRequestError } from "../../../shared/errors/Errors";
import { isEmpty } from "../../../shared/utils/IsEmpty";
import { pgPromiseAdapter } from "../../database/config/DatabaseConnection";
import UserRepositoryDatabase from "../../database/repository/UserRepositoryDatabase";
import { ChangePasswordSchema } from "../schemas/ChangePasswordSchema";
import { createUserSchema } from "../schemas/CreateUserSchema";
import { UpdateUserSchema } from "../schemas/UpdateUserSchema";

const paramSchema = z.object({
  id: z.string().min(1, "Need to provide a identifier."),
});

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Need to provide a password."),
});

export const authenticateUser = async (req: Request, res: Response) => {
  const databaseConnection = new pgPromiseAdapter();
  const userRepository = new UserRepositoryDatabase(databaseConnection);
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

    const auth = new AuthenticateUser(userRepository);

    const token = await auth.execute(input);
    res.status(200).json(token);
  } catch (err: any) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      name: err.name,
      message: err.message,
      action: err.action,
      status: err.statusCode,
    });
  } finally {
    databaseConnection.close();
  }
};

export const createUser = async (req: Request, res: Response) => {
  const databaseConnection = new pgPromiseAdapter();
  const userRepository = new UserRepositoryDatabase(databaseConnection);
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
    const createUser = new CreateUser(userRepository);
    const userId = await createUser.execute(input);

    res.status(201).json({
      userId: userId?.userId,
    });
  } catch (err: any) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      name: err.name,
      message: err.message,
      action: err.action,
      status: err.statusCode,
    });
  } finally {
    databaseConnection.close();
  }
};

export const getUser = async (req: Request, res: Response) => {
  const databaseConnection = new pgPromiseAdapter();
  const userRepository = new UserRepositoryDatabase(databaseConnection);
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

    const user = await userRepository.findById(input.id);

    if (!user) res.status(204).json(user);

    if (user) res.status(200).json(user);
  } catch (err: any) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      name: err.name,
      message: err.message,
      action: err.action,
      status: err.statusCode,
    });
  } finally {
    databaseConnection.close();
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const databaseConnection = new pgPromiseAdapter();
  const userRepository = new UserRepositoryDatabase(databaseConnection);
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

    await userRepository.delete(input.id);
    res.status(204).send();
  } catch (err: any) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      name: err.name,
      message: err.message,
      action: err.action,
      status: err.statusCode,
    });
  } finally {
    databaseConnection.close();
  }
};

export const changePassword = async (req: Request, res: Response) => {
  const databaseConnection = new pgPromiseAdapter();
  const userRepository = new UserRepositoryDatabase(databaseConnection);
  try {
    const changePassword = new ChangePassword(userRepository);

    let input = undefined;
    let userId = undefined;
    try {
      input = ChangePasswordSchema.parse(req.body);
      userId = paramSchema.parse({ id: req.params.id });
    } catch (err) {
      if (err instanceof ZodError) {
        throw new BadRequestError({ cause: err });
      }
      throw err;
    }

    const { oldPassword, newPassword } = input;

    await changePassword.execute({
      userId: userId.id,
      oldPassword,
      newPassword,
    });

    res.status(200).send({
      message: "Password changed successfully",
    });
  } catch (err: any) {
    res.status(err.statusCode || 500).json({
      name: err.name,
      message: err.message,
      action: err.action,
      status: err.statusCode,
    });
  } finally {
    databaseConnection.close();
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const databaseConnection = new pgPromiseAdapter();
  const userRepository = new UserRepositoryDatabase(databaseConnection);
  try {
    const updateUser = new UpdateUser(userRepository);
    let input = undefined;
    let userId = undefined;
    try {
      input = UpdateUserSchema.parse(req.body);
      userId = paramSchema.parse({ id: req.params.id });
    } catch (err) {
      if (err instanceof ZodError) {
        throw new BadRequestError({ cause: err });
      }
      throw err;
    }

    if (isEmpty(input)) {
      res.status(204).send();
    }

    let userData = {
      userId: userId.id,
      ...input,
    };

    await updateUser.execute(userData);

    res.status(204).send();
  } catch (err: any) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      name: err.name,
      message: err.message,
      action: err.action,
      status: err.statusCode,
    });
  } finally {
    databaseConnection.close();
  }
};
