import { createTRPCRouter } from "@/server/api/trpc";
import { examplePostRouter } from "@/server/api/routers/example-post.router";
import { airportRouter } from "@/server/api/routers/airport.router";
import { estimateFlightRouter } from "@/server/api/routers/estimate-flight.router";
import { estimateVehicleRouter } from "@/server/api/routers/estimate-vehicle.router";
import { searchAirportRouter } from "@/server/api/routers/search-airport.router";
import { getVehicleModelsRouter } from "@/server/api/routers/get-vehicle-models.router";
import { searchVehicleMakeRouter } from "@/server/api/routers/search-vehicle-make.router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  examplePost: examplePostRouter,
  airport: airportRouter,
  searchAirport: searchAirportRouter,
  searchVehicleMake: searchVehicleMakeRouter,
  getVehicleModel: getVehicleModelsRouter,
  estimateFlight: estimateFlightRouter,
  estimateVehicle: estimateVehicleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
