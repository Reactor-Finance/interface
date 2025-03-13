"use client";

import React, { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import copyIcon from "@/assets/copy-icon.svg";
import { useAccount } from "wagmi";
import { zeroAddress } from "viem";

export default function DynamicInputBox({ label }: { label: string }) {
  const [copied, setCopied] = useState(false);
  const { address = zeroAddress } = useAccount();
  // Truncate long values for display
  const formatValue = (input: string) => {
    if (input.length <= 10) return input;
    return `${input.slice(0, 6)}...${input.slice(-5)}`;
  };

  const copyToClipboard = () => {
    if (address.trim() !== "") {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }
  };

  return (
    <div className="relative inline-flex items-center justify-between gap-2 rounded-sm border border-neutral-900 bg-transparent px-4 py-2 h-[34px]">
      {/* Static Label and Dynamic Value */}
      <span className="text-white text-sm opacity-70">{label}:</span>
      <div className="flex items-center gap-2 justify-between w-[130px]">
        <div className="inline-block text-white text-sm tracking-tighter">
          {address ? formatValue(address) : "-"}
        </div>

        {/* Action Icon */}
        {address && (
          <button
            onClick={copyToClipboard}
            className="flex items-center justify-center text-gray-400 hover:text-white w-3 h-3"
            aria-label="Perform action"
            style={{ zIndex: 2 }}
          >
            {copied ? <CheckIcon /> : <Image src={copyIcon} alt="copy" />}
          </button>
        )}
      </div>

      {/* Input Field */}
      {/* <input */}
      {/*   type="text" */}
      {/*   value={address} */}
      {/*   onChange={(e) => setValue(e.target.value)} */}
      {/*   className="absolute top-0 left-0 w-full h-full opacity-0 cursor-text" */}
      {/*   style={{ zIndex: 1 }} */}
      {/* /> */}
    </div>
  );
}
