import React from 'react';

export default function AutocompleteList({ suggestions, onSelect }) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <ul className="autocomplete-list">
      {suggestions.map((s, idx) => {
        const lat = parseFloat(s.lat);
        const lon = parseFloat(s.lon);
        const display = s.display_name || 'Unknown location';
        console.log('Suggestion item:', { lat, lon, display });
        return (
          <li key={idx} onClick={() => onSelect({ lat, lng: lon, display })}>
            {display}
          </li>
        );
      })}
    </ul>
  );
}