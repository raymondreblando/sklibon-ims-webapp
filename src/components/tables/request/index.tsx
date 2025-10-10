import { getColumns } from "./columns";
import type { UseQueryResult } from "@tanstack/react-query";

import type { ApiResponse } from "@/types";
import type { RequestWithRelation } from "@/types/schema";
import type {
  UpdateRequestStatusField,
  UpdateRequestStatusWithReasonField,
} from "@/lib/schemas/request";

import { ButtonLink } from "@/components/buttons";
import { DataTable } from "@/components/data-table";
import { QueryStatusWrapper } from "@/components/hocs";
import { DataTableSkeleton } from "@/components/skeletons";

export interface RequestTableProps {
  type: "request" | "for-approval";
  queryResult: UseQueryResult<ApiResponse<RequestWithRelation[]>, Error>;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    data: UpdateRequestStatusField,
    message: string,
  ) => void;
  onUpdateWithReason: (data: UpdateRequestStatusWithReasonField) => void;
  onViewReason: (reason: string) => void;
}

export const RequestTable = ({
  type,
  queryResult,
  onDelete,
  onUpdate,
  onUpdateWithReason,
  onViewReason,
}: RequestTableProps) => {
  const columns = getColumns({
    type,
    onDelete,
    onUpdate,
    onUpdateWithReason,
    onViewReason,
  });

  return (
    <QueryStatusWrapper
      isPending={queryResult.isPending}
      isError={queryResult.isError}
      loadingComp={<DataTableSkeleton columnLength={columns.length} />}
      onRetry={queryResult.refetch}
    >
      {queryResult.data && (
        <DataTable
          data={queryResult.data.data}
          columns={columns}
          actionComp={
            type === "request" ? (
              <>
                <ButtonLink
                  to="/requests/for-approval"
                  className="bg-background-muted text-foreground hover:bg-background-muted/10 border"
                >
                  For Approval
                </ButtonLink>
                <ButtonLink to="/requests/add">Add Request</ButtonLink>
              </>
            ) : (
              <ButtonLink to="/requests">My Request</ButtonLink>
            )
          }
        />
      )}
    </QueryStatusWrapper>
  );
};
