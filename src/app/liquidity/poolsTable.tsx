"use client";
import { useState, useCallback, useMemo } from "react";
import { ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
import PoolRow from "./poolRow";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchInput from "@/components/shared/searchInput";
import { useDebounce } from "@/lib/hooks/useDebounce";
import PoolRowSkeleton from "./poolRowSkeleton";
import { useGetPairs } from "@/lib/hooks/useGetPairs";
import { zeroAddress } from "viem";

type QueryFilters = {
  searchQuery: string;
  isStable: boolean | undefined;
  orderByTvl: boolean;
};

enum TabValues {
  ALL = "all",
  STABLE = "stable",
  VOLATILE = "volatile",
  CONCENTRATED = "concentrated",
}

export default function PoolsTable() {
  const [filters, setFilters] = useState<QueryFilters>({
    searchQuery: "",
    isStable: undefined,
    orderByTvl: true,
  });
  const [page, setPage] = useState(1);

  const updateState = useCallback((value: Partial<QueryFilters>) => {
    setFilters((filters) => ({ ...filters, ...value }));
  }, []);

  const { data, isLoading } = useGetPairs({});
  const prunedData = useMemo(
    () => data.filter((p) => p.pair_address !== zeroAddress),
    [data]
  );
  const lastPage = useMemo(
    () => Math.ceil(prunedData.length / 20),
    [prunedData]
  );

  // ** this stops react query refetching our data from server
  // until one of the filters changes
  const { debouncedValue: filtersDebounced } = useDebounce(filters, 300);
  const pools = useMemo(() => {
    const { searchQuery, isStable, orderByTvl } = filtersDebounced;
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
    if (orderByTvl)
      filteredPools = filteredPools.toSorted(
        (a, b) =>
          Number(b.reserve0 + b.reserve1) - Number(a.reserve0 + a.reserve1)
      );

    const start = (page - 1) * 20;
    const end = page * 20;
    return filteredPools.slice(start, end);
  }, [filtersDebounced, page, prunedData]);

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
        <SearchInput
          className="bg-neutral-950 w-[285px]"
          value={filters.searchQuery}
          setValue={(value) => {
            updateState({ searchQuery: value });
          }}
        />
      </div>
      <div className="pt-4 min-h-[500px]">
        <table className="w-full ">
          <thead className="text-neutral-400 text-sm text-right w-full">
            <tr className=" grid grid-cols-11 gap-x-4 px-4">
              <th className="col-span-4 text-left flex gap-x-4">
                <span>Pool Name</span>
              </th>
              <th className="flex justify-end">
                <button
                  onClick={() =>
                    updateState({ orderByTvl: !filters.orderByTvl })
                  }
                  className="flex gap-x-1 items-center"
                >
                  <ChevronDown
                    data-direction={filters.orderByTvl ? "up" : "down"}
                    className="text-white data-[direction=up]:rotate-180"
                    size={18}
                  />
                  <span>TVL</span>
                </button>
              </th>
              <th>APR</th>
              <th>Volume</th>
              <th>Fees</th>
              <th className="text-left col-span-3 pl-4">Liquidity Manager</th>
            </tr>
          </thead>
          <tbody className="gap-y-2 pt-2 flex flex-col">
            {isLoading &&
              Array.from({ length: 20 }, (_, i) => <PoolRowSkeleton key={i} />)}
            {!isLoading &&
              pools.map((pool) => (
                <PoolRow {...pool} key={pool.pair_address} />
              ))}
          </tbody>
        </table>

        <div className="pt-2  flex justify-between">
          <p className="text-[13px]">
            Page {page}{" "}
            <span className="text-neutral-300">
              ({prunedData.length} results)
            </span>
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
      </div>
    </>
  );
}
