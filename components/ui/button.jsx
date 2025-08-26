import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg transition-all disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed shrink-0 outline-none focus-visible:border-ring aria-invalid:border-destructive cursor-pointer active:scale-[0.9] [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border-2 border-primary bg-transparent shadow-xs hover:bg-primary hover:text-primary-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "bg-background text-background-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 py-2 [&_svg:not([class*='size-'])]:size-7",
        sm: "h-8 px-2 py-1 rounded-sm gap-1.5 text-base [&_svg:not([class*='size-'])]:size-5",
        lg: "h-12 rounded-md px-6",
        icon: "size-9",
        responsive:
          // 📱 Mobile first (small = sm variant)
          "h-8 px-2 py-1 rounded-sm gap-1.5 text-base [&_svg:not([class*='size-'])]:size-5 " +
          // 💻 md+ screens (default variant)
          "md:h-11 md:px-4 md:py-2 md:[&_svg:not([class*='size-'])]:size-7 md:gap-2 md:rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
