import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { validationSchemaEstimateFlightEmission } from "@/server/api/validation-schemas/estimation.schema";
import { EstimationEntity } from "@/server/business-logic/estimation.entity";

export const estimateFlightRouter = createTRPCRouter({
  show: publicProcedure
    .input(validationSchemaEstimateFlightEmission)
    .mutation(async ({ input }) => {
      return new EstimationEntity().estimateFlightEmissions(input);
    }),
});
