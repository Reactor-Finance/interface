import ImageWithFallback from "@/components/shared/imageWithFallback";
import { useTokenlistContext } from "@/contexts/tokenlistContext";
import { TAddress } from "@/lib/types";
import { useMemo } from "react";

export default function AssetSymbolAndName({
  tokenAddress,
}: {
  tokenAddress: TAddress;
}) {
  const { tokenlist } = useTokenlistContext();
  const token = useMemo(
    () =>
      tokenlist.find(
        (t) => t.address.toLowerCase() === tokenAddress.toLowerCase()
      ),
    [tokenlist, tokenAddress]
  );
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
      />
      <span className="text-[13px]">{token.symbol}</span>
    </div>
  );
}
