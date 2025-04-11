import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  label?: string;
}

export function DateTimePicker({ date, setDate, label }: DateTimePickerProps) {
  // Handle time selection
  const handleTimeChange = (timeValue: string) => {
    if (!date) return;
    
    const [hours, minutes] = timeValue.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    
    setDate(newDate);
  };

  // Generate time options in 30-minute intervals
  const timeOptions = React.useMemo(() => {
    const options = [];
    for (let hour = 8; hour < 21; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        options.push({
          value: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
          label: `${hour % 12 === 0 ? 12 : hour % 12}:${minute.toString().padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`,
        });
      }
    }
    return options;
  }, []);

  return (
    <div className="flex flex-col space-y-2">
      {label && <span className="text-sm font-medium">{label}</span>}
      <div className="grid grid-cols-2 gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "justify-start text-left",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                if (selectedDate) {
                  // Keep the current time if date already exists
                  if (date) {
                    const newDate = new Date(selectedDate);
                    newDate.setHours(date.getHours(), date.getMinutes());
                    setDate(newDate);
                  } else {
                    // Default to 9:00 AM if no previous time
                    const newDate = new Date(selectedDate);
                    newDate.setHours(9, 0, 0, 0);
                    setDate(newDate);
                  }
                }
              }}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        <Select
          value={date ? `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}` : ""}
          onValueChange={handleTimeChange}
          disabled={!date}
        >
          <SelectTrigger>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time" />
            </div>
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
