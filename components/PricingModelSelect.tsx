"use client";

import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, X } from "lucide-react";
import { FieldError, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface PricingModelSelectProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  error?: FieldError;
}

const pricingOptions = {
  "Cost per Click (CPC)": [
    "100 - 500 Clicks",
    "500 - 1000 Clicks",
    "1000 - 5000 Clicks",
    "5000 - 10000 Clicks",
  ],
  "Cost per Mile (CPM)": [
    "100 - 500 Views",
    "500 - 1000 Views",
    "1000 - 5000 Views",
    "5000 - 10000 Views",
  ],
};

export const PricingModelSelect = ({
  register,
  setValue,
  error,
}: PricingModelSelectProps) => {
  const [mainOpen, setMainOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

  const handleMainSelect = (category: string) => {
    setActiveCategory(category);
    setSubOpen(true);
  };

  const handleSubSelect = (value: string) => {
    setValue("pricingModel", value, { shouldValidate: true });
    setSelectedLabel(value);
    setMainOpen(false);
    setSubOpen(false);
    setActiveCategory(null);
  };

  const handleCloseSub = () => {
    setSubOpen(false);
    setActiveCategory(null);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-black py-1">
        Pricing Model
      </label>

      {/* Main Popover */}
      <Popover open={mainOpen} onOpenChange={setMainOpen}>
        <PopoverTrigger asChild >
          <Button
            variant="outline"
            className="w-full justify-between text-gray-400 border-gray-300 p-3"
          >
            {selectedLabel || "Select Pricing Model"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[336px] p-2 bg-white">
          {Object.keys(pricingOptions).map((key) => (
            <div
              key={key}
              className="flex justify-between items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => handleMainSelect(key)}
            >
              {key}
              <ChevronRight className="w-4 h-4" />
            </div>
          ))}
        </PopoverContent>
      </Popover>

      {/* Nested Sub-Options Popover */}
      <Popover open={subOpen} onOpenChange={setSubOpen}>
        <PopoverTrigger asChild>
          {/* Hidden anchor trigger */}
          <div />
        </PopoverTrigger>
        <PopoverContent className="w-[336px] bg-white relative">
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
            onClick={handleCloseSub}
            type="button"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="mt-6 space-y-2">
            {activeCategory &&
              pricingOptions[activeCategory as keyof typeof pricingOptions].map(
                (option) => (
                  <div
                    key={option}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                    onClick={() => handleSubSelect(option)}
                  >
                    {option}
                  </div>
                )
              )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}

      {/* Hidden input for RHF */}
      <input
        type="hidden"
        {...register("pricingModel", {
          required: "Select a pricing model",
        })}
      />
    </div>
  );
};
