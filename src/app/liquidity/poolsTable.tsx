"use client";
import { useState, useCallback, useEffect, useMemo } from "react";
import { ChevronRight, ChevronLeft, ChevronDown } from "lucide-react";
import PoolRow from "./poolRow";
import { abi } from "@/lib/abis/PairHelper";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchInput from "@/components/shared/searchInput";
import { useDebounce } from "@/lib/hooks/useDebounce";
import PoolRowSkeleton from "./poolRowSkeleton";
import { useReadContract } from "wagmi";
import { ChainId, PAIR_HELPER } from "@/data/constants";
import { zeroAddress } from "viem";

type QueryFilters = {
  searchQuery: string;
  isStable: boolean | undefined;
  orderTvl: boolean;
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
  const [filters, setFilters] = useState<QueryFilters>({
    searchQuery: "",
    isStable: undefined,
    orderTvl: true,
  });
  const [page, setPage] = useState(1);
  const updateState = useCallback(
    (value: Partial<QueryFilters>) => {
      setFilters({ ...filters, ...value });
    },
    [filters]
  );
  const { data, isLoading } = useReadContract({
    abi,
    address: PAIR_HELPER[ChainId.MONAD_TESTNET],
    functionName: "getAllPair",
    args: [zeroAddress, 200n, 0n],
    query: {
      staleTime: 1000 * 60 * 5,
    },
  });

  // ** this stops react query refetching our data from server
  // until one of the filters changes
  const { debouncedValue: filersBounced } = useDebounce(filters, 300);
  const poolsLength = useMemo(
    () => data?.filter((p) => p.pair_address !== zeroAddress).length ?? 0,
    [data]
  );
  const newPools = useMemo(() => {
    const result =
      data
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
        .slice(pageLength * page - pageLength, pageLength * page)
        .sort((a, b) => Number(a.total_supply) - Number(b.total_supply)) ?? [];
    if (filters.orderTvl) {
      result.reverse();
    }
    return result;
  }, [data, filersBounced, filters.isStable, filters.orderTvl, page]);
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
        <SearchInput
          className="bg-neutral-950 w-[285px]"
          value={filters.searchQuery}
          setValue={(value) => {
            updateState({ searchQuery: value });
          }}
        ></SearchInput>
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
                  onClick={() => updateState({ orderTvl: !filters.orderTvl })}
                  className="flex gap-x-1 items-center"
                >
                  <ChevronDown
                    data-direction={filters.orderTvl ? "up" : "down"}
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
            {loadingBounced &&
              Array.from({ length: 10 }, (_, i) => <PoolRowSkeleton key={i} />)}
            {!loadingBounced &&
              newPools?.map((pool) => (
                <PoolRow {...pool} key={pool.pair_address} />
              ))}
          </tbody>
        </table>

        <div className="pt-2  flex justify-between">
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
      </div>
    </>
  );
}
