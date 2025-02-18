import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { TLockToken } from "../types";
import logo from "@/assets/reactor-symbol.svg";
import { useLockProvider } from "../lockProvider";
import { formatUnits } from "viem";
import { formatNumber } from "@/lib/utils";
interface Props {
  setOpenModal: (open: boolean) => void;
  token: TLockToken;
}
export default function LockRow({ setOpenModal, token }: Props) {
  const { setSelectedTokenId } = useLockProvider();
  return (
    <tr className="grid text-center rounded-sm grid-cols-8 items-center bg-neutral-1000 py-2 px-6">
      <td className="bg-neutral-1000 flex gap-x-2 items-center text-left col-span-2">
        <div>
          <Image src={logo} alt="logo" />
        </div>
        <span>Lock ID {token.id.toString()}</span>
      </td>
      <td className="">
        <span className="block">
          {formatNumber(formatUnits(token.voting_amount, token.decimals))} veRCT
        </span>
        <span className="block text-neutral-500 text-[12px]">
          Locked{" "}
          {formatNumber(formatUnits(token.amount, Number(token.decimals)))} RCT
        </span>
      </td>
      <td className="">11.22</td>
      <td className="">0 RCT</td>
      <td className="">5 June 2025</td>
      <td className="">
        <Badge border="one" colors="success">
          Success
        </Badge>
      </td>
      <td>
        <div className="flex gap-x-4 justify-end">
          <Button variant={"primary"} size="xs">
            Claim
          </Button>
          <Button
            onClick={() => {
              setSelectedTokenId(token.id.toString());
              setOpenModal(true);
            }}
            variant={"outline"}
            size="xs"
          >
            Manage
          </Button>
        </div>
      </td>
    </tr>
  );
}
