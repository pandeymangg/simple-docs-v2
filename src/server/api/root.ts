import { createTRPCRouter } from "@/server/api/trpc";
import { docRouter } from "./routers/doc";
import { authRouter } from "./routers/auth";
import { collaborationsRouter } from "./routers/collaborations";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  doc: docRouter,
  auth: authRouter,
  collaboration: collaborationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
