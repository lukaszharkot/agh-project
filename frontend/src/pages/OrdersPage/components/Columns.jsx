import { Checkbox } from "@/components/ui/Checkbox";

import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowActions";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { fetchOrders, fetchCustomers } from "@/config/methods";
import { InputEdit } from "../../../components/InputEdit";

export const Columns = (deleteOrderHandler, editOrderHandler) => {
  const [data, setData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false)
  const [productsValue, setProductsValue] = useState([]);
  const [buyerValue, setBuyerValue] = useState("");
  const [customerData, setCustomerData] = useState([]);

  useEffect(() => {
    fetchOrders().then(setData);
  }, []);

  useEffect(() => {
    fetchCustomers().then((fetchedCustomers) => {
      const newData = fetchedCustomers.map((customer) => ({
        id: customer.id,
        email: customer.email,
      }));
      setCustomerData(newData);
      console.log(newData)
    });
  }, []);

  const handleProductsChange = (event) => {
    const value = event.target.value;
    const productsList = value.split(",").map((item) => Number(item.trim()));
    console.log(productsList)
    setProductsValue(productsList);
  };

  const handleBuyerChange = (event) => {
    console.log(event.target.value)
    setBuyerValue(event.target.value);
  };
  
  const handleSaveClick = (row) => {
    if (isEditMode === row.id) {
      setIsEditMode(false);
      const updatedData = {
        ...row,
        products: productsValue,
        buyer: buyerValue,

      };
      editOrderHandler(data[row.id].id, updatedData);
    }
  };

  const changeEditMode = (row) => {
    setIsEditMode(row.id);

    const customerWithEmail = customerData.find(
      (customer) => customer.email === row.getValue("buyer")
    );
    if (customerWithEmail) {
      const id = customerWithEmail.id;
      setBuyerValue(id);
    } 

    const products = row.getValue("products");
    const ids = products.map(product => product.id);
    console.log(ids);

    setProductsValue(ids);
  };

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
        <DataTableColumnHeader column={column} title="Order ID" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    // {
    //   accessorKey: "buyer",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Buyer" />
    //   ),
    //   cell: ({ row }) => {
    //     return (
    //       <div className="flex space-x-2">
    //         <span className="max-w-[500px] truncate font-medium">
    //           {row.getValue("buyer")}
    //         </span>
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: "buyer",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Buyer" />
      ),
      cell: ({ row }) => 
        <div className="w-[160px]">
          {isEditMode === row.id? (
            <div className="flex items-center">
              <InputEdit
                value={buyerValue}
                handleChange={handleBuyerChange}
              />
            </div>
          ) : (
            <div className="max-w-[500px] truncate font-medium">{row.getValue("buyer")}</div>
          )}
        </div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "products",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Order products" />
      ),
      cell: ({ row }) => (
        <div className="w-[160px]">
          {isEditMode === row.id? (
            <div className="flex items-center">
              <InputEdit
                value={productsValue}
                handleChange={handleProductsChange}
              />
            </div>
          ) : (
            <div className="w-[160px]">
              {row.original.products.map((product) => (
                <div key={product.id}>
                  <p>{product.product_name}</p>
                </div>
              ))}
            </div>
          )}
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
    // {
    //   accessorKey: "sum",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Sum" />
    //   ),
    //   cell: ({ row }) => {
    //     return (
    //       <div className="flex space-x-2">
    //         <span className="max-w-[500px] truncate font-medium">
    //           {row.getValue("sum")} $
    //         </span>
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: "sum",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sum" />
      ),
      cell: ({ row }) => {
        const products = row.getValue("products");
        const prices = products.map(product => product.price);
        const sum = prices.reduce((total, price) => total + price, 0);
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {sum} $
            </span>
          </div>
        );
      },
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
              onDeleteOrder={deleteOrderHandler}
              changeEditMode={() => changeEditMode(row)}
            />
          )}
        </div>
      ),
    }
  ];
};
