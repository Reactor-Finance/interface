"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Search } from "lucide-react";
import { useState } from "react";
export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="min-h-screen w-screen font-geistMono ">
      <Dialog>
        <div className="flex w-full justify-center py-4">
          <DialogTrigger className="border p-2 border-white text-white">
            Open
          </DialogTrigger>
        </div>
        <DialogContent
          title="Search Tokens"
          className="w-[440px] overflow-hidden border-none bg-[#1a1a1a] p-0 text-white"
        >
          <div className="relative  h-[80vh] space-y-6 pt-4 text-white">
            <div className="space-y-6 px-6">
              <DialogTitle className="font-geistMono">
                Select a token
              </DialogTitle>
              {/* <h1 className="font-geistMono">Select a token</h1> */}
              <div
                data-focused={isFocused ? "focused" : "not-focused"}
                className="flex gap-x-3 bg-gray-800 rounded-md p-2 outline-1  data-[focused=focused]:outline data-[focused=focused]:outline-white"
              >
                <Search className="text-gray-400" />
                <input
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  type="text"
                  className="w-full bg-transparent font-geistMono placeholder:text-gray-400 focus:outline-none"
                  placeholder="Search by name or symbol"
                />
              </div>
            </div>
            <div className="relative z-0 h-[calc(100%-184px)] border-t border-gray-600  ">
              <h2 className="py-3 font-geistMono text-[14px] text-[#999999] pl-6">
                Tokens (229)
              </h2>
              <div className=" h-[calc(100%-22px)] space-y-4 scrollbar overflow-y-auto pb-2 px-6">
                <TokenItem />
                <TokenItem />
                <TokenItem />
                <TokenItem />
                <TokenItem />
                <TokenItem />
                <TokenItem />
                <TokenItem />
                <TokenItem />

                <TokenItem />
                <TokenItem />
                <TokenItem />
              </div>
            </div>

            <div className="z-10  rounded-bl-md rounded-br-[15px] border-t border-gray-600  bg-[#1a1a1a] px-10 py-2">
              <div className="flex items-center justify-between">
                <span className="font-geistMono text-gray-300">
                  Only show verified tokens
                </span>
                <Switch id="airplane-mode" />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TokenItem() {
  return (
    <div className="mb-2 flex justify-between rounded-md bg-gray-800 px-4 py-2">
      <div className="flex items-center gap-x-2">
        <div className="h-10 w-10 rounded-full bg-white font-geistMono"></div>
        <div>
          <div>
            <span>ETH</span>
          </div>
          <div>
            <span className="text-gray-400">Ethereum Token</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end font-geistMono">
        <div>
          <span>0</span>
        </div>
        <div>
          <span className="text-gray-400">$0</span>
        </div>
      </div>
    </div>
  );
}
