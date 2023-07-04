import { Checkbox } from "@/components/ui/Checkbox";

import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { DataTableRowActions } from "./DataTableRowActions";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { fetchCustomers } from "@/config/methods";
import { InputEdit } from "../../../components/InputEdit";

export const Columns = (deleteCustomerHandler, editCustomerHandler) => {
  const [data, setData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false)
  const [nameValue, setNameValue] = useState("");
  const [surnameValue, setSurnameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneNumberValue, setPhoneNumberValue] = useState("");

  useEffect(() => {
    fetchCustomers().then(setData);
  }, []);

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNameValue(event.target.value);
  };
  
  const handleSurnameChange = (event) => {
    console.log(event.target.value)
    setSurnameValue(event.target.value);
  };
  
  const handleEmailChange = (event) => {
    console.log(event.target.value)
    setEmailValue(event.target.value);
  };
  
  const handlePhoneNumberChange = (event) => {
    console.log(event.target.value)
    setPhoneNumberValue(event.target.value);
  };

  const handleSaveClick = (row) => {
    if (isEditMode === row.id) {
      setIsEditMode(false);
      const updatedData = {
        ...row,
        name: nameValue,
        surname: surnameValue,
        email: emailValue,
        phone_number: phoneNumberValue,
      };
      editCustomerHandler(data[row.id].id, updatedData);
    }
  };

  // const handleEditClick = (row) => {
  //   setIsEditMode(row.id);
  //   setNameValue(row.getValue("name"));
  //   setSurnameValue(row.getValue("surname"));
  //   setEmailValue(row.getValue("email"));
  //   setPhoneNumberValue(row.getValue("phone_number"));
  // };

  const changeEditMode = (row) => {
    console.log(row.id)
    console.log(row.getValue("name"))
    setIsEditMode(row.id);
    setNameValue(row.getValue("name"));
    setSurnameValue(row.getValue("surname"));
    setEmailValue(row.getValue("email"));
    setPhoneNumberValue(row.getValue("phone_number"));
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
        <DataTableColumnHeader column={column} title="Customer ID" />
      ),
      cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => 
        <div className="w-[160px]">
          {isEditMode === row.id ? (
            <div className="flex items-center">
              <InputEdit
                value={nameValue}
                handleChange={handleNameChange}
              />
            </div>
          ) : (
            <div className="w-[160px]">{row.getValue("name")}</div>
          )}
        </div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "surname",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Surname" />
      ),
      cell: ({ row }) => 
        <div className="w-[160px]">
          {isEditMode === row.id? (
            <div className="flex items-center">
              <InputEdit
                value={surnameValue}
                handleChange={handleSurnameChange}
              />
            </div>
          ) : (
            <div className="w-[160px]">{row.getValue("surname")}</div>
          )}
        </div>,
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
      cell: ({ row }) => 
        <div className="w-[160px]">
          {isEditMode === row.id? (
            <div className="flex items-center">
              <InputEdit
                value={emailValue}
                handleChange={handleEmailChange}
              />
            </div>
          ) : (
            <div className="max-w-[500px] truncate font-medium">{row.getValue("email")}</div>
          )}
        </div>,
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "phone_number",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Phone Number" />
      ),
      cell: ({ row }) => 
        <div className="w-[160px]">
          {isEditMode === row.id? (
            <div className="flex items-center">
              <InputEdit
                value={phoneNumberValue}
                handleChange={handlePhoneNumberChange}
              />
            </div>
          ) : (
            <div className="w-[160px]">{row.getValue("phone_number")}</div>
          )}
        </div>,
      enableSorting: true,
      enableHiding: true,
    },
    // {
    //   id: "edit_button",
    //   cell: ({ row }) => (
    //     <Button onClick={() => handleEditClick(row)}>Edit</Button>
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="w-[40px]">
          {isEditMode === row.id ? (
            <Button variant="outline" onClick={() => handleSaveClick(row)}>Save</Button>
          ) : (
            <DataTableRowActions
              row={row}
              onDeleteCustomer={deleteCustomerHandler}
              changeEditMode={() => changeEditMode(row)}
            />
          )}
        </div>
      ),
    }
  ];
};