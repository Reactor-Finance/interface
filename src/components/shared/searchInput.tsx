"use client";
import { Search, X } from "lucide-react";
import React, { useState } from "react";
interface Props {
  value: string;
  setValue?: (s: string) => void;
}
export default function SearchInput({ value, setValue }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      data-focused={isFocused ? "focused" : "not-focused"}
      className="flex gap-x-3 bg-neutral-900 rounded-md p-2 outline-1  data-[focused=focused]:outline data-[focused=focused]:outline-white"
    >
      <Search className="text-gray-400 h-5 w-5" />
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type="text"
        onChange={(e) => setValue?.(e.target.value)}
        value={value}
        className="w-full placeholder:text-sm bg-transparent font-geistMono placeholder:text-neutral-500 focus:outline-none"
        placeholder="Search by name or symbol"
      />
      {value !== "" && (
        <button onClick={() => setValue?.("")}>
          <X className="text-gray-400" />
        </button>
      )}
    </div>
  );
}
