import { GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import { Layer } from "leaflet";
import { calculateCenterCoordinates } from "@/lib/utils/utils";

const BarangayLayer = ({
  onBarangayClick,
}: {
  onBarangayClick: (name: string, coordinates: [number, number]) => void;
}) => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("/libon-geo.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  const onEachFeature = (feature: any, layer: Layer) => {
    const barangayId = `0${feature.properties.adm4_psgc}`.replace("500", "50");
    const barangay = `Brgy. ${feature.properties.adm4_en}`;
    const centerCoordicates = calculateCenterCoordinates(
      feature.geometry.coordinates[0],
    );
    layer.bindTooltip(barangay);

    layer.on({
      click: () => onBarangayClick(barangayId, centerCoordicates),
      mouseover: (e) => e.target.setStyle({ weight: 3, color: "#666" }),
      mouseout: (e) => e.target.setStyle({ weight: 2, color: "#3388ff" }),
    });
  };

  return geoData ? (
    <GeoJSON data={geoData} onEachFeature={onEachFeature} />
  ) : null;
};

export default BarangayLayer;
