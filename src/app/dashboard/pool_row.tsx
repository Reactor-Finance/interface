import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import CurrenciesOverlapIcons from "@/components/shared/currenciesOverlapIcons";
import symbol from "@/assets/reactor-symbol.svg";
import greenDot from "@/assets/green-dot.svg";
import { EllipsisIcon } from "lucide-react";
import Image from "next/image";

export default function PoolRow() {
  return (
    <tr className="grid text-center rounded-sm grid-cols-7 items-center bg-neutral-1000 py-2 px-6">
      <td className="bg-neutral-1000 text-left col-span-2">
        <div className="flex items-center justify-start gap-4">
          <CurrenciesOverlapIcons
            size="sm"
            tokenOne={{
              alt: "",
              address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            }}
            tokenTwo={{
              alt: "",
              address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
            }}
          />
          <div className="flex flex-col">
            <span className="text-sm tracking-tight">vAMM-ETH/USDC</span>
            <div className="flex items-center justify-start gap-1.5">
              <Badge className="py-1" border="none" colors="yellow" size="sm">
                Volatile
              </Badge>
              <div className="inline-flex items-baseline rounded-md  px-1 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-light border border-neutral-800">
                0.3%
              </div>
            </div>
          </div>
        </div>
      </td>
      <td className="flex flex-col justify-center items-center">
        <Badge
          className="inline-block px-1 py-1 w-full"
          border="none"
          colors="success"
          size="sm"
        >
          In Range
        </Badge>
        <div className="flex items-center gap-1">
          <Image src={greenDot} alt="green dot" width={8} height={8} />
          <span className="text-[10px] leading-[16px]">Earning emissions</span>
        </div>
      </td>
      <td className="text-sm">$6,950.5</td>
      <td className="text-blue-light text-sm">100.92%</td>
      <td className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-[9px]">
          <Image
            className="inline-block"
            src={symbol}
            width={20}
            height={20}
            alt="Reactor Ticker"
          />
          <span className="text-sm">123,000.23</span>
        </div>
        <span className="text-sm text-neutral-400">$6,950.5</span>
      </td>
      <td>
        <div className="flex gap-x-2 justify-end">
          <Button variant={"primary"} size="xs">
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
              <DropdownMenu.Item className="hover:bg-neutral-900 outline-none pl-3 py-2 pr-9 rounded-sm hover:cursor-pointer">
                Increase
              </DropdownMenu.Item>
              <DropdownMenu.Item className="hover:bg-neutral-900 outline-none pl-3 py-2 pr-9 rounded-sm hover:cursor-pointer">
                Withdraw
              </DropdownMenu.Item>
              <DropdownMenu.Item className="hover:bg-neutral-900 outline-none pl-3 py-2 pr-9 rounded-sm hover:cursor-pointer">
                Stake
              </DropdownMenu.Item>
              <DropdownMenu.Item className="hover:bg-neutral-900 outline-none pl-3 py-2 pr-9 rounded-sm hover:cursor-pointer">
                Unstake
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </td>
    </tr>
  );
}
