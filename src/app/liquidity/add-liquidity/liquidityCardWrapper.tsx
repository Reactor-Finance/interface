"use client";
import React, { useMemo } from "react";
import LiquidityCard from "./liquidityCard/liquidityCard";
import { useSearchParams } from "next/navigation";
import { searchParamsSchema } from "./types";
import { convertToPoolType } from "./utils";

export default function LiquidityCardWrapper() {
  const params = useSearchParams();
  const { poolType } = useMemo(() => {
    const version = params.get("version");
    const param = { version };

    const a = searchParamsSchema.safeParse(param);
    if (a.success) {
      return {
        version: a.data.version,
        poolType: convertToPoolType(a.data.version),
      };
    }
    return {
      poolType: undefined,
    };
  }, [params]);
  console.log(poolType);
  return (
    <div className="flex justify-center p-4">
      {poolType !== undefined && <LiquidityCard poolType={poolType} />}
    </div>
  );
}
