import ImageWithFallback from "@/components/shared/imageWithFallback";
import { USDC_ADDRESS } from "@/data/constants";
import { getLogoAsset } from "@/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function TokenTrigger() {
  return (
    <div
      style={{ borderRadius: "18px 4px 4px 18px" }}
      className="bg-neutral-950 flex gap-x-2 p-1 "
    >
      <div className="h-9 w-9">
        <ImageWithFallback
          width={36}
          height={36}
          src={getLogoAsset(USDC_ADDRESS)}
          alt="placeholder"
        />
      </div>
      <div className="flex items-center gap-x-1 pr-2">
        <span>USDC</span>
        <ChevronDown className="text-neutral-500" />
      </div>
    </div>
  );
}
