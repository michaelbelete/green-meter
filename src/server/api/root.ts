import { createTRPCRouter } from "@/server/api/trpc";
import { airportRouter } from "@/server/api/routers/airport";
import { carbonRouter } from "@/server/api/routers/carbon";
import { vehicleRouter } from "@/server/api/routers/vehicle";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  airport: airportRouter,
  carbon: carbonRouter,
  vehicle: vehicleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
