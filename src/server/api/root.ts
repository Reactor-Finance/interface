import { userRouter } from "@/server/api/routers/user";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { utilsRouter } from "./routers/utils";
import { tokensRouter } from "./routers/tokens";
import { poolsRouter } from "./routers/pools";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  utils: utilsRouter,
  tokens: tokensRouter,
  pool: poolsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.user.all();
 *       ^? user[]
 */
export const createCaller = createCallerFactory(appRouter);
