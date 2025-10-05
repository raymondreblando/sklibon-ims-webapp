import { useGalleryImagesSuspenseQuery } from "@/hooks/queries/use-galleries-query";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export const GallerySlider = () => {
  const { data } = useGalleryImagesSuspenseQuery();

  return (
    <div className="relative w-full px-4">
      <Carousel>
        <CarouselContent className="-ml-4">
          {data &&
            data.data.map((image) => (
              <CarouselItem key={image.id} className="pl-4 md:basis-1/3">
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <img
                    src={image.imageUrl}
                    alt="gallery image"
                    className="pointer-events-none h-full w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
