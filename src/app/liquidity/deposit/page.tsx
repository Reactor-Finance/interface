"use client";
import { Card } from "@/components/ui/card";
import Headers from "@/components/ui/headers";
import PageMarginContainer from "@/components/ui/pageMarginContainer";
import React, { useMemo, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { ChevronDown } from "lucide-react";
import TokensDialog from "@/components/shared/tokensDialog";
import ImageWithFallback from "@/components/shared/imageWithFallback";
import { TPoolType, TToken } from "@/lib/types";
import AvailablePoolRow from "./availablePoolRow";
import { api } from "@/trpc/react";
import { zeroAddress } from "viem";
import { useCheckPair } from "@/lib/hooks/useCheckPair";

export default function Page() {
  const [token0DialogOpen, setOpenToken0Dialog] = useState(false);
  const [token1DialogOpen, setOpenToken1Dialog] = useState(false);

  // Selected tokens
  const [token0, setToken0] = useState<TToken | undefined>();
  const [token1, setToken1] = useState<TToken | undefined>();

  const { data: pools } = api.pool.findPool.useQuery(
    {
      tokenOneAddress: token0?.address ?? "0x",
      tokenTwoAddress: token1?.address ?? "0x",
    },
    { enabled: Boolean(token0) && Boolean(token1) }
  );

  // Check pairs
  const { pairExists: stablePoolExists } = useCheckPair({
    token0: token0?.address ?? zeroAddress,
    token1: token1?.address ?? zeroAddress,
    stable: true,
  });
  const { pairExists: volatilePoolExists } = useCheckPair({
    token0: token0?.address ?? zeroAddress,
    token1: token1?.address ?? zeroAddress,
    stable: false,
  });

  // Tokens have been selected
  const isTokensSelected = useMemo(
    () => !!token0 && !!token1,
    [token0, token1]
  );

  return (
    <PageMarginContainer>
      <Headers.GradiantHeaderOne colorOne="#A0055D" colorTwo="#836EF9">
        Deposit Liquidity
      </Headers.GradiantHeaderOne>
      <div className="pt-6"></div>
      <div className=" gap-x-4 grid grid-cols-2">
        <TokensDialog
          onTokenSelected={setToken0}
          open={token0DialogOpen}
          onOpen={setOpenToken0Dialog}
          selectedTokens={[
            token0?.address ?? zeroAddress,
            token1?.address ?? zeroAddress,
          ]}
        />
        <TokensDialog
          onTokenSelected={setToken1}
          open={token1DialogOpen}
          onOpen={setOpenToken1Dialog}
          selectedTokens={[
            token0?.address ?? zeroAddress,
            token1?.address ?? zeroAddress,
          ]}
        />
        <Card bg="1000">
          <SearchTokensTrigger
            token={token0}
            onClick={() => setOpenToken0Dialog(true)}
            placeholder="Select first token"
          />
        </Card>
        <Card bg="1000">
          <SearchTokensTrigger
            token={token1}
            onClick={() => setOpenToken1Dialog(true)}
            placeholder="Select second token"
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
          {!!pools &&
            !!token0 &&
            !!token1 &&
            pools.pairs.map((pool) => {
              return (
                <AvailablePoolRow
                  key={pool.id}
                  token0={token0}
                  token1={token1}
                  poolType={
                    pool.isStable ? TPoolType.STABLE : TPoolType.VOLATILE
                  }
                />
              );
            })}
          {isTokensSelected && !stablePoolExists && !!token0 && !!token1 && (
            <>
              <AvailablePoolRow
                token0={token0}
                token1={token1}
                poolType={TPoolType.STABLE}
              />
            </>
          )}
          {isTokensSelected && !volatilePoolExists && !!token0 && !!token1 && (
            <AvailablePoolRow
              token0={token0}
              token1={token1}
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
  placeholder = "Select token",
}: {
  onClick: () => void;
  token?: TToken;
  placeholder?: string;
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
            src={token.logoURI}
            alt={token.symbol}
          />
        </div>
      ) : (
        <span className="text-neutral-200">{placeholder}</span>
      )}
      <div>
        <ChevronDown className="w-5 h-5" />
      </div>
    </button>
  );
}
