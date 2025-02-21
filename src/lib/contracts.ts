import { ContractsAbi } from "./contractsAbi";
const ABIs = {
  PRIVATE_NET: ContractsAbi,
  TESTNET: ContractsAbi,
  PROD: ContractsAbi,
};
const EnvContracts = ABIs.PRIVATE_NET;
export const Contracts = {
  WETH: {
    abi: [...EnvContracts.WETH.abi] as const,
    address: EnvContracts.WETH.contractAddress as `0x${string}`,
  },

  Reactor: {
    abi: [...EnvContracts.Reactor.abi] as const,
    address: EnvContracts.Reactor.contractAddress as `0x${string}`,
  },
  Voter: {
    abi: [...EnvContracts.Voter.abi] as const,
    address: EnvContracts.Voter.contractAddress as `0x${string}`,
  },
  VotingEscrow: {
    abi: [...EnvContracts.VotingEscrow.abi] as const,
    address: EnvContracts.VotingEscrow.contractAddress as `0x${string}`,
  },
  Router: {
    abi: [...EnvContracts.Router.abi] as const,
    address: EnvContracts.Router.contractAddress as `0x${string}`,
  },
  PairFactory: {
    abi: [...EnvContracts.PairFactory.abi] as const,
    address: EnvContracts.PairFactory.contractAddress as `0x${string}`,
  },
  TradeHelper: {
    abi: [...EnvContracts.TradeHelper.abi] as const,
    address: EnvContracts.TradeHelper.contractAddress as `0x${string}`,
  },
  veNFTHelper: {
    abi: [...EnvContracts.veNFTHelper.abi] as const,
    address: EnvContracts.veNFTHelper.contractAddress as `0x${string}`,
  },
  RewardsDistributor: {
    abi: [...EnvContracts.RewardsDistributor.abi] as const,
    address: EnvContracts.RewardsDistributor.contractAddress as `0x${string}`,
  },
};
