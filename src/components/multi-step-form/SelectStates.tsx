import { useEffect, useState } from "react";
import axios from "axios";
import { Label } from "../ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { IStatesData } from "@/lib/types";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

const SelectStates = () => {
  const [states, setStates] = useState<IStatesData[]>([]);
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    const fetchStates = async () => {
      const res = await axios.get(`${apiUrl}/states/Nepal`, {
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${apiKey}`
        }
      });
      setStates(res.data);
    };

    fetchStates();
  }, []);

  return (
    <div className="flex flex-col space-y-1.5">
      <Label>State</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-[200px] justify-between",
              !selectedState && "text-muted-foreground"
            )}
          >
            {selectedState
              ? states.find(state => state.state_name === selectedState)?.state_name
              : "Select state"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search state..." />
            <CommandList>
              <CommandEmpty>No state found.</CommandEmpty>
              <CommandGroup>
                {states.map(state => (
                  <CommandItem
                    value={state.state_name}
                    key={state.state_name}
                    onSelect={() => setSelectedState(state.state_name)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        state.state_name === selectedState
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {state.state_name}
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

export default SelectStates;
