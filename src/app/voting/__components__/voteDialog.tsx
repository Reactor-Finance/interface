import DisplayFormattedNumber from "@/components/shared/displayFormattedNumber";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import { formatUnits } from "viem";
interface Props {
  open?: boolean;
  setOpen?: (b: boolean) => void;
}
export default function VoteDialog({ open, setOpen }: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="opacity-0 h-0">Vote Dialog</DialogTitle>
      <DialogContent className="w-[1200px]">
        <div className="bg-neutral-950 text-sm grid grid-cols-8  items-center  px-6 py-2 rounded-md">
          <div className="flex justify-start items-center gap-x-3 col-span-2">
            <div className="h-8 w-8 bg-blue-400 rounded-full"></div>
            <span>Lock ID 4</span>
          </div>
          <div className="flex justify-center">
            <div className="flex flex-col">
              <span className="block">
                <DisplayFormattedNumber num={formatUnits(0n, 2)} formatNum />{" "}
                veRCT
              </span>
              <span className="block text-neutral-500 text-[12px]">
                Locked{" "}
                <DisplayFormattedNumber num={formatUnits(0n, 2)} formatNum />{" "}
                RCT
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <span className="text-blue-light">11%</span>
          </div>
          <div className="flex justify-center">
            <span className="">0.00 RCT</span>
          </div>
          <div className="flex justify-center">
            <span className="">5 June 2025</span>
          </div>
          <div className="flex justify-center">
            <Badge>Not Active</Badge>
          </div>
          <div className="flex justify-end">
            <Button variant="primary">Vote</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
