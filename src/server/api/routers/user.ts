import { updateUserSchema } from "@/server/schema/user.schema";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  update: protectedProcedure
    .input(updateUserSchema)
    .mutation(({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { image, name } = input;

      return prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          name,
          image: image || null,
        },
      });
    }),
});
