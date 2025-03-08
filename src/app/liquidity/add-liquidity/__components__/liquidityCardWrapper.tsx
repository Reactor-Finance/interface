"use client";
import React, { useMemo } from "react";
import LiquidityCard from "./liquidityCard/liquidityCard";
import { useSearchParams } from "next/navigation";
import { searchParamsSchema } from "../types";
import { convertToPoolType } from "../utils";

export default function LiquidityCardWrapper() {
  const params = useSearchParams();
  const { poolType } = useMemo(() => {
    const version = params.get("version");
    const param = { version };

    const payload = searchParamsSchema.safeParse(param);
    return payload.success
      ? {
          poolType: convertToPoolType(payload.data.version),
        }
      : {
          poolType: undefined,
        };
  }, [params]);
  console.log("HELLO");
  return (
    <div className="flex justify-center p-4">
      {poolType !== undefined && <LiquidityCard />}
    </div>
  );
}
