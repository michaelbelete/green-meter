import { z } from "zod";

export const validationSchemaSearchVehicleMakes = z.object({
  name: z.string(),
});

export const validationSchemaGetVehicleModels = z.object({
  vehicle_make_id: z.string(),
});

export type ValidationSchemaSearchVehicleMakes = z.TypeOf<
  typeof validationSchemaSearchVehicleMakes
>;

export type ValidationSchemaGetVehicleModels = z.TypeOf<
  typeof validationSchemaGetVehicleModels
>;
