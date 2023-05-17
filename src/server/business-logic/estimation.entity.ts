import { carbonApi } from "@/lib/carbonApi";
import { type FlightEstimationResponse } from "@/lib/types/flight.type";
import {
  type ValidationSchemaEstimateVehicleEmission,
  type ValidationSchemaEstimateFlightEmission,
  type VehicleEstimationResponse,
} from "@/server/api/validation-schemas/estimation.schema";

export class EstimationEntity {
  async estimateFlightEmissions(input: ValidationSchemaEstimateFlightEmission) {
    const { type, passengers, legs } = input;

    const { data } = await carbonApi.post<FlightEstimationResponse>(
      "/estimates",
      {
        type,
        passengers,
        legs,
      }
    );

    return data;
  }

  async estimateVehicleEmissions(
    input: ValidationSchemaEstimateVehicleEmission
  ) {
    const { type, distance_unit, distance_value, vehicle_model_id } = input;

    const { data } = await carbonApi.post<VehicleEstimationResponse>(
      "/estimates",
      {
        type,
        distance_unit,
        distance_value,
        vehicle_model_id,
      }
    );
    return data;
  }
}
