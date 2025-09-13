import type React from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { cn } from "@/lib/utils/utils";

interface RedirectLinkProps {
  children: React.ReactNode;
  message?: string;
  linkProps?: LinkProps;
}

export const RedirectLink = ({
  message,
  children,
  linkProps,
}: RedirectLinkProps) => {
  return (
    <p className="text-muted text-center text-sm font-medium md:text-base">
      {message && <span>{`${message} `}</span>}
      <Link
        className={cn("text-primary font-semibold underline")}
        {...linkProps}
      >
        {children}
      </Link>
    </p>
  );
};
