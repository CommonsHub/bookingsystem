
import { BookingStatus } from "@/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: BookingStatus;
  draft?: boolean;
  className?: string;
}

export function StatusBadge({ status, draft = false, className }: StatusBadgeProps) {
  return (
    <div className="flex flex-col items-end gap-1">
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
      
      {draft && (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
          Draft
        </span>
      )}
    </div>
  );
}
