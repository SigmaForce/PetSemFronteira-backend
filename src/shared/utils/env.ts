import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  JWT_SECRET: z.string(),
  DB_CONNECTION: z.string().url(),
});

export const env = envSchema.parse(process.env);
