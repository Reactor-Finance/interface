import Input from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import wallet from "@/assets/wallet.svg";
import { formatNumber, inputPatternMatch } from "@/lib/utils";
import { TToken } from "@/lib/types";
import { useGetMarketQuote } from "@/lib/hooks/useGetMarketQuote";
import { formatUnits, parseUnits, zeroAddress } from "viem";
import DisplayFormattedNumber from "@/components/shared/displayFormattedNumber";
import { useDebounce } from "@/lib/hooks/useDebounce";
interface Props {
  balance: string;
  value: string;
  token: TToken | null;
  title: string;
  selected: boolean;
  setValue: (value: string) => void;
  openDialog: () => void;
  selectPain: () => void;
}
export default function SwapCard({
  balance,
  token,
  value,
  title,
  selected,
  openDialog,
  selectPain,
  setValue,
}: Props) {
  const debouncedValue = useDebounce(value, 300);
  const { quote } = useGetMarketQuote({
    tokenAddress: token?.address ?? zeroAddress,
    value: parseUnits(debouncedValue.debouncedValue, token?.decimals ?? 18),
  });
  return (
    <div
      onClick={selectPain}
      data-state={selected ? "active" : "inactive"}
      className="rounded-[8px] data-[state=active]:bg-[#303136]/90 bg-[#303136] data- border border-[#43444C] space-y-3 p-6 "
    >
      <h2 className="text-sm text-[#CCCCCC]">{title}</h2>
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
          <div className="h-11 w-11  absolute rounded-full z-10 -left-4">
            {token && (
              <Image
                width={50}
                height={50}
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
        <span className="text-sm text-[#CCCCCC]">
          $
          <DisplayFormattedNumber
            num={formatNumber(formatUnits(quote[0], token?.decimals ?? 18))}
          />
        </span>
        <div className="flex gap-x-4">
          <div className="flex gap-x-1">
            <Image src={wallet} alt="Wallet" />
            <span>{formatNumber(balance)}</span>
          </div>
          <button
            onClick={() => setValue(balance)}
            className="text-sm text-neutral-300"
          >
            Max
          </button>
        </div>
      </div>
    </div>
  );
}
