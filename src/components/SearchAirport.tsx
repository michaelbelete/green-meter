import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/utils/api";
import { PlaneTakeoffIcon, SearchIcon } from "lucide-react";
import type { NextPage } from "next";
import { useEffect, useState, useMemo } from "react";
import debounce from "lodash.debounce";
import { type Airports } from "@prisma/client";

type SearchAirportProps = {
  name: string;
  onClick: (value: string) => void;
};

const SearchAirport: NextPage<SearchAirportProps> = ({
  name,
  onClick,
}: SearchAirportProps) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [iataCode, setIataCode] = useState<string>("");

  const {
    data: searchResults,
    error: searchResultError,
    isLoading: isSearchResultLoading,
  } = api.airport.searchAirports.useQuery({ name: searchTerm, limit: 8 });

  const {
    data: suggestedAirports,
    error: suggestedAirportsError,
    isLoading: isSuggestedAirportLoading,
  } = api.airport.showRandomAirports.useQuery();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  type renderAirportListProp = {
    airports: Airports[] | undefined;
    isLoading: boolean;
    error: typeof searchResultError;
  };

  const renderAirportList = (props: renderAirportListProp) => {
    const { isLoading, error, airports } = props;

    if (isLoading) {
      return <li className="px-4">Searching...</li>;
    }

    if (error) {
      return <li className="px-4">{error.message}</li>;
    }

    if (!airports) return;

    if (airports.length === 0) {
      return <li className="px-4">No airport found</li>;
    }

    return airports.map((airport, index) => (
      <li
        className="flex cursor-pointer gap-2 px-4 py-1 hover:bg-slate-700"
        key={index}
        onClick={() => {
          onClick(airport.iata_code);
          setIataCode(airport.iata_code);
          setShowDropdown(false);
          setSearchTerm("");
        }}
      >
        <PlaneTakeoffIcon />
        <span>{airport.name}</span>
      </li>
    ));
  };

  return (
    <>
      {/* overlay when clicked outside hide the drop down */}
      <div
        className={`left-0 top-0 z-10 h-full w-full ${
          showDropdown ? "absolute" : "hidden"
        }`}
        onClick={() => setShowDropdown(false)}
      />

      <div className="relative grid w-full items-center gap-2">
        <Label htmlFor="from" className="capitalize">
          {name}
        </Label>
        <button
          type="button"
          onClick={() => {
            console.log("clicked");
            setShowDropdown(!showDropdown);
          }}
        >
          <Input
            type="text"
            name={name}
            required={true}
            placeholder={name}
            className="!opacity-100"
            value={iataCode}
            disabled={true}
            style={{ cursor: "pointer" }}
          />
        </button>
        <div
          className={`absolute top-[62px] z-20 flex w-full flex-col gap-4 rounded-lg border-gray-600 bg-slate-800    py-4 text-white ${
            showDropdown ? "" : "hidden"
          }`}
        >
          <div className="px-4">
            <Input
              type="text"
              placeholder="Search airports"
              className="w-full font-normal"
              onChange={debouncedResults}
            />
          </div>
          <ul className="flex flex-col gap-1">
            {searchTerm
              ? renderAirportList({
                  airports: searchResults,
                  error: searchResultError,
                  isLoading: isSearchResultLoading,
                })
              : renderAirportList({
                  airports: suggestedAirports,
                  error: suggestedAirportsError,
                  isLoading: isSuggestedAirportLoading,
                })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchAirport;
