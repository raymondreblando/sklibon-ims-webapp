import { lazy } from "react";

export const AboutSection = lazy(() =>
  import("@/components/layouts/homepage/about-section").then((module) => ({
    default: module.AboutSection,
  })),
);

export const EventSection = lazy(() =>
  import("@/components/layouts/homepage/event-section").then((module) => ({
    default: module.EventSection,
  })),
);

export const Footer = lazy(() =>
  import("@/components/layouts/homepage/footer-section").then((module) => ({
    default: module.Footer,
  })),
);

export const GallerySection = lazy(() =>
  import("@/components/layouts/homepage/gallery-section").then((module) => ({
    default: module.GallerySection,
  })),
);

export const HeroSection = lazy(() =>
  import("@/components/layouts/homepage/hero-section").then((module) => ({
    default: module.HeroSection,
  })),
);

export const SKOfficialSection = lazy(() =>
  import("@/components/layouts/homepage/skofficial-section").then((module) => ({
    default: module.SKOfficialSection,
  })),
);
