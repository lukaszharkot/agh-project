/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./DataTableViewOptions";

export function DataTableToolbar({ table }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter orders by email..."
          value={table.getColumn("buyer")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("buyer")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex items-center space-x-2">
        <DataTableViewOptions table={table} />
        <a href="/add-order">Add Order +</a>
      </div>
    </div>
  );
}
