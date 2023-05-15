export type VehicleMake = {
  data: {
    id: string;
    type: string;
    attributes: {
      name: string;
      number_of_models: number;
    };
  };
};

export type VehicleMakeResponse = VehicleMake[];

export type VehicleEstimationResponse = {
  data: {
    id: string;
    type: string;
    attributes: {
      distance_value: number;
      vehicle_make: string;
      vehicle_model: string;
      vehicle_year: number;
      vehicle_model_id: string;
      distance_unit: string;
      estimated_at: string;
      carbon_g: number;
      carbon_lb: number;
      carbon_kg: number;
      carbon_mt: number;
    };
  };
};

export type vehicleModel = {
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

export type VehicleModelResponse = vehicleModel[];
