import React from 'react';
import { useSOS } from '../../hooks/useSOS';
import toast from 'react-hot-toast';

export default function SOSButton() {
  const { triggerSOS, sosActive, deactivateSOS } = useSOS();

  const handleSOS = () => {
    if (sosActive) {
      deactivateSOS();
      toast.success('SOS deactivated');
      return;
    }

    // Get fresh, high‑accuracy location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const freshLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        triggerSOS(freshLocation);
        toast.success('Emergency alert sent!');
      },
      (err) => {
        toast.error('Could not get location. Enable GPS.');
        console.error(err);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <button
      className={`sos-button ${sosActive ? 'active' : ''}`}
      onClick={handleSOS}
      style={{
        background: sosActive ? '#6c757d' : '#e63946',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '65px',
        height: '65px',
        fontWeight: 'bold',
        fontSize: '16px',
        boxShadow: '0 4px 15px rgba(230,57,70,0.5)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: sosActive ? 'pulse 1.5s infinite' : 'none',
      }}
    >
      {sosActive ? 'STOP' : 'SOS'}
    </button>
  );
}