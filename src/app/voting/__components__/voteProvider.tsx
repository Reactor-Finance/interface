"use client";
import { TLockToken } from "@/app/lock/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
interface VoteProviderType {
  selectedVeNFT: TLockToken | undefined;
  setSelectedVRCT: React.Dispatch<React.SetStateAction<TLockToken | undefined>>;
  // {  [ve_nft_Id]: {[poolId]: 22%, [poolId]: 33%}, etc...}
  veNFTsAndPoolsMap: { [id: string]: { [id: string]: number } }; // All VeNfts and there selected pools
  // the selected veNFTs selected pools  {[poolId]: 22%, [poolId]: 33%}
  selectedVeNFTPools: { [id: string]: number } | undefined;
  selectedVeNFTPoolsAmount: number;
  totalPercent: number; // for selected veNFTsPools
  updateSelectedVeNFTPools: (vote: { [id: string]: number }) => void;
}

const LiquidityContext = createContext<VoteProviderType | undefined>(undefined);
interface Props {
  children: React.ReactNode;
}

export const VoteProvider = ({ children }: Props) => {
  const [veNFTsAndPoolsMap, setSelectedVotes] = useState<{
    [id: string]: { [id: string]: number };
  }>({});
  const [selectedVeNFT, setSelectedVRCT] = useState<TLockToken>();
  const selectedVeNFTPoolsAmount = useMemo(() => {
    // total amount of pools with atleast > 0 percent
    let result = 0;
    if (!selectedVeNFT) return 0;
    if (!veNFTsAndPoolsMap[selectedVeNFT?.id.toString()]) return 0;
    Object.values(veNFTsAndPoolsMap[selectedVeNFT?.id.toString()]).forEach(
      (value) => {
        if (value > 0) {
          result++;
        }
      }
    );
    return result;
  }, [selectedVeNFT, veNFTsAndPoolsMap]);
  // total percent for ONLY selected veNFT's Pools
  const totalPercent = useMemo(() => {
    if (!selectedVeNFT) return 0;
    if (!veNFTsAndPoolsMap[selectedVeNFT.id.toString()]) return 0;
    return Object.values(veNFTsAndPoolsMap[selectedVeNFT.id.toString()]).reduce(
      (acc, curr) => acc + curr,
      0
    );
  }, [selectedVeNFT, veNFTsAndPoolsMap]);

  // set a pool(s) for ONLY for selected veNFT
  const setPool = useCallback(
    (vote: { [id: string]: number }) => {
      if (!selectedVeNFT) return;
      const newVotes = {
        ...veNFTsAndPoolsMap[selectedVeNFT?.id.toString()],
        ...vote,
      };
      Object.keys(newVotes).forEach((key) => {
        if (newVotes[key] === 0) {
          delete newVotes[key];
        }
      });
      const allVotesEqZero = Object.values(newVotes).every(
        (value) => value === 0
      );
      if (allVotesEqZero) {
        // remove record if all votes are eq than 0
        const newObj = { ...veNFTsAndPoolsMap };
        delete newObj[selectedVeNFT.id.toString()];
        setSelectedVotes(newObj);
        return;
      }
      setSelectedVotes({
        ...veNFTsAndPoolsMap,
        [selectedVeNFT.id.toString()]: newVotes,
      });
    },
    [selectedVeNFT, veNFTsAndPoolsMap]
  );
  return (
    <LiquidityContext.Provider
      value={{
        veNFTsAndPoolsMap,
        selectedVeNFTPools:
          veNFTsAndPoolsMap[selectedVeNFT?.id.toString() ?? "-1"],
        setSelectedVRCT,
        selectedVeNFTPoolsAmount,
        selectedVeNFT,
        updateSelectedVeNFTPools: setPool,
        totalPercent,
      }}
    >
      {children}
    </LiquidityContext.Provider>
  );
};

// Custom hook to use the context
export const useVoteProvider = () => {
  const context = useContext(LiquidityContext);
  if (!context) {
    throw new Error("useVoteProvider must be used within a VoteProvider");
  }
  return context;
};
