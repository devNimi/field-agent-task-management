"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "../(components)/Header";
import { InfinitySpin } from "react-loader-spinner"; // Import the loader
import styled from "styled-components";
import { getAllAgentsAPI } from "@/util/api";
import { MapComponentAllAgent } from "@/app/(components)/GoogleMapsAllAgents";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 1.5rem 0;
  color: #333;
  text-align: center;
`;

const MapWrapper = styled.div`
  width: 96%;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
`;

const AgentList = styled.div`
  position: absolute;
  top: 230px;
  right: 70px;
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  height: max-content;
  max-height: 380px;
  overflow-x: hidden;
  overflow-y: auto;
`;

const AgentListItem = styled.div`
  margin-bottom: 0.5rem;

  span {
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function AllAgentsLocation() {
  interface Agent {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
  }

  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch agent data from API
    const fetchAgents = async () => {
      try {
        const response = await axios.get(getAllAgentsAPI);
        const agentData = response.data.data;

        // Map data to relevant fields
        setAgents(
          agentData.map((agent: any) => ({
            id: agent.id,
            name: agent.name,
            latitude: agent.current_location.latitude,
            longitude: agent.current_location.longitude,
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching agents:", error);
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (loading) {
    return (
      <LoaderContainer>
        <InfinitySpin width="200" color="#4fa94d" />
      </LoaderContainer>
    );
  }

  if (!agents.length) {
    return <p>No agents found.</p>;
  }

  const centerLocation = {
    lat: agents[4].latitude,
    lng: agents[4].longitude,
  };

  const agentMarkers = agents.map((agent) => ({
    lat: agent.latitude,
    lng: agent.longitude,
    label: agent.name,
  }));

  return (
    <>
      <Header />
      <PageContainer>
        <Title>All Agents Location</Title>
        <MapWrapper>
          <MapContainer>
            <MapComponentAllAgent
              center={centerLocation}
              markers={agentMarkers}
              zoom={14}
            />
            <AgentList>
              <h3>Active Agents</h3>
              {agents.map((agent) => (
                <AgentListItem key={agent.id}>
                  <span>{agent.name}</span>
                  Lat: {agent.latitude.toFixed(4)}, Lng:{" "}
                  {agent.longitude.toFixed(4)}
                </AgentListItem>
              ))}
            </AgentList>
          </MapContainer>
        </MapWrapper>
      </PageContainer>
    </>
  );
}
