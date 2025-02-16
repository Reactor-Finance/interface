import React from "react";
import swap from "@/assets/swap.svg";
import Image from "next/image";
import { forwardRef } from "react";

const SwapIconBorder = forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`w-full flex items-center py-8 ${className}`}
      {...props}
    >
      <div className="flex-grow h-[2px] bg-neutral-950"></div>
      <div className="bg-neutral-950 p-2 rounded-md">
        <Image src={swap} alt="swap" width={18} height={18} />
      </div>
      <div className="flex-grow h-[2px] bg-neutral-950"></div>
    </div>
  );
});

SwapIconBorder.displayName = "SwapIconBorder";

export default SwapIconBorder;
// export default function SwapIconBorder() {
//   return (
//     <div className="w-full  flex items-center py-8">
//       <div className="flex-grow h-[2px] bg-neutral-950"></div>
//       <div className="bg-neutral-950 p-2 rounded-md">
//         <Image src={swap} alt="swap" width={18} height={18} />
//       </div>
//       <div className="flex-grow h-[2px] bg-neutral-950"></div>
//     </div>
//   );
// }
