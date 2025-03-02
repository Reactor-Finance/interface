import React from "react";

import { cva, VariantProps } from "class-variance-authority";

const spinnerVariants = cva("spinner", {
  variants: {
    size: {
      small: "h-3 w-3",
      medium: "h-5 w-5",
      large: "h-7 w-7",
    },
    color: {
      primary: "border-r-primary-200",
      neutral100: "border-r-neutral-100",
      neutral200: "border-r-neutral-200",
    },
    track: {
      neutral400: "border-neutral-400",
      neutral500: "border-neutral-500",
      neutral600: "border-neutral-600",
      white: "border-white",
    },
  },
  defaultVariants: {
    size: "medium",
    color: "primary",
    track: "neutral600",
  },
});

export default function Spinner({
  size,
  track,
  color,
}: VariantProps<typeof spinnerVariants>) {
  return <div className={spinnerVariants({ size, track, color })}></div>;
}
