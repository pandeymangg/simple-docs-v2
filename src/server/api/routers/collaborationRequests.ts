import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const collaborationRequestsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ docId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { docId } = input;

      const doesRequestAlreadyExist = await prisma.collaborationRequest.count({
        where: {
          docId: docId,
          requesterId: session.user.id,
        },
      });

      if (doesRequestAlreadyExist > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message:
            "You have already sent a request to collaborate on this document",
        });
      }

      return prisma.collaborationRequest.create({
        data: {
          docId: docId,
          requesterId: session.user.id,
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const { prisma } = ctx;

    return prisma.collaborationRequest.findMany({
      where: {
        doc: {
          authorId: {
            equals: ctx.session.user.id,
          },
        },
      },
      select: {
        id: true,
        approvedStatus: true,
        doc: {
          select: {
            title: true,
          },
        },
        requester: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }),
});
