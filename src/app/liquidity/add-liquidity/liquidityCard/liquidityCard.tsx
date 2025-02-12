"use client";
import { Card } from "@/components/ui/card";
import React, { useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import InitializePool from "./initializePool";
import Stable from "./stable";
import { z } from "zod";
import { TAddress, TPoolType } from "@/lib/types";
import { LiquidityCardFormProvider } from "./liquidityCardFormProvider";
const searchParamsSchema = z.object({
  tokenOneAddress: z.string().length(42).startsWith("0x"),
  tokenTwoAddress: z.string().length(42).startsWith("0x"),
});
export default function LiquidityCard({ poolType }: { poolType: TPoolType }) {
  const params = useSearchParams();
  const router = useRouter();
  const { tokenOneAddress, tokenTwoAddress } = useMemo(() => {
    const tokenOneAddress = params.get("tokenOne");
    const tokenTwoAddress = params.get("tokenTwo");
    const param = { tokenOneAddress, tokenTwoAddress };

    const a = searchParamsSchema.safeParse(param);
    if (a.success) {
      return {
        tokenOneAddress: a.data.tokenOneAddress as TAddress,
        tokenTwoAddress: a.data.tokenTwoAddress as TAddress,
      };
    }
    return {
      tokenOneAddress: undefined,
      tokenTwoAddress: undefined,
    };
  }, [params]);
  useEffect(() => {
    if (!tokenOneAddress || !tokenTwoAddress) {
      // router.push("/");
    }
  }, [router, tokenOneAddress, tokenTwoAddress]);
  const found = false;
  if (!tokenOneAddress || !tokenTwoAddress) {
    return;
  }
  return (
    <LiquidityCardFormProvider
      poolType={poolType}
      tokenOne={tokenOneAddress}
      tokenTwo={tokenTwoAddress}
    >
      <Card
        border="900"
        bg="1000"
        className="p-4 space-y-4 w-[440px] rounded-md"
      >
        {!found && <InitializePool />}
        {found && <Stable />}
      </Card>
    </LiquidityCardFormProvider>
  );
}
