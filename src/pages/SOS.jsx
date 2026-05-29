import React from 'react';
import SOSButton from '../components/sos/SOSButton';
import LiveTracking from '../components/sos/LiveTracking';

export default function SOS() {
  return (
    <div className="sos-page">
      <h1>Emergency</h1>
      <SOSButton />
      <LiveTracking />
    </div>
  );
}