import DisplayFormattedNumber from "@/components/shared/displayFormattedNumber";
import PoolHeader from "@/components/shared/poolHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TPoolType } from "@/lib/types";
import { X } from "lucide-react";
import React, { useEffect, useMemo } from "react";
import { formatUnits } from "viem";
import { useVoteProvider } from "./voteProvider";
import { inputPatternMatch } from "@/lib/utils";
interface Props {
  open?: boolean;
  setOpen?: (b: boolean) => void;
}
export default function VoteDialog({ open, setOpen }: Props) {
  const { veNFTsAndPoolsMap } = useVoteProvider();
  console.log({ veNFTsAndPoolsMap });
  useEffect(() => {
    if (!Object.keys(veNFTsAndPoolsMap).length) {
      setOpen?.(false);
    }
  }, [setOpen, veNFTsAndPoolsMap]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="opacity-0 h-0 ">Vote Dialog</DialogTitle>
      <DialogContent removeClose className="w-[1400px] px-2 py-2">
        <button
          onClick={() => setOpen?.(false)}
          className="flex items-center rounded-full h-8 w-8 absolute bg-neutral-950  -right-3 -top-3 justify-center"
        >
          <X size={16} />
        </button>
        <div className="max-h-[70svh] scroll-container space-y-4 overflow-y-auto px-2 py-2">
          {Object.keys(veNFTsAndPoolsMap).map((s) => {
            return (
              <Row nftId={s} key={s} selectedVotes={veNFTsAndPoolsMap[s]} />
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Row({
  selectedVotes,
  nftId,
}: {
  nftId: string;
  selectedVotes: { [id: string]: number };
}) {
  return (
    <div>
      <div className="bg-neutral-950 text-sm grid grid-cols-8  items-center  px-6 py-2 rounded-md">
        <div className="flex justify-start items-center gap-x-3 col-span-2">
          <div className="h-8 w-8 bg-blue-400 rounded-full"></div>
          <span>Lock ID 4</span>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col">
            <span className="block">
              <DisplayFormattedNumber num={formatUnits(0n, 2)} formatNum />{" "}
              veRCT
            </span>
            <span className="block text-neutral-500 text-[12px]">
              Locked{" "}
              <DisplayFormattedNumber num={formatUnits(0n, 2)} formatNum /> RCT
            </span>
          </div>
        </div>
        <div className="flex justify-center">
          <span className="text-blue-light">11%</span>
        </div>
        <div className="flex justify-center">
          <span className="">0.00 RCT</span>
        </div>
        <div className="flex justify-center">
          <span className="">5 June 2025</span>
        </div>
        <div className="flex justify-center">
          <Badge>Not Active</Badge>
        </div>
        <div className="flex justify-end">
          <Button variant="primary">Vote</Button>
        </div>
      </div>
      {Object.keys(selectedVotes).map((s) => {
        return <PoolRow key={s} veNftId={nftId} poolId={s} />;
      })}
    </div>
  );
}

function PoolRow({ poolId, veNftId }: { poolId: string; veNftId: string }) {
  const { veNFTsAndPoolsMap, removePool, totalPercent, setAmountForPool } =
    useVoteProvider();
  const value = veNFTsAndPoolsMap[veNftId][poolId];

  const percentLeft = useMemo(() => {
    const valuePercent = isFinite(value) ? value : 0;
    return 100 - (totalPercent - valuePercent);
  }, [totalPercent, value]);
  return (
    <div className="pt-8">
      <div className="grid grid-cols-6  text-sm">
        <div className="relative">
          <button
            onClick={() => {
              removePool({ veNftId, poolId });
            }}
            className="flex items-center rounded-full h-6 w-6 absolute bg-neutral-950  -right-2 -top-2 justify-center"
          >
            <X size={16} />
          </button>
          <PoolHeader
            poolType={TPoolType.CONCENTRATED}
            token0={{
              symbol: "ETH",
              address: "0x123",
              decimals: 18,
              logoURI: "https://example.com",
              name: "Ethereum",
              chainId: 1,
            }}
            token1={{
              symbol: "ETH",
              address: "0x123",
              decimals: 18,
              logoURI: "https://example.com",
              name: "Ethereum",
              chainId: 1,
            }}
          />
        </div>
        <div className="col-span-2 flex justify-center">
          <div className="">
            <div>
              <span className="text-neutral-400">Votes</span>{" "}
              <span>77,234,222</span>
            </div>
            <div>
              <span className="text-neutral-400">Votes</span>{" "}
              <span>77,234,222</span>
            </div>
            <div>
              <span className="text-neutral-400">Votes</span>{" "}
              <span>77,234,222</span>
            </div>
          </div>
        </div>
        <div>
          <div className="text-neutral-400">Est. Rewards</div>
          <div>$0.0</div>
        </div>
        <div>
          <div className="text-neutral-400">Est. Rewards</div>
          <div>$0.0</div>
        </div>
        <div className="flex justify-end items-start ">
          <div className="bg-neutral-950 justify-between rounded-md p-2 flex gap-x-2">
            <div className="flex gap-x-1">
              <input
                placeholder="0"
                value={value}
                onChange={(e) => {
                  if (inputPatternMatch(e.target.value)) {
                    let newValue = "";
                    if (parseFloat(e.target.value) < 0) {
                      return;
                    }
                    if (parseFloat(e.target.value) > percentLeft) {
                      newValue = `${0}`;
                    } else {
                      newValue = e.target.value;
                    }
                    if (isFinite(parseFloat(newValue))) {
                      setAmountForPool({
                        amount: parseFloat(newValue),
                        veNftId,
                        poolId,
                      });
                    } else {
                      setAmountForPool({
                        amount: 0,
                        veNftId,
                        poolId,
                      });
                    }
                  }
                }}
                className="w-[30px] focus:ring-transparent transition-all  bg-transparent"
              />
              <span className="text-neutral-400">%</span>
            </div>
            <button className="text-primary-400 disabled:text-neutral-500">
              Max
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex gap-x-2">
          <Button size="sm">0%</Button>
          <Button size="sm">25%</Button>
          <Button size="sm">50%</Button>
          <Button size="sm">75%</Button>
          <Button size="sm">100%</Button>
        </div>
      </div>
    </div>
  );
}
