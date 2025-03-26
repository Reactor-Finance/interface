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
import { usePoolslistContext } from "@/contexts/pairsProvider";

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
  const prunedData = useMemo(
    () =>
      pools.filter(
        (p) => p.pair_address !== zeroAddress && p.total_supply > 0n
      ),
    [pools]
  );
  const lastPage = useMemo(
    () => Math.ceil(prunedData.length / pageLength),
    [prunedData]
  );
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
  const { debouncedValue: filtersDebounced } = useDebounce(filters, 300);
  const poolsLength = useMemo(
    () => pools?.filter((p) => p.pair_address !== zeroAddress).length ?? 0,
    [pools]
  );
  const modifiedPools = useMemo(() => {
    const { searchQuery, isStable, orderBy, orderDirection } = filtersDebounced;
    // First filter by search query
    let filteredPools = searchQuery.trim().length
      ? prunedData.filter(
          (pool) =>
            pool.token0_symbol
              .toLowerCase()
              .startsWith(searchQuery.toLowerCase()) ||
            pool.token1_symbol
              .toLowerCase()
              .startsWith(searchQuery.toLowerCase()) ||
            pool.name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
            pool.symbol.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      : prunedData;
    // Filter now by stability
    if (isStable)
      filteredPools = filteredPools.filter((pool) => pool.stable === isStable);
    // Sort by TVL
    switch (orderBy) {
      case "none":
        break;
      case "tvl":
        filteredPools = filteredPools.toSorted((a, b) => Number(b.tvl - a.tvl));
        break;
      case "fees":
        filteredPools = filteredPools.toSorted((a, b) =>
          Number(b.fees - a.fees)
        );
        break;
      case "volume":
        filteredPools = filteredPools.toSorted((a, b) =>
          Number(b.volume24hr - a.volume24hr)
        );
        break;
    }

    switch (orderDirection) {
      case "up":
        filteredPools = filteredPools.reverse();
        break;
      case "down":
        break;
    }

    const start = (page - 1) * pageLength;
    const end = page * pageLength;
    return filteredPools.slice(start, end);
  }, [filtersDebounced, page, prunedData]);

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

  const handleTabChange = useCallback(
    (value: TabValues) => {
      switch (value) {
        case TabValues.ALL: {
          updateState({ isStable: undefined });
          break;
        }
        case TabValues.STABLE: {
          updateState({ isStable: true });
          break;
        }
        case TabValues.VOLATILE: {
          updateState({ isStable: false });
          break;
        }
        case TabValues.CONCENTRATED: {
          updateState({ isStable: undefined });
          break;
        }
      }
    },
    [updateState]
  );

  return (
    <>
      <div className="flex justify-between pt-4 items-center">
        <Tabs
          defaultValue="all"
          onValueChange={(val) => handleTabChange(val as TabValues)}
        >
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
          />
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
              Array.from({ length: pageLength }, (_, i) => (
                <PoolRowSkeleton key={i} />
              ))}
            {!loadingBounced &&
              modifiedPools.map((pool) => (
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
            onClick={() => setPage((p) => p - 1)}
            aria-label="Previous Page of Pools"
            disabled={page === 1}
            className="disabled:opacity-50"
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            aria-label="Next Page of Pools"
            disabled={page === lastPage}
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
