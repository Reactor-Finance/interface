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
import { zeroAddress } from "viem";
import { useCheckPair } from "@/lib/hooks/useCheckPair";
import { ETHER, WETH } from "@/data/constants";
import { useChainId } from "wagmi";

export default function Page() {
  const [token0DialogOpen, setOpenToken0Dialog] = useState(false);
  const [token1DialogOpen, setOpenToken1Dialog] = useState(false);

  // Selected tokens
  const [token0, setToken0] = useState<TToken | undefined>();
  const [token1, setToken1] = useState<TToken | undefined>();

  // Check pairs
  const { pairExists: stablePoolExists, pair: stablePair } = useCheckPair({
    token0: token0?.address ?? zeroAddress,
    token1: token1?.address ?? zeroAddress,
    stable: true,
  });
  const { pairExists: volatilePoolExists, pair: volatilePair } = useCheckPair({
    token0: token0?.address ?? zeroAddress,
    token1: token1?.address ?? zeroAddress,
    stable: false,
  });

  // Tokens have been selected
  const isTokensSelected = useMemo(
    () => !!token0 && !!token1,
    [token0, token1]
  );

  const chainId = useChainId();
  const weth = useMemo(() => WETH[chainId], [chainId]);

  const selectedTokens = useMemo(
    () =>
      token0?.address.toLowerCase() === ETHER.toLowerCase() ||
      token0?.address.toLowerCase() === weth.toLowerCase() ||
      token1?.address.toLowerCase() === ETHER.toLowerCase() ||
      token0?.address.toLowerCase() === weth.toLowerCase()
        ? [weth, ETHER]
        : [token0?.address ?? zeroAddress, token1?.address ?? zeroAddress],
    [token0, token1, weth]
  );
  const tokensExist = token0 && token1;
  return (
    <PageMarginContainer>
      <Headers.GradiantHeaderOne colorOne="#A0055D" colorTwo="#836EF9">
        Deposit Liquidity
      </Headers.GradiantHeaderOne>
      <div className="pt-6"></div>
      <div className=" gap-x-4 grid gap-y-2 md:grid-cols-2">
        <TokensDialog
          onTokenSelected={setToken0}
          open={token0DialogOpen}
          onOpen={setOpenToken0Dialog}
          selectedTokens={selectedTokens as `0x${string}`[]}
        />
        <TokensDialog
          onTokenSelected={setToken1}
          open={token1DialogOpen}
          onOpen={setOpenToken1Dialog}
          selectedTokens={selectedTokens as `0x${string}`[]}
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
        <Alert border="mutedOne" className="items-center" colors="muted">
          Start by selecting the tokens. The liquidity pools available for
          deposit will show up next.
        </Alert>
      </div>
      <div className="pt-8">
        {isTokensSelected && <h3>Available pools</h3>}
        <div className="space-y-2 pt-4">
          {tokensExist && volatilePoolExists && (
            <AvailablePoolRow
              key={volatilePair}
              token0={token0}
              token1={token1}
              poolType={TPoolType.VOLATILE}
            />
          )}
          {tokensExist && stablePoolExists && (
            <AvailablePoolRow
              key={stablePair}
              token0={token0}
              token1={token1}
              poolType={TPoolType.STABLE}
            />
          )}
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
            avatar={
              !token.logoURI
                ? {
                    letter: token.symbol[0].toUpperCase(),
                    styles: "h-5 w-5",
                    letterStyles: "text-[10px] leading-[10px]",
                  }
                : undefined
            }
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
