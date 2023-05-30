import { z } from "zod";

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type TRegisterForm = z.infer<typeof registerUserSchema>;
