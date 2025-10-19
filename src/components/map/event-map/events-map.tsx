import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { QUERY_KEYS } from "@/lib/constants/api-constants";
import { getBarangayEvents } from "@/services/api/events";
import { getBrgyOfficials } from "@/services/api/users";
import BarangayLayer from "./barangay-layer";
import L from "leaflet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const EventsMap = () => {
  const [selectedBarangay, setSelectedBarangay] = useState<string | null>(null);
  const [centerCoordinates, setCenterCoordinates] = useState([0, 0]);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.EVENTS, selectedBarangay],
    queryFn: () => getBarangayEvents(selectedBarangay),
    enabled: !!selectedBarangay,
  });

  const { data: officials } = useQuery({
    queryKey: [QUERY_KEYS.SK_OFFICIALS, selectedBarangay],
    queryFn: () => getBrgyOfficials(selectedBarangay),
    enabled: !!selectedBarangay,
  });

  const handleBarangayClick = (
    barangayName: string,
    coordinates: [number, number],
  ) => {
    setSelectedBarangay(barangayName);
    setCenterCoordinates(coordinates);
  };

  const MarkerIcon = new L.Icon({
    iconUrl: "/logo.svg",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <MapContainer
      center={[13.296, 123.44]}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <BarangayLayer onBarangayClick={handleBarangayClick} />
      {data?.data &&
        data.data.map((event) => (
          <Marker
            key={event.id}
            position={[Number(event.latitude), Number(event.longitude)]}
            icon={MarkerIcon}
          >
            <Popup>
              <h4 className="text-primary font-semibold">{event.name}</h4>
              <p className="text-xs font-medium">{event.venue}</p>
            </Popup>
          </Marker>
        ))}
      {officials?.data.length && (
        <Marker
          position={[
            Number(centerCoordinates[0]),
            Number(centerCoordinates[1]),
          ]}
          icon={MarkerIcon}
        >
          <Popup>
            <h4 className="text-primary mb-2 font-semibold">SK Officials</h4>
            <ScrollArea className="h-full">
              {officials?.data.map((official) => (
                <div className="flex items-center !justify-start gap-x-3 px-4 py-1">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={official.profile} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {official.fullname.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-foreground !m-0 text-sm font-semibold">
                      {official.fullname}
                    </p>
                    <p className="text-muted !m-0 text-xs font-medium">
                      {official.info.position.name}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default EventsMap;
