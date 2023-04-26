import { z } from "zod";

export const convertKilometersToMiles = (km: number) => {
  return Math.round(km * 0.621371);
};

export const calculateFlightDuration = (distanceKm: number) => {
  const minSpeed = 740;
  const maxSpeed = 930;

  const minDuration = distanceKm / maxSpeed;
  const maxDuration = distanceKm / minSpeed;

  if (minDuration === maxDuration) return `${Math.round(minDuration)} hours`;
  return `${Math.round(minDuration)} - ${Math.round(maxDuration)} hours`;
};

const flightLeg = z.object({
  departure_airport: z.string().max(3),
  destination_airport: z.string().max(3),
});

type FlightLeg = z.input<typeof flightLeg>;

export type FlightEstimationResponse = {
  data: {
    id: string;
    type: string;
    attributes: {
      passengers: number;
      legs: FlightLeg[];
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
