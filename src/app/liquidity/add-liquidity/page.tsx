"use client";
import Headers from "@/components/ui/headers";
import PageMarginContainer from "@/components/ui/pageMarginContainer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Settings } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo } from "react";
import LiquidityCard from "./liquidityCard/liquidityCard";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { TPoolType } from "@/lib/types";
const searchParamsSchema = z.object({
  version: z.enum(["stable", "volatile", "concentrated"]),
});
function covertToPoolType(version: string) {
  switch (version) {
    case "stable":
      return TPoolType.STABLE;
    case "volatile":
      return TPoolType.VOLATILE;
    case "concentrated":
      return TPoolType.CONCENTRATED;
  }
}
export default function Page() {
  const params = useSearchParams();
  const router = useRouter();
  const { poolType, version } = useMemo(() => {
    const version = params.get("version");
    const param = { version };

    const a = searchParamsSchema.safeParse(param);
    if (a.success) {
      return {
        version: a.data.version,
        poolType: covertToPoolType(a.data.version),
      };
    }
    return {
      poolType: undefined,
    };
  }, [params]);
  useEffect(() => {
    if (poolType === undefined) router.push("/");
  }, [poolType, router]);
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const searchParams = new URLSearchParams(params.toString());
      searchParams.set(name, value);
      return searchParams.toString();
    },
    [params]
  );
  const tabTriggerHandle = useCallback(
    (poolType: TPoolType) => {
      if (poolType === TPoolType.STABLE) {
        router.push("add-liquidity?" + createQueryString("version", "stable"), {
          scroll: false,
        });
      } else if (poolType === TPoolType.VOLATILE) {
        router.push(
          "add-liquidity?" + createQueryString("version", "volatile"),
          { scroll: false }
        );
      } else if (poolType === TPoolType.CONCENTRATED) {
        router.push(
          "add-liquidity?" + createQueryString("version", "concentrated"),

          { scroll: false }
        );
      }
    },
    [createQueryString, router]
  );
  if (!version && poolType === undefined) return;
  return (
    <PageMarginContainer>
      <div className="flex justify-between">
        <div>
          <div>
            <Link
              href="/liquidity"
              className="flex text-[14px] gap-x-2 items-center"
            >
              <span>
                <ChevronLeft className="w-5 h-5" />
              </span>
              <span>All Pools</span>
            </Link>
          </div>
          <div className="pt-6"></div>
          <Headers.GradiantHeaderOne colorOne="#A0055D" colorTwo="#836EF9F2">
            Add liquidity
          </Headers.GradiantHeaderOne>
        </div>
        <div className="flex gap-x-4 items-center">
          <Tabs value={version}>
            <TabsList colors="muted">
              <TabsTrigger
                onClick={() => tabTriggerHandle(TPoolType.STABLE)}
                value="stable"
              >
                Stable
              </TabsTrigger>
              <TabsTrigger
                onClick={() => tabTriggerHandle(TPoolType.VOLATILE)}
                value="volatile"
              >
                Classic
              </TabsTrigger>
              <TabsTrigger
                onClick={() => tabTriggerHandle(TPoolType.CONCENTRATED)}
                value="concentrated"
              >
                Concentrated
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <button>
            <Settings className="text-neutral-600 h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="pt-6"></div>
      <div className="flex justify-center p-4">
        {poolType !== undefined && <LiquidityCard poolType={poolType} />}
      </div>
    </PageMarginContainer>
  );
}
