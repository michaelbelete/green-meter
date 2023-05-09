import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/utils/api";
import { PlaneTakeoffIcon } from "lucide-react";
import type { NextPage } from "next";
import { useEffect, useState, useMemo, useRef } from "react";
import debounce from "lodash.debounce";
import { type Airports } from "@prisma/client";
import Dropdown, { type DropdownRef } from "@/components/dropdown";

type SearchAirportProps = {
  name: string;
  onClick: (value: string) => void;
};

const SearchAirport: NextPage<SearchAirportProps> = ({
  name,
  onClick,
}: SearchAirportProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [iataCode, setIataCode] = useState<string>("");

  const dropdownRef = useRef<DropdownRef>(null);

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

  const debouncedResults = useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  type renderAirportListProp = {
    airports?: Airports[];
    isLoading: boolean;
    error: typeof searchResultError;
  };

  const renderAirportList = (props: renderAirportListProp) => {
    const { isLoading, error, airports } = props;

    if (isLoading) {
      return <li className="px-4 text-sm">Loading...</li>;
    }

    if (error) {
      return <li className="px-4 text-sm">{error.message}</li>;
    }

    if (!airports) return;

    if (airports.length === 0) {
      return <li className="px-4 text-sm">No airport found</li>;
    }

    return airports.map((airport) => (
      <li
        className="flex cursor-pointer items-center gap-2 px-4 py-1 text-sm hover:bg-slate-700"
        key={airport.id}
        onClick={() => {
          onClick(airport.iata_code);
          setIataCode(airport.iata_code);
          setSearchTerm("");
          dropdownRef.current?.close();
        }}
      >
        <PlaneTakeoffIcon />
        <span>{airport.name}</span>
      </li>
    ));
  };

  return (
    <Dropdown
      ref={dropdownRef}
      trigger={
        <>
          <Label htmlFor={name} className="capitalize">
            {name}
          </Label>
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
        </>
      }
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
    </Dropdown>
  );
};

export default SearchAirport;
