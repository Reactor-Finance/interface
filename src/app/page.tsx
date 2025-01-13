"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Search } from "lucide-react";
import { useState } from "react";
export default function Home() {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className="min-h-screen w-screen font-geistMono ">
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="w-[440px] bg-[#1a1a1a] p-0 text-white">
          <div className="relative h-[80vh] space-y-6 pt-4 text-white">
            <div className="space-y-6 px-6">
              <h1 className="font-geistMono">Select a token</h1>
              <div
                data-focused={isFocused ? "focused" : "not-focused"}
                className="flex gap-x-3 rounded-md border p-2 outline-1  data-[focused=focused]:outline data-[focused=focused]:outline-white"
              >
                <Search className="text-gray-400" />
                <input
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  type="text"
                  className="bg-transparent font-geistMono placeholder:text-gray-400 focus:outline-none"
                  placeholder="Search by name or symbol"
                />
              </div>
            </div>
            <div className="relative h-[calc(100%-160px)] border-t border-gray-500 px-6 pt-4">
              <h2 className="text-sm text-[#999999]">Tokens (229)</h2>
              <div className="-mb-[40px] h-full  space-y-4 overflow-y-auto pt-3">
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

            <div className="rounded-bl-md rounded-br-[15px] border-b border-white bg-black">
              {" "}
              <span>Only show verified tokens</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TokenItem() {
  return (
    <div className="flex justify-between rounded-md bg-[#262626] px-4 py-2">
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
