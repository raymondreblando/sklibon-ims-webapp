import { getColumns } from "./columns";
import type { TableProps } from "@/types";
import type { RequestWithRelation } from "@/types/schema";
import { useRequestsQuery } from "@/hooks/queries/use-requests-query";

import { ButtonLink } from "@/components/buttons";
import { DataTable } from "@/components/data-table";
import { QueryStatusWrapper } from "@/components/hocs";
import { DataTableSkeleton } from "@/components/skeletons";

export const RequestTable = ({ onDelete }: TableProps<RequestWithRelation>) => {
  const { isPending, isError, data, refetch } = useRequestsQuery();
  const columns = getColumns({ onDelete });

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
