import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "../icons8-marker-48.png";

export default function Map(props) {
  const { latitude, longitude, rating, name } = props;

  // Ukuran icon marker
  const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [48, 48],
    iconAnchor: [32, 32],
  });

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={10}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} icon={customIcon}>
        <Popup>
          <h6>
            {name}
            <span className="fw-bold"> (rating {rating})</span>
          </h6>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
