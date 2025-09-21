import type { GalleryImage } from "@/types/schema";

import { Footer } from "./footer";
import { Content } from "./content";
import { ImageGrid } from "./image-grid";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface GalleryCardProps {
  id: string;
  title: string;
  uploader: {
    firstname: string;
    position: string;
    profile?: string;
  };
  images: Array<GalleryImage>;
  dateCreated: Date;
  onDelete: (id: string) => void;
  hasAction: boolean;
}

export const GalleryCard = ({
  id,
  title,
  uploader,
  images,
  onDelete,
  hasAction,
}: GalleryCardProps) => {
  return (
    <Card className="block border-0 p-1 shadow-none">
      <ImageGrid title={title} images={images} />
      <Content title={title} total={images.length} />
      <Separator className="bg-input my-2" />
      <Footer
        id={id}
        name={uploader.firstname}
        position={uploader.position}
        profile={uploader.profile}
        onDelete={onDelete}
        hasAction={hasAction}
      />
    </Card>
  );
};
