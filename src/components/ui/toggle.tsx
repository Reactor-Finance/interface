import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

export interface ToggleProps
  extends React.HTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof toggleVariants> {
  label?: string;
}

const toggleVariants = cva(
  "relative w-10 h-6 rounded-full \
  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full  \
  after:absolute after:top-[4px] after:start-[4px] after:rounded-full  \
  after:h-4 after:w-4 after:transition-all",
  {
    variants: {
      isDisabled: {
        true: "bg-gray-700 peer-checked:bg-primary-200 after:bg-gray-500 peer-checked:after:bg-primary-400",
        false:
          "bg-gray-600 peer-checked:bg-primary-400 peer-checked:hover:bg-primary-900 \
        peer-focus:outline-none after:bg-white peer-checked:peer-focus:bg-primary-900 peer-focus:ring-2  \
        peer-focus:ring-primary-400 peer-focus:ring-offset-2 peer-focus:ring-offset-black",
      },
    },
    defaultVariants: {
      isDisabled: false,
    },
  }
);

const Toggle = React.forwardRef<HTMLLabelElement, ToggleProps>(
  ({ className, label, isDisabled, ...props }, ref) => (
    <label className="inline-flex items-center cursor-pointer" ref={ref}>
      <input
        type="checkbox"
        value=""
        className="sr-only peer inline"
        disabled={!!isDisabled}
      />
      {label && (
        <span
          className={cn(
            "font-inter font-medium text-sm leading-5 tracking-normal mr-[8px] text-white",
            className
          )}
          {...props}
        >
          {label}
        </span>
      )}
      <div className={toggleVariants({ isDisabled })}></div>
    </label>
  )
);
Toggle.displayName = "Toggle";

export default Toggle;
