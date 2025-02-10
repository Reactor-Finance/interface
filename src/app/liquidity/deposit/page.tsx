import { Card } from "@/components/ui/card";
import Headers from "@/components/ui/headers";
import PageMarginContainer from "@/components/ui/pageMarginContainer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import ImageWithFallback from "@/components/shared/imageWithFallback";
import { getLogoAsset } from "@/utils";
import { USDC_ADDRESS } from "@/data/constants";
import { Alert } from "@/components/ui/alert";

export default function Page() {
  return (
    <PageMarginContainer>
      <Headers.GradiantHeaderOne colorOne="#A0055D" colorTwo="#836EF9">
        Deposit Liquidity
      </Headers.GradiantHeaderOne>
      <div className="pt-6"></div>
      <div className=" gap-x-4 grid grid-cols-2">
        <Card bg="950" className="p-4 w-full">
          <Select>
            <SelectTrigger className="flex p-4">
              <div className="flex justify-center items-center gap-x-2 ">
                <ImageWithFallback
                  src={getLogoAsset(USDC_ADDRESS)}
                  width={24}
                  height={24}
                  alt="Reactor Ticker"
                />
                <SelectValue placeholder={"usdc"} />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup></SelectGroup>
            </SelectContent>
          </Select>
        </Card>
        <Card bg="950"></Card>
      </div>
      <div className="pt-6">
        <Alert colors="muted">Select a tokens first</Alert>
      </div>
    </PageMarginContainer>
  );
}
