// src/app/page.tsx
"use client";

import { Header } from "./(components)/Header";
import { dummyTasks } from "@/lib/dummyData";
import { getAllTasksAPI } from "@/util/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";
import styled from "styled-components";

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const TableContainer = styled.div`
  padding: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const taskMapper: { [key: string]: string } = {
  roadside_assistance: "Road side assistance",
  mobile_pickup: "Mobile pickup",
  survey: "Survey",
  blood_sample_collection: "Blood sample collection",
};
export default function Home() {
  const [tasks, setTasks] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch agent data from API
    const fetchAgents = async () => {
      try {
        const response = await axios.get(getAllTasksAPI);
        const tasksData = response.data.data;
        console.log(tasksData);

        // Map data to relevant fields
        setTasks(tasksData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching agents:", error);
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (!tasks)
    return (
      <LoaderContainer>
        <InfinitySpin width="200" color="#4fa94d" />
      </LoaderContainer>
    );

  return (
    <>
      <Header />
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <th>Task ID</th>
              <th>Task Type</th>
              <th>Agent Name</th>
              <th>Customer Name</th>
              <th>Customer Phone</th>
              <th>Task Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task: any) => (
              <tr key={task?.id}>
                <td>{task?.id}</td>
                <td>{taskMapper[task?.master_task_config_slug]}</td>
                <td>{task?.agent_name}</td>
                <td>{task?.customer_name}</td>
                <td>{task?.customer_phone_number}</td>
                <td>{task?.status}</td>
                <td>
                  <a href={`/task-details/${task?.id}`}>View Details</a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );
}
