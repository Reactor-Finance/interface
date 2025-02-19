"use client";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useEthSwap } from "./useEthSwap";
import { TAddress } from "@/lib/types";
import { useWethDeposit } from "./useWeth";
import { parseUnits } from "viem";
import { Contracts } from "@/lib/contracts";

export default function Page() {
  const [formData, setFormData] = useState({ token: "", deposit: "" });
  const { writeContract, reset, data: hash } = useWriteContract();
  const { isSuccess } = useWaitForTransactionReceipt({ hash });
  useEffect(() => {
    if (isSuccess) {
      setFormData({ token: "", deposit: "" });
      reset();
    }
  }, [isSuccess, reset]);
  const { data } = useEthSwap({
    deposit: formData.deposit,
    token: formData.token as TAddress,
  });
  const onSubmit = () => {
    if (data?.request) {
      writeContract(data?.request);
    }
  };
  const { address } = useAccount();
  const { data: mintRct } = useSimulateContract({
    ...Contracts.Reactor,
    functionName: "mintRct",
    args: [address ?? "0x", parseUnits("1000", 18)],
  });
  const { data: getWeth } = useWethDeposit({ amount: parseUnits("1", 18) });
  const onSubmit2 = () => {
    if (getWeth?.request) writeContract(getWeth?.request);
  };
  const onSubmit3 = () => {
    if (mintRct?.request) writeContract(mintRct?.request);
  };
  return (
    <div className="flex justify-center">
      <div className="p-4 border rounded shadow-md w-80">
        <div className="mb-4">
          <label className="block text-sm font-medium">Token</label>
          <input
            type="text"
            name="token"
            value={formData.token}
            onChange={(e) => {
              setFormData((d) => {
                return { ...d, token: e.target.value };
              });
            }}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">deposit</label>
          <input
            type="deposit"
            name="deposit"
            value={formData.deposit}
            onChange={(e) => {
              setFormData((d) => {
                return { ...d, deposit: e.target.value };
              });
            }}
            className="w-full p-2 border rounded text-black"
          />
        </div>
        <button
          onClick={onSubmit}
          disabled={!Boolean(data?.request)}
          type="button"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 "
        >
          Submit
        </button>
        <button onClick={onSubmit2}>Get WETH</button>
        <button onClick={onSubmit3}>Get RCT</button>
      </div>
    </div>
  );
}
