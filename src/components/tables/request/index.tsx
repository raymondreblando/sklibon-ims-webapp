import { getColumns } from "./columns";
import { useRequestsQuery } from "@/hooks/queries/use-requests-query";

import { ButtonLink } from "@/components/buttons";
import { DataTable } from "@/components/data-table";
import { QueryStatusWrapper } from "@/components/hocs";
import { DataTableSkeleton } from "@/components/skeletons";
import type { UpdateRequestStatusField } from "@/lib/schemas/request";

interface RequestTableProps {
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    data: UpdateRequestStatusField,
    message: string,
  ) => void;
}

export const RequestTable = ({ onDelete, onUpdate }: RequestTableProps) => {
  const { isPending, isError, data, refetch } = useRequestsQuery();
  const columns = getColumns({ onDelete, onUpdate });

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
