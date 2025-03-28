import React from "react";
import { TPointsEntry } from "./pointsTable";
import DisplayFormattedNumber from "@/components/shared/displayFormattedNumber";
import { formatNumber } from "@/lib/utils";

export default function PointsRow({
  address,
  referralPoints,
  tradePoints,
  referrals,
  lpPoints,
  totalPoints,
  rank,
}: TPointsEntry) {
  console.log(formatNumber(lpPoints), "====----+++======= LP POINTS");
  const boost = false;
  return (
    <tr className=" grid grid-cols-4 lg:grid-cols-8 w-full">
      <td className="py-3 text-white">{rank}</td>
      <td className="py-3 flex items-center col-span-2 md:col-span-1 space-x-2">
        <span className="text-white col-span-2 lg:col-span-1">
          {shortenAddress(address)}
        </span>
      </td>
      <td className="py-3 text-[#BBBBBB] hidden lg:block">{referrals}</td>
      <td className="py-3 text-[#BBBBBB] hidden lg:block">
        <DisplayFormattedNumber num={formatNumber(referralPoints)} />
      </td>
      <td className="py-3 text-[#BBBBBB] hidden lg:block">
        <DisplayFormattedNumber num={formatNumber(tradePoints)} />
      </td>
      <td className="py-3 text-[#BBBBBB] hidden lg:block">
        <DisplayFormattedNumber num={formatNumber(lpPoints)} />
      </td>
      {boost ? (
        <td className="py-3 px-6 hidden lg:block text-[#836EF9]">x2.5</td>
      ) : (
        <td className="py-3 px-6 hidden lg:block">x1</td>
      )}
      <td className="py-3 text-[#BBBBBB]">
        <DisplayFormattedNumber formatNum num={totalPoints} />
      </td>
    </tr>
  );
}
function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-3)}`;
}
