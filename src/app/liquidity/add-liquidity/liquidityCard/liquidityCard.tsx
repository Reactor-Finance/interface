"use client";
import { Card } from "@/components/ui/card";
import React, { useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import InitializePool from "./initializePool";
import Stable from "./stable";
import { z } from "zod";
import { TAddress } from "@/lib/types";
import { LiquidityCardFormProvider } from "./liquidityCardFormProvider";
const searchParamsSchema = z.object({
  tokenOneAddress: z.string().length(42).startsWith("0x"),
  tokenTwoAddress: z.string().length(42).startsWith("0x"),
  version: z.string(),
});
export default function LiquidityCard() {
  const params = useSearchParams();
  const router = useRouter();
  const { tokenOneAddress, tokenTwoAddress, version } = useMemo(() => {
    const tokenOneAddress = params.get("tokenOne");
    const tokenTwoAddress = params.get("tokenTwo");
    const version = params.get("version");
    const param = { tokenOneAddress, tokenTwoAddress, version };

    const a = searchParamsSchema.safeParse(param);
    if (a.success) {
      return {
        tokenOneAddress: a.data.tokenOneAddress as TAddress,
        tokenTwoAddress: a.data.tokenTwoAddress as TAddress,
        version: a.data.version as TAddress,
      };
    }
    return {
      tokenOneAddress: undefined,
      tokenTwoAddress: undefined,
      version: undefined,
    };
  }, [params]);
  //https://nextjs.org/docs/app/api-reference/functions/use-search-params
  useEffect(() => {
    if (!tokenOneAddress || !tokenTwoAddress || !version) {
      // router.push("/");
    }
  }, [router, tokenOneAddress, tokenTwoAddress, version]);
  const found = false;
  if (!tokenOneAddress || !tokenTwoAddress || !version) {
    return;
  }
  return (
    <LiquidityCardFormProvider
      tokenOne={tokenOneAddress}
      tokenTwo={tokenTwoAddress}
    >
      <Card
        border="900"
        bg="1000"
        className="p-4 space-y-4 w-[440px] rounded-md"
      >
        {!found && (
          <InitializePool
            tokenOne={tokenOneAddress}
            tokenTwo={tokenTwoAddress}
          />
        )}
        {found && <Stable />}
      </Card>
    </LiquidityCardFormProvider>
  );
}
