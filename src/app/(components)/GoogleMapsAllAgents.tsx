"use client";

import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  DirectionsRenderer,
} from "@react-google-maps/api";
import styled from "styled-components";

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
`;

interface MapProps {
  center: { lat: number; lng: number };
  markers?: { lat: number; lng: number; label?: string }[];
  zoom?: number;
}

export function MapComponentAllAgent({
  center,
  markers = [],
  zoom = 12,
}: MapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);

  useEffect(() => {
    if (isLoaded && markers.length === 2) {
      const [origin, destination] = markers;

      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    }
  }, [isLoaded, markers]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  // Custom "Bike" marker icon URL
  const bikeIcon = {
    url: "/images/bike-3.png", // Replace with the actual path to your bike icon
    scaledSize: new google.maps.Size(40, 40), // Resize the icon
  };

  return (
    <MapContainer>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={zoom}
      >
        {/* Render route if directions are available */}
        {directions && <DirectionsRenderer directions={directions} />}

        {/* Additional markers with custom "Bike" icon */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker}
            icon={bikeIcon} // Use custom bike icon
            label={marker?.label}
          />
        ))}
      </GoogleMap>
    </MapContainer>
  );
}
