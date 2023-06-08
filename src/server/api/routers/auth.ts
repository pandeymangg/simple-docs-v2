import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { registerUserSchema } from "@/server/schema/user.schema";
import { hash } from "bcrypt";
import { TRPCError } from "@trpc/server";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(registerUserSchema)
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { email, password, name } = input;

      const isEmailTaken = await prisma.user.findUnique({
        where: { email },
      });

      if (isEmailTaken) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email is already taken",
        });
      }

      const hashedPassword = await hash(password, 12);

      return prisma.user.create({
        data: {
          email,
          name,
          hashedPassword,
        },
      });
    }),
});
