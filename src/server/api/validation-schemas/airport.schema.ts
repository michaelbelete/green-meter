import { z } from "zod";

export const validationSchemaSearchAirport = z.object({
  name: z.string(),
  limit: z.number().min(1).max(20).default(10),
});

export const validationSchemaShowAirport = z.object({
  limit: z.number().min(1).max(20).default(5),
});

export type ValidationSchemaSearchAirport = z.TypeOf<
  typeof validationSchemaSearchAirport
>;

export type ValidationSchemaShowAirport = z.TypeOf<
  typeof validationSchemaShowAirport
>;

export type FlightLegs = {
  departure_airport: string;
  destination_airport: string;
  cabin_class: "economy" | "premium";
};

export type FlightEstimationResponse = {
  data: {
    id: string;
    type: string;
    attributes: {
      passengers: number;
      legs: FlightLegs[];
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
