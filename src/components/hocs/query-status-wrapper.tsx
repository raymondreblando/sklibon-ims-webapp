import React from "react";
import type { PropsWithChildren } from "react";
import { QueryError } from "@/components/layouts/error-states";

interface QueryStatusWrapperProps extends PropsWithChildren {
  isPending: boolean;
  isError: boolean;
  loadingComp: React.ReactNode;
  onRetry?: () => void;
}

export const QueryStatusWrapper = ({
  isPending,
  isError,
  loadingComp,
  children,
  onRetry,
}: QueryStatusWrapperProps) => {
  if (isPending) {
    return loadingComp;
  }

  if (isError) {
    return <QueryError onRetry={onRetry} />;
  }

  return children;
};
