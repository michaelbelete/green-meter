export type FlightLegs = {
  departure_airport: string;
  destination_airport: string;
};

export type FlightEstimationResponse = {
  data: {
    id: string;
    type: string;
    attributes: {
      passengers: number;
      legs: FlightLegs[];
      distance_value: number;
      distance_unit: string;
      estimated_at: string;
      carbon_g: number;
      carbon_lb: number;
      carbon_kg: number;
      carbon_mt: number;
    };
  };
};
