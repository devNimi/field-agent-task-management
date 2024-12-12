"use client";

import { Header } from "../../(components)/Header";
import { MapComponent } from "@/app/(components)/GoogleMaps";
import { dummyTasks, dummyAgents } from "@/lib/dummyData";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { getTaskDetailsById } from "@/util/api";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";

import { useParams } from "next/navigation";

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

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function TaskDetails({ params }: { params: { id: string } }) {
  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [agentLocation, setAgentLocation] = useState({
    lat: 40.7128,
    lng: -74.006,
    label: "Agent",
  });
  const [customerLocation, setCustomerLocation] = useState({
    lat: 40.7128 + 0.01,
    lng: -74.006 + 0.01,
    label: "Customer",
  });

  useEffect(() => {
    const pageId = params.id;
    const fetchAgents = async () => {
      try {
        const response = await axios.get(`${getTaskDetailsById}${pageId}`);
        // Map data to relevant fields
        const data = response.data.data;
        setTask(data);
        setAgentLocation({
          lat: data.agent_current_location.latitude,
          lng: data.agent_current_location.longitude,
          label: "Agent",
        });
        setCustomerLocation({
          lat: data.task_location.latitude,
          lng: data.task_location.longitude,
          label: "Customer",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching agents:", error);
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (!task)
    return (
      <LoaderContainer>
        <InfinitySpin width="200" color="#4fa94d" />
      </LoaderContainer>
    );

  return (
    <>
      <Header />
      <DetailsContainer>
        <h1>Task Details</h1>

        <DetailSection>
          <h2>Task Information</h2>
          <p>Task ID: {task?.id}</p>
          <p>Task Type: {task.master_task_config_slug}</p>
          <p>Status: {task?.status || "Nascent"}</p>
        </DetailSection>

        {task.status !== "Assignment Pending" && (
          <DetailSection>
            <h2>Agent Details</h2>
            <p>Name: {task?.agent_name}</p>
            {task?.status !== "completed" && (
              <p>
                Estimated Time of Arrival:{" "}
                {new Date(
                  task?.estimated_time_of_arrival || ""
                ).toLocaleString()}
              </p>
            )}
          </DetailSection>
        )}

        <DetailSection>
          <h2>Customer Information</h2>
          <p>Name: {task.customer_name}</p>
          <p>Phone: {task.customer_phone_number}</p>
        </DetailSection>

        {task.status !== "completed" &&
          task.status !== "Assignment Pending" && (
            <DetailSection>
              <h2>Location</h2>
              <MapComponent
                center={agentLocation} // Center the map on the agent's location
                markers={[agentLocation, customerLocation]} // Pass agent and customer locations
                zoom={10}
              />
            </DetailSection>
          )}
      </DetailsContainer>
    </>
  );
}
