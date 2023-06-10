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
    // .use(verifyCurrentUserHasDocAccess)
    .query(async ({ ctx, input }) => {
      const { prisma, session } = ctx;
      const { docId } = input;

      // check if user is owner or collaborator

      const doc = await prisma.doc.findUnique({
        where: {
          id: docId,
        },
      });

      if (!doc) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Document not found",
        });
      }

      const isUserDocAuthor = doc.authorId === session.user.id;

      const collaboration = await prisma.collaboration.findFirst({
        where: {
          docId: doc.id,
          collaboratorId: session.user.id,
        },
      });

      if (!isUserDocAuthor && !collaboration) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to access this document",
        });
      }

      return {
        doc,
        ...(collaboration && { collaboration }),
      };
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
