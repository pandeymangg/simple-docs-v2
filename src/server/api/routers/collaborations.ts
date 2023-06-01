import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const collaborationsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        docId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { docId } = input;

      return prisma.collaboration.create({
        data: {
          docId: docId,
          collaboratorId: session.user.id,
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    const { prisma, session } = ctx;

    return prisma.collaboration.findMany({
      where: {
        doc: {
          authorId: {
            equals: session.user.id,
          },
        },
      },
    });
  }),
});
