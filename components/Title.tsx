import React from "react";
import { cn } from "../lib/utils";

const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "text-displaySM md:text-displayMD lg:text-displayLG",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Title;
