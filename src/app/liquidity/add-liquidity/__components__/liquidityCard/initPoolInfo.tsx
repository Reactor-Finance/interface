import DisplayFormattedNumber from "@/components/shared/displayFormattedNumber";
import { TToken } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import { useMemo } from "react";

interface Props {
  amount0: number;
  amount1: number;
  token0: TToken | undefined;
  token1: TToken | undefined;
}

export default function InitPoolInfo({
  amount0,
  amount1,
  token0,
  token1,
}: Props) {
  const { result0, result1 } = useMemo(() => {
    const result0 = amount1 > 0 ? amount0 / amount1 : amount0 / 1;
    const result1 = amount0 > 0 ? amount1 / amount0 : amount1 / 1;
    return { result0, result1 };
  }, [amount0, amount1]);
  return (
    <div className="">
      <h5>Starting Liquidity Info</h5>
      <div className="pt-1"></div>
      <div className="space-y-1">
        <div className="flex text-neutral-300 text-sm justify-between">
          <span>
            {token0?.symbol} per {token1?.symbol}
          </span>
          <span>
            <DisplayFormattedNumber num={formatNumber(result0)} />
          </span>
        </div>
        <div className="flex text-neutral-300 text-sm justify-between">
          <span>
            {token1?.symbol} per {token0?.symbol}
          </span>

          <span>
            <DisplayFormattedNumber num={formatNumber(result1)} />
          </span>
        </div>
      </div>
    </div>
  );
}
