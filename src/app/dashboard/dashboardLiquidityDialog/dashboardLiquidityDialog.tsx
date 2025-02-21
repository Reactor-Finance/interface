import { DialogContent, DialogTitle, Dialog } from "@/components/ui/dialog";
import React from "react";
import { useDashboardLiquidityProvider } from "../dashLiquidityProvider";

export default function DashboardLiquidityDialog() {
  const { state, updateState } = useDashboardLiquidityProvider();
  return (
    <Dialog
      open={state.dialogOpen}
      onOpenChange={(open) => updateState({ dialogOpen: open })}
    >
      <DialogContent position="static">
        <DialogTitle className="text-lg">
          Manage your <span className="text-primary-400">lock</span>
        </DialogTitle>
      </DialogContent>
    </Dialog>
  );
}
