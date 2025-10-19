import React from "react";
import type { PropsWithChildren } from "react";
import { QueryError } from "@/components/layouts/error-states";

interface QueryStatusWrapperProps extends PropsWithChildren {
  isPending: boolean;
  isError: boolean;
  loadingComp: React.ReactNode;
  errorComp?: React.ReactNode;
  onRetry?: () => void;
}

export const QueryStatusWrapper = ({
  isPending,
  isError,
  loadingComp,
  errorComp,
  children,
  onRetry,
}: QueryStatusWrapperProps) => {
  if (isPending) {
    return loadingComp;
  }

  const ErrorComponent = errorComp || <QueryError onRetry={onRetry} />;

  if (isError) {
    return ErrorComponent;
  }

  return children;
};
