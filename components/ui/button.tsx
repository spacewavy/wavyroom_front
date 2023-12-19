import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import RightArrowOrange from "@/assets/icons/RightArrowOrange.svg";
import { cn } from "@/lib/utils";
import Image from "next/image";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-xs font-normal h-[34px] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-black text-white",
        outline: "bg-white text-black border border-black",
        secondary: "bg-gray text-black",
        ghost: "bg-white text-black",
        ghostOrange: "bg-white text-orange",
        lightGray: "bg-lightGray text-black",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-black underline-offset-4 hover:underline",
        underline: "text-black underline-offset-4 underline",
        white: "bg-white text-black",
      },
      size: {
        default: "px-4 py-2 rounded-3xl text-xs",
        sm: "rounded-md px-3 text-xs",
        lg: "rounded-md px-8 text-xl",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

interface CustomButtomProps extends ButtonProps {
  withArrow?: boolean;
}

const GhostOrangeButton = ({
  name,
  withIcon = false,
}: {
  name: string;
  withIcon?: boolean;
}) => (
  <Button variant="ghostOrange">
    {name}
    {withIcon && <Image src={RightArrowOrange} alt="ghost-orange" />}
  </Button>
);

export { Button, buttonVariants, GhostOrangeButton };
