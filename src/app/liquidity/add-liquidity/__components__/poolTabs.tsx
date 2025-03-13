"use client";
import SettingsDialog from "@/app/swap/__components__/settingsDialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TPoolType } from "@/lib/types";
import { settingDialogOpenAtom } from "@/store";
import { useAtom } from "jotai";
import { Settings } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useMemo } from "react";
import { z } from "zod";

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
export default function PoolTabs() {
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

  const dialog = useAtom(settingDialogOpenAtom);
  const setDialogOpen = dialog[1];
  return (
    <div className="flex items-end">
      <SettingsDialog dontShowButton></SettingsDialog>
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
              Volatile
            </TabsTrigger>
            <TabsTrigger
              onClick={() => tabTriggerHandle(TPoolType.CONCENTRATED)}
              value="concentrated"
            >
              Concentrated
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <button className="flex items-center">
          <Settings
            onClick={() => setDialogOpen(true)}
            className="text-neutral-600 h-5 w-5"
          />
        </button>
      </div>
    </div>
  );
}
