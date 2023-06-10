import { createTRPCRouter, protectedProcedure } from "../trpc";

export const collaborationRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { prisma, session } = ctx;

    return prisma.collaboration.findMany({
      where: {
        collaboratorId: session.user.id,
      },
      select: {
        doc: {
          select: {
            title: true,
            id: true,
            author: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
      },
    });
  }),
});
