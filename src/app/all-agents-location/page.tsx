// src/app/all-agents-location/page.tsx
"use client";

import { Header } from "../(components)/Header";
import { dummyAgents } from "@/lib/dummyData";
import styled from "styled-components";

const MapContainer = styled.div`
  width: 100%;
  height: 600px;
  background-color: #f0f0f0;
  position: relative;
`;

const AgentList = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const AgentListItem = styled.div`
  margin-bottom: 0.5rem;

  span {
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

export default function AllAgentsLocation() {
  return (
    <>
      <Header />
      <MapContainer>
        {/* Placeholder for Google Maps integration */}
        Google Maps with Agent Locations will be embedded here
        <AgentList>
          <h3>Active Agents</h3>
          {dummyAgents.map((agent) => (
            <AgentListItem key={agent.id}>
              <span>{agent.name}</span>
              Lat: {agent.latitude.toFixed(4)}, Lng:{" "}
              {agent.longitude.toFixed(4)}
            </AgentListItem>
          ))}
        </AgentList>
      </MapContainer>
    </>
  );
}
