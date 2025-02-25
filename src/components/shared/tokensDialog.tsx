import Image from "next/image";
import React from "react";
import verified from "@/assets/verified.svg";
import info from "@/assets/info.svg";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { DialogTitle } from "@radix-ui/react-dialog";
import SearchInput from "@/components/shared/searchInput";
import ImageWithFallback from "@/components/shared/imageWithFallback";
import { TToken } from "@/lib/types";
import { useTokenlistContext } from "@/contexts/tokenlistContext";
import { formatUnits } from "viem";

export default function TokensDailog({
  open,
  onOpen,
  onTokenSelected,
  selectedTokens,
}: {
  open?: boolean;
  onOpen?: (b: boolean) => void;
  onTokenSelected: (token: TToken) => void;
  selectedTokens: `0x${string}`[];
}) {
  const { tokenlist, setSearchQuery, searchQuery } = useTokenlistContext();

  return (
    <Dialog open={open} onOpenChange={onOpen}>
      <DialogContent
        title="Search Tokens"
        className="w-[440px] overflow-hidden border-none bg-[#1a1a1a] p-0 text-white"
      >
        <div className="relative  h-[80vh] space-y-6 pt-4 text-white">
          <div className="space-y-6 px-6">
            <DialogTitle className="font-geistMono">Select a token</DialogTitle>
            {/* <h1 className="font-geistMono">Select a token</h1> */}
            <SearchInput setValue={setSearchQuery} value={searchQuery} />
          </div>
          <div className="relative z-0 h-[calc(100%-179px)] border-t border-gray-600  ">
            <h2 className="py-3 font-geistMono text-[14px] text-[#999999] pl-6">
              Tokens ({tokenlist.length})
            </h2>
            <div className=" h-[calc(100%-22px)] space-y-2 scrollbar overflow-y-auto pb-2 px-2">
              {tokenlist
                .filter((token) => !selectedTokens.includes(token.address))
                .map((token) => {
                  return (
                    <TokenItem
                      token={token}
                      selectToken={(token) => {
                        onTokenSelected(token);
                        if (onOpen) onOpen(false);
                      }}
                      key={token.address}
                    />
                  );
                })}
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

function TokenItem({
  token,
  selectToken,
}: {
  token: TToken;
  selectToken: (token: TToken) => void;
}) {
  // n+1 problem
  // https://planetscale.com/blog/what-is-n-1-query-problem-and-how-to-solve-it
  // need backend endpoint that returns portfolio of token bals
  // instead of querying each token
  // const balance = useGetBalance({ tokenAddress: token.address });
  return (
    <button
      type="button"
      onClick={() => selectToken(token)}
      className="mb-2 hover:bg-neutral-800 transition-colors flex w-full text-left justify-between rounded-md bg-neutral-900 px-4 py-2"
    >
      <div className="flex items-center gap-x-2">
        <ImageWithFallback
          className="h-10 w-10 rounded-full"
          src={token.logoURI}
          width={40}
          height={40}
          alt=""
        />
        <div>
          <div>
            <span>{token.symbol}</span>
          </div>
          <div>
            <span className="text-gray-400 text-sm">{token.name}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end font-geistMono">
        <div>
          <span>
            {Number(formatUnits(0n, token.decimals)).toLocaleString("en-US", {
              useGrouping: true,
              maximumFractionDigits: 3,
            })}
          </span>
        </div>
        <div>
          <span className="text-gray-400">$0</span>
        </div>
      </div>
    </button>
  );
}
