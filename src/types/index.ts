
export type User = {
  id: string;
  name: string;
  avatar?: string;
  email?: string;
  isVerified?: boolean;
};

export type Comment = {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  isDraft?: boolean;
};

export type BookingStatus = "pending" | "approved" | "rejected";

export type BookingRequest = {
  id: string;
  title: string;
  roomName: string;
  description: string;
  startTime: Date;
  endTime: Date;
  requestedBy: User;
  status: BookingStatus;
  comments: Comment[];
  createdAt: Date;
  isDraft?: boolean;
};

export type VerificationStatus = {
  email: string;
  verifiedAt?: Date;
  pendingItems: {
    type: 'booking' | 'comment';
    id: string;
  }[];
};
