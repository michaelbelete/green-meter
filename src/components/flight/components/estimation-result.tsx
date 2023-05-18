import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type FlightEstimationResponse } from "@/lib/types/flight.type";
import {
  calculateFlightDuration,
  convertKilometersToMiles,
} from "@/components/flight/utils/calculate";
import { XIcon } from "lucide-react";
import Link from "next/link";

type EstimationsResultProps = {
  estimationResult: FlightEstimationResponse;
  reset: () => void;
};

const EstimationsResult: React.FC<EstimationsResultProps> = ({
  estimationResult,
  reset,
}: EstimationsResultProps) => {
  const { attributes } = estimationResult.data;

  const isOneWayTrip = attributes.legs?.length === 1;
  const departureAirport = attributes.legs[0]?.departure_airport;
  const destinationAirport = attributes.legs[0]?.destination_airport;
  const carbonKg = attributes.carbon_kg;
  const carbonLb = attributes.carbon_lb;
  const flightDistance = attributes.distance_value;
  const flightDuration = calculateFlightDuration(flightDistance);
  const flightDistanceMiles = convertKilometersToMiles(flightDistance);

  return (
    <Card className="relative">
      <CardHeader>
        <CardDescription className="font-semibold">
          {isOneWayTrip ? "One-way" : "Round"} trip from {departureAirport} to{" "}
          {destinationAirport}
        </CardDescription>
        <CardTitle className="pt-2 text-base font-normal md:pt-0 md:text-lg">
          Your carbon dioxide emission for your flight is&nbsp;
          <b className="font-semibold underline">
            {`${carbonKg} Kilogram(Kg) / ${carbonLb} Pounds(lb)`}
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
            <b>Flight distance:</b>{" "}
            {`${flightDistance} Km / ${flightDistanceMiles} mi`}
          </li>
          <li>
            <b>Flight duration:</b> {flightDuration}
          </li>
        </ul>
      </CardContent>
      <CardFooter>
        <Link
          href="https://www.icao.int/environmental-protection/CarbonOffset/Documents/Methodology%20ICAO%20Carbon%20Calculator_v11-2018.pdf"
          target="_blank"
          className="mt-6 hover:underline"
        >
          Learn more about carbon emissions calculator methodology
        </Link>
      </CardFooter>
    </Card>
  );
};

export default EstimationsResult;
