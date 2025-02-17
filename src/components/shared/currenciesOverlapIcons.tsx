import React from "react";
import ImageWithFallback from "./imageWithFallback";
import { getLogoAsset } from "@/utils";
import { TAddress } from "@/lib/types";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const variants = cva("rounded-full", {
  variants: {
    size: {
      sm: "h-4 w-4  data-[a=a]:-ml-1",
      md: "h-8 w-8 data-[a=a]:-ml-2",
    },
  },
  defaultVariants: { size: "md" },
});
interface Props extends VariantProps<typeof variants> {
  tokenOne: {
    address: TAddress;
    alt: string;
  };
  tokenTwo: {
    address: TAddress;
    alt: string;
  };
}

export default function CurrenciesOverlapIcons({
  tokenOne,
  tokenTwo,
  size,
}: Props) {
  return (
    <div className="flex">
      <ImageWithFallback
        className={cn(variants({ size }))}
        width={35}
        height={35}
        src={getLogoAsset(tokenOne.address)}
        alt={tokenOne.alt}
      />
      <ImageWithFallback
        data-a="a"
        className={cn(variants({ size, className: "z-10" }))}
        width={35}
        height={35}
        src={getLogoAsset(tokenTwo.address)}
        alt={tokenTwo.alt}
      />
    </div>
  );
}
