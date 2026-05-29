import React from 'react';
import { useRouteContext } from '../context/RouteContext';

export default function Settings() {
  const { travelMode, setTravelMode } = useRouteContext();

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <label>
        Travel Mode:
        <select value={travelMode} onChange={e => setTravelMode(e.target.value)}>
          <option value="walking">Walking</option>
          <option value="driving">Driving</option>
          <option value="cycling">Cycling</option>
        </select>
      </label>
      <section className="future-roadmap">
        <h2>Future Roadmap</h2>
        <ul>
          <li>AI-based risk prediction</li>
          <li>Community patrols</li>
          <li>Integration with local authorities</li>
        </ul>
      </section>
    </div>
  );
}