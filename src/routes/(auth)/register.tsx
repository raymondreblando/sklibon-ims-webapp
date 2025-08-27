import { createFileRoute, Link } from "@tanstack/react-router";

import { AuthBranding } from "@/components/layouts/auth/auth-branding";
import { Separator } from "@/components/ui/separator";
import { RegisterForm } from "@/components/forms/register-form";

export const Route = createFileRoute("/(auth)/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-[min(750px,100%)] px-4 py-12">
        <AuthBranding />
        <Separator className="my-8" />
        <div className="flex flex-1 flex-col gap-y-8">
          <div className="text-center">
            <h1 className="mb-2 text-2xl font-extrabold">Create an account</h1>
            <p className="text-muted text-sm md:text-base">
              Fill in your details to join our community.
            </p>
          </div>
          <RegisterForm />
          <p className="text-muted text-center text-sm font-medium md:text-base">
            Already have an account?{" "}
            <Link to="/" className="text-primary font-semibold underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
