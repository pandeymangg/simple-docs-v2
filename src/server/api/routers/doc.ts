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
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.doc.findFirst({
        where: {
          id: input.id,
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
          message: "You are not authorized to delete this doc",
        });
      }

      return prisma.doc.delete({
        where: {
          id: docId,
        },
      });
    }),
});
