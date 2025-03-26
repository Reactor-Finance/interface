import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useMemo } from "react";
import { TLockToken } from "../types";
import logo from "@/assets/reactor-symbol.svg";
import { formatUnits } from "viem";
import { formatNumber } from "@/lib/utils";
import { RCT_DECIMALS } from "@/data/constants";
import { useAtomicDate } from "@/lib/hooks/useAtomicDate";

enum TokenStatus {
  ACTIVE = "Active",
  INACTIVE = "Not Active",
  EXPIRED = "Expired",
}

interface Props {
  setOpenModal: (open: boolean) => void;
  token: TLockToken;
  onLockActionMenuClicked: (lockToken: TLockToken) => void;
}

export default function LockRow({
  setOpenModal,
  token,
  onLockActionMenuClicked,
}: Props) {
  const unlockDate = useMemo(
    () => new Date(Number(token.lockEnd) * 1000),
    [token]
  );
  const currentDate = useAtomicDate();
  const status = useMemo(() => {
    const lockEnd = new Date(Number(token.lockEnd) * 1000);
    return lockEnd <= currentDate
      ? TokenStatus.EXPIRED
      : token.voted
        ? TokenStatus.ACTIVE
        : TokenStatus.INACTIVE;
  }, [token, currentDate]);
  const apr = useMemo(
    () => (token.rebase_amount * 100n) / token.amount,
    [token]
  );

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
      <td>
        <span className="text-blue-light">{String(apr)}%</span>
      </td>
      <td className="">
        {formatNumber(formatUnits(token.rebase_amount, RCT_DECIMALS))} RCT
      </td>
      <td className="">{unlockDate.toDateString()}</td>
      <td className="">
        <Badge
          border="one"
          colors={
            status === TokenStatus.EXPIRED
              ? "yellow"
              : status === TokenStatus.ACTIVE
                ? "success"
                : "error"
          }
        >
          {status}
        </Badge>
      </td>
      <td>
        <div className="flex gap-x-4 justify-end">
          <Button variant={"primary"} size="sm">
            Claim
          </Button>
          <Button
            onClick={() => {
              onLockActionMenuClicked(token);
              setOpenModal(true);
            }}
            variant={"outline"}
            size="sm"
          >
            Manage
          </Button>
        </div>
      </td>
    </tr>
  );
}
