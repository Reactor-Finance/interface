import Headers from "@/components/ui/headers";
import PageMarginContainer from "@/components/ui/pageMarginContainer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";
import LiquidityCard from "./liquidityCard";

export default function Page() {
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
          <Tabs defaultValue="stable">
            <TabsList colors="muted">
              <TabsTrigger value="stable">Stable</TabsTrigger>
              <TabsTrigger value="classic">Classic</TabsTrigger>
              <TabsTrigger value="concentrated">Concentrated</TabsTrigger>
            </TabsList>
          </Tabs>
          <button>
            <Settings className="text-neutral-600 h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="pt-6"></div>
      <div className="flex justify-center p-4">
        <LiquidityCard />
      </div>
    </PageMarginContainer>
  );
}
