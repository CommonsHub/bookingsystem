
import { useState } from "react";
import { mockBookings, currentUser } from "@/data/mock";
import { BookingRequest, BookingStatus } from "@/types";
import { Header } from "@/components/Header";
import { BookingRequestView } from "@/components/BookingRequest";
import { NewBookingForm } from "@/components/NewBookingForm";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { v4 as uuidv4 } from "uuid";
import { isUserVerified } from "@/utils/emailVerification";

const Index = () => {
  const [bookings, setBookings] = useState<BookingRequest[]>(mockBookings);
  const [showNewBookingForm, setShowNewBookingForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | BookingStatus>("all");

  const handleStatusChange = (id: string, status: "approved" | "rejected") => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

  const handleAddComment = (id: string, content: string) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              comments: [
                ...booking.comments,
                {
                  id: uuidv4(),
                  user: currentUser,
                  content,
                  timestamp: new Date(),
                  isDraft: !isUserVerified(),
                },
              ],
            }
          : booking
      )
    );
  };

  const handleCreateBooking = (
    booking: Omit<BookingRequest, "id" | "comments" | "status" | "createdAt">
  ) => {
    const newBooking: BookingRequest = {
      ...booking,
      id: uuidv4(),
      status: "pending",
      comments: [],
      createdAt: new Date(),
      isDraft: booking.isDraft,
    };

    setBookings([newBooking, ...bookings]);
    setShowNewBookingForm(false);
    
    if (booking.isDraft) {
      toast.info("Booking request saved as draft. Please verify your email to publish it.");
    } else {
      toast.success("Booking request created successfully");
    }
  };

  // Filter bookings to only show non-draft or user's own drafts
  const visibleBookings = bookings.filter(
    (booking) => !booking.isDraft || booking.requestedBy.id === currentUser.id
  );
  
  // Then filter by tab
  const filteredBookings = visibleBookings.filter(
    (booking) => activeTab === "all" || booking.status === activeTab
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNewBooking={() => setShowNewBookingForm(true)} />
      <div className="container py-6">
        {showNewBookingForm ? (
          <div className="max-w-2xl mx-auto mb-8">
            <NewBookingForm
              onSubmit={handleCreateBooking}
              onCancel={() => setShowNewBookingForm(false)}
            />
          </div>
        ) : null}

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as "all" | BookingStatus)}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Booking Requests</h2>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="mt-0">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12 bg-white border border-border rounded-lg shadow-sm">
                <h3 className="font-medium text-lg">No booking requests found</h3>
                <p className="text-muted-foreground">
                  {activeTab === "all"
                    ? "Create a new booking request to get started"
                    : `No ${activeTab} booking requests found`}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredBookings.map((booking) => (
                  <BookingRequestView
                    key={booking.id}
                    booking={booking}
                    currentUser={currentUser}
                    onStatusChange={handleStatusChange}
                    onAddComment={handleAddComment}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
