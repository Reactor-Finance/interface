import { ChevronDown, Settings } from "lucide-react";
import { abi } from "@/lib/abis/Oracle";
import React, { ReactNode, useMemo, useState } from "react";
import infoIcon from "@/assets/info.svg";
import Tooltip from "@/components/ui/tooltip";
import { formatUnits, parseUnits } from "viem";
import { TToken } from "@/lib/types";
import { useAtom } from "jotai/react";
import { settingDialogOpenAtom, slippageAtom } from "@/store";
import { useReadContract } from "wagmi";
import { ChainId, ORACLE, SLIPPAGE_ZEROS } from "@/data/constants";
import { useGetMarketQuote } from "@/lib/hooks/useGetMarketQuote";
interface Props {
  amountIn: bigint;
  amountOut: bigint;
  token0: TToken;
  token1: TToken;
}
export default function SwapDetails({
  amountIn,
  amountOut,
  token0,
  token1,
}: Props) {
  const [open, setOpen] = useState(false);
  const [slippage] = useAtom(slippageAtom);

  const dialog = useAtom(settingDialogOpenAtom);
  const setDialogOpen = dialog[1];

  const { per, min } = useMemo(() => {
    const zeros = 100_000_000n;
    if (amountOut === 0n) {
      return { per: 0n, min: 0n };
    }
    const per = (amountIn * zeros) / amountOut;
    const a = (amountOut * BigInt(slippage)) / SLIPPAGE_ZEROS;
    console.log(slippage, "Slippage");
    const min = amountOut - a;
    return { min, per };
  }, [amountIn, amountOut, slippage]);
  const { data: token1Usd, error } = useReadContract({
    abi,
    address: ORACLE[ChainId.MONAD_TESTNET],
    functionName: "getAverageValueInETH",
    args: [token0.address, parseUnits("1", token0.decimals)],
    chainId: ChainId.MONAD_TESTNET,
  });
  console.log({ token1Usd, error });
  const { quote } = useGetMarketQuote({
    tokenAddress: token0.address,
    value: amountOut,
  });
  return (
    <div className="text-[13px] border border-neutral-800 rounded-[16px] p-1 md:p-4 space-y-4">
      <Row title="Received Value" value={quote[1]} />
      <Row
        title="Exchange Rate"
        value={
          <p>
            1 {token0.symbol} <span className="text-neutral-200">≃</span>{" "}
            {formatUnits(per, 8)} {token1.symbol}{" "}
          </p>
        }
      />
      <Row
        title="Slippage"
        value={
          <>
            <span>{slippage / 100}%</span>
            <button onClick={() => setDialogOpen(true)}>
              <Settings className="text-neutral-200" size={16} />
            </button>
          </>
        }
        info="Slippage Info"
      />
      <div>
        <button
          onClick={() => setOpen(!open)}
          type="button"
          className="text-primary-400 items-center text-sm flex gap-x-1"
        >
          <span>Show detailed Breakdown</span>
          <ChevronDown
            data-direction={open ? "up" : "down"}
            className="
          data-[direction=up]:rotate-180 transition-transform"
          />
        </button>
        <div
          data-state={open ? "open" : "closed"}
          className="pt-4 data-[state=closed]:opacity-0 transition-all duration-500 data-[state=closed]:h-0 overflow-hidden fade-in space-y-4"
        >
          <Row
            title="Minumum Receieved"
            value={formatUnits(min, token0.decimals)}
            info="Info"
          />
          {/* <Row title="Fee" value="$23.44" info="Info" /> */}
          {/* <Row title="Price Impact" value="$23.44" info="Info" /> */}
          {/* <Row title="Route" value="$23.44" info="Info" /> */}
        </div>
      </div>
    </div>
  );
}
function Row({
  title,
  value,
  info,
}: {
  title: string;
  value: ReactNode;
  info?: string;
}) {
  return (
    <div className="flex justify-between">
      <div className="text-neutral-400 flex gap-x-1">
        <span>{title}</span>
        {info && (
          <div>
            <Tooltip triggerImageSrc={infoIcon}>{info}</Tooltip>
          </div>
        )}
      </div>
      <div className="flex items-center gap-x-1">{value}</div>
    </div>
  );
}
