// src/app/page.tsx
"use client";

import { Header } from "./(components)/Header";
import { dummyTasks } from "@/lib/dummyData";
import styled from "styled-components";

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

export default function Home() {
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
            {dummyTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.taskType}</td>
                <td>{task.agentName}</td>
                <td>{task.customerName}</td>
                <td>{task.customerPhone}</td>
                <td>{task.status}</td>
                <td>
                  <a href={`/task-details/${task.id}`}>View Details</a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );
}
