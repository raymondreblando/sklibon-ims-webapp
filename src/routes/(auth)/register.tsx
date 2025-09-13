import { createFileRoute } from "@tanstack/react-router";

import { HeadingWithWrapper } from "@/components/headings";
import { RegisterForm } from "@/components/forms/register-form";
import { AuthWrapper, RedirectLink } from "@/components/layouts/auth";

export const Route = createFileRoute("/(auth)/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AuthWrapper className="w-[min(100%,750px)]">
      <HeadingWithWrapper
        heading="Create an account"
        subheading="Fill in your details to join our community."
      />
      <RegisterForm />
      <RedirectLink message="Already have an account?" linkProps={{ to: "/" }}>
        Sign In
      </RedirectLink>
    </AuthWrapper>
  );
}
