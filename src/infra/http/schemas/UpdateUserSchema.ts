import z from "zod";

export const UpdateUserSchema = z.object({
  nickName: z.string().optional(),
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().optional(),
  birthDate: z.coerce.date().optional(),
  phone: z.string().optional(),
  role: z.enum(["ADMIN", "USER", "ONG"]).optional(),
  status: z.boolean().optional(),
  description: z.string().optional(),
  image_url: z.string().optional(),
  userid: z.string().optional(),
});
