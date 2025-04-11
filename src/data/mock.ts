
import { BookingRequest, User } from "@/types";

// Mock users
export const users: User[] = [
  { id: "1", name: "John Doe", avatar: "/placeholder.svg" },
  { id: "2", name: "Jane Smith", avatar: "/placeholder.svg" },
  { id: "3", name: "Alex Johnson", avatar: "/placeholder.svg" },
];

// Current user (for demo purposes)
export const currentUser: User = users[0];

// Mock booking requests
export const mockBookings: BookingRequest[] = [
  {
    id: "1",
    title: "Team Sprint Planning",
    roomName: "Conference Room A",
    description: "Weekly sprint planning session for the engineering team.",
    startTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    endTime: new Date(Date.now() + 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 2 hours later
    requestedBy: users[0],
    status: "pending",
    comments: [
      {
        id: "c1",
        user: users[1],
        content: "Is this the room with the better projector?",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: "c2",
        user: users[0],
        content: "Yes, it has the 4K projector and the new sound system.",
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      },
    ],
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Client Presentation",
    roomName: "Meeting Room B",
    description: "Presentation of the new product to the client.",
    startTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 3 hours later
    requestedBy: users[1],
    status: "approved",
    comments: [
      {
        id: "c3",
        user: users[2],
        content: "Approved. Make sure to have the room cleaned before the client arrives.",
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
    ],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "Interview Session",
    roomName: "Small Meeting Room",
    description: "Interview for the Senior Developer position.",
    startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000), // 1 hour later
    requestedBy: users[2],
    status: "pending",
    comments: [],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
];
