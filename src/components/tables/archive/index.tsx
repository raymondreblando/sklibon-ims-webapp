import { getColumns } from "./columns";

import { useArchivesQuery } from "@/hooks/queries/use-archives-query";

import { DataTable } from "@/components/data-table";
import { DataTableSkeleton } from "@/components/skeletons";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";

interface ArchiveTableProps {
  onDelete: (id: string) => void;
}

export const ArchiveTable = ({ onDelete }: ArchiveTableProps) => {
  const { data, isPending, isError, refetch } = useArchivesQuery();
  const columns = getColumns({ onDelete });

  return (
    <QueryStatusWrapper
      isPending={isPending}
      isError={isError}
      loadingComp={<DataTableSkeleton columnLength={columns.length} />}
      onRetry={refetch}
    >
      {data && <DataTable data={data.data} columns={columns} />}
    </QueryStatusWrapper>
  );
};
