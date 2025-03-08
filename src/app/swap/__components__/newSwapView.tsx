import Input from "@/components/ui/input";
import { ArrowDown, ChevronDown } from "lucide-react";
import React from "react";
import wallet from "@/assets/wallet.svg";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function NewSwapView() {
  return (
    <div className="space-y-1">
      <div className="space-y-1 relative">
        <SwapCard />
        <SwapCard />
        <Button size="submit" variant="primary">
          Swap
        </Button>
      </div>
      <button className="h-14 flex items-center justify-center rounded-full w-14 bg-black absolute left-1/2 top-1/2 -translate-y-[calc(50%+4px)] -translate-x-1/2">
        <div className="h-12 w-12 rounded-full bg-neutral-950 flex items-center justify-center">
          <ArrowDown className="text-neutral-300" size={18} />
        </div>
      </button>
    </div>
  );
}

function SwapCard() {
  return (
    <div className="rounded-[16px] bg-[#303136] border border-[#43444C] space-y-3 p-6 ">
      <h2 className="text-sm">Sell</h2>
      <div className="flex items-center gap-x-4 ">
        <Input
          textSize="2xl"
          className="bg-transparent px-0 border-transparent placeholder:text-xl text-xl"
          placeholder="0"
        />
        <div className="rounded-r-lg ml-8 h-14 flex items-center relative bg-[#43444C] pl-9 pr-2">
          <div className="flex items-center z-10 gap-x-2 cursor-pointer">
            <span className="z-10 text-[16px]">ETH</span>
            <ChevronDown />
          </div>
          <div className="h-10 w-10 bg-blue-400 absolute rounded-full z-10 -left-4"></div>
          <div className="h-14 w-14 absolute bg-[#43444C] -left-6 top-0 rounded-full "></div>
        </div>
      </div>
      <div className="flex justify-between">
        <span>$0</span>
        <div className="flex gap-x-4">
          <div className="flex gap-x-1">
            <Image src={wallet} alt="Wallet" />
            <span>0</span>
          </div>
          <button className="text-sm text-neutral-300">Max</button>
        </div>
      </div>
    </div>
  );
}
