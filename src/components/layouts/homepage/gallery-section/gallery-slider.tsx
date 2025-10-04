import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export const GallerySlider = () => {
  return (
    <div className="relative w-full px-4">
      <Carousel>
        <CarouselContent className="-ml-4">
          <CarouselItem className="pl-4 md:basis-1/3">
            <div className="flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800">
              <img
                src="https://ik.imagekit.io/mhkbf5beo/sklibon-ims/galleries/7cc8c070-3300-4f9c-802c-147576c12cd2-pexels-pixabay-248547.jpg?updatedAt=1758377294960"
                alt="gallery image"
                className="pointer-events-none h-full w-full object-cover"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="pl-4 md:basis-1/3">
            <div className="flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800">
              <img
                src="https://ik.imagekit.io/mhkbf5beo/sklibon-ims/galleries/b425faaf-a3be-4d14-aa5e-758f7b8c7f31-2020_08_12_102187_1597202465._large.jpg?updatedAt=1758413919857"
                alt="gallery image"
                className="pointer-events-none h-full w-full object-cover"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="pl-4 md:basis-1/3">
            <div className="flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800">
              <img
                src="https://ik.imagekit.io/mhkbf5beo/sklibon-ims/galleries/18291426-4167-4b42-9412-f18e86bc7e2b-2df0c28d-37ea-48d8-97a0-0be8290d706b_TABLET_LANDSCAPE_LARGE_16_9.jpg?updatedAt=1758413919923"
                alt="gallery image"
                className="pointer-events-none h-full w-full object-cover"
              />
            </div>
          </CarouselItem>
          <CarouselItem className="pl-4 md:basis-1/3">
            <div className="flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800">
              4
            </div>
          </CarouselItem>
          <CarouselItem className="pl-4 md:basis-1/3">
            <div className="flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800">
              5
            </div>
          </CarouselItem>
          <CarouselItem className="pl-4 md:basis-1/3">
            <div className="flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800">
              6
            </div>
          </CarouselItem>
          <CarouselItem className="pl-4 md:basis-1/3">
            <div className="flex aspect-square items-center justify-center border border-zinc-200 dark:border-zinc-800">
              7
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};
