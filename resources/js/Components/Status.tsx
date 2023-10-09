import { capitalizeString, cn } from "@/lib/utils";

interface StatusProps {
  status: string;
}
export default function Status({
  status
}: StatusProps) {
  return (
    <span className={cn(`
      px-2 py-1 text-xs font-medium rounded-full`,
      status === "pending" && "bg-yellow-200  text-yellow-700",
      status === "processing" && "bg-blue-200  text-blue-700",
      status === "completed" && "bg-green-200  text-green-700",
      status === "cancelled" && "bg-red-200  text-red-700",

    )}>
      {capitalizeString(status)}
    </span>
  );
}
