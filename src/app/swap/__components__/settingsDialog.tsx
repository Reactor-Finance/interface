"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { Settings } from "lucide-react";
import React, { useState } from "react";

export default function SettingsDialog() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        className="bg-neutral-950 p-1 rounded-full flex items-center gap-x-2"
        onClick={() => setOpen(true)}
      >
        <div className="bg-neutral-900 rounded-full text-sm text-neutral-400 px-2 py-1">
          1.00% Slippage
        </div>
        <Settings className="text-neutral-400" />
      </button>
      <DialogContent className="p-0 w-[400px]">
        <div className="pt-4 px-4">
          <DialogTitle className="text-lg">Settings</DialogTitle>
        </div>
        <div className="border-t border-neutral-700 p-4 space-y-6 ">
          <div className="space-y-2">
            <h3 className="text-sm">Slippage Tolerance</h3>
            <div className="flex gap-x-2">
              <div className="w-full">
                <Tabs defaultValue="swap">
                  <TabsList
                    border={"border-1"}
                    size="sm"
                    colors="muted"
                    display={"grow"}
                  >
                    <TabsTrigger display={"grow"} value="swap">
                      0.1%
                    </TabsTrigger>
                    <TabsTrigger display={"grow"} value="twap">
                      0.5%
                    </TabsTrigger>
                    <TabsTrigger display={"grow"} value="limit">
                      1%
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <Input placeholder="Custom" className="w-20" />
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm">Transaction Deadline</h3>
            <div>
              <Input />
            </div>
          </div>
          <Button
            onClick={() => setOpen(false)}
            variant={"primary"}
            size="submit"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
