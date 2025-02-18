import { ContractsAbi } from "./contractsAbi";
export const Contracts = {
  WETH: {
    abi: [...ContractsAbi.WETH.abi] as const,
    address: ContractsAbi.WETH.contractAddress as `0x${string}`,
  },

  Reactor: {
    abi: [...ContractsAbi.Reactor.abi] as const,
    address: ContractsAbi.Reactor.contractAddress as `0x${string}`,
  },
  Voter: {
    abi: [...ContractsAbi.Voter.abi] as const,
    address: ContractsAbi.Voter.contractAddress as `0x${string}`,
  },
  VotingEscrow: {
    abi: [...ContractsAbi.VotingEscrow.abi] as const,
    address: ContractsAbi.VotingEscrow.contractAddress as `0x${string}`,
  },
  Router: {
    abi: [...ContractsAbi.Router.abi] as const,
    address: ContractsAbi.Router.contractAddress as `0x${string}`,
  },
  PairFactory: {
    abi: [...ContractsAbi.PairFactory.abi] as const,
    address: ContractsAbi.PairFactory.contractAddress as `0x${string}`,
  },
  TradeHelper: {
    abi: [...ContractsAbi.TradeHelper.abi] as const,
    address: ContractsAbi.TradeHelper.contractAddress as `0x${string}`,
  },
  veNFTHelper: {
    abi: [...ContractsAbi.veNFTHelper.abi] as const,
    address: ContractsAbi.veNFTHelper.contractAddress as `0x${string}`,
  },
  RewardsDistributor: {
    abi: [...ContractsAbi.RewardsDistributor.abi] as const,
    address: ContractsAbi.RewardsDistributor.contractAddress as `0x${string}`,
  },
};
