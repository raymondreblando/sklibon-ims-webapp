import { getColumns } from "./columns";
import type { TableProps } from "@/types";
import type { ContactWithRelation } from "@/types/schema";

import { useContactsQuery } from "@/hooks/queries/use-contacts-query";

import { DataTable } from "@/components/data-table";
import { CreateContactDialog } from "@/components/modals";
import { DataTableSkeleton } from "@/components/skeletons";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";
import { QueryError } from "@/components/layouts/error-states";

export const ContactTable = ({
  onUpdate,
  onDelete,
}: TableProps<ContactWithRelation>) => {
  const { isPending, isError, data, refetch } = useContactsQuery();
  const columns = getColumns({ onUpdate, onDelete });

  return (
    <QueryStatusWrapper
      isPending={isPending}
      isError={isError}
      loadingComp={<DataTableSkeleton columnLength={columns.length} />}
      errorComp={<QueryError />}
      onRetry={refetch}
    >
      {data && (
        <DataTable
          data={data.data}
          columns={columns}
          actionComp={<CreateContactDialog />}
        />
      )}
    </QueryStatusWrapper>
  );
};
