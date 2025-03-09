import Input from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import wallet from "@/assets/wallet.svg";
import { inputPatternMatch } from "@/lib/utils";
import { TToken } from "@/lib/types";
interface Props {
  balance: string;
  value: string;
  setValue: (value: string) => void;
  token: TToken | null;
  openDialog: () => void;
  selectPain: () => void;
}
export default function SwapCard({
  openDialog,
  selectPain,
  balance,
  token,
  value,
  setValue,
}: Props) {
  return (
    <div
      onClick={selectPain}
      className="rounded-[16px] bg-[#303136] border border-[#43444C] space-y-3 p-6 "
    >
      <h2 className="text-sm">Sell</h2>
      <div className="flex items-center gap-x-4 ">
        <Input
          value={value}
          onChange={(e) => {
            if (inputPatternMatch(e.target.value)) {
              setValue(e.target.value);
            }
          }}
          textSize="2xl"
          className="bg-transparent px-0 border-transparent placeholder:text-xl text-xl"
          placeholder="0"
        />
        <button
          onClick={openDialog}
          data-state={token ? "active" : "inactive"}
          className="rounded-r-lg ml-8 h-14 flex items-center relative bg-[#43444C] data-[state=active]:pl-9 pr-2"
        >
          <div className="flex items-center z-10 gap-x-2 cursor-pointer">
            <span className="z-10 text-[16px] text-nowrap ">
              {token ? token.symbol : "Select"}
            </span>
            <ChevronDown />
          </div>
          <div className="h-10 w-10  absolute rounded-full z-10 -left-4">
            {token && (
              <Image
                width={40}
                height={40}
                className="w-full h-full rounded-full"
                src={token.logoURI}
                alt={token.name}
              />
            )}
          </div>
          <div className="h-14 w-14 absolute bg-[#43444C] -left-6 top-0 rounded-full "></div>
        </button>
      </div>
      <div className="flex justify-between">
        <span>$0</span>
        <div className="flex gap-x-4">
          <div className="flex gap-x-1">
            <Image src={wallet} alt="Wallet" />
            <span>{balance}</span>
          </div>
          <button className="text-sm text-neutral-300">Max</button>
        </div>
      </div>
    </div>
  );
}
