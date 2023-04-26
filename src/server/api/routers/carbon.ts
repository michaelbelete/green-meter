import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { type FlightEstimationResponse } from "@/utils/flight";
import { type VehicleEstimationResponse } from "@/utils/vehicle";

const flightLeg = z.object({
  departure_airport: z.string().max(3),
  destination_airport: z.string().max(3),
});

const estimateFlightEmissionsInput = z.object({
  type: z.enum(["flight"]),
  passengers: z.number().min(1),
  legs: z.array(flightLeg),
});

export type FlightEstimationRequest = z.input<
  typeof estimateFlightEmissionsInput
>;

// create a realtime procedure that search airports from prisma
export const carbonRouter = createTRPCRouter({
  estimateFlightEmissions: publicProcedure
    .input(estimateFlightEmissionsInput)
    .mutation(async ({ input, ctx }) => {
      const { type, passengers, legs } = input;

      const { data } = await ctx.carbonClient.post<FlightEstimationResponse>(
        "/estimates",
        {
          type,
          passengers,
          legs,
        }
      );

      return data;
    }),
  estimateVehicleEmissions: publicProcedure
    .input(
      z.object({
        type: z.enum(["vehicle"]),
        distance_unit: z.enum(["mi", "km"]),
        distance_value: z.number().min(1),
        vehicle_model_id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { type, distance_unit, distance_value, vehicle_model_id } = input;

      const { data } = await ctx.carbonClient.post<VehicleEstimationResponse>(
        "/estimates",
        {
          type,
          distance_unit,
          distance_value,
          vehicle_model_id,
        }
      );
      return data;
    }),
});
