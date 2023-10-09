"use client"

import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { format } from 'date-fns';
import { Order } from "@/types";
import Status from "@/Components/Status";


export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "order_code",
    header: () => <span className="text-black">Order Number</span>,
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <span>#{row.original.order_code}</span>
      )
    }
  },
  {
    accessorKey: "status",
    header: () => <span className="text-black">Status</span>,
    enableHiding: false,
    cell: ({ row }) => {
      return <Status status={row.original.status} />
    }
  },
  {
    accessorKey: "guide_number",
    header: () => <span className="text-black">Guide Number</span>,
    cell: ({ row }) => {
      const guide_number = row.original.guide_number;
      return (
        <div>
          {guide_number ? (
            <span>#{guide_number}</span>
          ) : (
            <span>-----</span>
          )}
        </div>
      )
    }

  },
  {
    accessorKey: "total_amount_usd",
    header: () => <span className="text-black">Amount</span>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_amount_usd"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <span className="font-medium">{formatted}</span>
    }
  },
  {
    accessorKey: "customer_email",
    header: () => <span className="text-black">Customer Email</span>,
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <div className="flex items-center">
            <span className="text-black">Date</span>
            <ChevronsUpDown className="ml-2 h-4 w-4 stroke-[1.5]" />
          </div>
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      const formattedDate = format(date, "dd/MM/yyyy");
      return <span>{formattedDate}</span>

    }
  },
  {
    id: "edit",
    enableHiding: false,
    cell: ({ row }) => {
      const uuid = row.original.uuid;
      return <Link href={`/orders/${uuid}`}>
        <span className="
          underline-offset-4
          hover:underline
          cursor-pointer
          py-1
          px-3
          hover:bg-gray-100
          duration-300
          rounded-full
        ">
          Details
        </span>
      </Link>
    }
  }
]