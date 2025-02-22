import React from "react";
import TokenTrigger from "./tokenTrigger";
import Input from "@/components/ui/input";
interface Props {
  onSelect: () => void;
}
export default function SwapCard({ onSelect }: Props) {
  return (
    <div
      onClick={onSelect}
      className="rounded-xl space-y-4 bg-neutral-1000 cursor-pointer  py-6 px-4"
    >
      <div>
        <span className="text-sm">Sell</span>
      </div>
      <div className="flex justify-between">
        <div>
          <Input
            className="bg-transparent w-[80%]  p-0 md:text-2xl border-none placeholder:text-2xl placeholder:text-neutral-400"
            placeholder="0"
          />
        </div>
        <TokenTrigger />
      </div>

      <div className="flex justify-between">
        <span className="text-sm text-neutral-500">$0</span>
        <div>
          <button>Max</button>
        </div>
      </div>
    </div>
  );
}
