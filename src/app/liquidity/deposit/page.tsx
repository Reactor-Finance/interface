"use client";
import { Card } from "@/components/ui/card";
import Headers from "@/components/ui/headers";
import PageMarginContainer from "@/components/ui/pageMarginContainer";
import React, { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { ChevronDown } from "lucide-react";
import SearchTokensDailog from "@/app/dex/searchTokensDialog";

export default function Page() {
  const [open, setOpen] = useState(false);
  return (
    <PageMarginContainer>
      <Headers.GradiantHeaderOne colorOne="#A0055D" colorTwo="#836EF9">
        Deposit Liquidity
      </Headers.GradiantHeaderOne>
      <div className="pt-6"></div>
      <div className=" gap-x-4 grid grid-cols-2">
        <SearchTokensDailog open={open} setOpen={setOpen} />
        <Card bg="1000">
          <SearchTokensTrigger onClick={() => setOpen(true)} />
        </Card>
        <Card bg="1000">
          <SearchTokensTrigger onClick={() => setOpen(true)} />
        </Card>
      </div>
      <div className="pt-6">
        <Alert className="items-center" colors="muted">
          Start by selecting the tokens. The liquidity pools available for
          deposit will show up next.
        </Alert>
      </div>
    </PageMarginContainer>
  );
}

function SearchTokensTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className="flex justify-between items-center py-2 bg-neutral-950 w-full rounded-md px-4"
    >
      <span className="text-neutral-200">Select first token</span>
      <div>
        <ChevronDown className="w-5 h-5" />
      </div>
    </button>
  );
}
