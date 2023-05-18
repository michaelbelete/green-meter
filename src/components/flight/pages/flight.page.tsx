import { Layout } from "@/components/layout/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  AlertCircleIcon,
  ArrowLeftRightIcon,
  Loader2Icon,
  PlaneTakeoffIcon,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useState, type FormEvent } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { api } from "@/lib/api";
import SearchAirport from "@/components/flight/components/search-airport";
import { type Airports } from "@prisma/client";
import EstimationsResult from "@/components/flight/components/estimation-result";

const FlightPage = (props) => {
  const [from, setFrom] = useState<Airports["iata_code"]>();
  const [to, setTo] = useState<Airports["iata_code"]>();

  const {
    isError,
    isLoading,
    error,
    mutate: estimateMutation,
    data: estimationResult,
    reset,
  } = api.estimateFlight.show.useMutation();

  const estimateFlightEmission = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!from || !to) return;

    const formData = new FormData(e.currentTarget);

    const isOneWay = formData.get("oneWay") === "on";

    estimateMutation({
      type: "flight",
      passengers: Number(formData.get("passengers")),
      legs: [
        {
          departure_airport: from,
          destination_airport: to,
        },
        ...(!isOneWay
          ? [
              {
                departure_airport: to,
                destination_airport: from,
              },
            ]
          : []),
      ],
    });
  };

  return (
    <Layout>
      <h1 className="pb-4 text-3xl font-semibold tracking-tight">
        Flight Estimation
      </h1>
      {isError ? (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex flex-col gap-3">
            {error.message}
            <div>
              <Button className="text-sm" size="sm" onClick={reset}>
                Try again
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : estimationResult?.data ? (
        <EstimationsResult estimationResult={estimationResult} reset={reset} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your flight information</CardTitle>
            <CardDescription>
              Please enter your flight information below to calculate your
              carbon dioxide footprint.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => estimateFlightEmission(e)}
            >
              <div className="flex flex-col items-center gap-2 md:flex-row  md:gap-4 ">
                <SearchAirport name="from" onClick={setFrom} />
                <ArrowLeftRightIcon
                  size={50}
                  className="mt-5 hidden md:block"
                />
                <div className="grid w-full  items-center gap-2">
                  <SearchAirport name="to" onClick={setTo} />
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 md:flex-row md:gap-14 ">
                <div className="grid w-full  items-center gap-2">
                  <Label htmlFor="cabin-class">Cabin class</Label>
                  <Select
                    required={true}
                    name="cabinClass"
                    disabled={isLoading}
                  >
                    <SelectTrigger id="cabin-class">
                      <SelectValue placeholder="Select your cabin class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="economy"
                        className="hover:bg-slate-700"
                      >
                        Economy
                      </SelectItem>
                      <SelectItem
                        value="premium"
                        className="hover:bg-slate-700"
                      >
                        Premium
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="passenger">Passengers</Label>
                  <Input
                    type="number"
                    id="passengers"
                    min={1}
                    name="passengers"
                    required={true}
                    placeholder="Enter number of passengers"
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="one-way"
                  className="h-6 w-6"
                  name="oneWay"
                  disabled={isLoading}
                />
                <label
                  htmlFor="one-way"
                  id="one-way"
                  className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  One-Way
                </label>
              </div>
              <div className="mt-2 flex justify-end gap-4">
                <Button
                  type="submit"
                  variant="default"
                  className="text-semibold text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2Icon className="animate-spin" />
                      &nbsp;Estimating...
                    </>
                  ) : (
                    <>
                      <PlaneTakeoffIcon />
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

export default FlightPage;
