import React, { cloneElement, isValidElement } from "react";
import type { PropsWithChildren } from "react";
import type { QueryErrorProps } from "../layouts/error-states/query-error";

interface QueryStatusWrapperProps extends PropsWithChildren {
  isPending: boolean;
  isError: boolean;
  loadingComp: React.ReactNode;
  errorComp: React.ReactElement<QueryErrorProps>;
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

  if (isError) {
    if (isValidElement(errorComp)) {
      return cloneElement(errorComp, { onRetry });
    }
    return errorComp;
  }

  return children;
};
