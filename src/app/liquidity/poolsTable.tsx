"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import PoolRow from "./poolRow";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchInput from "@/components/shared/searchInput";
import { useDebounce } from "@/lib/hooks/useDebounce";
import PoolRowSkeleton from "./poolRowSkeleton";
import { zeroAddress } from "viem";
import { usePoolslistContext } from "@/contexts/poolsTvl";
type QueryFilters = {
  searchQuery: string;
  isStable: boolean | undefined;
  orderBy: "none" | "tvl" | "fees" | "volume";
  orderDirection: "up" | "down";
};

enum TabValues {
  ALL = "all",
  STABLE = "stable",
  VOLATILE = "volatile",
  CONCENTRATED = "concentrated",
}

const pageLength = 10;
export default function PoolsTable() {
  const [loadingBounced, setLoadingBounced] = useState(false);
  const { pools, isLoading } = usePoolslistContext();
  const [filters, setFilters] = useState<QueryFilters>({
    searchQuery: "",
    isStable: undefined,
    orderBy: "none",
    orderDirection: "up",
  });
  const [page, setPage] = useState(1);
  const updateState = useCallback(
    (value: Partial<QueryFilters>) => {
      setFilters({ ...filters, ...value });
    },
    [filters]
  );
  const { debouncedValue: filersBounced } = useDebounce(filters, 300);
  const poolsLength = useMemo(
    () => pools?.filter((p) => p.pair_address !== zeroAddress).length ?? 0,
    [pools]
  );
  const newPools = useMemo(() => {
    let result = pools
      ?.filter((pair) => {
        const { searchQuery } = filersBounced;
        const notZeroAddr = pair.pair_address !== zeroAddress;
        const search0 = searchQuery
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const search1 = pair.token0_symbol
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        let versionFilter = true;
        if (filters.isStable && filters.isStable !== undefined) {
          versionFilter = pair.stable;
        } else if (filters.isStable !== undefined) {
          versionFilter = !pair.stable;
        }
        return notZeroAddr && search0 && search1 && versionFilter;
      })
      .sort((a, b) => {
        if (filters.orderBy === "tvl") {
          return Number(a.tvlInUsd) - Number(b.tvlInUsd);
        }
        if (filters.orderBy === "fees") {
          return Number(a.feeInUsd) - Number(b.feeInUsd);
        }
        if (filters.orderBy === "volume") {
          return Number(a.volumeInUsd7D) - Number(b.volumeInUsd7D);
        }
        return 0;
      });

    if (filters.orderDirection === "up") {
      result.reverse();
    }

    result =
      result.slice(pageLength * page - pageLength, pageLength * page) ?? [];
    return result;
  }, [
    filersBounced,
    filters.isStable,
    filters.orderBy,
    filters.orderDirection,
    page,
    pools,
  ]);
  useEffect(() => {
    newPools.forEach((p) => console.log(p.fee));
  }, [newPools]);
  useEffect(() => {
    setPage(1);
  }, [filters.searchQuery, filters.isStable]);
  useEffect(() => {
    if (isLoading) {
      setLoadingBounced(true);
    } else {
      const timer = setTimeout(() => {
        setLoadingBounced(false);
      }, 400);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isLoading]);
  const handleTabChange = (value: string) => {
    if (value === TabValues.ALL) {
      updateState({ isStable: undefined });
    }
    if (value === TabValues.STABLE) {
      updateState({ isStable: true });
    }
    if (value === TabValues.VOLATILE) {
      updateState({ isStable: false });
    }
  };

  return (
    <>
      <div className="flex justify-between pt-4 items-center">
        <Tabs defaultValue="all" onValueChange={handleTabChange}>
          <TabsList>
            <TabsTrigger value={TabValues.ALL}>All</TabsTrigger>
            <TabsTrigger value={TabValues.STABLE}>Stable</TabsTrigger>
            <TabsTrigger value={TabValues.VOLATILE}>Volatile</TabsTrigger>
            {/* <TabsTrigger value={TabValues.CONCENTRATED}> */}
            {/*   Concentrated */}
            {/* </TabsTrigger> */}
          </TabsList>
        </Tabs>
        <div className="hidden md:block">
          <SearchInput
            className="bg-neutral-950   w-[285px]"
            value={filters.searchQuery}
            setValue={(value) => {
              updateState({ searchQuery: value });
            }}
          ></SearchInput>
        </div>
      </div>
      <div className="pt-4 min-h-[500px]  overflow-x-auto scroll-container">
        <table className="w-full min-w-[500px]">
          <thead className="text-neutral-400 text-sm text-right w-full">
            <tr className=" grid grid-cols-6 lg:grid-cols-11 items-center gap-x-4 px-4">
              <th className=" col-span-3 lg:col-span-4 text-left flex gap-x-4">
                <span>Pool Name</span>
              </th>
              <th className="flex justify-end ">
                <OrderButton
                  title="TVL"
                  orderBy={"tvl"}
                  direction={filters.orderDirection}
                  value={filters.orderBy}
                  onClick={(a, b) =>
                    updateState({
                      orderDirection: a,
                      orderBy: b,
                    })
                  }
                />
              </th>
              <th className="hidden lg:block">APR</th>
              <th className=" justify-end hidden lg:flex">
                <OrderButton
                  title="Fees"
                  orderBy={"fees"}
                  direction={filters.orderDirection}
                  value={filters.orderBy}
                  onClick={(a, b) =>
                    updateState({
                      orderDirection: a,
                      orderBy: b,
                    })
                  }
                />
              </th>
              <th className="flex justify-end">
                <OrderButton
                  title="Volume"
                  orderBy={"volume"}
                  direction={filters.orderDirection}
                  value={filters.orderBy}
                  onClick={(a, b) =>
                    updateState({
                      orderDirection: a,
                      orderBy: b,
                    })
                  }
                />
              </th>
              <th className="text-left hidden lg:block col-span-3 pl-4">
                Liquidity Manager
              </th>
            </tr>
          </thead>
          <tbody className="gap-y-2 pt-2 flex flex-col">
            {loadingBounced &&
              Array.from({ length: 10 }, (_, i) => <PoolRowSkeleton key={i} />)}
            {!loadingBounced &&
              newPools?.map((pool) => (
                <PoolRow {...pool} key={pool.pair_address} />
              ))}
          </tbody>
        </table>
      </div>

      <div className="py-2  flex justify-between">
        <p className="text-[13px]">
          Page {page}{" "}
          <span className="text-neutral-300">({poolsLength} results)</span>
        </p>
        <div className="flex">
          <button
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
            aria-label="Previous Page of Pools"
            disabled={page === 1}
            className="disabled:opacity-50"
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            onClick={() => {
              if ((newPools?.length ?? 0) < pageLength) {
              } else {
                setPage(page + 1);
              }
            }}
            aria-label="Next Page of Pools"
            disabled={(newPools?.length ?? 0) < pageLength}
            className="disabled:opacity-50"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      </div>
    </>
  );
}

function OrderButton({
  onClick,
  direction,
  title,
  orderBy,
  value,
}: {
  title: string;
  onClick: (
    direction: "up" | "down",
    orderBy: "tvl" | "fees" | "volume"
  ) => void;
  direction: "up" | "down";
  orderBy: "tvl" | "fees" | "volume";
  value: "tvl" | "fees" | "volume" | "none";
}) {
  const handleClick = () => {
    if (orderBy !== value) {
      onClick("up", orderBy);
      return;
    }
    onClick(direction === "up" ? "down" : "up", orderBy);
  };
  const selected = orderBy === value;
  return (
    <button className=" flex gap-x-1 items-center" onClick={handleClick}>
      <span className="hover:text-white">{title}</span>
      <div className="hidden lg:block">
        <ChevronUp
          data-direction={selected ? direction : "none"}
          className="text-neutral-400 data-[direction=none]:text-neutral-400 -mb-1 data-[direction=up]:text-white"
          size={16}
          strokeWidth={3}
        />
        <ChevronDown
          data-direction={selected ? direction : "none"}
          strokeWidth={3}
          className="text-neutral-400 -mt-1 data-[direction=none]:text-neutral-400 data-[direction=down]:text-white"
          size={16}
        />
      </div>
    </button>
  );
}
