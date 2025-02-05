"use client";
import Image from "next/image";
import React from "react";
import verified from "@/assets/verified.svg";
import info from "@/assets/info.svg";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { DialogTitle } from "@radix-ui/react-dialog";
import SearchInput from "@/components/shared/searchInput";
import ImageWithFallback from "@/components/shared/imageWithFallback";
import { getLogoAsset } from "@/utils";
export default function SearchTokensDailog() {
  return (
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
            <DialogTitle className="font-geistMono">Select a token</DialogTitle>
            {/* <h1 className="font-geistMono">Select a token</h1> */}
            <SearchInput
              setValue={(s: string) => {
                console.log(s);
              }}
              value=""
            />
          </div>
          <div className="relative z-0 h-[calc(100%-179px)] border-t border-gray-600  ">
            <h2 className="py-3 font-geistMono text-[14px] text-[#999999] pl-6">
              Tokens (229)
            </h2>
            <div className=" h-[calc(100%-22px)] space-y-4 scrollbar overflow-y-auto pb-2 px-2">
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

          <div className="z-10  rounded-bl-md  border-t border-gray-600  bg-[#1a1a1a] px-10 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <Image src={verified} alt="verified icon" />
                <span className="font-geistMono text-sm text-gray-300">
                  Only show verified tokens
                </span>
                <Image src={info} alt="info" />
              </div>
              <Switch id="airplane-mode" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function TokenItem() {
  return (
    <button className="mb-2 hover:bg-neutral-800 transition-colors flex w-full text-left justify-between rounded-md bg-neutral-900 px-4 py-2">
      <div className="flex items-center gap-x-2">
        <ImageWithFallback
          className="h-10 w-10"
          src={getLogoAsset("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48")}
          width={40}
          height={40}
          alt=""
        />
        <div>
          <div>
            <span>ETH</span>
          </div>
          <div>
            <span className="text-gray-400 text-sm">Ethereum Token</span>
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
    </button>
  );
}
