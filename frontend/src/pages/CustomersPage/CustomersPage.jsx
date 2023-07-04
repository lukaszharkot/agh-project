import { MainNav } from "@/components/MainNav";

import { DataTable } from "./components/DataTable";
import { Columns } from "./components/Columns";
import { UserNav } from "./components/UserNav";
import { navigationLinks } from "../../config/navigationLinks";
import React, { useState, useEffect } from 'react';
import { fetchCustomers, deleteCustomer, editCustomer } from "@/config/methods";
import { Toaster } from '@/components/ui/Toaster';
import { useToast } from "@/components/ui/use-toast"
import TeamSwitcher from "@/components/TeamSwitcher";


export const CustomersPage = () => {
  const [data, setData] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetch("http://127.0.0.1:8000/customers");
  //     const jsonData = await data.json();
  //     setData(jsonData);
  //     //console.log(jsonData)
  //     return jsonData
  //   }
  //   const response = fetchData();
  //   //console.log(response);
  //   //setData(response);
  // },[]);

  useEffect(() => {
    fetchCustomers().then(setData)
  },[]);

  const { toast } = useToast();

  const deleteCustomerHandler = (customerId) => {
    deleteCustomer(customerId)
      .then(() => {
        fetchCustomers().then(setData);
        toast({
          title: "Customer deleted.",
          description: "We've deleted a customer for you.",
          duration: 3000,
        });
      })
      .catch(() => {
        toast({
          title: "Error deleting customer.",
          description: "An error occurred while deleting the customer.",
          duration: 3000,
        });
      });
  };

  const editCustomerHandler = (customerId, updatedData) => {
    editCustomer(customerId, updatedData)
      .then(() => {
        fetchCustomers().then(setData);
        toast({
          title: "Customer updated.",
          description: "We've updated the customer information.",
          duration: 3000,
        });
      })
      .catch((error) => {
        toast({
          title: "Error updating customer.",
          description: "An error occurred while updating the customer information.",
          duration: 3000,
          status: "error",
        });
        console.error("Error updating customer:", error);
      });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <TeamSwitcher />
          <MainNav className="mx-6" links={navigationLinks} />
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
          <DataTable
            data={data}
            // data={[
            //   {
            //     id: 1,
            //     fullname: "Test",
            //     email: "test@example.com",
            //     phoneNumber: "000-000-000",
            //   },
            // ]}
            columns={Columns(deleteCustomerHandler, editCustomerHandler)}
          />
          <Toaster />
        </div>
      </div>
    </div>
  );
};
