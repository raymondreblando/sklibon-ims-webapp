import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { QUERY_KEYS } from "@/lib/constants/api-constants";
import { getBarangayEvents } from "@/services/api/events";
import BarangayLayer from "./barangay-layer";
import L from "leaflet";

const EventsMap = () => {
  const [selectedBarangay, setSelectedBarangay] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.EVENTS, selectedBarangay],
    queryFn: () => getBarangayEvents(selectedBarangay),
    enabled: !!selectedBarangay,
  });

  const handleBarangayClick = (barangayName: string) => {
    setSelectedBarangay(barangayName);
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
    </MapContainer>
  );
};

export default EventsMap;
