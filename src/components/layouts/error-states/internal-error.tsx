import { router } from "@/lib/router";
import { Button } from "@/components/ui/button";
import InterServerIcon from "@/assets/500.webp";

export const InternalError = () => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex max-w-[400px] flex-col items-center justify-center gap-y-4 p-8 px-4 text-center">
        <img
          src={InterServerIcon}
          alt="Internal Server Error"
          className="w-[400px]"
        />
        <h1 className="text-4xl font-extrabold">Oops! Something went wrong.</h1>
        <p className="text-muted text-base font-medium">
          An unexpected error occurred. Please try going back or return to the
          homepage.
        </p>
        <Button size="lg" onClick={() => router.history.back()}>
          Go to Previous Page
        </Button>
      </div>
    </main>
  );
};
