import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  type VehicleModelResponse,
  type VehicleMakeResponse,
} from "@/utils/vehicle";

// create a realtime procedure that search airports from prisma
export const vehicleRouter = createTRPCRouter({
  getVehicleMakes: publicProcedure.query(async ({ ctx }) => {
    const { data } = await ctx.carbonClient.get<VehicleMakeResponse>(
      "/vehicle_makes"
    );

    return data;
  }),
  getVehicleModels: publicProcedure
    .input(
      z.object({
        vehicle_make_id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { vehicle_make_id } = input;

      const { data } = await ctx.carbonClient.get<VehicleModelResponse>(
        `/vehicle_makes/${vehicle_make_id}/vehicle_models`
      );

      return data;
    }),
});
