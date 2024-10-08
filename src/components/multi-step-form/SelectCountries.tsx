import { useEffect, useState } from "react";
import axios from "axios";
import { Label } from "../ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ICountriesData } from "@/lib/types";
import { ControllerRenderProps } from "react-hook-form";
import { useAppContext } from "../app-provider";
import { toast } from "sonner";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;


const SelectCountries = ({value, onChange} : ControllerRenderProps) => {
  const [countries, setCountries] = useState<ICountriesData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState(value || "Nepal");
  const { setSelectedCountry: setCountry } = useAppContext();

  useEffect(() => {
    
    const fetchCountries = async () => {
      try {
        const res = await axios.get(`${apiUrl}/countries`, {
          headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${apiKey}`
          }
        });
        setCountries(res.data);
        
      } catch (error) {
        console.log(error);
        toast.error("Error fetching the countries")
      };
      }

    fetchCountries();
  }, []);


  const handleCountryChange = (country_name: string) => {
    setSelectedCountry(country_name);
    setCountry(country_name);
    onChange(country_name);
  }

  return (
    <div className="flex flex-col space-y-1.5">
      <Label>Country</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !selectedCountry && "text-muted-foreground"
            )}
          >
            {selectedCountry
              ? countries.find(country => country.country_name === selectedCountry)?.country_name
              : "Select country"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search country..." />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countries.map(country => (
                  <CommandItem
                    value={country.country_name}
                    key={country.country_name}
                    onSelect={() => handleCountryChange(country.country_name)} 
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        country.country_name === selectedCountry
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {country.country_name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectCountries;
