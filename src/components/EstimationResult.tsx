import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type FlightEstimationResponse,
  calculateFlightDuration,
  convertKilometersToMiles,
} from "@/utils/flight";
import { ChevronLeftIcon, XIcon } from "lucide-react";
import Link from "next/link";
import type { FunctionComponent } from "react";
type EstimationsResultProps = {
  estimationResult: FlightEstimationResponse;
  reset: () => void;
};

const EstimationsResult: FunctionComponent<EstimationsResultProps> = ({
  estimationResult,
  reset,
}: EstimationsResultProps) => {
  return (
    <>
      <Card className="relative">
        <CardHeader>
          <CardDescription className="font-semibold">
            A&nbsp;
            {estimationResult.data.attributes.legs?.length === 1
              ? "one way"
              : "round"}{" "}
            trip from{" "}
            {estimationResult.data.attributes.legs[0]?.departure_airport} to{" "}
            {estimationResult.data.attributes.legs[0]?.destination_airport}
          </CardDescription>
          <CardTitle className="pt-2 text-base font-normal md:pt-0 md:text-lg">
            Your carbon dioxide emission for your flight is&nbsp;
            <b className="font-semibold underline">
              {`${estimationResult.data.attributes.carbon_kg} Kilogram(Kg) / ${estimationResult.data.attributes.carbon_lb} Pounds(lb)`}
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
        <CardContent>
          <h2 className="text-lg"></h2>

          <h3 className="mt-2 underline">More details about your flight</h3>
          <ul className="mt-2 list-inside list-disc text-xs md:text-sm">
            <li>
              <b>Flight distance:</b>
              {` ${
                estimationResult.data.attributes.distance_value
              } Km / ${convertKilometersToMiles(
                estimationResult.data.attributes.distance_value
              )} mi`}
            </li>
            <li>
              <b>
                Flight duration:{" "}
                {calculateFlightDuration(
                  estimationResult.data.attributes.distance_value
                )}
              </b>
            </li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="pr-4 text-sm" size="sm" onClick={reset}>
            <ChevronLeftIcon />
            &nbsp;Go back
          </Button>
        </CardFooter>
      </Card>

      <Link
        href="https://www.icao.int/environmental-protection/CarbonOffset/Documents/Methodology%20ICAO%20Carbon%20Calculator_v11-2018.pdf"
        target="_blank"
        className="mt-4"
      >
        <Button variant="link" className="text-sm">
          Learn more about&nbsp;carbon emissions calculator methodology
        </Button>
      </Link>
    </>
  );
};

export default EstimationsResult;
