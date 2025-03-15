import React from "react";
import { TPointsEntry } from "./pointsTable";

export default function PointsRow({
  address,
  referralPoints,
  tradePoints,
  referralId,
  lpPoints,
  totalPoints,
  rank,
}: TPointsEntry) {
  const boost = false;
  return (
    <tr className="border-b border-gray-800 grid grid-cols-3 lg:grid-cols-8 w-full">
      <td className="py-3 text-white">{rank}</td>
      <td className="py-3 flex items-center space-x-2">
        {/* <img */}
        {/*   src="https://i.ibb.co/0pDryFGv/image.png" */}
        {/*   alt="avatar" */}
        {/*   className="w-6 h-6 rounded-full object-cover" */}
        {/* /> */}
        <span className="text-white">{shortenAddress(address)}</span>
      </td>
      <td className="py-3 text-[#BBBBBB] hidden lg:block">{referralId}</td>
      <td className="py-3 text-[#BBBBBB] hidden lg:block">{referralPoints}</td>
      <td className="py-3 text-[#BBBBBB] hidden lg:block">{tradePoints}</td>
      <td className="py-3 text-[#BBBBBB] hidden lg:block">{lpPoints}</td>
      {boost ? (
        <td className="py-3 px-6 hidden lg:block text-[#836EF9]">x2.5</td>
      ) : (
        <td className="py-3 px-6 hidden lg:block">x1</td>
      )}
      <td className="py-3 text-[#BBBBBB]">{totalPoints}</td>
    </tr>
  );
}
function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-3)}`;
}
