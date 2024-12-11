// src/app/task-details/[id]/page.tsx
"use client";

import { Header } from "../../(components)/Header";
import { dummyTasks, dummyAgents } from "@/lib/dummyData";
import styled from "styled-components";
import { useState, useEffect } from "react";

const DetailsContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const DetailSection = styled.div`
  margin-bottom: 1rem;

  h2 {
    border-bottom: 2px solid #f2f2f2;
    padding-bottom: 0.5rem;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  background-color: #f0f0f0;
`;

export default function TaskDetails({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<any>(null);
  const [agent, setAgent] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching task and agent details
    const foundTask = dummyTasks.find((t) => t.id === params.id);
    const foundAgent = dummyAgents.find((a) => a.name === foundTask?.agentName);

    setTask(foundTask);
    setAgent(foundAgent);
  }, [params.id]);

  if (!task || !agent) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <DetailsContainer>
        <h1>Task Details</h1>

        <DetailSection>
          <h2>Task Information</h2>
          <p>Task ID: {task.id}</p>
          <p>Task Type: {task.taskType}</p>
          <p>Status: {task.status}</p>
        </DetailSection>

        <DetailSection>
          <h2>Agent Details</h2>
          <p>Name: {agent.name}</p>
          <p>Phone: {agent.phone}</p>
          <p>Estimated Time of Arrival: Soon</p>
        </DetailSection>

        <DetailSection>
          <h2>Customer Information</h2>
          <p>Name: {task.customerName}</p>
          <p>Phone: {task.customerPhone}</p>
        </DetailSection>

        <DetailSection>
          <h2>Location</h2>
          <MapContainer>
            {/* Placeholder for Google Maps integration */}
            Google Maps will be embedded here
          </MapContainer>
        </DetailSection>
      </DetailsContainer>
    </>
  );
}
