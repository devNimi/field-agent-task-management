"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const AutocompleteContainer = styled.div`
  position: relative;
  width: 100%;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;
`;

const SuggestionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  background-color: white;
  list-style-type: none;
  margin: 0;
  padding: 0;
  z-index: 1000;
`;

const SuggestionItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

interface AddressAutocompleteProps {
  onAddressSelect: (address: string, lat: number, lng: number) => void;
}

export function AddressAutocomplete({
  onAddressSelect,
}: AddressAutocompleteProps) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);

  const placesService = useRef<google.maps.places.PlacesService | null>(null);

  // useEffect(() => {
  //   // Ensure Google Maps is loaded
  //   if (window.google) {
  //     autocompleteService.current =
  //       new window.google.maps.places.AutocompleteService();
  //     placesService.current = new window.google.maps.places.PlacesService(
  //       document.createElement("div")
  //     );
  //   }
  // }, []);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const existingScript = document.querySelector(
        `script[src="https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places"]`
      );
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => initializeServices();
        document.head.appendChild(script);
      } else {
        initializeServices();
      }
    };

    const initializeServices = () => {
      if (window.google && window.google.maps) {
        autocompleteService.current =
          new window.google.maps.places.AutocompleteService();
        placesService.current = new window.google.maps.places.PlacesService(
          document.createElement("div")
        );
      }
    };

    loadGoogleMapsScript();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    console.log("value...", autocompleteService);
    // Only search if we have a service and enough characters
    if (autocompleteService.current && value.length > 2) {
      console.log("seathcing...");
      autocompleteService.current.getPlacePredictions(
        { input: value },
        (predictions, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            setSuggestions(predictions || []);
          } else {
            setSuggestions([]);
          }
        }
      );
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionSelect = (
    suggestion: google.maps.places.AutocompletePrediction
  ) => {
    // Fetch place details to get lat/lng
    if (placesService.current) {
      placesService.current.getDetails(
        { placeId: suggestion.place_id },
        (place, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            place?.geometry
          ) {
            const lat = place.geometry?.location?.lat();
            const lng = place.geometry?.location?.lng();

            // Set input to full address and clear suggestions
            setInput(suggestion.description);
            setSuggestions([]);

            // Call parent component's handler
            // @ts-ignore
            onAddressSelect(suggestion.description, lat, lng);
          }
        }
      );
    }
  };

  return (
    <AutocompleteContainer>
      <InputField
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Start typing address..."
        required
      />
      {suggestions.length > 0 && (
        <SuggestionsList>
          {suggestions.map((suggestion) => (
            <SuggestionItem
              key={suggestion.place_id}
              onClick={() => handleSuggestionSelect(suggestion)}
            >
              {suggestion.description}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}
    </AutocompleteContainer>
  );
}
