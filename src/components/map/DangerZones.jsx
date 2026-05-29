import React from 'react';
import { Circle, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const dangerIcon = L.divIcon({
  html: '<div style="width:30px;height:30px;background:#e63946;border:3px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:16px;">⚠️</div>',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

export default function DangerZones({ zones }) {
  console.log('DangerZones received zones:', zones?.length, zones);
  if (!zones || zones.length === 0) return null;

  return (
    <>
      {zones.map(zone => (
        <React.Fragment key={zone.id}>
          <Circle
            center={[zone.latitude, zone.longitude]}
            radius={100}
            pathOptions={{ color: '#e63946', fillColor: '#e63946', fillOpacity: 0.15 }}
          />
          <Marker position={[zone.latitude, zone.longitude]} icon={dangerIcon}>
            <Popup>
              <strong>{zone.type}</strong><br />
              {zone.description}
            </Popup>
          </Marker>
        </React.Fragment>
      ))}
    </>
  );
}