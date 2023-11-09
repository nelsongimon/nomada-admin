"use client"

import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
import { ColumnDef } from "@tanstack/react-table";
import { Copy, FolderEdit, Image } from "lucide-react";
import { Product } from "@/types";
import { Switch } from "@headlessui/react";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "image",
    header: () => {
      return (
        <div className="ml-[15px]">
          <Image className="stroke-[1.3] w-[30px]" />
        </div>
      )
    },
    enableHiding: false,
    cell: ({ row }) => {
      const image = row.original.images[0]?.image
      return (
        <div className="w-[60px] h-[60px] overflow-hidden rounded-md">
          {image ? (
            <img
              src={image}
              className="w-full h-full object-cover object-center scale-120"
            />

          ) : (
            <img
              src={"/images/placeholder.png"}
              className="w-full h-full object-cover object-center scale-150"
            />
          )}

        </div>
      )
    }
  },
  {
    accessorKey: "name",
    header: () => <span className="text-black">Name</span>,
    enableHiding: false,
    cell: ({ row }) => {
      return row.original.name
    }
  },
  {
    accessorKey: "salePrice",
    header: () => <span className="text-black">Price</span>,
    enableHiding: false,
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("salePrice"))
      const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)

      return <span className="font-medium">{formattedPrice}</span>
    }
  },
  {
    accessorKey: "quantity",
    header: () => <span className="text-black">Quantity</span>,
    cell: ({ row }) => {
      const quantity = row.original.quantity
      return (
        <div>
          {quantity === 0 ? (
            <span className="text-red-600 font-semibold">
              Out of Stock ({quantity})
            </span>
          ) : (
            <span className="text-green-600 font-semibold">
              Available ({quantity})
            </span>
          )}
        </div>
      )
    }

  },
  {
    accessorKey: "category",
    header: () => <span className="text-black">Category</span>,
    cell: ({ row }) => {
      return row.original.category?.name ?? "--"
    }
  },
  {
    accessorKey: "style",
    header: () => <span className="text-black">Style</span>,
    cell: ({ row }) => {
      return row.original.style?.name ?? "--"
    }
  },
  {
    accessorKey: "featured",
    header: () => <span className="text-black">Featured</span>,
    cell: ({ row }) => {
      const featured = row.original.featured as boolean;
      return (
        <Switch
          checked={featured}
          className={`${featured ? 'bg-green-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">featured</span>
          <span
            className={`${featured ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      )
    }
  },
  {
    accessorKey: "isNew",
    header: () => <span className="text-black">New</span>,
    cell: ({ row }) => {
      const isNew = row.original.isNew as boolean;
      return (
        <Switch
          checked={isNew}
          className={`${isNew ? 'bg-green-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className="sr-only">isNew</span>
          <span
            className={`${isNew ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      )
    }
  },
  {
    header: () => {
      return (
        <div className="flex justify-end">
          <span className="text-black">Actions</span>
        </div>
      )
    },
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.original.id;
      return (
        <div className="flex justify-end gap-x-3">
          <Link href={route("products.edit", id)}>
            <Button
              variant="outline"
              size={"sm"}
              className="flex gap-x-1 items-center"
            >
              Edit <FolderEdit size={15} className="stroke-[1.5]" />
            </Button>
          </Link>
          <Link href={route("products.duplicate", id)}>
            <Button
              variant="outline"
              size={"sm"}
              className="flex gap-x-1 items-center"
            >
              Duplicate <Copy size={15} className="stroke-[1.5]" />
            </Button>
          </Link>
        </div>
      )
    }
  }
]
