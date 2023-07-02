import { Checkbox } from "@/components/ui/Checkbox";

import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowActions";

export const Columns = (deleteOrderHandler) => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        f
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "buyer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Buyer" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("buyer")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "products",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order products" />
    ),
    cell: ({ row }) => (
      <div className="w-[160px]">
        {row.original.products.map((product) => (
          <div key={product.id}>
            <p>{product.product_name}</p>
          </div>
        ))}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "prices",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prices" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        {row.original.products.map((product) => (
          <div key={product.id}>
            <p>{product.price} $</p>
          </div>
        ))}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "sum",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Sum" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("sum")} $
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} onDeleteOrder={deleteOrderHandler}/>,
  },
];
