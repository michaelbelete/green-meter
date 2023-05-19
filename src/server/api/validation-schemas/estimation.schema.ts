import { z } from "zod";

export const validationSchemaEstimateFlightEmission = z.object({
  type: z.enum(["flight"]),
  passengers: z.number().min(1),
  legs: z.array(
    z.object({
      departure_airport: z.string().max(3),
      destination_airport: z.string().max(3),
    })
  ),
});

export const validationSchemaEstimateVehicleEmission = z.object({
  type: z.enum(["vehicle"]),
  distance_unit: z.enum(["mi", "km"]),
  distance_value: z.number().min(1),
  vehicle_model_id: z.string(),
});

export type ValidationSchemaEstimateFlightEmission = z.TypeOf<
  typeof validationSchemaEstimateFlightEmission
>;

export type ValidationSchemaEstimateVehicleEmission = z.TypeOf<
  typeof validationSchemaEstimateVehicleEmission
>;

export const validationSchemaVehicleEstimationResponse = z.object({
  data: z.object({
    id: z.string(),
    type: z.string(),
    attributes: z.object({
      distance_value: z.number(),
      vehicle_make: z.string(),
      vehicle_model: z.string(),
      vehicle_year: z.number(),
      vehicle_model_id: z.string(),
      distance_unit: z.string(),
      estimated_at: z.string(),
      carbon_g: z.number(),
      carbon_lb: z.number(),
      carbon_kg: z.number(),
      carbon_mt: z.number(),
    }),
  }),
});

export type VehicleEstimationResponse = z.TypeOf<
  typeof validationSchemaVehicleEstimationResponse
>;
