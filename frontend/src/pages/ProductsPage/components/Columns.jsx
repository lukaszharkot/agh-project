import { Checkbox } from "@/components/ui/Checkbox";

import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowActions";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { fetchProducts } from "@/config/methods";
import { InputEdit } from "../../../components/InputEdit";

export const Columns = (deleteProductHandler, editProductHandler) => {
  const [data, setData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false)
  const [productnameValue, setProductnameValue] = useState("");
  const [priceValue, setPriceValue] = useState("");

  useEffect(() => {
    fetchProducts().then(setData);
  }, []);

  const handleProductnameChange = (event) => {
    console.log(event.target.value)
    setProductnameValue(event.target.value);
  };
  
  const handlePriceChange = (event) => {
    console.log(event.target.value)
    setPriceValue(event.target.value);
  };

  const handleSaveClick = (row) => {
    if (isEditMode === row.id) {
      setIsEditMode(false);
      const updatedData = {
        ...row,
        product_name: productnameValue,
        price: priceValue,

      };
      editProductHandler(data[row.id].id, updatedData);
    }
  };

  const changeEditMode = (row) => {
    setIsEditMode(row.id);
    setProductnameValue(row.getValue("product_name"));
    setPriceValue(row.getValue("price"));
  }

  return [
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
        <DataTableColumnHeader column={column} title="Product ID" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    // {
    //   accessorKey: "product_name",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Product Name" />
    //   ),
    //   cell: ({ row }) => <div className="w-[140px]">{row.getValue("product_name")}</div>,
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "product_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Product Name" />
      ),
      cell: ({ row }) => 
        <div className="w-[160px]">
          {isEditMode === row.id ? (
            <div className="flex items-center">
              <InputEdit
                value={productnameValue}
                handleChange={handleProductnameChange}
              />
            </div>
          ) : (
            <div className="w-[160px]">{row.getValue("product_name")}</div>
          )}
        </div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
      ),
      cell: ({ row }) => 
        <div className="w-[160px]">
          {isEditMode === row.id? (
            <div className="flex items-center">
              <InputEdit
                value={priceValue}
                handleChange={handlePriceChange}
              />
            </div>
          ) : (
            <div className="max-w-[500px] truncate font-medium">{row.getValue("price")} $</div>
          )}
        </div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="w-[40px]">
          {isEditMode === row.id ? (
            <Button variant="outline" onClick={() => handleSaveClick(row)}>Save</Button>
          ) : (
            <DataTableRowActions
              row={row}
              onDeleteProduct={deleteProductHandler}
              changeEditMode={() => changeEditMode(row)}
            />
          )}
        </div>
      ),
    }
  ];
};
