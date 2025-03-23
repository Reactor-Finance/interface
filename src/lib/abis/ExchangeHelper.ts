export const abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "target",
        type: "address",
      },
    ],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [],
    name: "FailedCall",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "multiHops",
        type: "bool",
      },
    ],
    name: "calculatePriceImpact",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFeesInUSDForAllPairs",
    outputs: [
      {
        internalType: "uint256",
        name: "totalValue",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "fees",
        type: "uint256[]",
      },
      {
        internalType: "contract Pair[]",
        name: "pairs",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Pair",
        name: "pair",
        type: "address",
      },
    ],
    name: "getFeesInUSDForPair",
    outputs: [
      {
        internalType: "uint256",
        name: "totalValue",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTVLInUSDForAllPairs",
    outputs: [
      {
        internalType: "uint256",
        name: "totalTVL",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "tvls",
        type: "uint256[]",
      },
      {
        internalType: "contract Pair[]",
        name: "pairs",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Pair",
        name: "pair",
        type: "address",
      },
    ],
    name: "getTVLInUSDForPair",
    outputs: [
      {
        internalType: "uint256",
        name: "token0VL",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "token1VL",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalVL",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "from",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "to",
        type: "uint256",
      },
    ],
    name: "getTotalVolumeLockedPerTime",
    outputs: [
      {
        internalType: "uint256",
        name: "tvlPerTime",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "volumes",
        type: "uint256[]",
      },
      {
        internalType: "contract Pair[]",
        name: "pairs",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract Pair",
        name: "pair",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "from",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "to",
        type: "uint256",
      },
    ],
    name: "getVolumeLockedPerTimeForPair",
    outputs: [
      {
        internalType: "uint256",
        name: "token0Volume",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "token1Volume",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "token0VolumeUSD",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "token1VolumeUSD",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "totalVolumeUSD",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_tradeHelper",
        type: "address",
      },
      {
        internalType: "address",
        name: "_voter",
        type: "address",
      },
      {
        internalType: "address",
        name: "_priceOracle",
        type: "address",
      },
      {
        internalType: "address",
        name: "_wETH",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "pairFactory",
    outputs: [
      {
        internalType: "contract IPairFactory",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceOracle",
    outputs: [
      {
        internalType: "contract Oracle",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "rewardPerTokenSelector",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tradeHelper",
    outputs: [
      {
        internalType: "contract ITradeHelper",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "voter",
    outputs: [
      {
        internalType: "contract Voter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "wETH",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
