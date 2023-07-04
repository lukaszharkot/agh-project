/* eslint-disable react/prop-types */
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./DataTableViewOptions";
import { border } from "@chakra-ui/react";

export function DataTableToolbar({ table }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter customers by surname..."
          value={table.getColumn("surname")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("surname")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex items-center space-x-2">
        <DataTableViewOptions table={table} />
        <a style={{color:"#0F172A", border:"#0F172A 1px solid", padding:"2px", borderRadius:"7px"}} href="/add-customer">Add Customer +</a>
      </div>
    </div>
  );
}
