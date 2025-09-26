import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import type { ContactWithRelation } from "@/types/schema";

import { useModal } from "@/contexts/modal-context";
import { useDeleteContactMutation } from "@/hooks/mutations/use-contact-mutations";

import { useBreadcrumb } from "@/components/ui/breadcrumb";
import { ContactTable } from "@/components/tables/contact";
import { ConfirmationDialog, UpdateContactDialog } from "@/components/modals";

export const Route = createFileRoute("/_main/contacts")({
  component: RouteComponent,
});

function RouteComponent() {
  const { setItems } = useBreadcrumb();
  const deleteContact = useDeleteContactMutation();
  const { show } = useModal();

  useEffect(() => {
    setItems([{ title: "Contacts" }]);
  }, [setItems]);

  const onDelete = (contact: ContactWithRelation) => {
    show(
      <ConfirmationDialog
        onConfirm={() => deleteContact.mutate(contact.id)}
        isConfirming={deleteContact.isPending}
      />,
    );
  };

  return (
    <>
      <ContactTable
        onUpdate={(contact) => show(<UpdateContactDialog />, { data: contact })}
        onDelete={onDelete}
      />
    </>
  );
}
