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
};
