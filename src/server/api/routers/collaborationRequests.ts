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
            id: true,
          },
        },
        requester: {
          select: {
            name: true,
            id: true,
            image: true,
          },
        },
      },
    });
  }),

  accept: protectedProcedure
    .input(
      z.object({
        requestId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { requestId } = input;

      const request = await prisma.collaborationRequest.findUnique({
        where: {
          id: requestId,
        },
      });

      if (!request) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Collaboration request does not exist!",
        });
      }

      await prisma.$transaction([
        prisma.collaborationRequest.update({
          where: {
            id: request.id,
          },
          data: {
            approvedStatus: "APPROVED",
          },
        }),

        prisma.collaboration.create({
          data: {
            collaboratorId: request.requesterId,
            docId: request.docId,
          },
        }),
      ]);

      return {
        success: true,
        message: "Collaboration request accepted!",
      };
    }),
});
