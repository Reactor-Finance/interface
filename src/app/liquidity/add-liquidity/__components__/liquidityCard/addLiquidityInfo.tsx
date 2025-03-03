import { useMemo } from "react";

interface Props {
  amount0: string;
  amount1: string;
  token0Symbol: string | undefined;
  token1Symbol: string | undefined;
}
export default function AddLiquidityInfo({
  amount0,
  amount1,
  token0Symbol,
  token1Symbol,
}: Props) {
  const { result0, result1 } = useMemo(() => {
    if (isNaN(Number(amount0)) || isNaN(Number(amount1))) {
      return { result0: 0, result1: 0 };
    }
    let result0 = Number(amount0) / Number(amount1);
    let result1 = Number(amount0) / Number(amount1);
    if (isNaN(result0) || !isFinite(result0)) {
      result0 = 0;
    }
    if (isNaN(result1) || !isFinite(result1)) {
      result1 = 0;
    }
    return { result0, result1 };
  }, [amount0, amount1]);
  return (
    <div className="">
      <h5>Starting Liquidity Info</h5>
      <div className="pt-1"></div>
      <div className="space-y-1">
        <div className="flex text-neutral-300 text-sm justify-between">
          <span>
            {token0Symbol} per {token1Symbol}
          </span>
          <span>{result0}</span>
        </div>
        <div className="flex text-neutral-300 text-sm justify-between">
          <span>
            {token1Symbol} per {token0Symbol}
          </span>
          <span>{result1}</span>
        </div>
      </div>
    </div>
  );
}
