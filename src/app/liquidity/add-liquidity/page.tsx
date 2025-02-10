import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Headers from "@/components/ui/headers";
import PageMarginContainer from "@/components/ui/pageMarginContainer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Settings } from "lucide-react";
import Link from "next/link";
import React from "react";

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
          className="p-4 space-y-6 w-[440px] rounded-md"
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
            <Card border="900" className="py-2 rounded-md px-4">
              <span>0</span>
            </Card>
          </div>
          <div className="space-y-2">
            <div>
              <label htmlFor="">Asset 2</label>
            </div>
            <Card border="900" className="py-2 rounded-md px-4">
              <span>0</span>
            </Card>
          </div>
          <Button variant="primary" disabled size="submit">
            Add Liquidity
          </Button>
        </Card>
      </div>
    </PageMarginContainer>
  );
}
