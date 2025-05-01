"use client";

import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { FieldError, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface AdGoalSelectProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  error?: FieldError;
}

const AdGoalSelect = ({ register, setValue, error }: AdGoalSelectProps) => {
  const [open, setOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const options = [
    { label: "Awareness", value: "awareness" },
    { label: "Engagement", value: "Engagement" },
    { label: "Traffic", value: "traffic" },
    { label: "Conversions", value: "conversions" },
    { label: "Lead Generation", value: "lead_generation" },
    { label: "App Installs", value: "app_installs" },
    { label: "Sales", value: "sales" },
    { label: "Video views", value: "video_views" },
    { label: "Reach", value: "reach" },
  ];

  //awareness, and traffic

  const handleSelect = (option: typeof options[number]) => {
    setSelectedGoal(option.label);
    setValue("adGoal", option.value, { shouldValidate: true });
    setOpen(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-black py-1">
        Ad Goal
      </label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-between text-gray-400 border-gray-300 p-3"
          >
            {selectedGoal || "What's your ad goal?"}
            <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[336px] p-2 bg-white">
          {options.map((option) => (
            <div
              key={option.value}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </PopoverContent>
      </Popover>

      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}

      {/* Hidden input for RHF */}
      <input
        type="hidden"
        {...register("adGoal", { required: "Select an ad goal" })}
      />
    </div>
  );
};

export default AdGoalSelect;
