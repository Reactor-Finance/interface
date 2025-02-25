"use client";
import { Card } from "@/components/ui/card";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import InitializePool from "./initializePool";
import { z } from "zod";
import { isAddress } from "viem";

const searchParamsSchema = z.object({
  token0: z.string().refine((arg) => isAddress(arg)),
  token1: z.string().refine((arg) => isAddress(arg)),
});

export default function LiquidityCard() {
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

  return !token0 || !token1 ? undefined : (
    <Card border="900" bg="1000" className="p-4 space-y-4 w-[440px] rounded-md">
      <InitializePool />
    </Card>
  );
}
