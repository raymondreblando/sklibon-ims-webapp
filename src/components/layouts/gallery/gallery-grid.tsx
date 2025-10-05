import type { Table } from "@tanstack/react-table";
import type { GalleryWithRelation } from "@/types/schema";

import { getAuthUser } from "@/lib/utils/auth";

import { EmptyStateWrapper, QueryStatusWrapper } from "@/components/hocs";
import { GalleryCard } from "@/components/cards";
import { GalleryCardSkeleton } from "@/components/skeletons";
import { useGalleryActions } from "./hooks/use-gallery-actions";

interface GalleryGridProps {
  isPending: boolean;
  isError: boolean;
  onRetry: () => void;
  table: Table<GalleryWithRelation>;
}

export const GalleryGrid = ({
  isPending,
  isError,
  onRetry,
  table,
}: GalleryGridProps) => {
  const user = getAuthUser();
  const { onDelete } = useGalleryActions();

  return (
    <div className="grid gap-4 px-6 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <QueryStatusWrapper
        isPending={isPending}
        isError={isError}
        loadingComp={<GalleryCardSkeleton count={10} />}
        onRetry={onRetry}
      >
        <EmptyStateWrapper
          length={table.getRowModel().rows.length}
          props={{
            className:
              "min-h-[240px] md:col-span-2 lg:col-span-3 xl:col-span-5 border-b border-input",
          }}
        >
          {table.getRowModel().rows.map((row) => (
            <GalleryCard
              key={row.original.id}
              id={row.original.id}
              title={row.original.title}
              dateCreated={row.original.createdAt}
              uploader={{
                firstname: row.original.uploader.info.firstname,
                position: row.original.uploader.info.position.name,
                profile: row.original.uploader.profile,
              }}
              onDelete={onDelete}
              images={row.original.images}
              hasAction={row.original.uploader.id === user?.id}
            />
          ))}
        </EmptyStateWrapper>
      </QueryStatusWrapper>
    </div>
  );
};
