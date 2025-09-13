import { getColumns } from "./columns";
import type { TableProps } from "@/types";
import type { Position } from "@/types/schema";

import { useRequestTpesQuery } from "@/hooks/queries/use-request-types-query";

import { DataTable } from "@/components/data-table";
import { CreateRequestTypeDialog } from "@/components/modals";
import { DataTableSkeleton } from "@/components/skeletons";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";

export const RequestTypeTable = ({
  onUpdate,
  onDelete,
}: TableProps<Position>) => {
  const { isPending, isError, data, refetch } = useRequestTpesQuery();
  const columns = getColumns({ onUpdate, onDelete });

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
          actionComp={<CreateRequestTypeDialog />}
        />
      )}
    </QueryStatusWrapper>
  );
};
