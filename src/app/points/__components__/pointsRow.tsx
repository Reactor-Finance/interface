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
    <tr className="border-b border-gray-800">
      <td className="py-3 text-white">{rank}</td>
      <td className="py-3 flex items-center space-x-2">
        {/* <img */}
        {/*   src="https://i.ibb.co/0pDryFGv/image.png" */}
        {/*   alt="avatar" */}
        {/*   className="w-6 h-6 rounded-full object-cover" */}
        {/* /> */}
        <span className="text-white">{address}</span>
      </td>
      <td className="py-3 text-[#BBBBBB]">{referralId}</td>
      <td className="py-3 text-[#BBBBBB]">{referralPoints}</td>
      <td className="py-3 text-[#BBBBBB]">{tradePoints}</td>
      <td className="py-3 text-[#BBBBBB]">{lpPoints}</td>
      {boost ? (
        <td className="py-3 px-6 text-[#836EF9]">x2.5</td>
      ) : (
        <td className="py-3 px-6 ">x1</td>
      )}
      <td className="py-3 text-[#BBBBBB]">{totalPoints}</td>
    </tr>
  );
}
