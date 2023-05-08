import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/utils/api";
import {
  type VehicleModelResponse,
  type VehicleMake,
  type VehicleMakeResponse,
} from "@/utils/vehicle";
import { type NextPage } from "next";
import { useEffect, useState } from "react";

type SearchVehicleModelProps = {
  onChange: (value: string) => void;
};

type selectedVehicleMake = {
  id: string;
  name: string;
};

const SearchVehicleModel: NextPage<SearchVehicleModelProps> = ({
  onChange,
}: SearchVehicleModelProps) => {
  const [selectedVehicleMake, setSelectedVehicleMake] =
    useState<selectedVehicleMake>();
  const [selectedVehicleModel, setSelectedVehicleModel] = useState<string>("");

  const [searchVehicleManufacturer, setSearchVehicleManufacturer] =
    useState<string>("");

  const [vehicleMakes, setVehicleMakes] = useState<VehicleMakeResponse>([]);
  const [vehicleModels, setVehicleModels] = useState<VehicleModelResponse>([]);

  const {
    data: vehicleMakesResponse,
    isLoading: isLoadingVehicleMake,
    isError: isErrorVehicleMake,
    error: errorVehicle,
  } = api.vehicle.getVehicleMakes.useQuery();

  const {
    data: vehicleModelsResponse,
    isLoading: isLoadingVehicleModel,
    isError: isErrorVehicleModel,
    error: errorVehicleModel,
    mutate: mutateVehicleModel,
    reset: resetVehicleModel,
    isSuccess: isSuccessVehicleModel,
  } = api.vehicle.getVehicleModels.useMutation();

  useEffect(() => {
    onChange(selectedVehicleModel);
  }, [selectedVehicleModel, onChange]);

  useEffect(() => {
    if (vehicleMakesResponse) {
      setVehicleMakes(vehicleMakesResponse.slice(0, 10));
    }
  }, [vehicleMakesResponse]);

  useEffect(() => {
    if (vehicleModelsResponse) {
      setVehicleModels(vehicleModelsResponse.slice(0, 10));
    }
  }, [vehicleModelsResponse]);

  useEffect(() => {
    if (vehicleMakesResponse) {
      if (searchVehicleManufacturer !== "") {
        console.log(searchVehicleManufacturer);
        const filteredVehicleMakes = vehicleMakesResponse.filter((vehicle) => {
          return vehicle.data.attributes.name
            .toLowerCase()
            .includes(searchVehicleManufacturer.toLowerCase());
        });

        console.log("filter", filteredVehicleMakes);

        setVehicleMakes(filteredVehicleMakes.slice(0, 10));
      } else {
        setVehicleMakes(vehicleMakesResponse.slice(0, 10));
      }
    }
  }, [searchVehicleManufacturer, vehicleMakesResponse]);

  const selectVehicleMake = (vehicle: VehicleMake) => {
    resetVehicleModel();
    setSelectedVehicleModel("");

    setSelectedVehicleMake({
      id: vehicle.data.id,
      name: vehicle.data.attributes.name,
    });

    mutateVehicleModel({
      vehicle_make_id: vehicle.data.id,
    });
  };

  return (
    <div
      className={`${
        selectedVehicleMake ? "flex flex-col gap-2 md:flex-row md:gap-4" : ""
      }`}
    >
      <div className="relative grid w-full items-center gap-1.5">
        <Label htmlFor="vehicle-model" className="text-base sm:text-lg">
          Your vehicle manufacturer
        </Label>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Input
              type="text"
              name="vehicle-manufacturer"
              required={true}
              placeholder="Vehicle manufacturer"
              className="text-base !opacity-100 md:py-6 md:text-xl"
              value={selectedVehicleMake?.name}
              disabled={true}
              style={{ cursor: "pointer" }}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 text-sm md:w-96">
            <Input
              type="search"
              name="search"
              required={true}
              placeholder="Search Vehicle Manufacturer"
              value={searchVehicleManufacturer}
              className="w-full text-base font-normal"
              onChange={(e) => setSearchVehicleManufacturer(e.target.value)}
            />
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="font-semibold">
              Suggested Manufacturer
            </DropdownMenuLabel>
            {isLoadingVehicleMake ? (
              <DropdownMenuItem>Loading Vehicle Manufacturer</DropdownMenuItem>
            ) : isErrorVehicleMake ? (
              <DropdownMenuItem>{errorVehicle.message}</DropdownMenuItem>
            ) : vehicleMakes.length === 0 ? (
              <DropdownMenuItem>Can not find the manufacturer</DropdownMenuItem>
            ) : (
              vehicleMakes.slice(0, 5).map((vehicle) => (
                <DropdownMenuItem
                  key={vehicle.data.id}
                  onClick={() => void selectVehicleMake(vehicle)}
                >
                  {vehicle.data.attributes.name}
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {selectedVehicleMake && (
        <div className="relative grid w-full items-center gap-1.5">
          <Label htmlFor="vehicle-model" className="text-base sm:text-lg">
            Your Vehicle Model
          </Label>

          {isLoadingVehicleModel && (
            <p className="mt-2">getting vehicle models...</p>
          )}

          {isErrorVehicleModel && (
            <p className="mt-2">{errorVehicleModel.message}</p>
          )}

          {isSuccessVehicleModel && (
            <Select
              value={selectedVehicleModel}
              onValueChange={(value) => setSelectedVehicleModel(value)}
              required={true}
            >
              <SelectTrigger className="border-slate-600 text-base md:py-6 md:text-xl">
                <SelectValue placeholder="Vehicle Model" />
              </SelectTrigger>
              <SelectContent className="bg-white text-sm">
                <SelectItem value="">Select Vehicle Model</SelectItem>
                {vehicleModels.map((vehicle) => (
                  <SelectItem value={vehicle.data.id} key={vehicle.data.id}>
                    {vehicle.data.attributes.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchVehicleModel;
