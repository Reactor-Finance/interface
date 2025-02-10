import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Headers from "@/components/ui/headers";
import Image from "next/image";
import PageMarginContainer from "@/components/ui/pageMarginContainer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

import symbl from "@/assets/reactor-symbol.svg";

export default function Page() {
  return (
    <PageMarginContainer>
      <div className="flex justify-between">
        <div>
          <div>
            <Link href="/" className="flex text-[14px] gap-x-2 items-center">
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
        <Card
          border="900"
          bg="1000"
          className="p-4 space-y-4 w-[440px] rounded-md"
        >
          <h2 className="text-xl">Add C.Stable Liquidity</h2>
          <Card
            className="grid text-sm grid-cols-3 py-2 px-4 items-center rounded-md"
            bg="950"
            border="900"
          >
            <div className="">
              <h1 className="text-neutral-300">APR</h1>
              <h2>0%</h2>
            </div>
            <div className="">
              <h1 className="text-neutral-300">APR</h1>
              <h2>0%</h2>
            </div>
            <div className="">
              <h1 className="text-neutral-300">APR</h1>
              <h2>0%</h2>
            </div>
          </Card>
          <div className="space-y-2">
            <div>
              <label htmlFor="">Asset 1</label>
            </div>
            <AssetCard />
          </div>
          <div className="space-y-2">
            <div>
              <label htmlFor="">Asset 2</label>
            </div>
            <AssetCard />
          </div>
          <div className="space-y-2">
            <h4 className="text-neutral-100 ">Reserve Info</h4>
            <div className="flex text-sm text-neutral-300 justify-between">
              <span>UDT Amount</span>
              <span>337.3</span>
            </div>
            <div className="flex text-sm text-neutral-300 justify-between">
              <span>USDC Amount</span>
              <span>130.3</span>
            </div>
          </div>
          <div className="">
            <h5>My Info</h5>
            <div className="pt-1"></div>
            <div className="flex text-neutral-300 text-sm justify-between">
              <span>USDC per USDT</span>
              <span>0 LP</span>
            </div>
          </div>
          <Button variant="primary" disabled size="submit">
            Add Liquidity
          </Button>
        </Card>
      </div>
    </PageMarginContainer>
  );
}
function AssetCard() {
  return (
    <Card border="900" className="py-3 rounded-md px-4 space-y-2">
      <div className="flex justify-between">
        <span>0</span>
        <RCTCard />
      </div>
      <div className="flex justify-between text-[12px]">
        <span>-</span>
        <span>
          1.24 <span className="text-primary-400">Max</span>
        </span>
      </div>
    </Card>
  );
}
function RCTCard() {
  return (
    <div className="bg-primary-400 flex gap-x-2 items-center rounded-md px-xs py-xss">
      <Image src={symbl} className="h-4 w-4" alt="" />
      <span className="text-[13px]">RCT</span>
    </div>
  );
}
