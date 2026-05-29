import { useState, useCallback } from 'react';
import { getSafeRoute } from '../services/maps/routingService';
import { useReports } from './useReports';
import toast from 'react-hot-toast';

export function useSafeRoute() {
  const [loading, setLoading] = useState(false);
  const [route, setRoute] = useState(null);
  const [safety, setSafety] = useState(null);
  const { reports } = useReports();

  const calculateSafeRoute = useCallback(async (source, destination, mode = 'walking') => {
    if (!source || !destination || !source.lat || !destination.lat) {
      toast.error('Invalid locations');
      return;
    }
    setLoading(true);
    try {
      const result = await getSafeRoute(source, destination, mode, reports);
      setRoute(result.route);
      setSafety({ score: result.safetyScore, near: result.details?.near || 0 });
      const msg = result.safetyScore >= 80 ? `✅ Safe (${result.safetyScore}%)` :
                  result.safetyScore >= 50 ? `⚠️ Moderate (${result.safetyScore}%)` :
                  `🚨 Risky (${result.safetyScore}%)`;
      toast(msg, { duration: 4000 });
    } catch (err) {
      console.error(err);
      toast.error('Route failed, using fallback');
      // fallback route already handled inside routing service
    } finally {
      setLoading(false);
    }
  }, [reports]);

  return { loading, route, safety, calculateSafeRoute };
}