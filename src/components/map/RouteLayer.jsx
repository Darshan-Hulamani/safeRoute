import React from 'react';
import { Polyline, Marker, Tooltip } from 'react-leaflet';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

const startIcon = L.divIcon({
  html: '<div style="background:#2a9d8f;color:white;padding:4px 10px;border-radius:12px;font-weight:bold;font-size:12px;">START</div>',
  iconSize: [70, 24],
  iconAnchor: [35, 12]
});

const endIcon = L.divIcon({
  html: '<div style="background:#e63946;color:white;padding:4px 10px;border-radius:12px;font-weight:bold;font-size:12px;">END</div>',
  iconSize: [70, 24],
  iconAnchor: [35, 12]
});

export default function RouteLayer({ coords, safety }) {
  const map = useMap();

  // Make sure we have a valid array of [lat, lng] pairs
  const positions = coords.map(c => [c[0], c[1]]);

  useEffect(() => {
    if (positions.length) {
      map.fitBounds(L.latLngBounds(positions), { padding: [40, 40] });
    }
  }, [positions, map]);

  const color = !safety ? '#2a9d8f' :
                safety.score >= 80 ? '#2a9d8f' :
                safety.score >= 50 ? '#f4a261' : '#e63946';

  return (
    <>
      <Polyline positions={positions} weight={5} color={color} opacity={0.9}>
        <Tooltip sticky>
          <b>{color === '#2a9d8f' ? '✅ Safe' : color === '#f4a261' ? '⚠️ Moderate' : '🚨 Risky'} Route</b>
          <br/>Safety: {safety?.score ?? '…'}%
        </Tooltip>
      </Polyline>

      {/* Only render markers if positions exist */}
      {positions.length > 0 && <Marker position={positions[0]} icon={startIcon} />}
      {positions.length > 1 && <Marker position={positions[positions.length-1]} icon={endIcon} />}
    </>
  );
}