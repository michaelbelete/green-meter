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

export type FlightEstimationResponse = {
  data: {
    id: string;
    type: string;
    attributes: {
      passengers: number;
      legs: ValidationSchemaEstimateFlightEmission["legs"][];
      distance_value: number;
      distance_unit: string;
      estimated_at: string;
      carbon_g: number;
      carbon_lb: number;
      carbon_kg: number;
      carbon_mt: number;
    };
  };
};

export type VehicleEstimationResponse = {
  data: {
    id: string;
    type: string;
    attributes: {
      distance_value: number;
      vehicle_make: string;
      vehicle_model: string;
      vehicle_year: number;
      vehicle_model_id: string;
      distance_unit: string;
      estimated_at: string;
      carbon_g: number;
      carbon_lb: number;
      carbon_kg: number;
      carbon_mt: number;
    };
  };
};
