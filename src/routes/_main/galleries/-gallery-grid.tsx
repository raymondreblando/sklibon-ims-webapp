import { useCallback } from "react";
import type { Table } from "@tanstack/react-table";
import type { GalleryWithRelation } from "@/types/schema";

import { getAuthUser } from "@/lib/utils/auth";
import { useModal } from "@/contexts/modal-context";
import { useDeleteGalleryMutation } from "@/hooks/mutations/use-gallery-mutations";

import { EmptyStateWrapper, QueryStatusWrapper } from "@/components/hocs";
import { GalleryCard } from "@/components/cards";
import { ConfirmationDialog } from "@/components/modals";
import { GalleryCardSkeleton } from "@/components/skeletons";

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
  const deleteGallery = useDeleteGalleryMutation();
  const { show } = useModal();

  const onDelete = useCallback(
    (id: string) => {
      show(
        <ConfirmationDialog
          onConfirm={() => deleteGallery.mutate(id)}
          isConfirming={deleteGallery.isPending}
          message="Are you sure you want to delete this gallery?"
        />,
      );
    },
    [deleteGallery, show],
  );

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
