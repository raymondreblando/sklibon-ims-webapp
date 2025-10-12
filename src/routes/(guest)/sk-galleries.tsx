import { GalleryCard } from "@/components/cards";
import { HeadingWithWrapper } from "@/components/headings";
import { QueryStatusWrapper } from "@/components/hocs";
import { AuthWrapper, RedirectLink } from "@/components/layouts/auth";
import { GalleryCardSkeleton } from "@/components/skeletons";
import { useGalleriesQuery } from "@/hooks/queries/use-galleries-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(guest)/sk-galleries")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, isError, data, refetch } = useGalleriesQuery();

  return (
    <AuthWrapper className="w-[min(100%,800px)]">
      <HeadingWithWrapper
        heading="SK Federation Gallery"
        subheading="Relive the moments from our events and programs."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <QueryStatusWrapper
          isPending={isPending}
          isError={isError}
          loadingComp={<GalleryCardSkeleton count={4} />}
          onRetry={refetch}
        >
          {data &&
            data.data.map((gallery) => (
              <GalleryCard
                key={gallery.id}
                id={gallery.id}
                title={gallery.title}
                dateCreated={gallery.createdAt}
                uploader={{
                  firstname: gallery.uploader.info.firstname,
                  position: gallery.uploader.info.position.name,
                  profile: gallery.uploader.profile,
                }}
                onDelete={() => {}}
                images={gallery.images}
                hasAction={false}
              />
            ))}
        </QueryStatusWrapper>
      </div>
      <RedirectLink linkProps={{ to: "/login" }}>Go to login page</RedirectLink>
    </AuthWrapper>
  );
}
