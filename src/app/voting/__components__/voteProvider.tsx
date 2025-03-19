"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
interface VoteProviderType {
  selectedVotes: { [id: string]: number };
  selectedVotesAmount: number;
  totalPercent: number;
  setVote: (vote: { [id: string]: number }) => void;
}

const LiquidityContext = createContext<VoteProviderType | undefined>(undefined);
interface Props {
  children: React.ReactNode;
}

export const VoteProvider = ({ children }: Props) => {
  const [selectedVotes, setSelectedVotes] = useState<{ [id: string]: number }>(
    {}
  );
  const selectedVotesAmount = useMemo(() => {
    let result = 0;
    Object.values(selectedVotes).forEach((value) => {
      if (value > 0) {
        result++;
      }
    });
    return result;
  }, [selectedVotes]);
  const totalPercent = useMemo(() => {
    return Object.values(selectedVotes).reduce((acc, curr) => acc + curr, 0);
  }, [selectedVotes]);
  const setVote = useCallback(
    (vote: { [id: string]: number }) => {
      const newVotes = { ...selectedVotes, ...vote };
      setSelectedVotes(newVotes);
    },
    [selectedVotes]
  );
  return (
    <LiquidityContext.Provider
      value={{ selectedVotes, selectedVotesAmount, setVote, totalPercent }}
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
