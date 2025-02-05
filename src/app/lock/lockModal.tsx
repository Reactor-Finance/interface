"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogTitle } from "@radix-ui/react-dialog";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import { IncreaseContent } from "./increaseContent";
import ExtendContent from "./extendContent";
import TransferContent from "./transferContent";
import MergeContent from "./mergeContent";
import WithdrawContent from "./withdrawContent";

export default function LockModal() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <Button onClick={() => setOpen(!open)} variant={"primary"} size="md">
          Claim All Lock Rewards
        </Button>
        <DialogContent position="static">
          <DialogTitle className="text-lg">
            Manage your <span className="text-primary-400">lock</span>
          </DialogTitle>
          <Tabs>
            <TabsList display={"grow"} colors={"transparent"}>
              <TabsTrigger
                border="primary-1"
                display="grow"
                value="increase"
                colors="white"
              >
                Increase
              </TabsTrigger>
              <TabsTrigger
                border="primary-1"
                display="grow"
                value="extend"
                colors="white"
              >
                Extend
              </TabsTrigger>
              <TabsTrigger
                border="primary-1"
                display="grow"
                value="transfer"
                colors="white"
              >
                Transfer
              </TabsTrigger>
              <TabsTrigger
                border="primary-1"
                display="grow"
                value="withdraw"
                colors="white"
              >
                Withdraw
              </TabsTrigger>
              <TabsTrigger
                border="primary-1"
                display="grow"
                value="merge"
                colors="white"
              >
                Merge
              </TabsTrigger>
            </TabsList>
            <TabsContent value="increase">
              <IncreaseContent />
            </TabsContent>
            <TabsContent value="extend">
              <ExtendContent />
            </TabsContent>
            <TabsContent value="transfer">
              <TransferContent />
            </TabsContent>
            <TabsContent value="merge">
              <MergeContent />
            </TabsContent>
            <TabsContent value="withdraw">
              <WithdrawContent />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
