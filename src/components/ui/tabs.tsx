"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { VariantProps } from "@nextui-org/react";
import { cva } from "class-variance-authority";

const Tabs = TabsPrimitive.Root;
// Define the `cva` function for styling variants
const tabsListVariants = cva(
  " items-center justify-center bg-transparent rounded-md text-muted-foreground", // Base styles
  {
    variants: {
      size: {
        sm: "",
        md: "",
      },
      border: {
        none: "",
        "border-1": "border border-neutral-800",
      },
      colors: {
        transparent: "",
        muted: "bg-neutral-950",
      },
      display: {
        grow: "flex",
        default: "inline-flex",
      },
    },
    defaultVariants: {
      size: "md",
      display: "default",
    },
  }
);
interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, size, display, colors, border, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      tabsListVariants({ size, colors, border, display, className })
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const tabsTriggerVariants = cva(
  `inline-flex items-center  justify-center whitespace-nowrap rounded-sm px-3
    py-1.5 text-sm font-medium ring-offset-background transition-all
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
    focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
     data-[state=active]:shadow-sm`,
  {
    variants: {
      display: {
        grow: "flex-grow",
        default: "",
      },
      colors: {
        primary:
          "data-[state=active]:bg-primary-400 data-[state=active]:text-white text-neutral-300",
        white: "data-[state=active]:text-white text-neutral-400",
      },
      border: {
        none: "",
        "primary-1":
          "border-b rounded-none border-neutral-900 data-[state=active]:border-primary-400",
      },
    },
    defaultVariants: {
      display: "default",
      colors: "primary",
      border: "none",
    },
  }
);
interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, display, colors, border, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      tabsTriggerVariants({
        display,
        colors,
        border,
        className,
      })
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
