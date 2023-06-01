import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  verifyCurrentUserHasDocAccess,
} from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const docRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.doc.create({
        data: {
          title: input.title,
          content: input.content ?? "",
          authorId: ctx.session.user.id,
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.doc.findMany({
      where: {
        authorId: ctx.session.user.id,
      },
    });
  }),

  getDocById: protectedProcedure
    .input(z.object({ docId: z.string() }))
    .use(verifyCurrentUserHasDocAccess)
    .query(({ ctx, input }) => {
      const { prisma, isUserAuthorizedToAccessDoc } = ctx;

      if (!isUserAuthorizedToAccessDoc) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to delete this document",
        });
      }

      return prisma.doc.findFirst({
        where: {
          id: input.docId,
        },
      });
    }),

  deleteDocById: protectedProcedure
    .input(z.object({ docId: z.string() }))
    .use(verifyCurrentUserHasDocAccess)
    .mutation(async ({ ctx, input }) => {
      const { isUserAuthorizedToAccessDoc, prisma } = ctx;
      const { docId } = input;

      if (!isUserAuthorizedToAccessDoc) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to delete this document",
        });
      }

      return prisma.doc.delete({
        where: {
          id: docId,
        },
      });
    }),

  updateDocById: protectedProcedure
    .input(
      z.object({
        docId: z.string(),
        title: z.string().optional(),
        content: z.string().optional(),
      })
    )
    .use(verifyCurrentUserHasDocAccess)
    .mutation(async ({ ctx, input }) => {
      const { isUserAuthorizedToAccessDoc, prisma } = ctx;
      const { docId, content, title } = input;

      if (!isUserAuthorizedToAccessDoc) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to update this document",
        });
      }

      return prisma.doc.update({
        where: {
          id: docId,
        },
        data: {
          title,
          content,
        },
      });
    }),
});
