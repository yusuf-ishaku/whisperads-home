"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  FieldError,
  UseFormRegister,
  UseFormSetValue,
  Control,
  Controller,
} from "react-hook-form";
import React from "react";

interface PricingModelSelectProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  control: Control<any>;
  watch: any;
  error?: FieldError;
}

export const PricingModelSelect = ({
  register,
  setValue,
  error,
  control,
  watch,
}: PricingModelSelectProps) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(
    "Pay per view"
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [calculatedTotal, setCalculatedTotal] = useState<number>(0);

  const boxRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  React.useEffect(() => {
  setValue("campaignType", "ppv", { shouldValidate: true });
}, [setValue]);

  const selectModel = (model: string) => {
    setSelectedModel(model);
    const apiValue = model === "Pay per view" ? "ppv" : "ppi";
    setValue("campaignType", apiValue, { shouldValidate: true });
    setDropdownOpen(false);
  };

  const changeModel = () => {
    setSelectedModel(null);
    setValue("campaignType", "", { shouldValidate: true });
  };

  const calculateTotal = () => {
    const influencerCount = Number(watch("influencerCount") || 0);
    const perInfluencerAmount = Number(watch("perInfluencerAmount") || 0);
    const total = influencerCount * perInfluencerAmount;
    setCalculatedTotal(total);
    setValue("amountToSpend", total, { shouldValidate: true });
  };

  const CurrencyInput = ({
    value,
    onChange,
    placeholder = "1000",
    readOnly = false,
    name,
  }: {
    value: string;
    onChange?: (v: string) => void;
    placeholder?: string;
    readOnly?: boolean;
    name?: string;
  }) => {
     const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Allow only numbers and decimal point
    const numericValue = inputValue.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimal points
    const decimalCount = (numericValue.match(/\./g) || []).length;
    const finalValue = decimalCount > 1 ? numericValue.slice(0, -1) : numericValue;
    
    setDisplayValue(finalValue);
    onChange?.(finalValue);
  };
    return(
    <div className="relative">
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 flex items-center gap-2">
        <span>₦</span>
        <span className="opacity-50">|</span>
      </div>
      <input
        type="number"
        inputMode="decimal"
        readOnly={readOnly}
        placeholder={placeholder}
        className={`w-full pl-16 pr-3 py-3 border border-gray-300 rounded-[0.5rem] focus:outline-none focus:ring-2 focus:ring-green-500 bg-white placeholder:text-gray-400`}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        name={name}
      />
    </div>
  );
  }

  // const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
  //   <button
  //     type="button"
  //     role="switch"
  //     aria-checked={checked}
  //     onClick={() => onChange(!checked)}
  //     className={`relative inline-flex h-4 w-9 items-center rounded-full transition-colors ${
  //       checked ? "bg-primary" : "bg-gray-300"
  //     }`}
  //   >
  //     <span
  //       className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
  //         checked ? "translate-x-5" : "translate-x-1"
  //       }`}
  //     />
  //   </button>
  // );

  //   const PayPerViewForm = () => (
  //   <div className="mt-1 space-y-5 ">
  //     <div>
  //       <label className="mb-1 block text-xs font-medium text-black">Pay per view</label>
  //       <Controller
  //           name="perViewAmount"
  //           control={control}
  //           render={({ field }) => (
  //              <CurrencyInput
  //       value={field.value || ""}
  //       onChange={(v) => field.onChange(v)}
  //     />
  //           )}
  //         />
  //       <p className="mt-1 text-xs text-gray-500">
  //         Pay based on the number of views the post get.
  //       </p>
  //     </div>

  //     <div>
  //       <label className="mb-1 block text-xs font-medium text-black">Maximum ad budget</label>
  //      <Controller
  //           name="maxBudget"
  //           control={control}
  //           render={({ field }) => (
  //             <CurrencyInput
  //       value={field.value || ""}
  //       onChange={(v) => field.onChange(v)}
  //     />
  //           )}
  //         />
  //       <p className="mt-1 text-xs text-gray-500">
  //         Ads will stop when this amount runs out.
  //       </p>
  //     </div>

  //     {/* <button
  //       type="button"
  //       onClick={changeModel}
  //       className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-gray-600 "
  //     >
  //       <ChevronDown className="h-4 w-4 " />
  //       Change price model
  //     </button> */}
  //   </div>
  // );

