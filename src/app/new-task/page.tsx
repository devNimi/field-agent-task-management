"use client";

import { useState } from "react";
import axios from "axios"; // Import Axios
import { Header } from "../(components)/Header";
import { AddressAutocomplete } from "../(components)/AddressAutocomplete";
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

const RadioGroup = styled.div`
  display: flex;
  gap: 1rem;
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

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 1.5rem 0;
  color: #333;
  text-align: center;
`;

export default function NewTask() {
  const [taskType, setTaskType] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [scheduleNow, setScheduleNow] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleAddressSelect = (
    fullAddress: string,
    lat: number,
    lng: number
  ) => {
    setAddress(fullAddress);
    setCoordinates({ lat, lng });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const taskData = {
        task: taskType,
        location: {
          latitude: coordinates?.lat,
          longitude: coordinates?.lng,
          address,
        },
        customer_details: {
          customer_name: name,
          phone_number: phone,
        },
        is_scheduled: scheduleNow === "yes" ? false : true,
        schedule_start_date_time: selectedDate?.toISOString(),
      };

      // Make the POST request using Axios
      const response = await axios.post(
        "https://serviceos-vyavastha-service-dev.internal.ackodev.com/ackathon/create/task",
        taskData
      );

      window.location.href = `/task-details/${response.data.data.task_id}`;
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Title> Create new task</Title>
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
              <option value="mobile_pickup">Mobile pickup</option>
              <option value="survey">Survey</option>
              <option value="blood_sample_collection">
                Blood Sample Collection
              </option>
              <option value="roadside_assistance">Road Side assistance</option>
            </select>
          </FormField>

          <FormField>
            <label>Address</label>
            <AddressAutocomplete onAddressSelect={handleAddressSelect} />
            {coordinates && (
              <p>
                Coordinates: Lat {coordinates.lat.toFixed(4)}, Lng{" "}
                {coordinates.lng.toFixed(4)}
              </p>
            )}
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
            <RadioGroup>
              <label style={{ display: "flex" }}>
                <input
                  type="radio"
                  name="scheduleNow"
                  value="yes"
                  checked={scheduleNow === "yes"}
                  onChange={(e) => setScheduleNow(e.target.value)}
                />
                Yes
              </label>
              <label style={{ display: "flex" }}>
                <input
                  type="radio"
                  name="scheduleNow"
                  value="no"
                  checked={scheduleNow === "no"}
                  onChange={(e) => setScheduleNow(e.target.value)}
                />
                No
              </label>
            </RadioGroup>
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
