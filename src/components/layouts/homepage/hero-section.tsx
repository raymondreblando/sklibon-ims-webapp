import HeroImage from "@/assets/hero-image.webp";
import { ButtonLink } from "@/components/buttons";
import { Heading, Subheading } from "@/components/headings";

export const HeroSection = () => {
  return (
    <section id="hero-section" className="relative h-screen min-h-screen">
      <img
        src={HeroImage}
        alt="hero image"
        className="h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
        <div className="space-y-8 text-center">
          <Heading
            variant="xxl"
            className="text-primary-foreground text-balance"
          >
            Empowering the Youth, Building the Future
          </Heading>
          <Subheading className="text-primary-foreground mx-auto max-w-[900px] text-base font-medium md:text-xl">
            SK Federation Libon unites young leaders to create meaningful
            programs, strengthen community participation, and inspire positive
            change for every barangay.
          </Subheading>
          <ButtonLink to="/register" size="xl">
            Join the Movement
          </ButtonLink>
        </div>
      </div>
    </section>
  );
};
