import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { validationSchemaEstimateVehicleEmission } from "@/server/api/validation-schemas/estimation.schema";
import { EstimationEntity } from "@/server/business-logic/estimation.entity";

export const estimateVehicleRouter = createTRPCRouter({
  show: publicProcedure
    .input(validationSchemaEstimateVehicleEmission)
    .mutation(async ({ input }) => {
      return new EstimationEntity().estimateVehicleEmissions(input);
    }),
});
