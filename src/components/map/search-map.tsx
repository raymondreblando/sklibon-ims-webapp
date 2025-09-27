import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/assets/css/leaflet.css";

interface SearchMapProps {
  onPositionChange: (position: [number, number]) => void;
}

export const SearchMap = ({ onPositionChange }: SearchMapProps) => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new (GeoSearchControl as any)({
      provider,
      style: "bar",
      showMarker: false,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: true,
    });

    const onShowLocation = (result: any) => {
      const { y: lat, x: lng } = result.location;
      onPositionChange([lat, lng]);
    };

    map.addControl(searchControl);
    map.on("geosearch/showlocation", onShowLocation);

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation", onShowLocation);
    };
  }, [map, onPositionChange]);

  return null;
};
