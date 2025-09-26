import { getColumns } from "./columns";
import { useRequestsQuery } from "@/hooks/queries/use-requests-query";

import type {
  UpdateRequestStatusField,
  UpdateRequestStatusWithReasonField,
} from "@/lib/schemas/request";

import { ButtonLink } from "@/components/buttons";
import { DataTable } from "@/components/data-table";
import { QueryStatusWrapper } from "@/components/hocs";
import { DataTableSkeleton } from "@/components/skeletons";

interface RequestTableProps {
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
  onDelete,
  onUpdate,
  onUpdateWithReason,
  onViewReason,
}: RequestTableProps) => {
  const { isPending, isError, data, refetch } = useRequestsQuery();
  const columns = getColumns({ onDelete, onUpdate, onUpdateWithReason, onViewReason });

  return (
    <QueryStatusWrapper
      isPending={isPending}
      isError={isError}
      loadingComp={<DataTableSkeleton columnLength={columns.length} />}
      onRetry={refetch}
    >
      {data && (
        <DataTable
          data={data.data}
          columns={columns}
          actionComp={<ButtonLink to="/requests/add">Add Request</ButtonLink>}
        />
      )}
    </QueryStatusWrapper>
  );
};
