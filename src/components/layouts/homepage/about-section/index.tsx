import { Heading, Subheading } from "@/components/headings";
import { LibonMap } from "./libon-map";
import { AboutContent } from "./about-content";

export const AboutSection = () => {
  return (
    <section id="about-section" className="min-h-screen space-y-12 pt-8 text-center text-balance md:pt-20">
      <div className="space-y-4">
        <Heading variant="xl">About SK Federation Libon</Heading>
        <Subheading className="text-muted mx-auto max-w-[1100px] text-sm font-medium md:text-base">
          The Sangguniang Kabataan (SK) Federation of Libon is a council of
          youth leaders representing every barangay. Our mission is to empower
          the young generation through leadership, community involvement, and
          meaningful programs that address the needs of Libon’s youth.
        </Subheading>
      </div>
      <AboutContent />
      <LibonMap />
    </section>
  );
};
