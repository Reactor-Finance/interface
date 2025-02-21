"use client";
import { useState, useCallback } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import PoolRow from "./poolRow";
import { api } from "@/trpc/react";
import { TPools } from "@/server/queries/pools";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchInput from "@/components/shared/searchInput";
import { useDebounce } from "@/components/shared/hooks/useDebounce";
import useInitializePage from "./hooks/useInitializePage";
type QueryFilters = {
  searchQuery: string;
  isStable: boolean | undefined;
};

enum TabValues {
  ALL = "all",
  STABLE = "stable",
  VOLATILE = "volatile",
  CONCENTRATED = "concentrated",
}
export default function PoolsTable({
  initialPools,
}: {
  initialPools: { pairs: TPools[] } | undefined;
}) {
  const [filters, setFilters] = useState<QueryFilters>({
    searchQuery: "",
    isStable: undefined,
  });
  // const [page, setPage] = useState(1);
  const updateState = useCallback(
    (value: Partial<QueryFilters>) => {
      setFilters({ ...filters, ...value });
    },
    [filters]
  );

  // ** this stops react query refetching our data from server
  // until one of the filters changes
  const { enabled } = useInitializePage({
    dependencies: [filters.searchQuery, filters.isStable],
  });
  const { debouncedValue: searchQueryBounced } = useDebounce(
    filters.searchQuery,
    400
  );
  const { data: pools, isFetching } = api.pool.getPools.useQuery(
    {
      isStable: filters.isStable,
      searchQuery: searchQueryBounced,
    },
    {
      placeholderData: initialPools,
      enabled,
      // staleTime: 1000 * 60 * 5,
    }
  );
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
                <span>#</span> <span>Pool Name</span>
              </th>
              <th className="">TVL</th>
              <th>APR</th>
              <th>Volume</th>
              <th>Fees</th>
              <th className="text-left col-span-3 ">Liquidity Manager</th>
            </tr>
          </thead>
          <tbody className="gap-y-2 pt-2 flex flex-col">
            {isFetching && <span>Loading...</span>}
            {pools?.pairs.map((pool) => <PoolRow {...pool} key={pool.id} />)}
          </tbody>
        </table>

        <div className="pt-2  flex justify-between">
          <p className="text-[13px]">
            Page 1 of 34{" "}
            <span className="text-neutral-300">(1 - 250 results)</span>
          </p>
          <div className="flex">
            <button aria-label="Next Page of Pools">
              <ChevronLeft className="text-white" />
            </button>
            <button aria-label="Previous Page of Pools">
              <ChevronRight className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
