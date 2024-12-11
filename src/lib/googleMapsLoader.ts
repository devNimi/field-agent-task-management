// src/lib/googleMapsLoader.ts
import { Loader } from "@googlemaps/js-api-loader";

export const loadGoogleMapsScript = async () => {
  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    version: "weekly",
    libraries: ["places"],
  });

  try {
    await loader.load();
    return window.google;
  } catch (error) {
    console.error("Error loading Google Maps script:", error);
    return null;
  }
};

export const geocodeAddress = async (address: string) => {
  if (!window.google) {
    await loadGoogleMapsScript();
  }

  return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        // @ts-ignore
        const location = results[0].geometry.location;
        resolve({
          lat: location.lat(),
          lng: location.lng(),
        });
      } else {
        reject(new Error(`Geocoding failed: ${status}`));
      }
    });
  });
};
