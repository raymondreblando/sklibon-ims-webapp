import type React from "react";

export const FormSubheading = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-muted text-xs md:text-sm">{children}</p>;
};
