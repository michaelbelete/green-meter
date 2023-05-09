import Dropdown, { type DropdownRef } from "@/components/dropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/utils/api";
import { CarIcon, FactoryIcon } from "lucide-react";
import { type NextPage } from "next";
import { useEffect, useState, useMemo, useRef } from "react";
import debounce from "lodash.debounce";

type SearchVehicleModelProps = {
  onClick: (value: string) => void;
};

type selectedVehicleMake = {
  id: string;
  name: string;
};

type selectedVehicleModel = {
  id: string;
  name: string;
};

const SearchVehicleModel: NextPage<SearchVehicleModelProps> = ({
  onClick,
}: SearchVehicleModelProps) => {
  const vehicleManufacturerRef = useRef<DropdownRef>(null);
  const vehicleModelRef = useRef<DropdownRef>(null);

  const [selectedVehicleMake, setSelectedVehicleMake] =
    useState<selectedVehicleMake>();
  const [selectedVehicleModel, setSelectedVehicleModel] =
    useState<selectedVehicleModel>();
  const [searchVehicleManufacturer, setSearchVehicleManufacturer] =
    useState<string>("");
  const [searchVehicleModel, setSearchVehicleModel] = useState<string>("");

  const {
    data: vehicleMakesResult,
    isLoading: isLoadingVehicleMake,
    isError: isErrorVehicleMake,
    error: errorVehicleMake,
  } = api.vehicle.searchVehicleMakes.useQuery({
    name: searchVehicleManufacturer,
  });

  const {
    data: vehicleModelsResponse,
    isLoading: isLoadingVehicleModel,
    isError: isErrorVehicleModel,
    error: errorVehicleModel,
    mutate: mutateVehicleModel,
    reset: resetVehicleModel,
  } = api.vehicle.getVehicleModels.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVehicleManufacturer(e.target.value);
  };

  const debouncedVehicleMakeResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedVehicleMakeResults.cancel();
    };
  });

  const renderVehicleManufacturer = () => {
    if (isLoadingVehicleMake) {
      return <li className="px-4 text-sm">Loading...</li>;
    }

    if (isErrorVehicleMake) {
      return <li className="px-4 text-sm">{errorVehicleMake.message}</li>;
    }

    if (vehicleMakesResult.length === 0) {
      return <li className="px-4 text-sm">Can not find the manufacturer</li>;
    }

    return vehicleMakesResult.slice(0, 8).map((vehicle) => (
      <li
        className="flex cursor-pointer items-center gap-2 px-5 py-1 text-sm hover:bg-slate-700"
        key={vehicle.data.id}
        onClick={() => {
          resetVehicleModel();
          setSelectedVehicleModel(undefined);
          setSelectedVehicleMake({
            id: vehicle.data.id,
            name: vehicle.data.attributes.name,
          });
          mutateVehicleModel({
            vehicle_make_id: vehicle.data.id,
          });
          vehicleManufacturerRef.current?.close();
        }}
      >
        <FactoryIcon />
        <span>{vehicle.data.attributes.name}</span>
      </li>
    ));
  };

  const renderVehicleModel = () => {
    if (isLoadingVehicleModel) {
      return <li className="px-4">Loading...</li>;
    }

    if (isErrorVehicleModel) {
      return <li className="px-4">{errorVehicleModel.message}</li>;
    }

    if (!vehicleModelsResponse) return;

    const vehicleModels = searchVehicleModel
      ? vehicleModelsResponse.filter((vehicle) =>
          vehicle.data.attributes.name
            .toLowerCase()
            .includes(searchVehicleModel.toLowerCase())
        )
      : vehicleModelsResponse;

    if (vehicleModels.length === 0) {
      return <li className="px-4">Can not find the model</li>;
    }

    return vehicleModels.slice(0, 8).map((vehicle) => (
      <li
        className="flex cursor-pointer items-center gap-2 px-4 py-1 text-sm hover:bg-slate-700"
        key={vehicle.data.id}
        onClick={() => {
          setSelectedVehicleModel({
            id: vehicle.data.id,
            name: vehicle.data.attributes.name,
          });
          onClick(vehicle.data.id);
          vehicleModelRef.current?.close();
        }}
      >
        <CarIcon />
        <span>
          {vehicle.data.attributes.year} {vehicle.data.attributes.name}
        </span>
      </li>
    ));
  };

  return (
    <div
      className={`${
        selectedVehicleMake ? "flex flex-col gap-2 md:flex-row md:gap-4" : ""
      }`}
    >
      <Dropdown
        ref={vehicleManufacturerRef}
        trigger={
          <>
            <Label htmlFor="vehicle-model">Your vehicle manufacturer</Label>
            <Input
              type="text"
              name="vehicle-manufacturer"
              required={true}
              placeholder="Vehicle manufacturer"
              className="!opacity-100"
              value={selectedVehicleMake?.name}
              disabled={true}
              style={{ cursor: "pointer" }}
            />
          </>
        }
      >
        <div className="px-4">
          <Input
            type="search"
            placeholder="Search Vehicle Manufacturer"
            className="w-full font-normal"
            onChange={debouncedVehicleMakeResults}
          />
        </div>
        <ul className="flex flex-col gap-1">{renderVehicleManufacturer()}</ul>
      </Dropdown>

      {selectedVehicleMake && (
        <Dropdown
          ref={vehicleModelRef}
          trigger={
            <>
              <Label htmlFor="vehicle-model">Your vehicle model</Label>
              <Input
                type="text"
                name="vehicle-model"
                required={true}
                placeholder="Vehicle model"
                className="!opacity-100"
                value={selectedVehicleModel?.name}
                disabled={true}
                style={{ cursor: "pointer" }}
              />
            </>
          }
        >
          <div className="px-4">
            <Input
              placeholder="Search Vehicle Model"
              value={searchVehicleModel}
              className="w-full font-normal"
              onChange={(e) => setSearchVehicleModel(e.target.value)}
            />
          </div>
          <ul className="flex flex-col gap-1">{renderVehicleModel()}</ul>
        </Dropdown>
      )}
    </div>
  );
};

export default SearchVehicleModel;
