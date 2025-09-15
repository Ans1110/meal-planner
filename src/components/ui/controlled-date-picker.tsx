"use client";

import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Label } from "./label";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./calendar";

type ControlledDatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
};

const ControlledDatePicker = <T extends FieldValues>({
  name,
  label,
}: ControlledDatePickerProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, ...restField },
        fieldState: { error },
      }) => (
        <Popover modal>
          {!!label && (
            <Label className="mb-2" htmlFor={name}>
              {label}
            </Label>
          )}
          <div className="flex flex-col gap-2">
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? format(value, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            {!!error && (
              <p className="text-destructive text-sm">{error.message}</p>
            )}
          </div>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={value}
              onSelect={onChange}
              initialFocus
              {...restField}
            />
          </PopoverContent>
        </Popover>
      )}
    />
  );
};

export { ControlledDatePicker };
