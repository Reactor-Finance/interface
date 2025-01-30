import { cn } from "@/lib/utils";
export { Input };
import React from "react";
import { cva, VariantProps } from "class-variance-authority";

const inputVariants = cva(
  `flex h-10 w-full rounded-md border border-input bg-background
   px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent
   file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground
   focus-visible:outline-none   disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
  {
    variants: {
      ring: {
        none: "",
        ringOne: `focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2`,
      },
    },
    defaultVariants: {
      ring: "ringOne",
    },
  }
);

interface InputProps
  extends React.ComponentProps<"input">,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ring, ...props }, ref) => {
    return (
      <input
        type="text"
        className={cn(inputVariants({ ring }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
