import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { useFindGalleryQuery } from "@/hooks/queries/use-galleries-query";

import Carousel, { type SlideData } from "@/components/ui/carousel-2";
import { XIcon } from "lucide-react";
import { router } from "@/lib/router";

export const Route = createFileRoute("/gallery/$galleryId/view")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isPending } = useFindGalleryQuery(Route.useParams().galleryId);

  const slideData = useMemo(() => {
    return data?.images.map((image) => {
      return { title: data.title, src: image.imageUrl } as SlideData;
    });
  }, [data]);

  return (
    <div className="bg-foreground relative min-h-screen">
      <XIcon
        onClick={() => router.history.back()}
        className="absolute top-8 left-8 z-50 size-8 cursor-pointer text-white"
      />
      {isPending ? (
        <div className="flex min-h-screen items-center justify-center font-semibold text-white">
          Loading Gallery Images...
        </div>
      ) : (
        <div className="relative min-h-screen w-full overflow-hidden py-20">
          <Carousel slides={slideData as SlideData[]} />
        </div>
      )}
    </div>
  );
}
