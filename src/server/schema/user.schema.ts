import { z } from "zod";

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type TRegisterForm = z.infer<typeof registerUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  avatar: z.string().url().optional(),
});

export type TUpdateUserForm = z.infer<typeof updateUserSchema>;
