import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@omnia/lib";

const buttonVariants = cva(
  "inline-flex h-10 items-center justify-center rounded-md border border-transparent px-4 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    defaultVariants: {
      size: "default",
      variant: "primary",
    },
    variants: {
      size: {
        default: "h-10 px-4",
        sm: "h-8 px-3 text-xs",
      },
      variant: {
        primary: "bg-neutral-950 text-white hover:bg-neutral-800 focus-visible:outline-neutral-950",
        secondary:
          "border-neutral-200 bg-white text-neutral-950 hover:bg-neutral-50 focus-visible:outline-neutral-400",
      },
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ size, variant }), className)} {...props} />
  ),
);

Button.displayName = "Button";
