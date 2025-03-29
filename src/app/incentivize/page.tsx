"use client";
import { Card } from "@/components/ui/card";
import Headers from "@/components/ui/headers";
import PageMarginContainer from "@/components/ui/pageMarginContainer";
import React from "react";
import RctInput from "../lock/rctInput";
import { formatNumber } from "@/lib/utils";
import { formatUnits } from "viem/utils";
import { RCT_DECIMALS } from "@/data/constants";
import { Alert } from "@/components/ui/alert";
import SubmitButton, { ButtonState } from "@/components/shared/submitBtn";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectItem } from "@radix-ui/react-select";

export default function Page() {
  return (
    <PageMarginContainer className="flex justify-center">
      <div className="max-w-[500px]">
        <div className="flex justify-between items-end pb-2">
          <Headers.GradiantHeaderOne>Incentivize</Headers.GradiantHeaderOne>
          <span className="text-[13px] font-light text-neutral-400">
            Request token whitelist
          </span>
        </div>
        <Card className="w-full" bg="1000">
          <div className="space-y-4">
            <div className="text-sm text-neutral-400">Choose a pool</div>

            <Select>
              <SelectTrigger className="flex  py-4 bg-neutral-950 border-neutral-900">
                <div className="flex justify-center  items-center gap-x-2 ">
                  <SelectValue placeholder={"Hello"} />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Item 1</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex justify-between border-y border-neutral-900 py-4 text-sm">
              <span className="text-neutral-400">Your Deposit</span>
              <span>920.24 vAMM-ETH/USDC</span>
            </div>
            <div className="grid text-sm grid-cols-3 pb-4 border-b border-neutral-900">
              <div className="flex flex-col text-sm items-start">
                <div>APR</div>
                <div className="text-neutral-400">920.24%</div>
              </div>
              <div className="flex flex-col text-sm items-center">
                <div>APR</div>
                <div className="text-neutral-400">920.24%</div>
              </div>
              <div className="flex flex-col text-sm items-end">
                <div>APR</div>
                <div className="text-neutral-400">920.24%</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-end">
                <h5 className="text-neutral-300 text-[13px]">
                  Available:{" "}
                  <span className="text-white">
                    {formatNumber(formatUnits(0n, RCT_DECIMALS))} RCT
                  </span>
                </h5>
              </div>
              <RctInput></RctInput>
            </div>
            <Alert colors="muted">
              {`Incentives are usually provided by the protocols. By continuing
              with the next steps you acknowledge that you understand the
              mechanics of the protocol and that after depositing any rewards as
              incentives you won't be able to withdraw them.`}
            </Alert>
            <SubmitButton state={ButtonState.Default} isValid={false}>
              Approve
            </SubmitButton>
          </div>
        </Card>
      </div>
    </PageMarginContainer>
  );
}
