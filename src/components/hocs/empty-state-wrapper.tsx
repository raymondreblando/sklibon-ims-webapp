import type React from "react";
import type { JSX } from "react";
import {
  NoRecord,
  type NoRecordProps,
} from "@/components/layouts/empty-states/no-record";

interface EmptyStateWrapperProps extends NoRecordProps {
  length: number;
  children: React.ReactNode;
  component?: JSX.Element;
}

export const EmptyStateWrapper = ({
  length,
  children,
  component,
  props,
}: EmptyStateWrapperProps) => {
  const EmptyComponent = component || (
    <NoRecord {...props} props={{ className: props?.className }} />
  );

  if (length === 0) return EmptyComponent;

  return children;
};
