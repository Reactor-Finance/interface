import React from "react";

export default function EstimateRow({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">
      <h5 className="text-sm text-neutral-200">{title}</h5>
      <h5 className="text-neutral-100">{value}</h5>
    </div>
  );
}
