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
        className="h-8 w-8"
        width={32}
        height={32}
        src={getLogoAsset(tokenOne.address)}
        alt={tokenOne.alt}
      />
      <ImageWithFallback
        className="h-8 w-8 -ml-2 z-10"
        width={32}
        height={32}
        src={getLogoAsset(tokenTwo.address)}
        alt={tokenTwo.alt}
      />
    </div>
  );
}
