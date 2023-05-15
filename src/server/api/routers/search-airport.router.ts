import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { validationSchemaSearchAirport } from "@/server/api/validation-schemas/airport.schema";
import AirportEntity from "@/server/business-logic/airport.entity";

export const searchAirportRouter = createTRPCRouter({
  show: publicProcedure
    .input(validationSchemaSearchAirport)
    .query(async ({ input }) => {
      return new AirportEntity().searchAirports(input);
    }),
});
