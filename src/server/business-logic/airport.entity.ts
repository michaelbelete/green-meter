import { prisma } from "@/server/db";
import type {
  ValidationSchemaSearchAirport,
  ValidationSchemaShowRandomAirport,
} from "@/server/api/validation-schemas/airport.schema";
import { type Airports } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export default class AirportEntity {
  async search(input: ValidationSchemaSearchAirport) {
    const airports = await prisma.airports.findMany({
      take: input.limit,
      where: {
        name: {
          contains: input.name.toLowerCase(),
          mode: "insensitive",
        },
      },
    });

    this.validateIfAirportExists(airports);

    return airports;
  }

  async showRandomAirport(input: ValidationSchemaShowRandomAirport) {
    const airports = await prisma.airports.findMany({
      take: input.limit,
    });

    return airports;
  }

  private validateIfAirportExists(airport: Airports[]) {
    if (!airport) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Airport not found",
      });
    }
  }
}
