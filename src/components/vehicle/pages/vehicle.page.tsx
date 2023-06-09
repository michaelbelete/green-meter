import { useState } from "react";
import { Layout } from "@/components/layout/layout";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { CarIcon, Loader2Icon, XIcon } from "lucide-react";
import SearchVehicleModel from "@/components/vehicle/components/search-vehicle-model";
import {
  type ValidationSchemaEstimateVehicleEmission,
  type VehicleEstimationResponse,
} from "@/server/api/validation-schemas/estimation.schema";
import { type NextPage } from "next";

const VehiclePage: NextPage = () => {
  const [distanceUnit, setDistanceUnit] =
    useState<ValidationSchemaEstimateVehicleEmission["distance_unit"]>("km");
  const [distanceValue, setDistanceValue] =
    useState<ValidationSchemaEstimateVehicleEmission["distance_value"]>();
  const [selectedVehicleModel, setSelectedVehicleModel] =
    useState<ValidationSchemaEstimateVehicleEmission["vehicle_model_id"]>("");

  const estimateVehicleMutation = api.estimateVehicle.show.useMutation();

  const estimateVehicleEmission = () => {
    if (!selectedVehicleModel || !distanceValue || !distanceUnit) return;

    estimateVehicleMutation.mutate({
      type: "vehicle",
      distance_unit: distanceUnit,
      distance_value: distanceValue,
      vehicle_model_id: selectedVehicleModel,
    });

    setDistanceUnit("km");
    setDistanceValue(undefined);
    setSelectedVehicleModel("");
  };

  const renderErrorAlert = () => (
    <Alert className="mb-4" variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {estimateVehicleMutation.error?.message}
        <div>
          <Button className="ml-2" onClick={estimateVehicleMutation.reset}>
            Retry
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );

  const renderEstimatedEmissionCard = (
    estimatedEmission: VehicleEstimationResponse["data"]
  ) => (
    <Card className="relative">
      <CardHeader>
        <CardDescription className="font-semibold">
          A {estimatedEmission.attributes.distance_value}{" "}
          {estimatedEmission.attributes.distance_unit === "mi"
            ? "Miles"
            : "Kilometer"}{" "}
          trip with a <u>{estimatedEmission.attributes.vehicle_model}</u>
        </CardDescription>

        <CardTitle className="pt-2 text-base font-normal md:pt-0 md:text-lg">
          Your estimated carbon dioxide emission for your trip is{" "}
          <b className="font-semibold underline">
            {estimatedEmission.attributes.carbon_kg} Kilogram(Kg) /{" "}
            {estimatedEmission.attributes.carbon_lb} Pound(lb)
          </b>
        </CardTitle>

        <Button
          variant="ghost"
          className="absolute right-4 top-0 p-0"
          onClick={estimateVehicleMutation.reset}
        >
          <XIcon size={35} />
        </Button>
      </CardHeader>
    </Card>
  );

  const renderTravelInformationCard = () => (
    <Card>
      <CardHeader>
        <CardTitle>Your travel information</CardTitle>
        <CardDescription>
          Please enter your travel information below to calculate your carbon
          dioxide emission.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <SearchVehicleModel onClick={setSelectedVehicleModel} />

        <div className="flex flex-col gap-3">
          <Label>Your Travel Distance</Label>
          <div className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-1 md:space-x-2">
            <Input
              type="number"
              name="distance_value"
              placeholder="Enter your travel distance"
              className="md:w-9/12"
              disabled={estimateVehicleMutation.isLoading}
              onChange={(e) => {
                setDistanceValue(Number(e.currentTarget.value));
              }}
              value={distanceValue}
            />

            <Select
              name="distance_unit"
              disabled={estimateVehicleMutation.isLoading}
              value={distanceUnit}
              onValueChange={(
                value: ValidationSchemaEstimateVehicleEmission["distance_unit"]
              ) => setDistanceUnit(value)}
            >
              <SelectTrigger className="w-full md:w-1/4">
                <SelectValue placeholder="Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="km" className="hover:bg-slate-700">
                  Kilometer (Km)
                </SelectItem>
                <SelectItem value="mi" className="hover:bg-slate-700">
                  Mile (Mi)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-2 flex justify-end gap-4">
          <Button
            disabled={
              estimateVehicleMutation.isLoading ||
              !selectedVehicleModel ||
              !distanceValue ||
              !distanceUnit
            }
            className="text-semibold w-full text-white md:w-auto"
            onClick={() => void estimateVehicleEmission()}
          >
            {estimateVehicleMutation.isLoading ? (
              <>
                <Loader2Icon className="animate-spin" />
                &nbsp;Estimating...
              </>
            ) : (
              <>
                <CarIcon />
                &nbsp;Get estimation
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      <h1 className="pb-4 text-3xl font-semibold tracking-tight">
        Vehicle Estimation
      </h1>

      {estimateVehicleMutation.isError && renderErrorAlert()}

      {estimateVehicleMutation.data?.data
        ? renderEstimatedEmissionCard(estimateVehicleMutation.data.data)
        : renderTravelInformationCard()}
    </Layout>
  );
};

export default VehiclePage;
