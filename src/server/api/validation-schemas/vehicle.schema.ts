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

type VehicleModel = {
  data: {
    id: string;
    type: string;
    attributes: {
      name: string;
      year: number;
      vehicle_make: string;
    };
  };
};

type VehicleMake = {
  data: {
    id: string;
    type: string;
    attributes: {
      name: string;
      number_of_models: number;
    };
  };
};

export type VehicleModelResponse = VehicleModel[];
export type VehicleMakeResponse = VehicleMake[];
