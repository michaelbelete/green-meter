import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { validationSchemaShowAirport } from "@/server/api/validation-schemas/airport.schema";
import AirportEntity from "@/server/business-logic/airport.entity";

export const airportRouter = createTRPCRouter({
  show: publicProcedure
    .input(validationSchemaShowAirport)
    .query(async ({ input }) => {
      return new AirportEntity().show(input);
    }),
});
