import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { Doc } from "@prisma/client";
import { TRPCError } from "@trpc/server";

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

  getAllCollaborationsByDocId: protectedProcedure
    .input(
      z.object({
        docId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { prisma } = ctx;
      const { docId } = input;

      let doc: Doc | null = null;

      try {
        doc = await prisma.doc.findUnique({
          where: {
            id: docId,
          },
        });
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }

      if (!doc) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Doc not found",
        });
      }

      return prisma.collaboration.findMany({
        where: {
          docId,
        },
        select: {
          id: true,
          accessLevel: true,
          collaborator: {
            select: {
              name: true,
              id: true,
              image: true,
            },
          },
        },
      });
    }),
});
