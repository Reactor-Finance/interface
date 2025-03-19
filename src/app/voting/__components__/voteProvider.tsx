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
  selectedVRCT: TLockToken | undefined;
  setSelectedVRCT: React.Dispatch<React.SetStateAction<TLockToken | undefined>>;
  selectedVotes: { [id: string]: { [id: string]: number } };
  selectedVotesForVRCT: { [id: string]: number } | undefined;
  selectedVotesAmount: number;
  totalPercent: number;
  setVote: (vote: { [id: string]: number }) => void;
}

const LiquidityContext = createContext<VoteProviderType | undefined>(undefined);
interface Props {
  children: React.ReactNode;
}

export const VoteProvider = ({ children }: Props) => {
  const [selectedVotes, setSelectedVotes] = useState<{
    [id: string]: { [id: string]: number };
  }>({});
  const [selectedVRCT, setSelectedVRCT] = useState<TLockToken>();
  const selectedVotesAmount = useMemo(() => {
    let result = 0;
    if (!selectedVRCT) return 0;
    if (!selectedVotes[selectedVRCT?.id.toString()]) return 0;
    Object.values(selectedVotes[selectedVRCT?.id.toString()]).forEach(
      (value) => {
        if (value > 0) {
          result++;
        }
      }
    );
    return result;
  }, [selectedVRCT, selectedVotes]);
  const totalPercent = useMemo(() => {
    if (!selectedVRCT) return 0;
    if (!selectedVotes[selectedVRCT.id.toString()]) return 0;
    return Object.values(selectedVotes[selectedVRCT.id.toString()]).reduce(
      (acc, curr) => acc + curr,
      0
    );
  }, [selectedVRCT, selectedVotes]);
  const setVote = useCallback(
    (vote: { [id: string]: number }) => {
      if (!selectedVRCT) return;
      const newVotes = {
        ...selectedVotes[selectedVRCT?.id.toString()],
        ...vote,
      };
      setSelectedVotes({
        ...selectedVotes,
        [selectedVRCT.id.toString()]: newVotes,
      });
    },
    [selectedVRCT, selectedVotes]
  );
  return (
    <LiquidityContext.Provider
      value={{
        selectedVotes,
        selectedVotesForVRCT:
          selectedVotes[selectedVRCT?.id.toString() ?? "-1"],
        setSelectedVRCT,
        selectedVRCT,
        selectedVotesAmount,
        setVote,
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
