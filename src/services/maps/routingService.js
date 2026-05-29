const OSRM_BASE = 'https://router.project-osrm.org';

const PROFILE_MAP = {
  walking: 'foot',
  driving: 'car',
  cycling: 'bike'
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(Δφ/2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Generate a simple straight-line mock route (for fallback)
function generateMockRoute(start, end) {
  // Create a series of coordinates between start and end (approx 20 points)
  const coords = [];
  const steps = 20;
  for (let i = 0; i <= steps; i++) {
    const lat = start.lat + (end.lat - start.lat) * (i / steps);
    const lng = start.lng + (end.lng - start.lng) * (i / steps);
    coords.push([lng, lat]); // GeoJSON order: [lng, lat]
  }
  return {
    geometry: {
      coordinates: coords,
      type: 'LineString'
    },
    distance: calculateDistance(start.lat, start.lng, end.lat, end.lng),
    duration: 0,
    legs: []
  };
}

export async function getRoutes(startCoords, endCoords, mode = 'walking') {
  try {
    const profile = PROFILE_MAP[mode] || 'foot';
    const url = `${OSRM_BASE}/route/v1/${profile}/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?overview=full&geometries=geojson&steps=true&alternatives=true`;
    console.log('OSRM URL:', url);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`OSRM error ${res.status}`);
    const data = await res.json();
    if (data.code !== 'Ok' || !data.routes || data.routes.length === 0) {
      throw new Error('No route from OSRM');
    }
    return data.routes;
  } catch (error) {
    console.warn('OSRM failed, using mock route:', error.message);
    // Fallback: return a mock route (straight line)
    return [generateMockRoute(startCoords, endCoords)];
  }
}

export async function getSafeRoute(startCoords, endCoords, mode = 'walking', dangerZones = []) {
  const routes = await getRoutes(startCoords, endCoords, mode);
  if (!routes || routes.length === 0) throw new Error('No routes available');

  if (!dangerZones || dangerZones.length === 0) {
    return { route: routes[0], safetyScore: 100, allRoutes: routes };
  }

  const scored = routes.map(route => {
    const coords = route.geometry.coordinates;
    let risk = 0;
    let near = 0;
    coords.forEach(c => {
      dangerZones.forEach(zone => {
        const dist = calculateDistance(c[1], c[0], zone.latitude, zone.longitude);
        if (dist < 100) {
          risk += (100 - dist) / 100;
          near++;
        }
      });
    });
    const score = Math.max(0, Math.round(100 - (risk / coords.length) * 100));
    return { route, score, near };
  });

  scored.sort((a, b) => b.score - a.score);
  return {
    route: scored[0].route,
    safetyScore: scored[0].score,
    allRoutes: scored.map(r => r.route),
    details: scored[0]
  };
}