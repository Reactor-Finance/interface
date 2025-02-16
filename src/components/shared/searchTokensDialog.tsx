import Image from "next/image";
import React, { useMemo, useState } from "react";
import verified from "@/assets/verified.svg";
import info from "@/assets/info.svg";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { DialogTitle } from "@radix-ui/react-dialog";
import SearchInput from "@/components/shared/searchInput";
import ImageWithFallback from "@/components/shared/imageWithFallback";
import { getLogoAsset } from "@/utils";
import { api } from "@/trpc/react";
import { TAddress, TToken } from "@/lib/types";
export default function SearchTokensDailog({
  open,
  setOpen,
  setToken,
  usePoolTokens,
}: {
  open?: boolean;
  setOpen?: (b: boolean) => void;
  setToken: ({ address, symbol }: TToken) => void;
  usePoolTokens?: boolean;
}) {
  const [value, setValue] = useState("");
  const { data: chainTokens } =
    api.tokens.searchTokensByNameAndAddress.useQuery(
      {
        search: value,
      },
      { enabled: !usePoolTokens && open }
    );
  const { data: poolTokens } = api.tokens.getPoolTokens.useQuery(
    { searchQuery: value },
    { enabled: usePoolTokens && open }
  );
  const foundTokens = useMemo(() => {
    const nameTokens = chainTokens?.tokensFoundByName;
    const addressTokens = chainTokens?.tokensFoundByAddress;
    if (nameTokens && addressTokens) {
      if (nameTokens.length > 0 && addressTokens.length > 0) {
        // if both have chainTokens, merge and remove duplicates
        return [...new Set([...nameTokens, ...addressTokens])];
      }
    }

    if (nameTokens) {
      if (nameTokens.length > 0) {
        return nameTokens;
      }
    }
    if (addressTokens) {
      if (addressTokens.length > 0) {
        return addressTokens;
      }
    }
    return [];
  }, [chainTokens]);
  console.log(poolTokens, "POOL TOKENS");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                setValue(s);
              }}
              value={value}
            />
          </div>
          <div className="relative z-0 h-[calc(100%-179px)] border-t border-gray-600  ">
            <h2 className="py-3 font-geistMono text-[14px] text-[#999999] pl-6">
              Tokens (
              {!usePoolTokens ? foundTokens.length : poolTokens?.tokens.length})
            </h2>
            <div className=" h-[calc(100%-22px)] space-y-4 scrollbar overflow-y-auto pb-2 px-2">
              {!usePoolTokens &&
                foundTokens?.map((token) => {
                  return (
                    <TokenItem
                      {...token}
                      selectToken={({ symbol, address }) => {
                        setToken({ address, symbol });
                      }}
                      key={token.address}
                    />
                  );
                })}
              {usePoolTokens &&
                poolTokens?.tokens.map((token) => {
                  return (
                    <TokenItem
                      address={token.id as TAddress}
                      symbol={token.symbol}
                      selectToken={({ symbol, address }) => {
                        setToken({ address, symbol });
                      }}
                      key={token.id}
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
  symbol,
  address,
  selectToken,
}: {
  symbol: string;
  selectToken: ({ address, symbol }: TToken) => void;
  address: TAddress;
}) {
  return (
    <button
      type="button"
      onClick={() => selectToken({ address, symbol })}
      className="mb-2 hover:bg-neutral-800 transition-colors flex w-full text-left justify-between rounded-md bg-neutral-900 px-4 py-2"
    >
      <div className="flex items-center gap-x-2">
        <ImageWithFallback
          className="h-10 w-10 rounded-full"
          src={getLogoAsset(address as TAddress)}
          width={40}
          height={40}
          alt=""
        />
        <div>
          <div>
            <span>{symbol}</span>
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
