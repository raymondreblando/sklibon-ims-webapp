import type React from "react";
import {
  NoRecord,
  type NoRecordProps,
} from "@/components/layouts/empty-states/no-record";

interface EmptyStateWrapperProps extends NoRecordProps {
  length: number;
  children: React.ReactNode;
}

export const EmptyStateWrapper = ({
  length,
  children,
  props,
}: EmptyStateWrapperProps) => {
  if (length === 0)
    return <NoRecord {...props} props={{ className: props?.className }} />;

  return children;
};
