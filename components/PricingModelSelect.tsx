"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  FieldError,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface PricingModelSelectProps {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  error?: FieldError;
}

export const PricingModelSelect = ({
  register,
  setValue,
  error,
}: PricingModelSelectProps) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // pay-per-view
  const [ppv, setPpv] = useState<string>("");
  const [maxBudget, setMaxBudget] = useState<string>("");
  const [ppcEnabled, setPpcEnabled] = useState<boolean>(false);
  const [ppcAmount, setPpcAmount] = useState<string>("");

  // pay-per-influencer
  const [influencerCount, setInfluencerCount] = useState<string>("");
  const [paymentPerInfluencer, setPaymentPerInfluencer] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<string>("");

  const boxRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);


const selectModel = (model: string) => {
  setSelectedModel(model);
  const apiValue = model === "Pay per view" ? "ppv" : "ppi";
  setValue("campaignType", apiValue, { shouldValidate: true }); 
  setDropdownOpen(false);
};

  const changeModel = () => {
    setSelectedModel(null);
    setValue("campaignType", "", { shouldValidate: true });
    setPpv(""); setMaxBudget(""); setPpcEnabled(false); setPpcAmount("");
    setInfluencerCount(""); setPaymentPerInfluencer(""); setTotalAmount("");
  };

  const calcTotal = (countRaw: string, payRaw: string) => {
    const c = parseInt(countRaw || "0", 10);
    const p = parseFloat(payRaw || "0");
    if (Number.isFinite(c) && Number.isFinite(p)) {
      setTotalAmount((c * p).toFixed(2));
    } else {
      setTotalAmount("");
    }
  };

  const CurrencyInput = ({
    value,
    onChange,
    placeholder = "1000",
    readOnly = false,
  }: {
    value: string;
    onChange?: (v: string) => void;
    placeholder?: string;
    readOnly?: boolean;
  }) => (
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
      />
    </div>
  );

  const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-4 w-9 items-center rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );

  // pay-per-view form
  // const PayPerViewForm = () => (
  //   <div className="mt-1 space-y-5 ">

  //     <div>
  //       <label className="mb-1 block text-xs font-medium text-black">Pay per view</label>
  //       <CurrencyInput
  //         value={ppv}
  //         onChange={(v) => {
  //           setPpv(v);
  //           setValue("payPerViewAmount", v);
  //         }}
  //       />
  //       <p className="mt-1 text-xs text-gray-500">
  //         Pay based on the number of views the post get.
  //       </p>
  //     </div>

  //     <div>
  //       <label className="mb-1 block text-xs font-medium text-black">Maximum ad budget</label>
  //       <CurrencyInput
  //         value={maxBudget}
  //         onChange={(v) => {
  //           setMaxBudget(v);
  //           setValue("maxBudget", v);
  //         }}
  //       />
  //       <p className="mt-1 text-xs text-gray-500">
  //         Ads will stop when this amount runs out.
  //       </p>
  //     </div>

  //     <div className="pt-2">
  //       <div className="flex items-center justify-between">
  //         <div>
  //           <label className="text-xs font-medium text-black">Pay per Click (Optional)</label>
  //           <p className="text-xs text-gray-500">Extra charge per link click</p>
  //         </div>
  //         <Toggle checked={ppcEnabled} onChange={setPpcEnabled} />
  //       </div>

  //       {ppcEnabled && (
  //         <div className="mt-3">
  //           <CurrencyInput
  //             value={ppcAmount}
  //             onChange={(v) => {
  //               setPpcAmount(v);
  //               setValue("payPerClickAmount", v);
  //             }}
  //             placeholder="0.00"
  //           />
  //         </div>
  //       )}
  //     </div>

  //     <button
  //       type="button"
  //       onClick={changeModel}
  //       className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-gray-600 "
  //     >
  //       <ChevronDown className="h-4 w-4 " />
  //       Change price model
  //     </button>
  //   </div>
  // );

  const PayPerViewForm = () => (
  <div className="mt-1 space-y-5 ">
    <div>
      <label className="mb-1 block text-xs font-medium text-black">Pay per view</label>
      <CurrencyInput
        value={ppv}
        onChange={(v) => {
          setPpv(v);
          setValue("perViewAmount", v); // Changed from payPerViewAmount
        }}
      />
      <p className="mt-1 text-xs text-gray-500">
        Pay based on the number of views the post get.
      </p>
    </div>

    <div>
      <label className="mb-1 block text-xs font-medium text-black">Maximum ad budget</label>
      <CurrencyInput
        value={maxBudget}
        onChange={(v) => {
          setMaxBudget(v);
          setValue("maxBudget", v);
          setValue("amountToSpend", v);
        }}
      />
      <p className="mt-1 text-xs text-gray-500">
        Ads will stop when this amount runs out.
      </p>
    </div>

    
    <button
      type="button"
      onClick={changeModel}
      className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-gray-600 "
    >
      <ChevronDown className="h-4 w-4 " />
      Change price model
    </button>
  </div>
);

  // pay-per-influencer form
  // const PayPerInfluencerForm = () => (
  //   <div className="mt-2 space-y-5 rounded-[0.5rem]">

  //     <div>
  //       <label className="mb-1 block text-sm font-medium text-black">
  //         Number of Influencers
  //       </label>
  //       <input
  //         type="number"
  //         placeholder="0"
  //         className="w-full rounded-[0.5rem] border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
  //         value={influencerCount}
  //         onChange={(e) => {
  //           const v = e.target.value;
  //           setInfluencerCount(v);
  //           setValue("influencerCount", v);
  //           calcTotal(v, paymentPerInfluencer);
  //         }}
  //       />
  //     </div>

  //     <div>
  //       <label className="mb-1 block text-sm font-medium text-black">
  //         Payment for each influencer
  //       </label>
  //       <CurrencyInput
  //         value={paymentPerInfluencer}
  //         onChange={(v) => {
  //           setPaymentPerInfluencer(v);
  //           setValue("paymentPerInfluencer", v);
  //           calcTotal(influencerCount, v);
  //         }}
  //         placeholder="0.00"
  //       />
  //     </div>

  //     <div>
  //       <label className="mb-1 block text-sm font-medium text-black">Total amount</label>
  //       <CurrencyInput value={totalAmount} readOnly />
  //     </div>

  //     <button
  //       type="button"
  //       onClick={changeModel}
  //       className="inline-flex items-center gap-1 text-sm font-medium text-gray-600"
  //     >
  //       <ChevronDown className="h-4 w-4" />
  //       Change price model
  //     </button>
  //   </div>
  // );

  const PayPerInfluencerForm = () => (
  <div className="mt-2 space-y-5 rounded-[0.5rem]">
    <div>
      <label className="mb-1 block text-sm font-medium text-black">
        Number of Influencers
      </label>
      <input
        type="number"
        placeholder="0"
        className="w-full rounded-[0.5rem] border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
        value={influencerCount}
        onChange={(e) => {
          const v = e.target.value;
          setInfluencerCount(v);
          setValue("influencerCount", v);
          calcTotal(v, paymentPerInfluencer);
          // Also update amountToSpend
          if (paymentPerInfluencer) {
            const total = parseFloat(v || "0") * parseFloat(paymentPerInfluencer || "0");
            setValue("amountToSpend", total.toString());
          }
        }}
      />
    </div>

    <div>
      <label className="mb-1 block text-sm font-medium text-black">
        Payment for each influencer
      </label>
      <CurrencyInput
        value={paymentPerInfluencer}
        onChange={(v) => {
          setPaymentPerInfluencer(v);
          setValue("perInfluencerAmount", v); 
          calcTotal(influencerCount, v);
          if (influencerCount) {
            const total = parseFloat(v || "0") * parseFloat(influencerCount || "0");
            setValue("amountToSpend", total.toString());
          }
        }}
        placeholder="0.00"
      />
    </div>

    <div>
      <label className="mb-1 block text-sm font-medium text-black">Total amount</label>
      <CurrencyInput value={totalAmount} readOnly />
    </div>

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
    <div className="relative">
      <label className="block py-1 text-sm font-medium text-black">Pricing Model</label>

      {!selectedModel ? (
        <div ref={boxRef} className="relative">
          {/* Select box */}
          <button
            type="button"
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex w-full items-center justify-between rounded-[0.5rem] border border-gray-300 px-4 py-3 text-sm text-left text-gray-500"
          >
            <span className="text-gray-500 ">Select Price Model</span>
            <ChevronDown
              className={`h-5 w-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Options dropdown */}
          {dropdownOpen && (
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
          )}
        </div>
      ) : selectedModel === "Pay per view" ? (
        <PayPerViewForm />
      ) : (
        <PayPerInfluencerForm />
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}

      {/* RHF hidden input */}
      <input
        type="hidden"
        {...register("campaignType", {
          required: "Select a pricing model",
        })}
      />
    </div>
  );
};
