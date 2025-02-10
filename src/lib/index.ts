import { Contracts } from "./contracts";
export const ContractsAbi = {
  WETH: {
    abi: [...Contracts.WETH.abi] as const,
    address: Contracts.WETH.contractAddress as `0x${string}`,
  },
  Reactor: {
    abi: [...Contracts.Reactor.abi] as const,
    address: Contracts.Reactor.contractAddress as `0x${string}`,
  },
  Voter: {
    abi: [...Contracts.Voter.abi] as const,
    address: Contracts.Voter.contractAddress as `0x${string}`,
  },
  Router: {
    abi: [...Contracts.Router.abi] as const,
    address: Contracts.Router.contractAddress as `0x${string}`,
  },
  PairFactory: {
    abi: [...Contracts.PairFactory.abi] as const,
    address: Contracts.PairFactory.contractAddress as `0x${string}`,
  },
  TradeHelper: {
    abi: [...Contracts.TradeHelper.abi] as const,
    address: Contracts.TradeHelper.contractAddress as `0x${string}`,
  },
};
