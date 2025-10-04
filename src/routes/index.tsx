import { createFileRoute } from "@tanstack/react-router";
import { useScroll } from "@/hooks/use-scroll";

import NavBar from "@/components/layouts/navbar";
import {
  AboutSection,
  EventSection,
  Footer,
  GallerySection,
  HeroSection,
  SKOfficialSection,
} from "@/components/layouts/homepage";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const scrollYPos = useScroll();

  return (
    <main className="relative">
      <NavBar scrollYPos={scrollYPos} />
      <HeroSection />
      <EventSection />
      <GallerySection />
      <SKOfficialSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
