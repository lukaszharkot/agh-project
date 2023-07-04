import { MainNav } from "@/components/MainNav";

import { DataTable } from "./components/DataTable";
import { Columns } from "./components/Columns";
import { UserNav } from "./components/UserNav";
import { navigationLinks } from "../../config/navigationLinks";
import React, { useState, useEffect } from 'react';
import { fetchOrders, deleteOrder, editOrder } from "@/config/methods";
import { Toaster } from '@/components/ui/Toaster';
import { useToast } from "@/components/ui/use-toast"
import TeamSwitcher from "@/components/TeamSwitcher";


export const OrdersPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchOrders().then(setData)
  },[]);

  const { toast } = useToast();

  const deleteOrderHandler = (orderID) => {
    deleteOrder(orderID)
      .then(() => {
        fetchOrders().then(setData);
        toast({
          title: "Order deleted.",
          description: "We've deleted a order for you.",
          duration: 3000,
        });
      })
      .catch(() => {
        toast({
          title: "Error deleting order.",
          description: "An error occurred while deleting the order.",
          duration: 3000,
        });
      });
  };

  const editOrderHandler = (orderId, updatedData) => {
    editOrder(orderId, updatedData)
      .then(() => {
        fetchOrders().then(setData);
        toast({
          title: "Order updated.",
          description: "We've updated the order information.",
          duration: 3000,
        });
      })
      .catch((error) => {
        toast({
          title: "Error updating order.",
          description: "An error occurred while updating the order information.",
          duration: 3000,
          status: "error",
        });
        console.error("Error updating order:", error);
      });
  };

  useEffect(() => {
    console.log(data)
  },[data]);

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
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
          <DataTable
            data={data}
            columns={Columns(deleteOrderHandler, editOrderHandler)}
          />
          <Toaster />
        </div>
      </div>
    </div>
  );
};
