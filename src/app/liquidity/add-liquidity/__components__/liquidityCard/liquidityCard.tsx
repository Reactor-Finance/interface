"use client";
import { Card } from "@/components/ui/card";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import InitializePool from "./initializePool";
import Stable from "./stable";
import { z } from "zod";
import { TPoolType } from "@/lib/types";
import { LiquidityCardFormProvider } from "./liquidityCardFormProvider";
import { isAddress } from "viem";

const searchParamsSchema = z.object({
  token0: z.string().refine((arg) => isAddress(arg)),
  token1: z.string().refine((arg) => isAddress(arg)),
});

export default function LiquidityCard({ poolType }: { poolType: TPoolType }) {
  const params = useSearchParams();
  const { token0, token1 } = useMemo(() => {
    const token0 = params.get("token0");
    const token1 = params.get("token1");
    const param = { token0, token1 };
    const afterParse = searchParamsSchema.safeParse(param);
    return afterParse.success
      ? {
          token0: afterParse.data.token0,
          token1: afterParse.data.token1,
        }
      : {
          token0: undefined,
          token1: undefined,
        };
  }, [params]);

  const found = useMemo(() => !!token0 && !!token1, [token0, token1]);

  return !token0 || !token1 ? undefined : (
    <LiquidityCardFormProvider
      poolType={poolType}
      tokenOne={token0}
      tokenTwo={token1}
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
