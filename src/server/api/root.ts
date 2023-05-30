import { createTRPCRouter } from "@/server/api/trpc";
import { docRouter } from "./routers/doc";
import { authRouter } from "./routers/auth";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  doc: docRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
