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
  const { jwtVerify } = await import("jose");
  const { payload } = await jwtVerify(value, secretKey, {
    algorithms: ["HS256"],
  });
  return payload;
};
