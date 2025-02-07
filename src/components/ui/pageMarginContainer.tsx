import React from "react";

export default function PageMarginContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto px-6 pt-16 xl:w-[1200px] 2xl:w-[1400px]">
      {children}
    </div>
  );
}
