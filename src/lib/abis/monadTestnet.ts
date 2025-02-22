export const monadTestnet = {
  Reactor: {
    contractAddress: "0x1515B7652185388925F5D8283496753883416f09",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "ECDSAInvalidSignature",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "length",
            type: "uint256",
          },
        ],
        name: "ECDSAInvalidSignatureLength",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "s",
            type: "bytes32",
          },
        ],
        name: "ECDSAInvalidSignatureS",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "allowance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "needed",
            type: "uint256",
          },
        ],
        name: "ERC20InsufficientAllowance",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
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
        name: "ERC20InsufficientBalance",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "approver",
            type: "address",
          },
        ],
        name: "ERC20InvalidApprover",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
        ],
        name: "ERC20InvalidReceiver",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "ERC20InvalidSender",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "ERC20InvalidSpender",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
        ],
        name: "ERC2612ExpiredSignature",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "signer",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "ERC2612InvalidSigner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "currentNonce",
            type: "uint256",
          },
        ],
        name: "InvalidAccountNonce",
        type: "error",
      },
      {
        inputs: [],
        name: "InvalidShortString",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "str",
            type: "string",
          },
        ],
        name: "StringTooLong",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [],
        name: "EIP712DomainChanged",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        inputs: [],
        name: "DOMAIN_SEPARATOR",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
        ],
        name: "allowance",
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
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "balanceOf",
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
        name: "decimals",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "eip712Domain",
        outputs: [
          {
            internalType: "bytes1",
            name: "fields",
            type: "bytes1",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "version",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "chainId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "verifyingContract",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "salt",
            type: "bytes32",
          },
          {
            internalType: "uint256[]",
            name: "extensions",
            type: "uint256[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_recipient",
            type: "address",
          },
        ],
        name: "initialMint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "initialMinted",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "mint",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "minter",
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
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "nonces",
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
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
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
        name: "permit",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_minter",
            type: "address",
          },
        ],
        name: "setMinter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
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
        inputs: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
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
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ] as const,
  },
  PermissionsRegistry: {
    contractAddress: "0xF6a7F229447FB986195c4dC8305553C8A8518d06",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "bytes",
            name: "role",
            type: "bytes",
          },
        ],
        name: "RoleAdded",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "bytes",
            name: "role",
            type: "bytes",
          },
        ],
        name: "RoleRemoved",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: true,
            internalType: "bytes",
            name: "role",
            type: "bytes",
          },
        ],
        name: "RoleRemovedFor",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "user",
            type: "address",
          },
          {
            indexed: true,
            internalType: "bytes",
            name: "role",
            type: "bytes",
          },
        ],
        name: "RoleSetFor",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "council",
            type: "address",
          },
        ],
        name: "SetEmergencyCouncil",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "multisig",
            type: "address",
          },
        ],
        name: "SetReactorMultisig",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "multisig",
            type: "address",
          },
        ],
        name: "SetReactorTeamMultisig",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "role",
            type: "string",
          },
        ],
        name: "addRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_user",
            type: "address",
          },
        ],
        name: "addressToRole",
        outputs: [
          {
            internalType: "string[]",
            name: "",
            type: "string[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "emergencyCouncil",
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
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "hasRole",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes",
            name: "_input",
            type: "bytes",
          },
        ],
        name: "helper_bytesToString",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "_input",
            type: "string",
          },
        ],
        name: "helper_stringToBytes",
        outputs: [
          {
            internalType: "bytes",
            name: "",
            type: "bytes",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "reactorMultisig",
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
        inputs: [],
        name: "reactorTeamMultisig",
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
            internalType: "string",
            name: "role",
            type: "string",
          },
        ],
        name: "removeRole",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "c",
            type: "address",
          },
          {
            internalType: "string",
            name: "role",
            type: "string",
          },
        ],
        name: "removeRoleFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "role",
            type: "string",
          },
        ],
        name: "roleToAddresses",
        outputs: [
          {
            internalType: "address[]",
            name: "_addresses",
            type: "address[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "roles",
        outputs: [
          {
            internalType: "bytes[]",
            name: "",
            type: "bytes[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "rolesLength",
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
        name: "rolesToString",
        outputs: [
          {
            internalType: "string[]",
            name: "__roles",
            type: "string[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_new",
            type: "address",
          },
        ],
        name: "setEmergencyCouncil",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_new",
            type: "address",
          },
        ],
        name: "setReactorMultisig",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_new",
            type: "address",
          },
        ],
        name: "setReactorTeamMultisig",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "c",
            type: "address",
          },
          {
            internalType: "string",
            name: "role",
            type: "string",
          },
        ],
        name: "setRoleFor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ] as const,
  },
  PairFactory: {
    contractAddress: "0x4a61F6a5ee25d04271fec17471E727a089c7A22D",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "_implementation",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "FailedDeployment",
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
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "token0",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "token1",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "stable",
            type: "bool",
          },
          {
            indexed: false,
            internalType: "address",
            name: "pair",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "PairCreated",
        type: "event",
      },
      {
        inputs: [],
        name: "MAX_FEE",
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
        name: "MAX_REFERRAL_FEE",
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
        name: "acceptFeeManager",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "allPairs",
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
        inputs: [],
        name: "allPairsLength",
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
        name: "createPair",
        outputs: [
          {
            internalType: "address",
            name: "pair",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "dibs",
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
        inputs: [],
        name: "feeManager",
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
            internalType: "bool",
            name: "_stable",
            type: "bool",
          },
        ],
        name: "getFee",
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
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        name: "getPair",
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
        inputs: [],
        name: "implementation",
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
            name: "",
            type: "address",
          },
        ],
        name: "isPair",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "pairs",
        outputs: [
          {
            internalType: "address[]",
            name: "",
            type: "address[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "pendingFeeManager",
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
            name: "_dibs",
            type: "address",
          },
        ],
        name: "setDibs",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bool",
            name: "_stable",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "_fee",
            type: "uint256",
          },
        ],
        name: "setFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_feeManager",
            type: "address",
          },
        ],
        name: "setFeeManager",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_refFee",
            type: "uint256",
          },
        ],
        name: "setReferralFee",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "stableFee",
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
        name: "volatileFee",
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
    ] as const,
  },
  GaugeFactory: {
    contractAddress: "0x1Ec4cE240CAb13dd15d144284a93dc8DeD99F41d",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
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
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_gauges",
            type: "address[]",
          },
        ],
        name: "activateEmergencyMode",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_rewardToken",
            type: "address",
          },
          {
            internalType: "address",
            name: "_ve",
            type: "address",
          },
          {
            internalType: "address",
            name: "_token",
            type: "address",
          },
          {
            internalType: "address",
            name: "_distribution",
            type: "address",
          },
          {
            internalType: "address",
            name: "_internal_bribe",
            type: "address",
          },
          {
            internalType: "address",
            name: "_external_bribe",
            type: "address",
          },
          {
            internalType: "bool",
            name: "_isPair",
            type: "bool",
          },
        ],
        name: "createGauge",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "gauges",
        outputs: [
          {
            internalType: "address[]",
            name: "",
            type: "address[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_permissionRegistry",
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
        name: "last_gauge",
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
        inputs: [],
        name: "length",
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
        name: "owner",
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
        inputs: [],
        name: "permissionsRegistry",
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
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_gauges",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "distro",
            type: "address",
          },
        ],
        name: "setDistribution",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_gauges",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "_rewarder",
            type: "address[]",
          },
        ],
        name: "setGaugeRewarder",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_gauges",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "int_bribe",
            type: "address[]",
          },
        ],
        name: "setInternalBribe",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_registry",
            type: "address",
          },
        ],
        name: "setRegistry",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_gauges",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "_pids",
            type: "uint256[]",
          },
        ],
        name: "setRewarderPid",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_gauges",
            type: "address[]",
          },
        ],
        name: "stopEmergencyMode",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ] as const,
  },
  VeArtProxyUpgradeable: {
    contractAddress: "0xb62E0994c1F91120389935fb01bfd58312594350",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
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
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_balanceOf",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_locked_end",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "_tokenURI",
        outputs: [
          {
            internalType: "string",
            name: "output",
            type: "string",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
      {
        inputs: [],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
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
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ] as const,
  },
  VotingEscrow: {
    contractAddress: "0xD3F9Ba8b83D5a71bb75a9955A1494d5B1D4E76da",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "token_addr",
            type: "address",
          },
          {
            internalType: "address",
            name: "art_proxy",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "ReentrancyGuardReentrantCall",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "expiry",
            type: "uint256",
          },
        ],
        name: "VotesExpiredSignature",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "approved",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Approval",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
        ],
        name: "ApprovalForAll",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "delegator",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "fromDelegate",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "toDelegate",
            type: "address",
          },
        ],
        name: "DelegateChanged",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "delegate",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "previousVotes",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "newVotes",
            type: "uint256",
          },
        ],
        name: "DelegateVotesChanged",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "provider",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "locktime",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "enum VotingEscrow.DepositType",
            name: "deposit_type",
            type: "uint8",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "ts",
            type: "uint256",
          },
        ],
        name: "Deposit",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "prevSupply",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "supply",
            type: "uint256",
          },
        ],
        name: "Supply",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            indexed: true,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "Transfer",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "provider",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "ts",
            type: "uint256",
          },
        ],
        name: "Withdraw",
        type: "event",
      },
      {
        inputs: [],
        name: "DELEGATION_TYPEHASH",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "DOMAIN_TYPEHASH",
        outputs: [
          {
            internalType: "bytes32",
            name: "",
            type: "bytes32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "MAX_DELEGATES",
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
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "_locked__end",
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
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_idx",
            type: "uint256",
          },
        ],
        name: "_user_point_history__ts",
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
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "abstain",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_approved",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "artProxy",
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
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "attach",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "attachments",
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
        inputs: [
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
        ],
        name: "balanceOf",
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
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_block",
            type: "uint256",
          },
        ],
        name: "balanceOfAtNFT",
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
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "balanceOfNFT",
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
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_t",
            type: "uint256",
          },
        ],
        name: "balanceOfNFTAt",
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
        name: "block_number",
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
        name: "checkpoint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
          {
            internalType: "uint32",
            name: "",
            type: "uint32",
          },
        ],
        name: "checkpoints",
        outputs: [
          {
            internalType: "uint256",
            name: "timestamp",
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
            name: "_value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_lock_duration",
            type: "uint256",
          },
        ],
        name: "create_lock",
        outputs: [
          {
            internalType: "uint256",
            name: "",
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
            name: "_value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_lock_duration",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_to",
            type: "address",
          },
        ],
        name: "create_lock_for",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "decimals",
        outputs: [
          {
            internalType: "uint8",
            name: "",
            type: "uint8",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "delegatee",
            type: "address",
          },
        ],
        name: "delegate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "delegatee",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "expiry",
            type: "uint256",
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
        name: "delegateBySig",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "delegator",
            type: "address",
          },
        ],
        name: "delegates",
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
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "deposit_for",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "detach",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "epoch",
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
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "getApproved",
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
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        name: "getPastTotalSupply",
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
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        name: "getPastVotes",
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
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        name: "getPastVotesIndex",
        outputs: [
          {
            internalType: "uint32",
            name: "",
            type: "uint32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "getVotes",
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
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "get_last_user_slope",
        outputs: [
          {
            internalType: "int128",
            name: "",
            type: "int128",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "increase_amount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_lock_duration",
            type: "uint256",
          },
        ],
        name: "increase_unlock_time",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "_operator",
            type: "address",
          },
        ],
        name: "isApprovedForAll",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "isApprovedOrOwner",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
        ],
        name: "locked",
        outputs: [
          {
            components: [
              {
                internalType: "int128",
                name: "amount",
                type: "int128",
              },
              {
                internalType: "uint256",
                name: "end",
                type: "uint256",
              },
            ],
            internalType: "struct IVotingEscrow.LockedBalance",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_from",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_to",
            type: "uint256",
          },
        ],
        name: "merge",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "name",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "nonces",
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
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "numCheckpoints",
        outputs: [
          {
            internalType: "uint32",
            name: "",
            type: "uint32",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "ownerOf",
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
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "ownership_change",
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
        inputs: [
          {
            internalType: "uint256",
            name: "loc",
            type: "uint256",
          },
        ],
        name: "point_history",
        outputs: [
          {
            components: [
              {
                internalType: "int128",
                name: "bias",
                type: "int128",
              },
              {
                internalType: "int128",
                name: "slope",
                type: "int128",
              },
              {
                internalType: "uint256",
                name: "ts",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "blk",
                type: "uint256",
              },
            ],
            internalType: "struct IVotingEscrow.Point",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_from",
            type: "address",
          },
          {
            internalType: "address",
            name: "_to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_from",
            type: "address",
          },
          {
            internalType: "address",
            name: "_to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "_data",
            type: "bytes",
          },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_operator",
            type: "address",
          },
          {
            internalType: "bool",
            name: "_approved",
            type: "bool",
          },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_proxy",
            type: "address",
          },
        ],
        name: "setArtProxy",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_team",
            type: "address",
          },
        ],
        name: "setTeam",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_voter",
            type: "address",
          },
        ],
        name: "setVoter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "slope_changes",
        outputs: [
          {
            internalType: "int128",
            name: "",
            type: "int128",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "split",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "supply",
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
        inputs: [
          {
            internalType: "bytes4",
            name: "_interfaceID",
            type: "bytes4",
          },
        ],
        name: "supportsInterface",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "symbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "team",
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
        inputs: [],
        name: "token",
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
            name: "_owner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_tokenIndex",
            type: "uint256",
          },
        ],
        name: "tokenOfOwnerByIndex",
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
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "tokenURI",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "totalSupply",
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
        inputs: [
          {
            internalType: "uint256",
            name: "_block",
            type: "uint256",
          },
        ],
        name: "totalSupplyAt",
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
        inputs: [
          {
            internalType: "uint256",
            name: "t",
            type: "uint256",
          },
        ],
        name: "totalSupplyAtT",
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
        inputs: [
          {
            internalType: "address",
            name: "_from",
            type: "address",
          },
          {
            internalType: "address",
            name: "_to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "user_point_epoch",
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
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "loc",
            type: "uint256",
          },
        ],
        name: "user_point_history",
        outputs: [
          {
            components: [
              {
                internalType: "int128",
                name: "bias",
                type: "int128",
              },
              {
                internalType: "int128",
                name: "slope",
                type: "int128",
              },
              {
                internalType: "uint256",
                name: "ts",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "blk",
                type: "uint256",
              },
            ],
            internalType: "struct IVotingEscrow.Point",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "version",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "voted",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
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
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "voting",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "withdraw",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ] as const,
  },
  Voter: {
    contractAddress: "0xb33B33B1c457a4E26e3Bb2391cE07a73B73b0d22",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
        ],
        name: "Abstained",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "pairfactory",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "gaugefactory",
            type: "address",
          },
        ],
        name: "AddFactories",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "blacklister",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "token",
            type: "address",
          },
        ],
        name: "Blacklisted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "gauge",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "DistributeReward",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "gauge",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "internal_bribe",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "external_bribe",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "pool",
            type: "address",
          },
        ],
        name: "GaugeCreated",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "gauge",
            type: "address",
          },
        ],
        name: "GaugeKilled",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "gauge",
            type: "address",
          },
        ],
        name: "GaugeRevived",
        type: "event",
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
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "reward",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "NotifyReward",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "old",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "latest",
            type: "address",
          },
        ],
        name: "SetBribeFactory",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "bool",
            name: "isInternal",
            type: "bool",
          },
          {
            indexed: true,
            internalType: "address",
            name: "old",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "latest",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "gauge",
            type: "address",
          },
        ],
        name: "SetBribeFor",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "old",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "latest",
            type: "address",
          },
        ],
        name: "SetGaugeFactory",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "old",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "latest",
            type: "address",
          },
        ],
        name: "SetMinter",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "old",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "latest",
            type: "address",
          },
        ],
        name: "SetPairFactory",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "old",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "latest",
            type: "address",
          },
        ],
        name: "SetPermissionRegistry",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "old",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "latest",
            type: "uint256",
          },
        ],
        name: "SetVoteDelay",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "voter",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "weight",
            type: "uint256",
          },
        ],
        name: "Voted",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "whitelister",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "token",
            type: "address",
          },
        ],
        name: "Whitelisted",
        type: "event",
      },
      {
        inputs: [],
        name: "MAX_VOTE_DELAY",
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
        name: "VOTE_DELAY",
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
        name: "_epochTimestamp",
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
        inputs: [
          {
            internalType: "address[]",
            name: "_tokens",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "_permissionsRegistry",
            type: "address",
          },
          {
            internalType: "address",
            name: "_minter",
            type: "address",
          },
        ],
        name: "_init",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_pairFactory",
            type: "address",
          },
          {
            internalType: "address",
            name: "_gaugeFactory",
            type: "address",
          },
        ],
        name: "addFactory",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_token",
            type: "address[]",
          },
        ],
        name: "blacklist",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "bribefactory",
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
            internalType: "address[]",
            name: "_bribes",
            type: "address[]",
          },
          {
            internalType: "address[][]",
            name: "_tokens",
            type: "address[][]",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "claimBribes",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_bribes",
            type: "address[]",
          },
          {
            internalType: "address[][]",
            name: "_tokens",
            type: "address[][]",
          },
        ],
        name: "claimBribes",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_fees",
            type: "address[]",
          },
          {
            internalType: "address[][]",
            name: "_tokens",
            type: "address[][]",
          },
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "claimFees",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_bribes",
            type: "address[]",
          },
          {
            internalType: "address[][]",
            name: "_tokens",
            type: "address[][]",
          },
        ],
        name: "claimFees",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_gauges",
            type: "address[]",
          },
        ],
        name: "claimRewards",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "claimable",
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
        inputs: [
          {
            internalType: "address",
            name: "_pool",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_gaugeType",
            type: "uint256",
          },
        ],
        name: "createGauge",
        outputs: [
          {
            internalType: "address",
            name: "_gauge",
            type: "address",
          },
          {
            internalType: "address",
            name: "_internal_bribe",
            type: "address",
          },
          {
            internalType: "address",
            name: "_external_bribe",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_pool",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "_gaugeTypes",
            type: "uint256[]",
          },
        ],
        name: "createGauges",
        outputs: [
          {
            internalType: "address[]",
            name: "",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "",
            type: "address[]",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_gauges",
            type: "address[]",
          },
        ],
        name: "distribute",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "start",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "finish",
            type: "uint256",
          },
        ],
        name: "distribute",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "distributeAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_gauges",
            type: "address[]",
          },
        ],
        name: "distributeFees",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "external_bribes",
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
        inputs: [],
        name: "factories",
        outputs: [
          {
            internalType: "address[]",
            name: "",
            type: "address[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "factory",
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
        inputs: [],
        name: "factoryLength",
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
        name: "gaugeFactories",
        outputs: [
          {
            internalType: "address[]",
            name: "",
            type: "address[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "gaugeFactoriesLength",
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
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "gauges",
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
            name: "",
            type: "address",
          },
        ],
        name: "gaugesDistributionTimestmap",
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
        inputs: [
          {
            internalType: "address",
            name: "_ve",
            type: "address",
          },
          {
            internalType: "address",
            name: "_pairFactory",
            type: "address",
          },
          {
            internalType: "address",
            name: "_gaugeFactory",
            type: "address",
          },
          {
            internalType: "address",
            name: "_bribes",
            type: "address",
          },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "internal_bribes",
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
            name: "",
            type: "address",
          },
        ],
        name: "isAlive",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "isFactory",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "isGauge",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "isGaugeFactory",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "isWhitelisted",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_gauge",
            type: "address",
          },
        ],
        name: "killGauge",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "lastVoted",
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
        name: "length",
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
        name: "minter",
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
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "notifyRewardAmount",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
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
        inputs: [],
        name: "permissionRegistry",
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
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "poke",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "poolForGauge",
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
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "poolVote",
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
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "poolVoteLength",
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
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "pools",
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
            internalType: "uint256",
            name: "_pos",
            type: "uint256",
          },
        ],
        name: "removeFactory",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_pairFactory",
            type: "address",
          },
          {
            internalType: "address",
            name: "_gaugeFactory",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_pos",
            type: "uint256",
          },
        ],
        name: "replaceFactory",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "reset",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_gauge",
            type: "address",
          },
        ],
        name: "reviveGauge",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_bribeFactory",
            type: "address",
          },
        ],
        name: "setBribeFactory",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_gauge",
            type: "address",
          },
          {
            internalType: "address",
            name: "_external",
            type: "address",
          },
        ],
        name: "setExternalBribeFor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_gauge",
            type: "address",
          },
          {
            internalType: "address",
            name: "_internal",
            type: "address",
          },
        ],
        name: "setInternalBribeFor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_minter",
            type: "address",
          },
        ],
        name: "setMinter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_gauge",
            type: "address",
          },
          {
            internalType: "address",
            name: "_internal",
            type: "address",
          },
          {
            internalType: "address",
            name: "_external",
            type: "address",
          },
        ],
        name: "setNewBribes",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_permissionRegistry",
            type: "address",
          },
        ],
        name: "setPermissionsRegistry",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_delay",
            type: "uint256",
          },
        ],
        name: "setVoteDelay",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "totalWeight",
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
        inputs: [
          {
            internalType: "uint256",
            name: "_time",
            type: "uint256",
          },
        ],
        name: "totalWeightAt",
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
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "ve",
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
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "_poolVote",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "_weights",
            type: "uint256[]",
          },
        ],
        name: "vote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "votes",
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
        inputs: [
          {
            internalType: "address",
            name: "_pool",
            type: "address",
          },
        ],
        name: "weights",
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
        inputs: [
          {
            internalType: "address",
            name: "_pool",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_time",
            type: "uint256",
          },
        ],
        name: "weightsAt",
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
        inputs: [
          {
            internalType: "address[]",
            name: "_token",
            type: "address[]",
          },
        ],
        name: "whitelist",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ] as const,
  },
  BribeFactory: {
    contractAddress: "0x4dCE4c7902fed6f3874901348595505B32752e05",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
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
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_token",
            type: "address",
          },
          {
            internalType: "address",
            name: "__bribe",
            type: "address",
          },
        ],
        name: "addRewardToBribe",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_token",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "__bribes",
            type: "address[]",
          },
        ],
        name: "addRewardToBribes",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_token",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "__bribe",
            type: "address",
          },
        ],
        name: "addRewardsToBribe",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[][]",
            name: "_token",
            type: "address[][]",
          },
          {
            internalType: "address[]",
            name: "__bribes",
            type: "address[]",
          },
        ],
        name: "addRewardsToBribes",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "_token0",
            type: "address",
          },
          {
            internalType: "address",
            name: "_token1",
            type: "address",
          },
          {
            internalType: "string",
            name: "_type",
            type: "string",
          },
        ],
        name: "createBribe",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "defaultRewardTokens",
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
            name: "_voter",
            type: "address",
          },
          {
            internalType: "address",
            name: "_permissionsRegistry",
            type: "address",
          },
          {
            internalType: "address[]",
            name: "_defaultRewardTokens",
            type: "address[]",
          },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "last_bribe",
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
        inputs: [],
        name: "owner",
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
        inputs: [],
        name: "permissionsRegistry",
        outputs: [
          {
            internalType: "contract IPermissionsRegistry",
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
            name: "_token",
            type: "address",
          },
        ],
        name: "pushDefaultRewardTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_bribe",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "_tokens",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "_amounts",
            type: "uint256[]",
          },
        ],
        name: "recoverERC20AndUpdateData",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_bribe",
            type: "address[]",
          },
          {
            internalType: "address[]",
            name: "_tokens",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "_amounts",
            type: "uint256[]",
          },
        ],
        name: "recoverERC20From",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_token",
            type: "address",
          },
        ],
        name: "removeDefaultRewardTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_bribe",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "_minter",
            type: "address",
          },
        ],
        name: "setBribeMinter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_bribe",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
        ],
        name: "setBribeOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address[]",
            name: "_bribe",
            type: "address[]",
          },
          {
            internalType: "address",
            name: "_voter",
            type: "address",
          },
        ],
        name: "setBribeVoter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_permReg",
            type: "address",
          },
        ],
        name: "setPermissionsRegistry",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_voter",
            type: "address",
          },
        ],
        name: "setVoter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "voter",
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
    ] as const,
  },
  RewardsDistributor: {
    contractAddress: "0x46e65AfC0BBF7cc037D82AC2eA9aaf560dD962Cc",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "_voting_escrow",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "time",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokens",
            type: "uint256",
          },
        ],
        name: "CheckpointToken",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "claim_epoch",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "max_epoch",
            type: "uint256",
          },
        ],
        name: "Claimed",
        type: "event",
      },
      {
        inputs: [],
        name: "checkpoint_token",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "checkpoint_total_supply",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "claim",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256[]",
            name: "_tokenIds",
            type: "uint256[]",
          },
        ],
        name: "claim_many",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
        ],
        name: "claimable",
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
        name: "depositor",
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
        inputs: [],
        name: "last_token_time",
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
        name: "owner",
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
            name: "_depositor",
            type: "address",
          },
        ],
        name: "setDepositor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
        ],
        name: "setOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "start_time",
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
        name: "time_cursor",
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
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "time_cursor_of",
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
        name: "timestamp",
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
        name: "token",
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
        inputs: [],
        name: "token_last_balance",
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
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "tokens_per_week",
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
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "user_epoch_of",
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
        inputs: [
          {
            internalType: "uint256",
            name: "_tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_timestamp",
            type: "uint256",
          },
        ],
        name: "ve_for_at",
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
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "ve_supply",
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
        name: "voting_escrow",
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
            name: "_token",
            type: "address",
          },
        ],
        name: "withdrawERC20",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ] as const,
  },
  MinterUpgradeable: {
    contractAddress: "0xD75411C6A3fEf2278E51EEaa73cdE8352c59eFEd",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
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
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "weekly",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "circulating_supply",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "circulating_emission",
            type: "uint256",
          },
        ],
        name: "Mint",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        inputs: [],
        name: "EMISSION",
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
        name: "LOCK",
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
        name: "MAX_TEAM_RATE",
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
        name: "PRECISION",
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
        name: "REBASEMAX",
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
        name: "TAIL_EMISSION",
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
        name: "WEEK",
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
        inputs: [
          {
            internalType: "address[]",
            name: "claimants",
            type: "address[]",
          },
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
          {
            internalType: "uint256",
            name: "max",
            type: "uint256",
          },
        ],
        name: "_initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "_rct",
        outputs: [
          {
            internalType: "contract IReactor",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "_rewards_distributor",
        outputs: [
          {
            internalType: "contract IRewardsDistributor",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "_ve",
        outputs: [
          {
            internalType: "contract IVotingEscrow",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "_voter",
        outputs: [
          {
            internalType: "contract IVoter",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "acceptTeam",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "active_period",
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
        name: "calculate_emission",
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
        inputs: [
          {
            internalType: "uint256",
            name: "_weeklyMint",
            type: "uint256",
          },
        ],
        name: "calculate_rebase",
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
        name: "check",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "circulating_emission",
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
        name: "circulating_supply",
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
        inputs: [
          {
            internalType: "address",
            name: "__voter",
            type: "address",
          },
          {
            internalType: "address",
            name: "__ve",
            type: "address",
          },
          {
            internalType: "address",
            name: "__rewards_distributor",
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
        name: "isFirstMint",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
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
        inputs: [],
        name: "pendingTeam",
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
        inputs: [],
        name: "period",
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
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_emission",
            type: "uint256",
          },
        ],
        name: "setEmission",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_rebase",
            type: "uint256",
          },
        ],
        name: "setRebase",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_rewardDistro",
            type: "address",
          },
        ],
        name: "setRewardDistributor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_team",
            type: "address",
          },
        ],
        name: "setTeam",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_teamRate",
            type: "uint256",
          },
        ],
        name: "setTeamRate",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "__voter",
            type: "address",
          },
        ],
        name: "setVoter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "team",
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
        inputs: [],
        name: "teamRate",
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
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "update_period",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "weekly",
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
        name: "weekly_emission",
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
    ] as const,
  },
  TradeHelper: {
    contractAddress: "0xEeeC1d828520fC26541624c4e2E34376220CB93a",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "_factory",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "factory",
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
            internalType: "uint256",
            name: "amountOut",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "tokenIn",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address",
          },
        ],
        name: "getAmountIn",
        outputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "stable",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "amountOut",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "tokenIn",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address",
          },
        ],
        name: "getAmountInStable",
        outputs: [
          {
            internalType: "uint256",
            name: "amountIn",
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
            name: "amountOut",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "tokenIn",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address",
          },
        ],
        name: "getAmountInVolatile",
        outputs: [
          {
            internalType: "uint256",
            name: "amountIn",
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
            name: "amountIn",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "tokenIn",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address",
          },
        ],
        name: "getAmountOut",
        outputs: [
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "stable",
            type: "bool",
          },
        ],
        stateMutability: "view",
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
            internalType: "address",
            name: "tokenIn",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address",
          },
        ],
        name: "getAmountOutStable",
        outputs: [
          {
            internalType: "uint256",
            name: "amount",
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
            name: "amountIn",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "tokenIn",
            type: "address",
          },
          {
            internalType: "address",
            name: "tokenOut",
            type: "address",
          },
        ],
        name: "getAmountOutVolatile",
        outputs: [
          {
            internalType: "uint256",
            name: "amount",
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
            name: "amountOut",
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
        ],
        name: "getAmountsIn",
        outputs: [
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
          },
        ],
        stateMutability: "view",
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
        ],
        name: "getAmountsOut",
        outputs: [
          {
            internalType: "uint256[]",
            name: "amounts",
            type: "uint256[]",
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
        ],
        name: "pairFor",
        outputs: [
          {
            internalType: "address",
            name: "pair",
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
        ],
        name: "sortTokens",
        outputs: [
          {
            internalType: "address",
            name: "token0",
            type: "address",
          },
          {
            internalType: "address",
            name: "token1",
            type: "address",
          },
        ],
        stateMutability: "pure",
        type: "function",
      },
    ] as const,
  },
  Router: {
    contractAddress: "0x2D67FC1622099Ed068a2049c83773D9016c4aaEf",
    abi: [
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
    ] as const,
  },
  PairHelper: {
    contractAddress: "0xa45328cB9B5215cc18937AB123fCf44a6815b6C1",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
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
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "oldOwner",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "Owner",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "oldVoter",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "newVoter",
            type: "address",
          },
        ],
        name: "Voter",
        type: "event",
      },
      {
        inputs: [],
        name: "MAX_EPOCHS",
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
        name: "MAX_PAIRS",
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
        name: "MAX_REWARDS",
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
        name: "WEEK",
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
        inputs: [
          {
            internalType: "address",
            name: "_user",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_quantity",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_offset",
            type: "uint256",
          },
        ],
        name: "getAllPair",
        outputs: [
          {
            components: [
              {
                internalType: "address",
                name: "pair_address",
                type: "address",
              },
              {
                internalType: "string",
                name: "symbol",
                type: "string",
              },
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "decimals",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "stable",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "total_supply",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "token0",
                type: "address",
              },
              {
                internalType: "string",
                name: "token0_symbol",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "token0_decimals",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "reserve0",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "claimable0",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "token1",
                type: "address",
              },
              {
                internalType: "string",
                name: "token1_symbol",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "token1_decimals",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "reserve1",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "claimable1",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "gauge",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "gauge_total_supply",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "fee",
                type: "address",
              },
              {
                internalType: "address",
                name: "bribe",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "emissions",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "emissions_token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "emissions_token_decimals",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "account_lp_balance",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "account_token0_balance",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "account_token1_balance",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "account_gauge_balance",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "account_gauge_earned",
                type: "uint256",
              },
            ],
            internalType: "struct PairHelper.PairInfo[]",
            name: "pairs",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_pair",
            type: "address",
          },
          {
            internalType: "address",
            name: "_account",
            type: "address",
          },
        ],
        name: "getPair",
        outputs: [
          {
            components: [
              {
                internalType: "address",
                name: "pair_address",
                type: "address",
              },
              {
                internalType: "string",
                name: "symbol",
                type: "string",
              },
              {
                internalType: "string",
                name: "name",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "decimals",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "stable",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "total_supply",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "token0",
                type: "address",
              },
              {
                internalType: "string",
                name: "token0_symbol",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "token0_decimals",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "reserve0",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "claimable0",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "token1",
                type: "address",
              },
              {
                internalType: "string",
                name: "token1_symbol",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "token1_decimals",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "reserve1",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "claimable1",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "gauge",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "gauge_total_supply",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "fee",
                type: "address",
              },
              {
                internalType: "address",
                name: "bribe",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "emissions",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "emissions_token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "emissions_token_decimals",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "account_lp_balance",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "account_token0_balance",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "account_token1_balance",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "account_gauge_balance",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "account_gauge_earned",
                type: "uint256",
              },
            ],
            internalType: "struct PairHelper.PairInfo",
            name: "_pairInfo",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_quantity",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_offset",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_pair",
            type: "address",
          },
        ],
        name: "getPairBribe",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "epochTimestamp",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "totalVotes",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "pair",
                type: "address",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "uint8",
                    name: "decimals",
                    type: "uint8",
                  },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                  {
                    internalType: "string",
                    name: "symbol",
                    type: "string",
                  },
                ],
                internalType: "struct PairHelper.TokenBribe[]",
                name: "bribes",
                type: "tuple[]",
              },
            ],
            internalType: "struct PairHelper.PairBribeEpoch[]",
            name: "_pairEpoch",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_voter",
            type: "address",
          },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_pair",
            type: "address",
          },
          {
            internalType: "address",
            name: "_token",
            type: "address",
          },
        ],
        name: "left",
        outputs: [
          {
            internalType: "uint256",
            name: "_rewPerEpoch",
            type: "uint256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
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
        inputs: [
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
        ],
        name: "setOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_voter",
            type: "address",
          },
        ],
        name: "setVoter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "underlyingToken",
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
        inputs: [],
        name: "voter",
        outputs: [
          {
            internalType: "contract IVoter",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ] as const,
  },
  RewardHelper: {
    contractAddress: "0xCA6f864adD2cF45bf2b28FBbC990216Cc759B0Ca",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
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
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "address[]",
            name: "pairs",
            type: "address[]",
          },
        ],
        name: "getExpectedClaimForNextEpoch",
        outputs: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "address[]",
                    name: "tokens",
                    type: "address[]",
                  },
                  {
                    internalType: "string[]",
                    name: "symbols",
                    type: "string[]",
                  },
                  {
                    internalType: "uint256[]",
                    name: "decimals",
                    type: "uint256[]",
                  },
                  {
                    internalType: "uint256[]",
                    name: "amounts",
                    type: "uint256[]",
                  },
                ],
                internalType: "struct RewardHelper.Bribe[]",
                name: "bribes",
                type: "tuple[]",
              },
            ],
            internalType: "struct RewardHelper.Rewards[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "pair",
            type: "address",
          },
        ],
        name: "getPairBribe",
        outputs: [
          {
            components: [
              {
                internalType: "address[]",
                name: "tokens",
                type: "address[]",
              },
              {
                internalType: "string[]",
                name: "symbols",
                type: "string[]",
              },
              {
                internalType: "uint256[]",
                name: "decimals",
                type: "uint256[]",
              },
              {
                internalType: "uint256[]",
                name: "amounts",
                type: "uint256[]",
              },
            ],
            internalType: "struct RewardHelper.Bribe[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_voter",
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
        name: "owner",
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
        inputs: [
          {
            internalType: "address",
            name: "_owner",
            type: "address",
          },
        ],
        name: "setOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_voter",
            type: "address",
          },
        ],
        name: "setVoter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "underlyingToken",
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
        inputs: [],
        name: "voter",
        outputs: [
          {
            internalType: "contract IVoter",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ] as const,
  },
  veNFTHelper: {
    contractAddress: "0x79cC64e40CF1b79E54d80fAB5De924efdC1e90d9",
    abi: [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
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
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "oldOwner",
            type: "address",
          },
          {
            indexed: false,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "Owner",
        type: "event",
      },
      {
        inputs: [],
        name: "MAX_PAIRS",
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
        name: "MAX_RESULTS",
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
        inputs: [
          {
            internalType: "uint256",
            name: "_amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_offset",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
        ],
        name: "allPairRewards",
        outputs: [
          {
            components: [
              {
                components: [
                  {
                    internalType: "uint256",
                    name: "id",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint8",
                    name: "decimals",
                    type: "uint8",
                  },
                  {
                    internalType: "address",
                    name: "pair",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "token",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "fee",
                    type: "address",
                  },
                  {
                    internalType: "address",
                    name: "bribe",
                    type: "address",
                  },
                  {
                    internalType: "string",
                    name: "symbol",
                    type: "string",
                  },
                ],
                internalType: "struct veNFTHelper.Reward[]",
                name: "rewards",
                type: "tuple[]",
              },
            ],
            internalType: "struct veNFTHelper.AllPairRewards[]",
            name: "rewards",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "_amounts",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "_offset",
            type: "uint256",
          },
        ],
        name: "getAllNFT",
        outputs: [
          {
            components: [
              {
                internalType: "uint8",
                name: "decimals",
                type: "uint8",
              },
              {
                internalType: "bool",
                name: "voted",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "attachments",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "uint128",
                name: "amount",
                type: "uint128",
              },
              {
                internalType: "uint256",
                name: "voting_amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "rebase_amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "lockEnd",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "vote_ts",
                type: "uint256",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "pair",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "weight",
                    type: "uint256",
                  },
                ],
                internalType: "struct veNFTHelper.PairVote[]",
                name: "votes",
                type: "tuple[]",
              },
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "string",
                name: "tokenSymbol",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "tokenDecimals",
                type: "uint256",
              },
            ],
            internalType: "struct veNFTHelper.veNFT[]",
            name: "_veNFT",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_user",
            type: "address",
          },
        ],
        name: "getNFTFromAddress",
        outputs: [
          {
            components: [
              {
                internalType: "uint8",
                name: "decimals",
                type: "uint8",
              },
              {
                internalType: "bool",
                name: "voted",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "attachments",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "uint128",
                name: "amount",
                type: "uint128",
              },
              {
                internalType: "uint256",
                name: "voting_amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "rebase_amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "lockEnd",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "vote_ts",
                type: "uint256",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "pair",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "weight",
                    type: "uint256",
                  },
                ],
                internalType: "struct veNFTHelper.PairVote[]",
                name: "votes",
                type: "tuple[]",
              },
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "string",
                name: "tokenSymbol",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "tokenDecimals",
                type: "uint256",
              },
            ],
            internalType: "struct veNFTHelper.veNFT[]",
            name: "venft",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
        ],
        name: "getNFTFromId",
        outputs: [
          {
            components: [
              {
                internalType: "uint8",
                name: "decimals",
                type: "uint8",
              },
              {
                internalType: "bool",
                name: "voted",
                type: "bool",
              },
              {
                internalType: "uint256",
                name: "attachments",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "uint128",
                name: "amount",
                type: "uint128",
              },
              {
                internalType: "uint256",
                name: "voting_amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "rebase_amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "lockEnd",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "vote_ts",
                type: "uint256",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "pair",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "weight",
                    type: "uint256",
                  },
                ],
                internalType: "struct veNFTHelper.PairVote[]",
                name: "votes",
                type: "tuple[]",
              },
              {
                internalType: "address",
                name: "account",
                type: "address",
              },
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "string",
                name: "tokenSymbol",
                type: "string",
              },
              {
                internalType: "uint256",
                name: "tokenDecimals",
                type: "uint256",
              },
            ],
            internalType: "struct veNFTHelper.veNFT",
            name: "",
            type: "tuple",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_voter",
            type: "address",
          },
          {
            internalType: "address",
            name: "_rewardDistro",
            type: "address",
          },
          {
            internalType: "address",
            name: "_pairHelper",
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
        name: "owner",
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
        name: "pairHelper",
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
        inputs: [],
        name: "rewardDisitributor",
        outputs: [
          {
            internalType: "contract IRewardsDistributor",
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
            name: "_owner",
            type: "address",
          },
        ],
        name: "setOwner",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_pairFactory",
            type: "address",
          },
        ],
        name: "setPairFactory",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_rewardDistro",
            type: "address",
          },
        ],
        name: "setRewardDistro",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_voter",
            type: "address",
          },
        ],
        name: "setVoter",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_pairInfo",
            type: "address",
          },
        ],
        name: "setpairHelper",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_pair",
            type: "address",
          },
        ],
        name: "singlePairReward",
        outputs: [
          {
            components: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "uint8",
                name: "decimals",
                type: "uint8",
              },
              {
                internalType: "address",
                name: "pair",
                type: "address",
              },
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "address",
                name: "fee",
                type: "address",
              },
              {
                internalType: "address",
                name: "bribe",
                type: "address",
              },
              {
                internalType: "string",
                name: "symbol",
                type: "string",
              },
            ],
            internalType: "struct veNFTHelper.Reward[]",
            name: "_reward",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "underlyingToken",
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
        inputs: [],
        name: "ve",
        outputs: [
          {
            internalType: "contract IVotingEscrow",
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
            internalType: "contract IVoter",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ] as const,
  },
  Oracle: {
    contractAddress: "0x33a2F2d21afbc7E45482c3F8cEEcAB9A589f77Ca",
    abi: [
      {
        inputs: [
          {
            internalType: "contract IPriceSource[]",
            name: "_priceSources",
            type: "address[]",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
      },
      {
        inputs: [],
        name: "UnrecognizedPriceSource",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "contract IPriceSource[]",
            name: "priceSources",
            type: "address[]",
          },
        ],
        name: "SetPriceSources",
        type: "event",
      },
      {
        inputs: [],
        name: "getAllPriceSources",
        outputs: [
          {
            internalType: "contract IPriceSource[]",
            name: "",
            type: "address[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "getAverageValueInETH",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "",
            type: "int256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "getAverageValueInUSD",
        outputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "",
            type: "int256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "contract IPriceSource",
            name: "_pS",
            type: "address",
          },
          {
            internalType: "address",
            name: "_token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "getAverageValueInUSDBySource",
        outputs: [
          {
            internalType: "uint256",
            name: "_avgEXP",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "_avgNormal",
            type: "int256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "contract IPriceSource",
            name: "_pS",
            type: "address",
          },
          {
            internalType: "address",
            name: "_token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_value",
            type: "uint256",
          },
        ],
        name: "getValueInETH",
        outputs: [
          {
            internalType: "uint256",
            name: "_avgEXP",
            type: "uint256",
          },
          {
            internalType: "int256",
            name: "_avgNormal",
            type: "int256",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
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
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "priceSources",
        outputs: [
          {
            internalType: "contract IPriceSource",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "contract IPriceSource[]",
            name: "_priceSources",
            type: "address[]",
          },
        ],
        name: "setPriceSources",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ] as const,
  },
  Faucet: {
    contractAddress: "0xA0beD207C2449e84dc56128B22FdB077C1930495",
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "_impl",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "EnforcedPause",
        type: "error",
      },
      {
        inputs: [],
        name: "ExpectedPause",
        type: "error",
      },
      {
        inputs: [],
        name: "FailedDeployment",
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
        name: "InsufficientDispenserBalance",
        type: "error",
      },
      {
        inputs: [],
        name: "OnlyLegitimateDispenser",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "previousOwner",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "OwnershipTransferred",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "Paused",
        type: "event",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "Unpaused",
        type: "event",
      },
      {
        inputs: [],
        name: "allDispensers",
        outputs: [
          {
            internalType: "address[]",
            name: "",
            type: "address[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_account",
            type: "address",
          },
        ],
        name: "allowToUseAllDispensers",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "dispenser",
            type: "address",
          },
          {
            internalType: "address",
            name: "_account",
            type: "address",
          },
        ],
        name: "allowToUseDispenser",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_account",
            type: "address",
          },
        ],
        name: "blockFromUsingAllDispensers",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "dispenser",
            type: "address",
          },
          {
            internalType: "address",
            name: "_account",
            type: "address",
          },
        ],
        name: "blockFromUsingDispenser",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "_token",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_amount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "_retriever",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "_steps",
            type: "uint256",
          },
        ],
        name: "deployDispenser",
        outputs: [
          {
            internalType: "address",
            name: "dispenser",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "dispensers",
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
        inputs: [],
        name: "implementation",
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
            name: "",
            type: "address",
          },
        ],
        name: "isLegitimateDispenser",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "dispenser",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
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
        inputs: [],
        name: "paused",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [],
        name: "switchPause",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "newOwner",
            type: "address",
          },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
  },
};
