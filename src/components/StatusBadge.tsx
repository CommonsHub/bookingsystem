
import { BookingStatus } from "@/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: BookingStatus;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        {
          "bg-yellow-100 text-yellow-800": status === "pending",
          "bg-green-100 text-green-800": status === "approved",
          "bg-red-100 text-red-800": status === "rejected",
        },
        className
      )}
    >
      {status === "pending" && "Pending"}
      {status === "approved" && "Approved"}
      {status === "rejected" && "Rejected"}
    </span>
  );
}
