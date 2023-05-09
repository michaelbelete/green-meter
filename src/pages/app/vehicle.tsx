import Layout from "@/components/layout";
import SearchVehicleModel from "@/components/search-vehicle-model";
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
import { api } from "@/utils/api";
import { CarIcon, Loader2Icon, XIcon } from "lucide-react";
import { type NextPage } from "next";
import { useState } from "react";

const Vehicle: NextPage = () => {
  const [selectedVehicleModel, setSelectedVehicleModel] = useState<string>("");

  const {
    mutate,
    reset,
    error,
    isError,
    isLoading,
    data: estimatedEmission,
  } = api.carbon.estimateVehicleEmissions.useMutation();

  const estimateTransportEmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const distance_unit = formData.get("distance_unit")?.toString();
    const distance_value = Number(formData.get("distance_value"));

    if (!distance_unit || !distance_value) return;

    if (distance_unit !== "km" && distance_unit !== "mi") return;

    mutate({
      type: "vehicle",
      distance_unit: distance_unit,
      distance_value: distance_value,
      vehicle_model_id: selectedVehicleModel,
    });
  };

  return (
    <Layout title="Vehicle Estimation">
      {}
      {isError && (
        <Alert className="mb-4" variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error?.message}
            <div>
              <Button className="ml-2" onClick={reset}>
                Retry
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {estimatedEmission?.data ? (
        <Card className="relative">
          <CardHeader>
            <CardDescription className="font-semibold">
              A&nbsp;{estimatedEmission.data.attributes.distance_value}{" "}
              {estimatedEmission.data.attributes.distance_unit === "mi"
                ? "Miles"
                : "Kilometer"}{" "}
              trip with a{" "}
              <u>{estimatedEmission.data.attributes.vehicle_model}</u>
            </CardDescription>
            <CardTitle className="pt-2 text-base font-normal md:pt-0 md:text-lg">
              Your estimated carbon dioxide emission for your trip is{" "}
              <b className="font-semibold underline">
                {estimatedEmission.data.attributes.carbon_kg} Kilogram(Kg) /{" "}
                {estimatedEmission.data.attributes.carbon_lb} Pound(lb)
              </b>
            </CardTitle>
            <Button
              variant="ghost"
              className="absolute right-4 top-0 p-0"
              onClick={reset}
            >
              <XIcon size={35} />
            </Button>
          </CardHeader>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your travel information</CardTitle>
            <CardDescription>
              Please enter your travel information below to calculate your
              carbon dioxide emission.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={estimateTransportEmission}
              className="flex flex-col gap-4"
            >
              <SearchVehicleModel
                onClick={(value) => setSelectedVehicleModel(value)}
              />
              <div className="flex flex-col gap-3">
                <Label>Your Travel Distance</Label>
                <div className="flex w-full flex-col items-center gap-4 md:flex-row md:gap-1 md:space-x-2">
                  <Input
                    type="number"
                    name="distance_value"
                    placeholder="Enter your travel distance"
                    className="md:w-9/12"
                    disabled={isLoading}
                    required
                  />
                  <Select name="distance_unit" disabled={isLoading} required>
                    <SelectTrigger className="w-full border-slate-700 md:w-1/4">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 text-white">
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
                  disabled={isLoading || !selectedVehicleModel}
                  className="text-semibold w-full md:w-auto"
                >
                  {isLoading ? (
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
      )}
    </Layout>
  );
};

export default Vehicle;
