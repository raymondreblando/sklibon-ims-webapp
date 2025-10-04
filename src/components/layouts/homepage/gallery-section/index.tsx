import { Heading, Subheading } from "@/components/headings";
import { GallerySlider } from "./gallery-slider";

export const GallerySection = () => {
  return (
    <section
      id="gallery-section"
      className="space-y-12 px-4 py-8 text-center text-balance md:min-h-screen md:px-20 md:py-20"
    >
      <div className="space-y-4">
        <Heading variant="xl">Moments that Inspire</Heading>
        <Subheading className="text-muted mx-auto max-w-[900px] text-sm font-medium md:text-base">
          A glimpse of our activities, events, and projects that showcase the
          active involvement of the youth in Libon.
        </Subheading>
      </div>
      <GallerySlider />
    </section>
  );
};
