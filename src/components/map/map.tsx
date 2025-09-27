import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { SearchMap } from "./search-map";

interface MapProps {
  MapEvents: () => null;
  position: [number, number] | null;
  setPosition: React.Dispatch<React.SetStateAction<[number, number] | null>>;
}

export const Map = ({ MapEvents, position, setPosition }: MapProps) => {
  return (
    <div className="h-full w-full overflow-hidden">
      <MapContainer
        center={[13.1433, 123.7333]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution=""
        />
        {MapEvents && <MapEvents />}
        {position && <Marker position={position} />}
        <SearchMap onPositionChange={setPosition} />
      </MapContainer>
    </div>
  );
};
