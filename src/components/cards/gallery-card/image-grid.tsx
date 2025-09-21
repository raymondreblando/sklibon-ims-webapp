import { ImageIcon } from "lucide-react";
import type { GalleryImage } from "@/types/schema";

interface ImageGridProps {
  title: string;
  images: Array<GalleryImage>;
}

export const ImageGrid = ({ title, images }: ImageGridProps) => {
  return (
    <div className="grid h-40 grid-cols-3 grid-rows-2 gap-2">
      {Array.from({ length: 3 }).map((_, index) =>
        images[index] ? (
          <div
            key={images[index].id}
            className="bg-background-muted col-span-1 row-span-1 rounded-md nth-[2]:col-span-2 nth-[2]:row-span-2"
          >
            <img
              src={images[index].imageUrl}
              alt={`${title} image`}
              className="size-full rounded-[inherit] object-cover"
            />
          </div>
        ) : (
          <div
            key={`image-empty-${index}`}
            className="bg-background-muted col-span-1 row-span-1 rounded-md nth-[2]:col-span-2 nth-[2]:row-span-2"
          >
            <ImageIcon className="text-muted size-4" />
          </div>
        ),
      )}
    </div>
  );
};
