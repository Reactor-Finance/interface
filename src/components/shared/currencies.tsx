import React from "react";
import ImageWithFallback from "./imageWithFallback";
import { getLogoAsset } from "@/utils";
import { TAddress } from "@/lib/types";
interface Props {
  tokenOne: {
    address: TAddress;
    alt: TAddress;
  };
  tokenTwo: {
    address: TAddress;
    alt: TAddress;
  };
}
export default function Currencies({ tokenOne, tokenTwo }: Props) {
  return (
    <div>
      <ImageWithFallback
        src={getLogoAsset(tokenOne.address)}
        alt={tokenOne.alt}
      />
      <ImageWithFallback
        src={getLogoAsset(tokenTwo.address)}
        alt={tokenTwo.alt}
      />
    </div>
  );
}
