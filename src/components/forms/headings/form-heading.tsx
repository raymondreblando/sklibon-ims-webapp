import type React from "react";

export const FormHeading = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="text-sm font-semibold md:text-base">{children}</h3>;
};
