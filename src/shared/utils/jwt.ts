import { InternalServerError, InvalidCredentialsError } from "../errors/Errors";
import { env } from "./env";

const secretKey = new TextEncoder().encode(env.JWT_SECRET);

type encryptProps = {
  email: string;
  role: string;
  id: string;
};

export const encrypt = async (payload: encryptProps) => {
  const { SignJWT } = await import("jose");
  const result = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(secretKey);

  return result;
};

export const decrypt = async (value: string) => {
  try {
    const { jwtVerify, errors } = await import("jose");
    const { payload } = await jwtVerify(value, secretKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (err: any) {
    console.error("Erro ao decodificar token:", err);

    if (err.code === "ERR_JWS_INVALID") {
      throw new InvalidCredentialsError({
        message: "Invalid token.",
        cause: err,
      });
    }

    throw new InternalServerError({ cause: err });
  }
};
