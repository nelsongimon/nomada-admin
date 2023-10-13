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
    accessorKey: "orderCode",
    header: () => <span className="text-black">Order Code</span>,
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <span>#{row.original.orderCode}</span>
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
    accessorKey: "guide",
    header: () => <span className="text-black">Guide Number</span>,
    cell: ({ row }) => {
      const guideNumber = row.original.guideNumber;
      return (
        <div>
          {guideNumber ? (
            <span>#{guideNumber}</span>
          ) : (
            <span>-----</span>
          )}
        </div>
      )
    }

  },
  {
    accessorKey: "totalAmountUsd",
    header: () => <span className="text-black">Amount</span>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmountUsd"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <span className="font-medium">{formatted}</span>
    }
  },
  {
    accessorKey: "customerEmail",
    header: () => <span className="text-black">Customer Email</span>,
    cell: ({ row }) => {
      return <span>{row.original.customerEmail}</span>
    }
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
          duration-300
        ">
          Details
        </span>
      </Link>
    }
  }
]
