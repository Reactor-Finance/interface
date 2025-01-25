import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";

const alertVariants = cva(
  `relative w-full rounded-lg p-4 [&>svg~*]:pl-7 
   [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground`,
  {
    variants: {
      colors: {
        yellow: "bg-yellow/15 text-yellow",
        error: "bg-error-400/15 text-error-400",
        success: "bg-success-400/15 text-success-400",
      },
    },
    defaultVariants: {
      colors: "yellow",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, children, colors, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ colors }), className)}
    {...props}
  >
    <div className="flex gap-x-2">
      <div className="pt-[3px]">
        <CircleAlert className={` w-5 h-5`} />
      </div>
      <div>{children}</div>
    </div>
  </div>
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
