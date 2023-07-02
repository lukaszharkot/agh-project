/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./DataTableViewOptions";

export function DataTableToolbar({ table }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter products..."
          value={table.getColumn("product_name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("product_name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex items-center space-x-2">
        <DataTableViewOptions table={table} />
        <a href="/add-product">Add Product +</a>
      </div>
    </div>
  );
}
