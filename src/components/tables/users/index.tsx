import { getColumns } from "./columns";

import { useUsersQuery } from "@/hooks/queries/use-users-query";

import { DataTable } from "@/components/data-table";
import { CreatePositionDialog } from "@/components/modals";
import { DataTableSkeleton } from "@/components/skeletons";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";

export const PositionTable = () => {
  const { isPending, isError, data, refetch } = useUsersQuery();
  const columns = getColumns();

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
          actionComp={<CreatePositionDialog />}
        />
      )}
    </QueryStatusWrapper>
  );
};
