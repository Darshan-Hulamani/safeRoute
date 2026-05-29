import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import DangerZones from './DangerZones';
import RouteLayer from './RouteLayer';
import { useReports } from '../../hooks/useReports';
import { useGeolocation } from '../../hooks/useGeolocation';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const userIcon = L.divIcon({
  className: 'user-location-marker',
  html: `<div style="
    width: 20px;
    height: 20px;
    background: #1e3c72;
    border: 3px solid white;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(30,60,114,0.5);
  "></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    }
  });
  return null;
}

function FlyToLocation({ location }) {
  const map = useMap();
  React.useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 15);
    }
  }, [location, map]);
  return null;
}

export default function MapView({ onMapClick, routeCoords, safety }) {
  const { location } = useGeolocation();
  const { reports } = useReports();
  
  const defaultCenter = location ? [location.lat, location.lng] : [12.9716, 77.5946];
  const defaultZoom = location ? 15 : 12;

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={defaultCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapClickHandler onMapClick={onMapClick} />
        
        {location && (
          <Marker position={[location.lat, location.lng]} icon={userIcon}>
            <Popup>
              <strong>📍 You are here</strong>
            </Popup>
          </Marker>
        )}
        
        <DangerZones key={reports.length} zones={reports} />
        
        {routeCoords && routeCoords.length > 0 && (
          <RouteLayer coords={routeCoords} safety={safety} />
        )}
        
        <FlyToLocation location={location} />
      </MapContainer>
    </div>
  );
}