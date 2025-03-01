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
import ManageLockDropdown from "./manageLockDropdown";
import { TLockToken } from "../types";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedToken?: TLockToken;
  reset?: () => void;
}

export default function ManageLockDialog({
  open,
  setOpen,
  selectedToken,
  reset,
}: Props) {
  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (reset) reset();
        }}
      >
        <DialogContent position="static">
          <DialogTitle className="text-lg">
            Manage your <span className="text-primary-400">lock</span>
          </DialogTitle>

          {!!selectedToken && (
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
              <div className="py-4">
                <ManageLockDropdown />
              </div>
              <TabsContent value="increase">
                <IncreaseContent />
              </TabsContent>
              <TabsContent value="extend">
                <ExtendContent selectedLockToken={selectedToken} />
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
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
