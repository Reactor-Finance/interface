import React from "react";
import ImageWithFallback from "./imageWithFallback";
import { getLogoAsset } from "@/utils";
import { TAddress } from "@/lib/types";
interface Props {
  tokenOne: {
    address: TAddress;
    alt: string;
  };
  tokenTwo: {
    address: TAddress;
    alt: string;
  };
}
export default function Currencies({ tokenOne, tokenTwo }: Props) {
  console.log(getLogoAsset(tokenOne.address));
  return (
    <div className="flex">
      <ImageWithFallback
        className="h-6 w-6"
        width={24}
        height={24}
        src={getLogoAsset(tokenOne.address)}
        alt={tokenOne.alt}
      />
      <ImageWithFallback
        className="h-6 w-6 -ml-2 z-10"
        width={24}
        height={24}
        src={getLogoAsset(tokenTwo.address)}
        alt={tokenTwo.alt}
      />
    </div>
  );
}
