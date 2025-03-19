import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogTitle } from "@radix-ui/react-dialog";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import IncreaseContent from "./increaseContent";
import ExtendContent from "./extendContent";
import TransferContent from "./transferContent";
import MergeContent from "./mergeContent";
import WithdrawContent from "./withdrawContent";
import ManageLockDropdown from "./manageLockDropdown";
import { TLockToken } from "../types";
import { useVeNFTsProvider } from "@/contexts/veNFTsProvider";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedToken?: TLockToken;
  reset?: () => void;
  onDropdownChange: (token?: TLockToken) => void;
}

export default function ManageLockDialog({
  open,
  setOpen,
  selectedToken,
  reset,
  onDropdownChange,
}: Props) {
  const { lockTokens } = useVeNFTsProvider();
  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen && reset) reset();
        }}
      >
        <DialogContent position="static" className="max-w-[520px]">
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
                <ManageLockDropdown
                  lockTokens={lockTokens}
                  selectedLockToken={selectedToken}
                  onTokenSelected={onDropdownChange}
                />
              </div>
              <TabsContent value="increase">
                <IncreaseContent selectedLockToken={selectedToken} />
              </TabsContent>
              <TabsContent value="extend">
                <ExtendContent selectedLockToken={selectedToken} />
              </TabsContent>
              <TabsContent value="transfer">
                <TransferContent selectedLockToken={selectedToken} />
              </TabsContent>
              <TabsContent value="merge">
                <MergeContent selectedLockToken={selectedToken} />
              </TabsContent>
              <TabsContent value="withdraw">
                <WithdrawContent selectedLockToken={selectedToken} />
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
