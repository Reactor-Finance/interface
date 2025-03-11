import React from "react";

export default function PointsRow() {
  return (
    <tr className="border-b border-gray-800">
      <td className="py-3 text-white">#1</td>
      <td className="py-3 flex items-center space-x-2">
        {/* <img */}
        {/*   src="https://i.ibb.co/0pDryFGv/image.png" */}
        {/*   alt="avatar" */}
        {/*   className="w-6 h-6 rounded-full object-cover" */}
        {/* /> */}
        <span className="text-white">You</span>
      </td>
      <td className="py-3 text-[#BBBBBB]">1,025</td>
      <td className="py-3 text-[#BBBBBB]">190,000,000</td>
      <td className="py-3 text-[#BBBBBB]">190,000,000</td>
      <td className="py-3 text-[#BBBBBB]">190,000,000</td>
      <td className="py-3 px-6 text-[#836EF9]">x2.5</td>
      <td className="py-3 text-[#BBBBBB]">190,000,000</td>
    </tr>
  );
}
