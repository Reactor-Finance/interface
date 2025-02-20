"use client";
import { useState, useCallback, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import PoolRow from "./poolRow";
import { api } from "@/trpc/react";
import { TPools } from "@/server/queries/pools";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchInput from "@/components/shared/searchInput";
import { useDebounce } from "@/components/shared/hooks/useDebounce";
import { Filter } from "@/server/queries/pools/getPools";
export default function PoolsTable({
  initialPools,
}: {
  initialPools: { pairs: TPools[] } | undefined;
}) {
  const [filters, setFilters] = useState({ searchQuery: "" });
  const [enabled, setEnabled] = useState(false);
  const updateState = useCallback(
    (value: Record<string, string>) => {
      setFilters({ ...filters, ...value });
    },
    [filters]
  );
  useEffect(() => {
    if (filters.searchQuery) {
      setEnabled(true);
    }
  }, [filters]);
  const { debouncedValue: searchQueryBounced } = useDebounce(
    filters.searchQuery,
    400
  );
  console.log(searchQueryBounced);
  const filtersParams: Filter = {
    isStable: true,
    searchQuery: searchQueryBounced,
  };
  const { data: pools } = api.pool.getPools.useQuery(filtersParams, {
    initialData: initialPools,
    enabled,
  });

  return (
    <>
      <div className="flex justify-between pt-4 items-center">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="stable">Stable</TabsTrigger>
            <TabsTrigger value="volatile">Volatile</TabsTrigger>
            <TabsTrigger value="concentrated">Concentrated</TabsTrigger>
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
            {pools?.pairs.map((pool) => <PoolRow {...pool} key={pool.id} />)}
          </tbody>
        </table>

        <div className="pt-2  flex justify-between">
          <p className="text-[13px]">
            Page 1 of 34{" "}
            <span className="text-neutral-300">(1 - 250 results)</span>
          </p>
          <div className="flex">
            <button>
              <ChevronLeft className="text-white" />
            </button>
            <button>
              <ChevronRight className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
