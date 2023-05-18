import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { validationSchemaGetVehicleModels } from "@/server/api/validation-schemas/vehicle.schema";
import VehicleEntity from "@/server/business-logic/vehicle.entity";

export const getVehicleModelsRouter = createTRPCRouter({
  show: publicProcedure
    .input(validationSchemaGetVehicleModels)
    .mutation(async ({ input }) => {
      return new VehicleEntity().getVehicleModels(input);
    }),
});
