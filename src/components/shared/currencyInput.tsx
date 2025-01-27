import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { Input } from "../ui/input";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import ImageWithFallback from "./imageWithFallback";
import { getLogoAsset } from "@/utils";
import { TAddress } from "@/lib/types";
/**
 * Must Wrap in Form Field
 */
function NumberInput<T extends FieldValues>({
  disabled,
}: {
  disabled: boolean;
  decimals: number;
  field?: ControllerRenderProps<T>;
}) {
  return (
    <Input
      className="w-[60%] border-none bg-neutral-950"
      disabled={disabled}
      type="text"
      inputMode="decimal"
      autoComplete="off"
      pattern="^[0-9]*[.,]?[0-9]*$"
      placeholder="0"
      minLength={1}
      step="any"
      // onChange={(e) => {
      //   if (inputPatternNumberMatch(e.target.value, decimals)) {
      //     return field.onChange(e.target.value);
      //   }
      // }}
    />
  );
}
function Root({ children }: { children: ReactNode }) {
  return <div className="flex w-full">{children}</div>;
}
function CurrencySelect({
  token,
  tokenAddress,
  ...buttonProps
}: {
  token: string;
  tokenAddress: string;
  disabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...buttonProps}
      className="w-[40%] bg-neutral-950 items-center flex justify-between border rounded-[2px] px-4  border-neutral-900"
    >
      <div className="flex items-center gap-x-2 text-sm ">
        <ImageWithFallback
          src={getLogoAsset(tokenAddress as TAddress)}
          width={25}
          height={25}
          className="h-6 w-6"
          alt="alt"
        />
        {token}
      </div>
      <ChevronDown className="text-neutral-500" />
    </button>
  );
}
const CurrencyInput = {
  Root,
  CurrencySelect,
  NumberInput,
};
export default CurrencyInput;
