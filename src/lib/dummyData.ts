export interface Task {
  id: string;
  taskType: "pick" | "drop" | "inspection" | "survey";
  agentName: string;
  customerName: string;
  customerPhone: string;
  status: "pending" | "in-progress" | "completed";
}

export interface Agent {
  id: string;
  name: string;
  phone: string;
  latitude: number;
  longitude: number;
}

export const dummyTasks: Task[] = [
  {
    id: "1",
    taskType: "pick",
    agentName: "John Doe",
    customerName: "Alice Smith",
    customerPhone: "555-1234",
    status: "pending",
  },
  {
    id: "2",
    taskType: "drop",
    agentName: "Jane Wilson",
    customerName: "Bob Johnson",
    customerPhone: "555-5678",
    status: "in-progress",
  },
];

export const dummyAgents: Agent[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "555-1111",
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    id: "2",
    name: "Jane Wilson",
    phone: "555-2222",
    latitude: 40.7282,
    longitude: -73.7949,
  },
];