const PayPerViewForm = () => (
  <div className="mt-1 space-y-5">
    <div>
      <label className="mb-1 block text-xs font-medium text-black">
        Budget
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 flex items-center gap-2">
          <span>₦</span>
          <span className="opacity-50">|</span>
        </div>
        <Controller
          name="maxBudget"
          control={control}
          rules={{
            required: "Budget is required",
            validate: (value) => Number(value) > 0 || "Budget must be greater than 0",
          }}
          render={({ field }) => (
            <input
              type="text"
              inputMode="decimal"
              placeholder="1000"
              className="w-full pl-16 pr-3 py-3 border border-gray-300 rounded-[0.5rem] focus:outline-none focus:ring-2 focus:ring-green-500 bg-white placeholder:text-gray-400"
              value={field.value || ""}
              onChange={(e) => {
                // Allow only numbers and decimal point
                const numericValue = e.target.value.replace(/[^0-9.]/g, '');
                field.onChange(numericValue);
              }}
            />
          )}
        />
      </div>
      <p className="mt-1 text-xs text-gray-500">
        Total amount you want to spend on this campaign.
      </p>
    </div>
  </div>
);

  const PayPerInfluencerForm = () => (
    <div className="mt-2 space-y-5 rounded-[0.5rem]">
      <div>
        <label className="mb-1 block text-sm font-medium text-black">
          Number of Influencers
        </label>
        <Controller
          name="influencerCount"
          control={control}
          render={({ field }) => (
            <input
              type="number"
              placeholder="0"
              className="w-full rounded-[0.5rem] border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              {...field}
            />
          )}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-black">
          Payment for each influencer
        </label>
        <Controller
          name="perInfluencerAmount"
          control={control}
          render={({ field }) => (
            <CurrencyInput
              value={field.value || ""}
              onChange={(v) => field.onChange(v)}
              name={field.name}
            />
          )}
        />
      </div>

      {/* Calculate Button */}
      <div>
        <Button
          type="button"
          onClick={calculateTotal}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          Calculate Total Amount
        </Button>
      </div>

      {/* Display Calculated Total */}
      <div>
        <label className="mb-1 block text-sm font-medium text-black">
          Total amount
        </label>
        <CurrencyInput
          value={calculatedTotal ? String(calculatedTotal) : ""}
          readOnly
        />
        <input
          type="hidden"
          {...register("amountToSpend")}
          value={calculatedTotal}
        />
      </div>

      {/* <div>
        <label className="mb-1 block text-sm font-medium text-black">
          Total amount
        </label>
        <Controller
          name="amountToSpend"
          control={control}
          render={({ field }) => {
        // Get values from form state
        const influencerCount = Number(control._formValues?.influencerCount || 0);
        const perInfluencerAmount = Number(control._formValues?.perInfluencerAmount || 0);
        const total = influencerCount * perInfluencerAmount;

        // Update the field value if it differs
        useEffect(() => {
          if (field.value !== total) {
            field.onChange(total);
          }
          // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [influencerCount, perInfluencerAmount]);

        return (
          <CurrencyInput value={total ? String(total) : ""} readOnly />
        );
          }}
        />
      </div> */}

      <button
        type="button"
        onClick={changeModel}
        className="inline-flex items-center gap-1 text-sm font-medium text-gray-600"
      >
        <ChevronDown className="h-4 w-4" />
        Change price model
      </button>
    </div>
  );

  return (
    <>

     <div className="relative">
    <label className="block py-1 text-sm font-medium text-black">Pricing Model</label>
    
    {/* Always show Pay per view form since it's the only option */}
    <PayPerViewForm />
    
    {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}

    <input
      type="hidden"
      {...register("campaignType", {
        required: "Select a pricing model",
      })}
      value="ppv" // Force value to ppv
    />
  </div>


     {/* <div className="relative"> */}
      {/* <label className="block py-1 text-sm font-medium text-black">
        Pricing Model
      </label> */}

      {/* {!selectedModel ? (
        <div ref={boxRef} className="relative">
          <button
            type="button"
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-[0.5rem] border border-gray-300 px-4 py-3 text-sm text-left text-gray-500"
          >
            <span className="text-gray-500 ">Select Price Model</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button> */}

          {/* Options dropdown */}
          {/* {dropdownOpen && (
            <div className="mt-3 space-y-1">
              <Button
                type="button"
                variant="outline"
                className="flex h-auto w-full items-center justify-between rounded-[0.5rem] px-4 py-4 text-left text-gray-500"
                onClick={() => selectModel("Pay per view")}
              >
                <span className="font-medium">Pay per view</span>
                <ChevronRight className="h-4 w-4" />
              </Button>

              <div className="h-px w-full " />

              <Button
                type="button"
                variant="outline"
                className="flex h-auto w-full items-center justify-between rounded-[0.5rem]  px-4 py-4 text-left text-gray-500"
                onClick={() => selectModel("Pay per influencer")}
              >
                <span className="font-medium">Pay per Influencer</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )} */}

          {/* PPI COMING SOON */}
          {/* {dropdownOpen && (
            <div className="mt-3 space-y-1">
              <Button
                type="button"
                variant="outline"
                className="flex h-auto w-full items-center justify-between rounded-[0.5rem] px-4 py-4 text-left text-gray-500"
                onClick={() => selectModel("Pay per view")}
              >
                <span className="font-medium">Pay per view</span>
                <ChevronRight className="h-4 w-4" />
              </Button>

              <div className="h-px w-full" />

              <Button
                type="button"
                variant="outline"
                className="flex h-auto w-full items-center justify-between rounded-[0.5rem] px-4 py-4 text-left text-gray-400 opacity-60 cursor-not-allowed"
                onClick={(e) => e.preventDefault()}
                disabled
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">Pay per Influencer</span>
                  <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">
                    Coming soon
                  </span>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )} */}
        {/* </div> */}

        
      {/* ) : selectedModel === "Pay per view" ? (
        <PayPerViewForm />
      ) : (
        <PayPerInfluencerForm />
      )} */}

      {/* {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}

      <input
        type="hidden"
        {...register("campaignType", {
          required: "Select a pricing model",
        })}
      />
    </div> */}
    </>
   
  );
};
