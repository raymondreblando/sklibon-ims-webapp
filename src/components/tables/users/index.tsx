import { getColumns } from "./columns";

import { useUsersQuery } from "@/hooks/queries/use-users-query";

import { ButtonLink } from "@/components/buttons";
import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/skeletons";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";

export const UserTable = () => {
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
          actionComp={<ButtonLink to="/users/add">Add User</ButtonLink>}
        />
      )}
    </QueryStatusWrapper>
  );
};
