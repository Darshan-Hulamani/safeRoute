import React, { useState } from 'react';
import MapView from '../components/map/MapView';
import SearchBar from '../components/search/SearchBar';
import SOSButton from '../components/sos/SOSButton';
import ReportZoneModal from '../components/reports/ReportZoneModal';
import RiskIndicator from '../components/reports/RiskIndicator';
import { useSafeRoute } from '../hooks/useSafeRoute';
import { useRouteContext } from '../context/RouteContext';
import toast from 'react-hot-toast';

export default function Home() {
  const [showReport, setShowReport] = useState(false);
  const [reportPosition, setReportPosition] = useState(null);
  const { route, safety, loading, calculateSafeRoute } = useSafeRoute();
  const { travelMode } = useRouteContext();

  const handleMapClick = (latlng) => {
    setReportPosition(latlng);
    setShowReport(true);
  };

  const handleSearch = async (src, dest) => {
    if (!src || !dest) {
      toast.error('Please select both source and destination');
      return;
    }
    toast.loading('Calculating safest route...');
    await calculateSafeRoute(src, dest, travelMode);
    toast.dismiss();
  };

  const routeCoords = route?.geometry?.coordinates?.map(c => [c[1], c[0]]);

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100%' }}>
      <MapView 
        onMapClick={handleMapClick} 
        routeCoords={routeCoords}
        safety={safety}
      />
      
      {/* Top search overlay */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        right: '10px',
        zIndex: 500,
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <SearchBar onSearch={handleSearch} />
      </div>
      
      {/* Safety score overlay */}
      {safety && (
        <div style={{
          position: 'absolute',
          top: '200px',
          left: '10px',
          zIndex: 500,
          background: safety.score >= 80 ? '#2a9d8f' : safety.score >= 50 ? '#f4a261' : '#e63946',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          fontWeight: 'bold'
        }}>
          {safety.score >= 80 ? '✅' : safety.score >= 50 ? '⚠️' : '🚨'} Safety: {safety.score}%
        </div>
      )}
      
      {/* Bottom overlay */}
      <div style={{
        position: 'absolute',
        bottom: '100px',
        left: '10px',
        right: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 500
      }}>
        <SOSButton />
        {safety && <RiskIndicator score={safety.score} />}
      </div>
      
      {/* Loading overlay */}
      {loading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          padding: '20px 30px',
          borderRadius: '10px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          zIndex: 1000,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>🗺️</div>
          Finding safest route...
        </div>
      )}
      
      <ReportZoneModal 
        isOpen={showReport} 
        onClose={() => setShowReport(false)} 
        position={reportPosition} 
      />
    </div>
  );
}