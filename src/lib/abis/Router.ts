export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_tradeHelper",
        type: "address",
      },
      {
        internalType: "contract IWETH",
        name: "_weth",
        type: "address",
      },
    ],
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
    inputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "InsufficientBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "ETHER",
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
        internalType: "bool",
        name: "stable",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "amountADesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBDesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "addLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "bool",
        name: "stable",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "amountTokenDesired",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "addLiquidityETH",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
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
        internalType: "bool",
        name: "stable",
        type: "bool",
      },
    ],
    name: "getReserves",
    outputs: [
      {
        internalType: "uint256",
        name: "reserveA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserveB",
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
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "bool",
        name: "stable",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
    ],
    name: "quoteRemoveLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
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
        name: "tokenA",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenB",
        type: "address",
      },
      {
        internalType: "bool",
        name: "stable",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
    ],
    name: "removeLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "bool",
        name: "stable",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "withFeeOnTransferTokens",
        type: "bool",
      },
    ],
    name: "removeLiquidityETH",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "bool",
        name: "stable",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountTokenMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETHMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "withFeeOnTransferTokens",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityETHWithPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "amountToken",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountETH",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
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
        internalType: "bool",
        name: "stable",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAMin",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountBMin",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "approveMax",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "removeLiquidityWithPermit",
    outputs: [
      {
        internalType: "uint256",
        name: "amountA",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountB",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMin",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "bool",
            name: "stable",
            type: "bool",
          },
        ],
        internalType: "struct ITradeHelper.Route[]",
        name: "routes",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "withFeeOnTransferTokens",
        type: "bool",
      },
    ],
    name: "swap",
    outputs: [
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
    ],
    stateMutability: "payable",
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
    name: "wETH",
    outputs: [
      {
        internalType: "contract IWETH",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;
