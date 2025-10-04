import { getColumns } from "./columns";

import { useUsersQuery } from "@/hooks/queries/use-users-query";
import { useUserTableAction } from "./hooks/use-user-table-action";

import { ButtonLink } from "@/components/buttons";
import { DataTable } from "@/components/data-table";
import { WithRoleGuard } from "@/components/hocs";
import { DataTableSkeleton } from "@/components/skeletons";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";

export const UserTable = () => {
  const { onDelete, onUpdate } = useUserTableAction();
  const { isPending, isError, data, refetch } = useUsersQuery();
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
          actionComp={
            <WithRoleGuard allowed={["Super Admin", "Admin"]}>
              <ButtonLink to="/users/add">Add User</ButtonLink>
            </WithRoleGuard>
          }
        />
      )}
    </QueryStatusWrapper>
  );
};
