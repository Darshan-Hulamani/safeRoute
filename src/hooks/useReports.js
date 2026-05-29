import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'saferoute_reports';

const MOCK_REPORTS = [
  { id: '1', latitude: 12.9716, longitude: 77.5946, type: 'poor_lighting', description: 'Dark area near MG Road', confirm_count: 5, rating: 3, created_at: new Date().toISOString() },
  { id: '2', latitude: 12.9816, longitude: 77.6046, type: 'theft', description: 'Phone snatching reported', confirm_count: 8, rating: 5, created_at: new Date().toISOString() },
  { id: '3', latitude: 12.9516, longitude: 77.5846, type: 'harassment', description: 'Street harassment incident', confirm_count: 12, rating: 4, created_at: new Date().toISOString() },
];

function loadReports() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load reports from localStorage', e);
  }
  return MOCK_REPORTS; // fallback
}

function saveReports(reports) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  } catch (e) {
    console.warn('Failed to save reports to localStorage', e);
  }
}

export function useReports() {
  const [reports, setReports] = useState(loadReports);

  // Save to localStorage whenever reports change
  useEffect(() => {
    saveReports(reports);
  }, [reports]);

  const addReport = useCallback(async (report) => {
    const newReport = {
      ...report,
      id: 'report_' + Date.now(),
      created_at: new Date().toISOString(),
      rating: 0,
      confirm_count: 0,
    };
    console.log('Adding new report:', newReport);
    setReports(prev => {
      const updated = [...prev, newReport];
      console.log('Reports array now has', updated.length, 'items');
      return updated;
    });
    return newReport;
  }, []);

  return { reports, addReport };
}