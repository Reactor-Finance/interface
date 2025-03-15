import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import symbol from "@/assets/reactor-symbol.svg";
import { Button } from "@/components/ui/button";
import { EllipsisIcon, Dot } from "lucide-react";
import PoolHeader from "@/components/shared/poolHeader";
import { TPoolType } from "@/lib/types";
import { useGetTokenInfo } from "@/utils";
import { useRouter } from "next/navigation";
import { LiquidityActions, TPair } from "../types";
import { useCallback, useMemo } from "react";
import { useGetMarketQuote } from "@/lib/hooks/useGetMarketQuote";
import { formatNumber } from "@/lib/utils";
import { formatEther, formatUnits } from "viem";
import { TableRow } from "@/components/ui/table";

export function LiquidityRow({
  pairInfo: {
    token0: token0Id,
    token1: token1Id,
    reserve0,
    reserve1,
    stable,
    emissions,
    account_gauge_earned,
    emissions_token,
  },
  onItemClick,
}: {
  pairInfo: TPair;
  onItemClick: (action: LiquidityActions) => void;
}) {
  const router = useRouter();
  // const t0 = params.get("token0");
  //  const t1 = params.get("token1");
  //  const version = params.get("version");
  const handleNavigationAddLiquidity = useCallback(() => {
    router.push(
      `/liquidity/add-liquidity?token0=${token0Id}&token1=${token1Id}&version=${stable ? "stable" : "volatile"}`
    );
  }, [router, token0Id, token1Id, stable]);

  const token0 = useGetTokenInfo(token0Id);
  const token1 = useGetTokenInfo(token1Id);

  const { quote: quote0 } = useGetMarketQuote({
    tokenAddress: token0Id,
    value: reserve0,
  });
  const { quote: quote1 } = useGetMarketQuote({
    tokenAddress: token1Id,
    value: reserve1,
  });
  const totalMarketQuote = useMemo(() => {
    const total = quote0[0] + quote1[0];
    return formatNumber(formatUnits(total, 18));
  }, [quote0, quote1]);

  // Rewards market quote
  const { quote: rewardsQuote } = useGetMarketQuote({
    tokenAddress: emissions_token,
    value: account_gauge_earned,
  });
  const isInRange = useMemo(
    () => account_gauge_earned > 0n,
    [account_gauge_earned]
  );

  return (
    <TableRow
      cols="7"
      mobileCols={"6"}
      className="grid min-w-[600px] animate-in fade-in  text-center rounded-sm  items-center bg-neutral-1000 py-2 px-6"
    >
      <td className=" text-left col-span-2">
        <div className="flex items-center justify-start gap-4">
          <PoolHeader
            token0={token0}
            token1={token1}
            poolType={stable ? TPoolType.STABLE : TPoolType.VOLATILE}
          />
        </div>
      </td>
      <td className="flex flex-col gap-y-2 justify-center items-center">
        <Badge
          className="inline-block px-4 py-1 text-center"
          border="none"
          colors={isInRange ? "success" : "error"}
          size="sm"
        >
          {isInRange ? "In Range" : "Out Of Range"}
        </Badge>
        <div className="flex items-center justify-center gap-1">
          <Dot
            color={isInRange ? "#4ade80" : "#f87171"}
            width={22}
            height={22}
          />
          <span className="text-[10px] leading-[16px]">
            {isInRange ? "Earning emissions" : "Not earning emissions"}
          </span>
        </div>
      </td>
      <td className="text-sm">${totalMarketQuote}</td>
      {/* <RangeColumn pair={pair_address} /> */}
      <td className="text-blue-light hidden lg:block text-sm">
        {formatEther(emissions)}%
      </td>
      <td className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-[9px]">
          <Image
            className="inline-block"
            src={symbol}
            width={20}
            height={20}
            alt="Reactor Ticker"
          />
          <span className="text-sm">
            {formatNumber(formatEther(account_gauge_earned))}
          </span>
        </div>
        <span className="text-sm text-neutral-400">
          ${formatNumber(formatEther(rewardsQuote[0]))}
        </span>
      </td>
      <td>
        <div className="flex gap-x-2 justify-end">
          <Button
            disabled={account_gauge_earned === 0n}
            variant={"primary"}
            className="disabled:group-hover:bg-neutral-900 "
            size="xs"
          >
            Claim
          </Button>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="outline" className="flex items-center gap-0.5">
                <span className="p-0.5">Manage</span>
                <EllipsisIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="bg-neutral-950 rounded-sm p-2">
              <DropdownMenu.Item
                onClick={handleNavigationAddLiquidity}
                className="hover:bg-neutral-900 outline-none pl-3 py-2 pr-9 rounded-sm hover:cursor-pointer"
              >
                Increase
              </DropdownMenu.Item>
              {/* <DropdownMenu.Item */}
              {/*   onClick={() => onItemClick(LiquidityActions.Stake)} */}
              {/*   className="hover:bg-neutral-900 outline-none pl-3 py-2 pr-9 rounded-sm hover:cursor-pointer" */}
              {/* > */}
              {/*   Stake */}
              {/* </DropdownMenu.Item> */}
              <DropdownMenu.Item
                onClick={() => onItemClick(LiquidityActions.Withdraw)}
                className="hover:bg-neutral-900 outline-none pl-3 py-2 pr-9 rounded-sm hover:cursor-pointer"
              >
                Withdraw
              </DropdownMenu.Item>
              {/* <DropdownMenu.Item */}
              {/*   onClick={() => onItemClick(LiquidityActions.Unstake)} */}
              {/*   className="hover:bg-neutral-900 outline-none pl-3 py-2 pr-9 rounded-sm hover:cursor-pointer" */}
              {/* > */}
              {/*   Unstake */}
              {/* </DropdownMenu.Item> */}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </td>
    </TableRow>
  );
}
