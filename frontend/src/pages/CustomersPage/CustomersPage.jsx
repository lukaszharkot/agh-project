import { MainNav } from "@/components/MainNav";

import { DataTable } from "./components/DataTable";
import { Columns } from "./components/Columns";
import { UserNav } from "./components/UserNav";
import { navigationLinks } from "../../config/navigationLinks";
import React, { useState, useEffect } from 'react';
import { fetchCustomers, deleteCustomer } from "@/config/methods";
import { Toaster } from '@/components/ui/Toaster';
import { useToast } from "@/components/ui/use-toast"


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
          id: 1,
          title: "Customer deleted.",
          description: "We've deleted a customer for you.",
          duration: 3000,
        });
      })
      .catch(() => {
        toast({
          id: 2,
          title: "Error deleting customer.",
          description: "An error occurred while deleting the customer.",
          duration: 3000,
        });
      });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="hidden flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
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
            columns={Columns(deleteCustomerHandler)}
          />
          <Toaster />
        </div>
      </div>
    </div>
  );
};
