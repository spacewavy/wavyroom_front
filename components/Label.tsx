import React from "react";

const Label = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="text-orange text-labelSM md:text-labelMD lg:text-labelLG">
      {children}
    </div>
  );
};

export default Label;
