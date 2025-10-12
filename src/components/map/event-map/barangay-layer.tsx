import { GeoJSON } from "react-leaflet";
import { useEffect, useState } from "react";
import { Layer } from "leaflet";

const BarangayLayer = ({
  onBarangayClick,
}: {
  onBarangayClick: (name: string) => void;
}) => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("/libon-geo.json")
      .then((res) => res.json())
      .then((data) => setGeoData(data));
  }, []);

  const onEachFeature = (feature: any, layer: Layer) => {
    const barangayId = `0${feature.properties.adm4_psgc}`.replace("500", "50");;
    const barangay = `Brgy. ${feature.properties.adm4_en}`;
    layer.bindTooltip(barangay);

    layer.on({
      click: () => onBarangayClick(barangayId),
      mouseover: (e) => e.target.setStyle({ weight: 3, color: "#666" }),
      mouseout: (e) => e.target.setStyle({ weight: 2, color: "#3388ff" }),
    });
  };

  return geoData ? (
    <GeoJSON data={geoData} onEachFeature={onEachFeature} />
  ) : null;
};

export default BarangayLayer;
