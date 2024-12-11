"use client";

import React from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
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

export function MapComponent({ center, markers = [], zoom = 12 }: MapProps) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <MapContainer>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={center}
        zoom={zoom}
      >
        {/* Center marker */}
        <Marker position={center} />

        {/* Additional markers */}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} label={marker.label} />
        ))}
      </GoogleMap>
    </MapContainer>
  );
}
