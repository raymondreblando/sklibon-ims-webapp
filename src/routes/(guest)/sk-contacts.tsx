import { createFileRoute } from "@tanstack/react-router";
import { useContactsQuery } from "@/hooks/queries/use-contacts-query";

import { HeadingWithWrapper } from "@/components/headings";
import { QueryStatusWrapper } from "@/components/hocs/query-status-wrapper";
import { ContactCard } from "@/components/cards";
import { ContactCardSkeleton } from "@/components/skeletons";
import { AuthWrapper, RedirectLink } from "@/components/layouts/auth";

export const Route = createFileRoute("/(guest)/sk-contacts")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isPending, isError, data, refetch } = useContactsQuery();

  return (
    <AuthWrapper className="w-[min(100%,800px)]">
      <HeadingWithWrapper
        heading="SK Federation Contacts"
        subheading="We’re here to listen, assist, and connect with you."
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
      <RedirectLink linkProps={{ to: "/" }}>Go to login page</RedirectLink>
    </AuthWrapper>
  );
}
