import Input from "@/components/ui/input";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import wallet from "@/assets/wallet.svg";
import { formatNumber, inputPatternMatch } from "@/lib/utils";
import { TToken } from "@/lib/types";
import { useGetBalance } from "@/lib/hooks/useGetBalance";
import { formatEther, formatUnits, zeroAddress } from "viem";
import { useGetMarketQuote } from "@/lib/hooks/useGetMarketQuote";
import { convertETHToWETHIfApplicable } from "@/utils";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
  value: string;
  token: TToken | null;
  title: string;
  active: boolean;
  setValue: (value: string) => void;
  onContainerClick: () => void;
  onButtonClick: () => void;
  isSuccessful?: boolean;
}

export default function SwapCard({
  token,
  value,
  title,
  active,
  onContainerClick,
  onButtonClick,
  setValue,
  isSuccessful,
}: Props) {
  const queryClient = useQueryClient();
  const { balance, queryKey } = useGetBalance({ tokenAddress: token?.address });
  const { quote } = useGetMarketQuote({
    tokenAddress: convertETHToWETHIfApplicable(token?.address ?? zeroAddress),
    value: balance,
  });

  useEffect(() => {
    if (isSuccessful) queryClient.invalidateQueries({ queryKey });
  }, [isSuccessful, queryClient, queryKey]);

  return (
    <div
      onClick={onContainerClick}
      data-state={active ? "active" : "inactive"}
      className="rounded-[16px] data-[state=active]:bg-[#303136]/90 bg-[#303136] data- border border-[#43444C] space-y-3 p-6 "
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
          onClick={onButtonClick}
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
                src={token.logoURI || ""}
                alt={token.name}
              />
            )}
          </div>
          <div className="h-14 w-14 absolute bg-[#43444C] -left-6 top-0 rounded-full "></div>
        </button>
      </div>
      <div className="flex justify-between">
        <span className="text-sm text-[#CCCCCC]">
          ${formatNumber(formatEther(quote[0]))}
        </span>
        <div className="flex gap-x-4">
          <div className="flex gap-x-1">
            <Image src={wallet} alt="Wallet" />
            <span>
              {formatNumber(formatUnits(balance, token?.decimals ?? 18))}
            </span>
          </div>
          <button
            onClick={() =>
              setValue(formatUnits(balance, token?.decimals ?? 18))
            }
            className="text-sm text-neutral-300"
          >
            Max
          </button>
        </div>
      </div>
    </div>
  );
}
