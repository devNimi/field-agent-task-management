// src/app/new-task/page.tsx
"use client";

import { useState } from "react";
import { Header } from "../(components)/Header";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { v4 as uuidv4 } from "uuid";

const FormContainer = styled.div`
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const FormField = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
  }

  input,
  select {
    width: 100%;
    padding: 0.5rem;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: #cccccc;
  }
`;

export default function NewTask() {
  const [taskType, setTaskType] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [scheduleNow, setScheduleNow] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulating API call with setTimeout
    setTimeout(() => {
      const taskData = {
        id: uuidv4(),
        taskType,
        address,
        name,
        phone,
        scheduleNow,
        selectedDate: selectedDate?.toISOString(),
        latitude: 0, // Placeholder for Google Maps geocoding
        longitude: 0, // Placeholder for Google Maps geocoding
      };

      console.log("Task Submitted:", taskData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      <Header />
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormField>
            <label>Task Type</label>
            <select
              value={taskType}
              onChange={(e) => setTaskType(e.target.value)}
              required
            >
              <option value="">Select Task Type</option>
              <option value="pick">Pick</option>
              <option value="drop">Drop</option>
              <option value="inspection">Inspection</option>
              <option value="survey">Survey</option>
            </select>
          </FormField>

          <FormField>
            <label>Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Start typing address..."
              required
            />
          </FormField>

          <FormField>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormField>

          <FormField>
            <label>Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </FormField>

          <FormField>
            <label>Schedule Now?</label>
            <select
              value={scheduleNow}
              onChange={(e) => setScheduleNow(e.target.value)}
              required
            >
              <option value="">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </FormField>

          {scheduleNow === "no" && (
            <FormField>
              <label>Select Date and Time</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date: Date) => setSelectedDate(date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select date and time"
              />
            </FormField>
          )}

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Create Task"}
          </SubmitButton>
        </form>
      </FormContainer>
    </>
  );
}