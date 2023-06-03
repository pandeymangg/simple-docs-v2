import { z } from "zod";

export const registerUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type TRegisterForm = z.infer<typeof registerUserSchema>;

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  // avatar: z.string().url().optional(),

  // Workaround for optional string
  avatar: z.preprocess(
    (avatar) => {
      if (!avatar || typeof avatar !== "string") return undefined;
      return avatar === "" ? undefined : avatar;
    },
    z
      .string()
      .url({
        message: "Please enter a valid URL",
      })
      .optional()
  ),
});

export type TUpdateUserForm = z.infer<typeof updateUserSchema>;
