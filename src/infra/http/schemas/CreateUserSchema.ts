import { z } from "zod";

export const createUserSchema = z.object({
  nickName: z.string().min(1, "nickName need to be defined"),
  email: z.string().email(),
  firstName: z.string().min(1, "firstName need to be defined"),
  lastName: z.string().min(1, "lastName need to be defined"),
  birthDate: z.coerce.date(),
  password: z.string().min(6, "password must be at least 6 characters"),
  phone: z.string().min(1, "phone need to be defined"),
  role: z.enum(["ADMIN", "USER", "ONG"]),
});
