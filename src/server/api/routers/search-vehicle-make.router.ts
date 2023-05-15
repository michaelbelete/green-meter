import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { validationSchemaSearchVehicleMakes } from "@/server/api/validation-schemas/vehicle.schema";
import VehicleEntity from "@/server/business-logic/vehicle.entity";

export const searchVehicleMakeRouter = createTRPCRouter({
  show: publicProcedure
    .input(validationSchemaSearchVehicleMakes)
    .query(async ({ input }) => {
      return new VehicleEntity().searchVehicleMakes(input);
    }),
});
