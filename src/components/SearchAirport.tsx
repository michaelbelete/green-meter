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
import { api } from "@/utils/api";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

type SearchAirportProps = {
  name: string;
  onChange: (value: string) => void;
};

const SearchAirport: NextPage<SearchAirportProps> = ({
  name,
  onChange,
}: SearchAirportProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [iataCode, setIataCode] = useState<string>("");

  const {
    data: searchResult,
    error,
    isSuccess,
    isError,
    isLoading,
  } = api.airport.searchAirports.useQuery(
    { name: searchQuery },
    { refetchOnMount: false, enabled: !!searchQuery }
  );

  useEffect(() => {
    onChange(iataCode);
  }, [iataCode, onChange]);

  return (
    <div className="relative grid w-full items-center gap-1.5">
      <Label htmlFor="from" className="text-base capitalize sm:text-lg">
        {name}
      </Label>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Input
            type="text"
            name={name}
            required={true}
            placeholder={name}
            className="text-base !opacity-100 md:py-6 md:text-xl"
            value={iataCode}
            disabled={true}
            style={{ cursor: "pointer" }}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80">
          <Input
            type="search"
            name="search"
            required={true}
            placeholder="Search airports"
            value={searchQuery}
            className="w-full text-base font-normal"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <DropdownMenuSeparator />
          {isLoading && searchQuery && (
            <DropdownMenuItem>Loading airports...</DropdownMenuItem>
          )}
          {isError && <DropdownMenuItem>{error?.message}</DropdownMenuItem>}
          {isSuccess && searchResult.length === 0 && (
            <DropdownMenuItem>No airport found</DropdownMenuItem>
          )}
          {isSuccess && searchResult.length > 0 && !isLoading && !error && (
            <>
              <DropdownMenuLabel>Search Result</DropdownMenuLabel>
              {searchResult.map((result, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => setIataCode(result.iata_code)}
                >
                  {result.name}
                </DropdownMenuItem>
              ))}
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchAirport;
