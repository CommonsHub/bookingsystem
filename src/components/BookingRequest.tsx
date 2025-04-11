
import { useState } from "react";
import { BookingRequest, User } from "@/types";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "./StatusBadge";
import { Button } from "@/components/ui/button";
import { CommentThread } from "./CommentThread";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Calendar, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";

interface BookingRequestProps {
  booking: BookingRequest;
  currentUser: User;
  onStatusChange: (id: string, status: "approved" | "rejected") => void;
  onAddComment: (id: string, content: string) => void;
}

export function BookingRequestView({ booking, currentUser, onStatusChange, onAddComment }: BookingRequestProps) {
  const [showComments, setShowComments] = useState(booking.comments.length > 0);

  const handleStatusChange = (status: "approved" | "rejected") => {
    // In a real app, you would check permissions here
    onStatusChange(booking.id, status);
    toast.success(`Booking ${status === "approved" ? "approved" : "rejected"}`);
  };

  const handleAddComment = (content: string) => {
    onAddComment(booking.id, content);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{booking.title}</CardTitle>
            <CardDescription>{booking.roomName}</CardDescription>
          </div>
          <StatusBadge status={booking.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm text-gray-700 mb-4">{booking.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>
                {format(booking.startTime, "MMMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>
                {format(booking.startTime, "h:mm a")} - {format(booking.endTime, "h:mm a")}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.requestedBy.avatar} alt={booking.requestedBy.name} />
              <AvatarFallback>
                {booking.requestedBy.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              Requested by {booking.requestedBy.name} on {format(booking.createdAt, "MMM d, yyyy")}
            </span>
          </div>
        </div>

        {showComments ? (
          <>
            <Separator />
            <CommentThread 
              comments={booking.comments} 
              currentUser={currentUser}
              onAddComment={handleAddComment} 
            />
          </>
        ) : null}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          {showComments ? "Hide Comments" : `Show Comments${booking.comments.length ? ` (${booking.comments.length})` : ""}`}
        </Button>
        {booking.status === "pending" && (
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleStatusChange("rejected")}
            >
              <ThumbsDown className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button 
              size="sm"
              onClick={() => handleStatusChange("approved")}
            >
              <ThumbsUp className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
