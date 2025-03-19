"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
interface VoteProviderType {
  selectedVRCT: string;
  selectedVotes: { [id: string]: { [id: string]: number } };
  selectedVotesForVRCT: { [id: string]: number };
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
  const [selectedVRCT] = useState("0");
  const selectedVotesAmount = useMemo(() => {
    let result = 0;
    if (!selectedVotes[selectedVRCT]) return 0;
    Object.values(selectedVotes[selectedVRCT]).forEach((value) => {
      if (value > 0) {
        result++;
      }
    });
    return result;
  }, [selectedVRCT, selectedVotes]);
  const totalPercent = useMemo(() => {
    if (!selectedVotes[selectedVRCT]) return 0;
    return Object.values(selectedVotes[selectedVRCT]).reduce(
      (acc, curr) => acc + curr,
      0
    );
  }, [selectedVRCT, selectedVotes]);
  const setVote = useCallback(
    (vote: { [id: string]: number }) => {
      const newVotes = { ...selectedVotes[selectedVRCT], ...vote };
      setSelectedVotes({ ...selectedVotes, [selectedVRCT]: newVotes });
    },
    [selectedVRCT, selectedVotes]
  );
  return (
    <LiquidityContext.Provider
      value={{
        selectedVotes,
        selectedVotesForVRCT: selectedVotes[selectedVRCT],
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
