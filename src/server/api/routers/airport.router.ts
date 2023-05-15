import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  validationSchemaSearchAirport,
  validationSchemaShowRandomAirport,
} from "@/server/api/validation-schemas/airport.schema";
import AirportEntity from "@/server/business-logic/airport.entity";

export const airportRouter = createTRPCRouter({
  search: publicProcedure
    .input(validationSchemaSearchAirport)
    .query(async ({ input }) => {
      return new AirportEntity().search(input);
    }),
  showRandomAirport: publicProcedure
    .input(validationSchemaShowRandomAirport)
    .query(async ({ input }) => {
      return new AirportEntity().showRandomAirport(input);
    }),
});
