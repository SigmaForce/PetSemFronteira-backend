import z from "zod";

export const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(6, "Must have at least 6 characters"),
  newPassword: z.string().min(6, "Must have at least 6 characters"),
});
