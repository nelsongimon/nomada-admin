import { capitalizeString, cn } from "@/lib/utils";

interface RoleBadgeProps {
  role: string;
}
export default function RoleBadge({
  role
}: RoleBadgeProps) {
  return (
    <div>
      <span className={cn(`
        rounded-full py-1 px-2 text-xs font-semibold
      `,
        role === "admin" && "bg-green-200 text-green-700",
      )}>
        {capitalizeString(role)}
      </span>
    </div>
  );
}
