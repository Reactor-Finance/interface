import ImageWithFallback from "@/components/shared/imageWithFallback";
import { TAddress } from "@/lib/types";
import { getLogoAsset } from "@/utils";
import { useMemo } from "react";
import { erc20Abi } from "viem";
import { useReadContract } from "wagmi";
export default function AssetSymbolAndName({
  tokenAddress,
}: {
  tokenAddress: TAddress;
}) {
  const { data: symbol } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "symbol",
  });
  const isRCT = useMemo(() => {
    if (tokenAddress === "0x") {
      return true;
    } else {
      return false;
    }
  }, [tokenAddress]);
  return (
    <div
      data-is-rct={isRCT ? "true" : "false"}
      className="data-[is-rct=true]:bg-primary-400 bg-neutral-900 flex gap-x-2 items-center rounded-md px-[8px] py-[4px]"
    >
      <ImageWithFallback
        width={24}
        height={24}
        className="h-6 w-6"
        src={getLogoAsset(tokenAddress)}
        alt={""}
      ></ImageWithFallback>
      <span className="text-[13px]">{symbol}</span>
    </div>
  );
}
