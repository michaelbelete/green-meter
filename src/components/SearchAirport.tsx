import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/utils/api";
import { PlaneTakeoffIcon, SearchIcon } from "lucide-react";
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
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [iataCode, setIataCode] = useState<string>("");

  const {
    data: searchResult,
    error: searchResultError,
    isLoading: isSearchResultLoading,
    isError: isSearchResultError,
    mutate: searchAirports,
  } = api.airport.searchAirports.useMutation();

  const {
    data: suggestedAirports,
    error: suggestedAirportsError,
    isError: isSuggestedAirportError,
    isLoading: isSuggestedAirportLoading,
  } = api.airport.showRandomAirports.useQuery();

  useEffect(() => {
    onChange(iataCode);
  }, [iataCode, onChange]);

  useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      searchAirports({
        name: searchQuery,
      });
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchAirports, searchQuery]);

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
              value={searchQuery}
              className="w-full font-normal"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ul className="flex flex-col gap-1">
            {searchQuery ? (
              isSearchResultError ? (
                <li className="px-4">{searchResultError.message}</li>
              ) : isSearchResultLoading ? (
                <li className="px-4">Searching...</li>
              ) : searchResult && searchResult.length === 0 ? (
                <li className="px-4">
                  Oops! Can&apos;t find the airport you are looking for
                </li>
              ) : (
                searchResult &&
                searchResult.map((airport, index) => (
                  <li
                    className="flex cursor-pointer gap-2 px-4 py-1 hover:bg-slate-700"
                    key={index}
                    onClick={() => {
                      setIataCode(airport.iata_code);
                      setShowDropdown(false);
                      setSearchQuery("");
                    }}
                  >
                    <SearchIcon />
                    <span>{airport.name}</span>
                  </li>
                ))
              )
            ) : isSuggestedAirportLoading ? (
              <li className="px-4">Loading...</li>
            ) : isSuggestedAirportError ? (
              <li className="px-4">{suggestedAirportsError.message}</li>
            ) : suggestedAirports && suggestedAirports.length === 0 ? (
              <li className="px-4">Can&apos;t find the airport</li>
            ) : (
              suggestedAirports &&
              suggestedAirports.map((airport, index) => (
                <li
                  className="flex cursor-pointer gap-2 px-4 py-1 hover:bg-slate-700"
                  key={index}
                  onClick={() => {
                    setIataCode(airport.iata_code);
                    setShowDropdown(false);
                    setSearchQuery("");
                  }}
                >
                  <PlaneTakeoffIcon />
                  <span>{airport.name}</span>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchAirport;
