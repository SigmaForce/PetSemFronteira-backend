import { NextFunction, Request, Response } from "express";
import { InvalidCredentialsError } from "../../../shared/errors/Errors";
import { decrypt } from "../../../shared/utils/jwt";

interface AuthRequest extends Request {
  user?: any;
}

export async function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"]?.replace("Bearer ", "");

  if (!token) {
    const Error = new InvalidCredentialsError({
      message: "Token is required!",
    });

    res.status(Error.statusCode).json({
      name: Error.name,
      message: Error.message,
      action: Error.action,
      status: Error.statusCode,
    });
    return;
  }

  try {
    const tokenDecoded = await decrypt(token);
    console.log(tokenDecoded);
    if (tokenDecoded.exp && tokenDecoded.exp < Date.now() / 1000) {
      const Error = new InvalidCredentialsError({
        message: "Token expired!",
      });

      res.status(Error.statusCode).json({
        name: Error.name,
        message: Error.message,
        action: Error.action,
        status: Error.statusCode,
      });

      return;
    }

    req.user = tokenDecoded;
    next();
  } catch (error: any) {
    console.error(error);

    res.status(error.statusCode || 401).json({
      name: error.name,
      message: error.message,
      action: error.action,
      status: error.statusCode || 401,
    });
    return;
  }
}
