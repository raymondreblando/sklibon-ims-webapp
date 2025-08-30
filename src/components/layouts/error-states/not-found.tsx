import { router } from "@/lib/router";
import { Button } from "@/components/ui/button";

import NotFoundIcon from "@/assets/404.webp";

export const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex max-w-[400px] flex-col items-center justify-center gap-y-4 p-8 px-4 text-center">
        <img src={NotFoundIcon} alt="404" className="w-[320px] md:w-[400px]" />
        <h1 className="text-5xl md:text-7xl font-extrabold">404</h1>
        <p className="text-muted text-sm md:text-base font-medium">
          Sorry, we couldn’t find that page. It might have been removed or the
          link is broken.
        </p>
        <Button size="lg" onClick={() => router.history.back()}>
          Go to Previous Page
        </Button>
      </div>
    </main>
  );
};
