import { z } from "zod";

export const validationSchemaSearchAirport = z.object({
  name: z.string(),
  limit: z.number().min(1).max(20).default(10),
});

export const validationSchemaShowRandomAirport = z.object({
  limit: z.number().min(1).max(20).default(5),
});

export type ValidationSchemaSearchAirport = z.TypeOf<
  typeof validationSchemaSearchAirport
>;

export type ValidationSchemaShowRandomAirport = z.TypeOf<
  typeof validationSchemaShowRandomAirport
>;
