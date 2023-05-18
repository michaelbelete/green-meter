import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { PlaneTakeoffIcon } from "lucide-react";
import { useEffect, useState, useMemo, useRef, type ChangeEvent } from "react";
import debounce from "lodash.debounce";
import { type Airports } from "@prisma/client";
import Dropdown, { type DropdownRef } from "@/components/ui/custom-dropdown";

type SearchAirportProps = {
  name: string;
  onClick: (value: string) => void;
};

const SearchAirport: React.FC<SearchAirportProps> = ({ name, onClick }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [iataCode, setIataCode] = useState<string>("");

  const dropdownRef = useRef<DropdownRef>(null);

  const searchAirportQuery = api.searchAirport.show.useQuery({
    name: searchTerm,
    limit: 8,
  });

  const suggestedAirportQuery = api.airport.show.useQuery({
    limit: 8,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  type RenderAirportListProps = {
    airports?: Airports[];
    isLoading: boolean;
    error: typeof searchAirportQuery.error;
  };

  const renderAirportList = ({
    airports,
    isLoading,
    error,
  }: RenderAirportListProps) => {
    if (isLoading) {
      return <li className="px-4 text-sm">Loading...</li>;
    }

    if (error) {
      return <li className="px-4 text-sm">{error.message}</li>;
    }

    if (!airports) {
      return;
    }

    if (airports.length === 0) {
      return <li className="px-4 text-sm">No airport found</li>;
    }

    return airports.map((airport) => (
      <li
        className="flex cursor-pointer items-center gap-2 px-5 py-1 text-sm hover:bg-gray-100 hover:duration-200"
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
              airports: searchAirportQuery.data,
              error: searchAirportQuery.error,
              isLoading: searchAirportQuery.isLoading,
            })
          : renderAirportList({
              airports: suggestedAirportQuery.data,
              error: suggestedAirportQuery.error,
              isLoading: suggestedAirportQuery.isLoading,
            })}
      </ul>
    </Dropdown>
  );
};

export default SearchAirport;
