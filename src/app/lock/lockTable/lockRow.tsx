import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useCallback, useMemo } from "react";
import { TLockToken } from "../types";
import logo from "@/assets/reactor-symbol.svg";
import { formatUnits } from "viem";
import { formatNumber } from "@/lib/utils";
import { RCT_DECIMALS, VAS } from "@/data/constants";
import { useAtomicDate } from "@/lib/hooks/useAtomicDate";
import { useChainId, useWriteContract } from "wagmi";
import { useVeApprovalForSingle } from "@/lib/hooks/useVeApprovalsSimulate";
import { useVasClaimForSingleToken } from "@/lib/hooks/useVasClaims";
import { useTransactionToastProvider } from "@/contexts/transactionToastProvider";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner";

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
  const chainId = useChainId();
  const vas = useMemo(() => VAS[chainId], [chainId]);
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

  const {
    needsApproval,
    simulation: approvalSimulation,
    queryKey: approvalQueryKey,
  } = useVeApprovalForSingle({ spender: vas, tokenId: token.id });
  const { data: simulation } = useVasClaimForSingleToken({
    tokenId: token.id,
    enableQuery: !needsApproval,
  });
  const { writeContract, reset, isPending } = useWriteContract();
  const { setToast } = useTransactionToastProvider();
  const queryClient = useQueryClient();

  const onSubmit = useCallback(() => {
    if (needsApproval && approvalSimulation) {
      reset();
      writeContract(approvalSimulation.request, {
        onSuccess: (hash) => {
          queryClient.invalidateQueries({ queryKey: approvalQueryKey });
          setToast({
            hash,
            actionTitle: "Approved",
            actionDescription: "You gave approval to spend your NFTs",
          });
        },
      });
      return;
    }
    if (simulation) {
      reset();
      writeContract(simulation.request, {
        onSuccess: (hash) => {
          setToast({
            hash,
            actionTitle: "Transaction successful",
            actionDescription: "You have successfully claimed reward",
          });
        },
      });
      return;
    }
  }, [needsApproval, approvalSimulation, simulation, queryClient, setToast]);

  const isValid = useMemo(
    () => Boolean(simulation) || (needsApproval && Boolean(approvalSimulation)),
    [simulation, approvalSimulation, needsApproval]
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
          <Button
            onClick={onSubmit}
            disabled={!isValid || isPending}
            variant={"primary"}
            size="sm"
          >
            {isPending ? (
              <Spinner />
            ) : (
              <>{needsApproval ? "Approve" : "Claim"}</>
            )}
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
