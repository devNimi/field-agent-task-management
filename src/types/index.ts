// src/types/index.ts
export interface Task {
  id: string;
  taskType: "pick" | "drop" | "inspection" | "survey";
  agentName: string;
  customerName: string;
  customerPhone: string;
  status: "pending" | "in-progress" | "completed";
  address?: string;
  scheduledDate?: Date;
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export interface NewTaskFormData {
  taskType: string;
  address: string;
  name: string;
  phone: string;
  scheduleNow: "yes" | "no";
  selectedDate?: Date | null;
}
