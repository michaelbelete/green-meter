import { prisma } from "@/server/db";
import type {
  ValidationSchemaSearchAirport,
  ValidationSchemaShowAirport,
} from "@/server/api/validation-schemas/airport.schema";
import { type Airports } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export default class AirportEntity {
  async show(input: ValidationSchemaShowAirport) {
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

  async searchAirports(input: ValidationSchemaSearchAirport) {
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
}
