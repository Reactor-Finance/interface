import { ChevronDown, Settings } from "lucide-react";
import React, { ReactNode, useState } from "react";
import infoIcon from "@/assets/info.svg";
import Tooltip from "@/components/ui/tooltip";
export default function SwapDetails() {
  const [open, setOpen] = useState(false);
  return (
    <div className="text-[13px] border border-neutral-800 rounded-[16px] p-4 space-y-4">
      <Row title="Received Value" value="$23.44" />
      <Row
        title="Exchange Rate"
        value={
          <p>
            1 ETH <span className="text-neutral-200">≃</span> 23.232 USDC
          </p>
        }
      />
      <Row
        title="Slippage"
        value={
          <>
            <span>1.00%</span>
            <Settings className="text-neutral-200" size={16} />
          </>
        }
        info="Slippage Info"
      />
      <div>
        <button
          onClick={() => setOpen(!open)}
          type="button"
          className="text-primary-400 items-center text-sm flex gap-x-1"
        >
          <span>Show detailed Breakdown</span>
          <ChevronDown
            data-direction={open ? "up" : "down"}
            className="
          data-[direction=up]:rotate-180 transition-transform"
          />
        </button>
        <div
          data-state={open ? "open" : "closed"}
          className="pt-4 data-[state=closed]:opacity-0 transition-all duration-500 data-[state=closed]:h-0 overflow-hidden fade-in space-y-4"
        >
          <Row title="Minumum Receieved" value="$23.44" info="Info" />
          <Row title="Fee" value="$23.44" info="Info" />
          <Row title="Price Impact" value="$23.44" info="Info" />
          <Row title="Route" value="$23.44" info="Info" />
        </div>
      </div>
    </div>
  );
}
function Row({
  title,
  value,
  info,
}: {
  title: string;
  value: ReactNode;
  info?: string;
}) {
  return (
    <div className="flex justify-between">
      <div className="text-neutral-400 flex gap-x-1">
        <span>{title}</span>
        {info && (
          <div>
            <Tooltip triggerImageSrc={infoIcon}>{info}</Tooltip>
          </div>
        )}
      </div>
      <div className="flex items-center gap-x-1">{value}</div>
    </div>
  );
}
