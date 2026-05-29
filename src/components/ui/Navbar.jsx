import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/" className="nav-item" end>
        <span className="nav-icon">🗺️</span>
        <span>Map</span>
      </NavLink>
      <NavLink to="/sos" className="nav-item">
        <span className="nav-icon">🆘</span>
        <span>SOS</span>
      </NavLink>
      <NavLink to="/contacts" className="nav-item">
        <span className="nav-icon">👥</span>
        <span>Contacts</span>
      </NavLink>
      <NavLink to="/reports" className="nav-item">
        <span className="nav-icon">📋</span>
        <span>Reports</span>
      </NavLink>
    </nav>
  );
}