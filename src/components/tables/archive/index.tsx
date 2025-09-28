import { getColumns, data } from "./columns";

import { useContactsQuery } from "@/hooks/queries/use-contacts-query";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/skeletons";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";

interface ArchiveTableProps {
  onUpdate: (id: string) => void;
}

export const ArchiveTable = ({ onUpdate }: ArchiveTableProps) => {
  const { isPending, isError, refetch } = useContactsQuery();
  const columns = getColumns({ onUpdate });

  return (
    <QueryStatusWrapper
      isPending={isPending}
      isError={isError}
      loadingComp={<DataTableSkeleton columnLength={columns.length} />}
      onRetry={refetch}
    >
      {data && <DataTable data={data} columns={columns} />}
    </QueryStatusWrapper>
  );
};
