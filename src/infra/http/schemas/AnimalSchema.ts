import { z } from "zod";

export const createAnimalSchema = z.object({
  name: z.string().min(1, "Name need to be defined"),
  species: z.string().min(1, "Species need to be defined"),
  breed: z.string().optional(),
  gender: z.string().min(1, "Gender need to be defined"),
  age: z.number().min(1, "Age need to be defined"),
  size: z.string().min(1, "Size need to be defined"),
  status: z.string().min(1, "Status need to be defined"),
  description: z.string().min(1, "Description need to be defined"),
  image_url: z.string().optional(),
  location: z.string().optional(),
  user_id: z.string().min(1, "User_id need to be defined"),
});
