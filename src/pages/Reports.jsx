import React from 'react';
import { useReports } from '../hooks/useReports';

export default function Reports() {
  const { reports } = useReports();

  return (
    <div className="reports-page">
      <h1>Reported Zones</h1>
      <ul>
        {reports.map(r => (
          <li key={r.id}>
            <strong>{r.type}</strong> – {r.description} (Confirmations: {r.confirm_count})
          </li>
        ))}
      </ul>
    </div>
  );
}