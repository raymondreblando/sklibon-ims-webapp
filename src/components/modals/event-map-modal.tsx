import { useState } from "react";
import { useFormContext, type UseFormSetValue } from "react-hook-form";
import { useModal } from "@/contexts/modal-context";
import { useMapEvents } from "react-leaflet";

import type { CreateEventField } from "@/lib/schemas/event";

import { MapPinIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Map } from "@/components/map";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

export const EventMapDialog = () => {
  const { show } = useModal();
  const { setValue } = useFormContext<CreateEventField>();

  return (
    <Button
      variant="ghost"
      type="button"
      className="hover:bg-background-muted border font-medium md:col-span-2"
      onClick={() => show(<Content setValue={setValue} />)}
    >
      <MapPinIcon />
      Set Pin Location
    </Button>
  );
};

const Content = ({
  setValue,
}: {
  setValue: UseFormSetValue<CreateEventField>;
}) => {
  const { isOpen, hide } = useModal();
  const [position, setPosition] = useState<[number, number] | null>(null);

  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setPosition([e.latlng.lat, e.latlng.lng]);

        setValue("latitude", e.latlng.lat);
        setValue("longitude", e.latlng.lng);
        setValue("hasSelectedCoordinates", true, { shouldValidate: true });

        hide();
      },
    });
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={hide}>
      <DialogContent className="inset-0 max-w-full translate-x-0 translate-y-0 rounded-none p-0 sm:max-w-full">
        <DialogTitle className="hidden" />
        <Map
          MapEvents={MapEvents}
          position={position}
          setPosition={setPosition}
        />
      </DialogContent>
    </Dialog>
  );
};
