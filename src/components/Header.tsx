
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onNewBooking: () => void;
}

export function Header({ onNewBooking }: HeaderProps) {
  return (
    <header className="border-b border-border py-4">
      <div className="container flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Room Reservations</h1>
          <p className="text-sm text-muted-foreground">
            Request and manage room bookings
          </p>
        </div>
        <Button onClick={onNewBooking}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Booking
        </Button>
      </div>
    </header>
  );
}
