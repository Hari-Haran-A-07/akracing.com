import { useState, useEffect } from 'react';

/**
 * Custom hook to detect user geolocation coordinates.
 * Adjusts circuit local race countdowns and displays nearest international circuit.
 */
export const useGeolocation = (enableHighAccuracy = false) => {
  const [state, setState] = useState({
    loading: true,
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setState({
        loading: false,
        latitude: null,
        longitude: null,
        error: 'Geolocation is not supported by your browser',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          loading: false,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          error: null,
        });
      },
      (err) => {
        setState({
          loading: false,
          latitude: null,
          longitude: null,
          error: err.message,
        });
      },
      { enableHighAccuracy, timeout: 10000, maximumAge: 600000 }
    );
  }, [enableHighAccuracy]);

  return state;
};

export default useGeolocation;
