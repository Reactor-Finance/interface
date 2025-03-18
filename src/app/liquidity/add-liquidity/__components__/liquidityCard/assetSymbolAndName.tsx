import ImageWithFallback from "@/components/shared/imageWithFallback";
import { TToken } from "@/lib/types";
import { useMemo } from "react";

export default function AssetSymbolAndName({ token }: { token: TToken }) {
  const isRCT = useMemo(() => token?.symbol === "RCT", [token]);
  return !token ? undefined : (
    <div
      data-is-rct={isRCT ? "true" : "false"}
      className="data-[is-rct=true]:bg-primary-400 bg-neutral-900 flex gap-x-2 items-center rounded-md px-[8px] py-[4px]"
    >
      <ImageWithFallback
        width={24}
        height={24}
        className="h-6 w-6 rounded-full"
        src={token.logoURI}
        alt={token.symbol}
        avatar={
          !token.logoURI
            ? {
                letter: token.symbol[0].toUpperCase(),
                styles: "h-6 w-6",
                letterStyles: "text-[10px] leading-[10px]",
              }
            : undefined
        }
      />
      <span className="text-[13px]">{token.symbol}</span>
    </div>
  );
}
