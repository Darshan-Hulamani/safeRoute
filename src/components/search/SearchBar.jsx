import React, { useState } from 'react';
import SourceInput from './SourceInput';
import DestinationInput from './DestinationInput';

export default function SearchBar({ onSearch }) {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);

  const isValid = source && destination &&
                  !isNaN(source.lat) && !isNaN(source.lng) &&
                  !isNaN(destination.lat) && !isNaN(destination.lng);

  const handleClick = () => {
    if (isValid) onSearch(source, destination);
  };

  return (
    <div style={{
      background: 'white', padding: 15, borderRadius: 12,
      boxShadow: '0 4px 15px rgba(0,0,0,0.15)', backdropFilter: 'blur(10px)'
    }}>
      <h3 style={{ margin: '0 0 10px', color: '#1e3c72', fontSize: 16 }}>🗺️ Plan Safe Route</h3>
      <SourceInput onSelect={setSource} />
      <DestinationInput onSelect={setDestination} />
      <button
        onClick={handleClick}
        disabled={!isValid}
        style={{
          width: '100%', padding: 12,
          background: isValid ? 'linear-gradient(135deg, #1e3c72, #2a5298)' : '#adb5bd',
          color: 'white', border: 'none', borderRadius: 8, fontWeight: 'bold',
          fontSize: 14, cursor: isValid ? 'pointer' : 'not-allowed',
          marginTop: 8, opacity: isValid ? 1 : 0.7
        }}
      >
        🔍 Find Safe Route
      </button>
    </div>
  );
}