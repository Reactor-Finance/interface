"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Input from "@/components/ui/input";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { inputPatternMatch } from "@/lib/utils";
import { slippageAtom, transactionDeadlineAtom } from "@/store";
import { inputPatternNumberMatch } from "@/utils";
import { useAtom } from "jotai/react";
import { Settings } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
type State = {
  slippageInput: string;
  deadlineInput: string;
  deadlineFocus: boolean;
  slippageFocus: boolean;
};
export default function SettingsDialog() {
  const [open, setOpen] = useState(false);
  const [deadline, updateDeadline] = useAtom(transactionDeadlineAtom);
  const [slippage, updateSlippage] = useAtom(slippageAtom);
  const [inputState, setInputState] = useState<State>({
    slippageInput: (slippage / 100).toString(),
    deadlineInput: (deadline / 100).toString(),
    deadlineFocus: false,
    slippageFocus: false,
  });
  const updateState = useCallback(
    (payload: Partial<State>) => {
      setInputState((prevState) => ({ ...prevState, ...payload }));
    },
    [setInputState]
  );
  useEffect(() => {
    if (inputState.deadlineInput && !inputState.deadlineFocus) {
      const num = Number(inputState.deadlineInput) * 100;
      console.log({ num });
      updateDeadline(num);
    }
    if (inputState.slippageInput && !inputState.slippageFocus) {
      const num = Number(inputState.slippageInput) * 100;
      console.log({ num });
      updateSlippage(num);
    }
  }, [
    inputState.deadlineFocus,
    inputState.deadlineInput,
    inputState.slippageFocus,
    inputState.slippageInput,
    updateDeadline,
    updateSlippage,
  ]);
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
                <Tabs
                  defaultValue="swap"
                  value={!inputState.slippageFocus ? slippage.toString() : "0"}
                >
                  <TabsList
                    border={"border-1"}
                    size="sm"
                    colors="muted"
                    display={"grow"}
                  >
                    <TabsTrigger
                      onClick={() => {
                        updateState({ slippageInput: "0.1" });
                        updateSlippage(10);
                      }}
                      display={"grow"}
                      value="10"
                    >
                      0.1%
                    </TabsTrigger>
                    <TabsTrigger
                      onClick={() => {
                        updateState({ slippageInput: "0.5" });
                        updateSlippage(50);
                      }}
                      display={"grow"}
                      value="50"
                    >
                      0.5%
                    </TabsTrigger>
                    <TabsTrigger
                      onClick={() => {
                        updateState({ slippageInput: "1" });
                        updateSlippage(100);
                      }}
                      display={"grow"}
                      value="100"
                    >
                      1%
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="bg-neutral-950  flex gap-x-1 items-center rounded-md">
                <Input
                  placeholder="Custom"
                  variant="transparent"
                  onFocus={() => updateState({ slippageFocus: true })}
                  onBlur={() => updateState({ slippageFocus: false })}
                  onChange={(e) => {
                    if (inputPatternMatch(e.target.value)) {
                      if (Number(e.target.value) > 100) {
                        return;
                      }
                      updateState({ slippageInput: e.target.value });
                    }
                  }}
                  value={inputState.slippageInput}
                  className="w-20 bg-neutral-900/50 px-2 h-[32px]"
                />
                <span className="px-1">%</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm">Transaction Deadline</h3>
            <div className="bg-neutral-950 px-2 items-center flex justify-end border-neutral-900 border  rounded-md">
              <Input
                onFocus={() => updateState({ deadlineFocus: true })}
                onBlur={() => updateState({ deadlineFocus: false })}
                className="w-full"
                dir="rtl"
                variant="transparent"
                ring="none"
                onChange={(e) => {
                  if (inputPatternNumberMatch(e.target.value)) {
                    if (Number(e.target.value) > 400) {
                      updateState({ deadlineInput: "400" });
                      return;
                    }
                    updateState({ deadlineInput: e.target.value });
                  }
                }}
                value={inputState.deadlineInput}
              />
              <span className="text-neutral-200">minutes</span>
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
