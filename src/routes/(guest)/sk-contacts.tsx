import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthBranding } from "@/components/layouts/auth/auth-branding";
import { Separator } from "@/components/ui/separator";
import { HeadingWithWrapper } from "@/components/headings";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";
import { ContactCard } from "@/components/cards";
import { ContactCardSkeleton } from "@/components/skeletons";
import { useContactsQuery } from "@/hooks/queries/use-contacts-query";

export const Route = createFileRoute("/(guest)/sk-contacts")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, isError, data, refetch } = useContactsQuery();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-[min(100%,800px)] px-4 py-8">
        <AuthBranding />
        <Separator className="my-8" />
        <div className="flex flex-1 flex-col gap-y-8">
          <HeadingWithWrapper
            heading="SK Federation Contacts"
            subheading="Important numbers you can call in case of emergency."
          />
          <div className="grid gap-4 md:grid-cols-2">
            <QueryStatusWrapper
              isPending={isPending}
              isError={isError}
              loadingComp={<ContactCardSkeleton count={4} />}
              onRetry={refetch}
            >
              {data &&
                data.data.map((contact) => (
                  <ContactCard
                    name={contact.user.fullname}
                    profile={contact.user.profile}
                    barangay={contact.user.info.barangay.name}
                    position={contact.user.info.position.name}
                    contactNumber={contact.contactNumber}
                  />
                ))}
            </QueryStatusWrapper>
          </div>
          <p className="text-muted text-center text-sm font-medium md:text-base">
            <Link
              to="/"
              search={{ redirect: "" }}
              className="text-primary font-semibold underline"
            >
              Go back to login page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
