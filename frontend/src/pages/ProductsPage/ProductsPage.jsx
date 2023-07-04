import { MainNav } from "@/components/MainNav";

import { DataTable } from "./components/DataTable";
import { Columns } from "./components/Columns";
import { UserNav } from "./components/UserNav";
import { navigationLinks } from "../../config/navigationLinks";
import React, { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct, editProduct } from "@/config/methods";
import { Toaster } from '@/components/ui/Toaster';
import { useToast } from "@/components/ui/use-toast"
import TeamSwitcher from "@/components/TeamSwitcher";


export const ProductsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchProducts().then(setData)
  },[]);

  const { toast } = useToast();

  const deleteProductHandler = (productID) => {
    deleteProduct(productID)
      .then(() => {
        fetchProducts().then(setData);
        toast({
          title: "Product deleted.",
          description: "We've deleted a product for you.",
          duration: 3000,
        });
      })
      .catch(() => {
        toast({
          title: "Error deleting product.",
          description: "An error occurred while deleting the product.",
          duration: 3000,
        });
      });
  };

  const editProductHandler = (productId, updatedData) => {
    editProduct(productId, updatedData)
      .then(() => {
        fetchProducts().then(setData);
        toast({
          title: "Product updated.",
          description: "We've updated the product information.",
          duration: 3000,
        });
      })
      .catch((error) => {
        toast({
          title: "Error updating product.",
          description: "An error occurred while updating the product information.",
          duration: 3000,
          status: "error",
        });
        console.error("Error updating product:", error);
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
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
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
            columns={Columns(deleteProductHandler, editProductHandler)}
          />
          <Toaster />
        </div>
      </div>
    </div>
  );
};
