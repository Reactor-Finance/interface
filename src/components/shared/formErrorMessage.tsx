import React from "react";

export default function FormErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <h4 className="text-[13px] text-red-400 pt-1 text-center w-full ">
        {children}
      </h4>
    </div>
  );
}
