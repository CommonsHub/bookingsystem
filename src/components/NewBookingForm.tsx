
import { useState } from "react";
import { DateTimePicker } from "./DateTimePicker";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { currentUser } from "@/data/mock";
import { X } from "lucide-react";
import { BookingRequest } from "@/types";
import { toast } from "sonner";

interface NewBookingFormProps {
  onSubmit: (booking: Omit<BookingRequest, "id" | "comments" | "status" | "createdAt">) => void;
  onCancel: () => void;
}

export function NewBookingForm({ onSubmit, onCancel }: NewBookingFormProps) {
  const [title, setTitle] = useState("");
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState<Date | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !roomName || !description || !startTime || !endTime) {
      toast.error("Please fill in all fields");
      return;
    }

    if (endTime <= startTime) {
      toast.error("End time must be after start time");
      return;
    }

    onSubmit({
      title,
      roomName,
      description,
      startTime,
      endTime,
      requestedBy: currentUser,
    });
  };

  // Available rooms (in a real app, this would come from an API)
  const availableRooms = [
    "Conference Room A",
    "Meeting Room B",
    "Small Meeting Room",
    "Board Room",
    "Training Room",
  ];

  return (
    <div className="bg-white rounded-lg border border-border shadow-sm">
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="text-lg font-medium">New Room Reservation</h2>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter booking title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="room">Room</Label>
            <Select value={roomName} onValueChange={setRoomName} required>
              <SelectTrigger id="room">
                <SelectValue placeholder="Select a room" />
              </SelectTrigger>
              <SelectContent>
                {availableRooms.map((room) => (
                  <SelectItem key={room} value={room}>
                    {room}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the purpose of this booking"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DateTimePicker 
              date={startTime} 
              setDate={setStartTime} 
              label="Start Time"
            />
            <DateTimePicker 
              date={endTime} 
              setDate={setEndTime} 
              label="End Time"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Submit Request</Button>
        </div>
      </form>
    </div>
  );
}
