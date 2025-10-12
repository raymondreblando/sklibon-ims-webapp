import { isAuthenticated } from "@/lib/utils/auth";
import { createFileRoute, redirect } from "@tanstack/react-router";

import { HeadingWithWrapper } from "@/components/headings";
import { RegisterForm } from "@/components/forms/register-form";
import { AuthWrapper, RedirectLink } from "@/components/layouts/auth";

export const Route = createFileRoute("/(auth)/register")({
  component: RouteComponent,
  beforeLoad: async () => {
    if (isAuthenticated()) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});

function RouteComponent() {
  return (
    <AuthWrapper className="w-[min(100%,750px)]">
      <HeadingWithWrapper
        heading="Create an account"
        subheading="Fill in your details to join our community."
      />
      <RegisterForm />
      <RedirectLink message="Already have an account?" linkProps={{ to: "/login" }}>
        Sign In
      </RedirectLink>
    </AuthWrapper>
  );
}
