import { useEffect, useState, useRef } from "react";

const serviceUrl = "https://nominatim.openstreetmap.org/reverse";

export const useGeolocation = () => {
  const [city, setCity] = useState("");
  const positionRef = useRef();

  window.navigator.geolocation.getCurrentPosition(onSuccess);

  async function fetchLocationData(latitude, longitude) {
    const response = await fetch(
      `${serviceUrl}?lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await response.json();

    if (data?.address?.city) {
      setCity(data.address.city);
    }
  }

  function onSuccess({ coords: { latitude, longitude } }) {
    fetchLocationData(latitude, longitude);
  }

  useEffect(() => {
    positionRef.current = window.navigator.geolocation.watchPosition(onSuccess);

    return () => {
      window.navigator.geolocation.clearWatch(positionRef.current);
    };
  }, []);

  return city;
};
