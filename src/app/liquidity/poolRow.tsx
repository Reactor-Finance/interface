import CurrenciesOverlapIcons from "@/components/shared/currenciesOverlapIcons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";

export default function PoolRow() {
  return (
    <tr className="grid grid-cols-11 items-center text-sm text-right gap-x-4 py-4 bg-neutral-1050 px-4 rounded-md">
      <th className="col-span-4 text-left">
        <div className="flex gap-x-4 items-center">
          <span>1</span>
          <div className="flex gap-x-2 items-center">
            <CurrenciesOverlapIcons
              tokenOne={{
                alt: "",
                address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
              }}
              tokenTwo={{
                alt: "",
                address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
              }}
            />
            <div>
              <h4>vAMM-ETH/USDC</h4>
              <div className="space-x-1">
                <Badge>Concetrated</Badge>
                <Badge border="one" colors="neutral">
                  0.3%
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </th>
      <th className="">$5,505,444</th>
      <th className="text-blue-light">11%</th>
      <th>$101,332,333</th>
      <th>43,444</th>
      <th className="text-left col-span-3 ">
        <div className="flex justify-between">
          <span></span>
          <Button variant="filled">
            <div className="flex items-center gap-x-1">
              <span>Add</span>
              <CurrenciesOverlapIcons
                size="sm"
                tokenOne={{
                  alt: "",
                  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                }}
                tokenTwo={{
                  alt: "",
                  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
                }}
              />
            </div>
          </Button>
        </div>
      </th>
    </tr>
  );
}
