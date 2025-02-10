import React from "react";
import CurrenciesOverlapIcons from "./currenciesOverlapIcons";
import { Badge } from "../ui/badge";

export default function PoolHeader() {
  return (
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
  );
}
