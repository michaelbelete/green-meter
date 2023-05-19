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
  validationSchemaEstimateVehicleEmission,
  type VehicleEstimationResponse,
} from "@/server/api/validation-schemas/estimation.schema";
import { type NextPage } from "next";
import { useZodForm } from "@/hooks/use-zod-form";
import { handlePromise } from "@/lib/utils";

const VehiclePage: NextPage = () => {
  const [selectedVehicleModel, setSelectedVehicleModel] = useState<string>("");

  const estimateVehicleMutation = api.estimateVehicle.show.useMutation();

  const form = useZodForm({
    schema: validationSchemaEstimateVehicleEmission,
  });

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

      <CardContent>
        <form
          onSubmit={handlePromise(
            form.handleSubmit((data) => console.log("form", data))
          )}
          className="flex flex-col gap-4"
        >
          <SearchVehicleModel
            onClick={setSelectedVehicleModel}
            register={form.register}
            formState={form.formState}
          />

          <div className="flex flex-col gap-3">
            <Label>Your Travel Distance</Label>
            <div className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-1 md:space-x-2">
              <div className="md:w-9/12">
                <Input
                  type="number"
                  placeholder="Enter your travel distance"
                  disabled={estimateVehicleMutation.isLoading}
                  {...form.register("distance_value", { valueAsNumber: true })}
                />
                {form.formState.errors.distance_value?.message && (
                  <p className="text-red-600">
                    {form.formState.errors.distance_value?.message}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/4">
                <Select
                  disabled={estimateVehicleMutation.isLoading}
                  {...form.register("distance_unit")}
                >
                  <SelectTrigger className="w-full">
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
                {form.formState.errors.distance_unit?.message && (
                  <p className="text-red-600">
                    {form.formState.errors.distance_unit?.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-2 flex justify-end gap-4">
            <Button
              type="submit"
              className="text-semibold w-full text-white md:w-auto"
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
        </form>
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
