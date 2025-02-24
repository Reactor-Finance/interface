"use client";
import { Card } from "@/components/ui/card";
import Headers from "@/components/ui/headers";
import PageMarginContainer from "@/components/ui/pageMarginContainer";
import React, { useCallback, useMemo, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { ChevronDown } from "lucide-react";
import SearchTokensDailog from "@/components/shared/tokensDialog";
import ImageWithFallback from "@/components/shared/imageWithFallback";
import { getLogoAsset } from "@/utils";
import { TAddress, TPoolType, TToken } from "@/lib/types";
import AvailablePoolRow from "./availablePoolRow";
import { api } from "@/trpc/react";
import { getAddress } from "viem";

export default function Page() {
  const [openOne, setOpenTokenOne] = useState(false);
  const [openTwo, setOpenTokenTwo] = useState(false);
  const [tokenOne, setTokenOne] = useState<TToken | undefined>();
  const [tokenTwo, setTokenTwo] = useState<TToken | undefined>();
  const setToken = ({ address, symbol, decimals }: TToken) => {
    if (openOne) {
      setTokenOne({ address, symbol, decimals });
      setOpenTokenOne(false);
    }
    if (openTwo) {
      setTokenTwo({ address, symbol, decimals });
      setOpenTokenTwo(false);
    }
  };
  const setOpen = useCallback(() => {
    if (openOne) {
      setOpenTokenOne(false);
    }
    if (openTwo) {
      setOpenTokenTwo(false);
    }
  }, [openOne, openTwo]);
  const { data: pools } = api.pool.findPool.useQuery(
    {
      tokenOneAddress: tokenOne?.address ?? "0x",
      tokenTwoAddress: tokenTwo?.address ?? "0x",
    },
    { enabled: Boolean(tokenOne) && Boolean(tokenTwo) }
  );
  const { stablePoolExist, volatilePoolExist } = useMemo(() => {
    if ((pools?.pairs.length ?? 0) <= 0) {
      return { stablePoolExist: false, volatilePoolExist: false };
    }
    const stablePoolExist = Boolean(pools?.pairs.find((pool) => pool.isStable));
    const volatilePoolExist = Boolean(
      pools?.pairs.find((pool) => !pool.isStable)
    );
    return { stablePoolExist, volatilePoolExist };
  }, [pools]);
  const isTokensSelected = tokenOne && tokenTwo;
  return (
    <PageMarginContainer>
      <Headers.GradiantHeaderOne colorOne="#A0055D" colorTwo="#836EF9">
        Deposit Liquidity
      </Headers.GradiantHeaderOne>
      <div className="pt-6"></div>
      <div className=" gap-x-4 grid grid-cols-2">
        <SearchTokensDailog
          setToken={setToken}
          open={openOne || openTwo}
          setOpen={setOpen}
        />
        <Card bg="1000">
          <SearchTokensTrigger
            token={tokenOne}
            onClick={() => setOpenTokenOne(true)}
          />
        </Card>
        <Card bg="1000">
          <SearchTokensTrigger
            token={tokenTwo}
            onClick={() => setOpenTokenTwo(true)}
          />
        </Card>
      </div>
      <div className="pt-6">
        <Alert className="items-center" colors="muted">
          Start by selecting the tokens. The liquidity pools available for
          deposit will show up next.
        </Alert>
      </div>
      <div className="pt-8">
        <h3>Available pools</h3>
        <div className="space-y-2 pt-4">
          {pools?.pairs.map((pool) => {
            return (
              <AvailablePoolRow
                key={pool.id}
                tokenOne={{
                  address: getAddress(pool.token0.id),
                  symbol: pool.token0.symbol,
                  decimals: parseInt(pool.token0.decimals),
                }}
                tokenTwo={{
                  address: getAddress(pool.token1.id),
                  symbol: pool.token1.symbol,
                  decimals: parseInt(pool.token1.decimals),
                }}
                poolType={pool.isStable ? TPoolType.STABLE : TPoolType.VOLATILE}
              ></AvailablePoolRow>
            );
          })}
          {isTokensSelected && !stablePoolExist && (
            <>
              <AvailablePoolRow
                tokenOne={tokenOne}
                tokenTwo={tokenTwo}
                poolType={TPoolType.STABLE}
              />
            </>
          )}
          {isTokensSelected && !volatilePoolExist && (
            <AvailablePoolRow
              tokenOne={tokenOne}
              tokenTwo={tokenTwo}
              poolType={TPoolType.VOLATILE}
            />
          )}
        </div>
      </div>
    </PageMarginContainer>
  );
}

function SearchTokensTrigger({
  onClick,
  token,
}: {
  onClick: () => void;
  token?: TToken;
}) {
  return (
    <button
      onClick={() => {
        onClick();
      }}
      className="flex justify-between items-center py-2 bg-neutral-950 w-full rounded-md px-4"
    >
      {token ? (
        <div className="flex gap-x-2 items-center">
          <span>{token.symbol}</span>
          <ImageWithFallback
            width={24}
            height={24}
            className="rounded-full h-5 w-5"
            src={getLogoAsset(token.address as TAddress)}
            alt={token.symbol}
          />
        </div>
      ) : (
        <span className="text-neutral-200">Select first token</span>
      )}
      <div>
        <ChevronDown className="w-5 h-5" />
      </div>
    </button>
  );
}
