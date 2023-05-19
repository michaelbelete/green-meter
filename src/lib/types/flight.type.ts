import { z } from "zod";

const validationSchemaEstimateFlightEmission = z.object({
  passengers: z.number(),
  legs: z.array(
    z.object({
      departure_airport: z.string(),
      destination_airport: z.string(),
    })
  ),
  distance_value: z.number(),
  distance_unit: z.string(),
  estimated_at: z.string(),
  carbon_g: z.number(),
  carbon_lb: z.number(),
  carbon_kg: z.number(),
  carbon_mt: z.number(),
});

export type FlightEstimationResponse = z.TypeOf<
  typeof validationSchemaEstimateFlightEmission
>;
