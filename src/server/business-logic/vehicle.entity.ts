import { carbonApi } from "@/lib/carbonApi";
import {
  type VehicleMakeResponse,
  type ValidationSchemaGetVehicleModels,
  type ValidationSchemaSearchVehicleMakes,
  type VehicleModelResponse,
} from "@/server/api/validation-schemas/vehicle.schema";

export default class VehicleEntity {
  async searchVehicleMakes(input: ValidationSchemaSearchVehicleMakes) {
    const { data } = await carbonApi.get<VehicleMakeResponse>("/vehicle_makes");

    const filteredData = data.filter((vehicle) => {
      return vehicle.data.attributes.name
        .toLowerCase()
        .includes(input.name.toLowerCase());
    });

    return filteredData;
  }

  async getVehicleModels(input: ValidationSchemaGetVehicleModels) {
    const { data } = await carbonApi.get<VehicleModelResponse>(
      `/vehicle_makes/${input.vehicle_make_id}/vehicle_models`
    );

    return data;
  }
}
