import { MainNav } from "@/components/MainNav";
import { AddCustomerForm } from "@/pages/CustomersPage/components/AddCustomerForm";
import { navigationLinks } from "../config/navigationLinks";
import { UserNav } from "./CustomersPage/components/UserNav";
import { useToast } from "@/components/ui/use-toast"
import { createCustomer } from "@/config/methods";
import { Toaster } from '@/components/ui/Toaster';
import TeamSwitcher from "@/components/TeamSwitcher";

export const AddCustomerPage = () => {
  const { toast } = useToast();

  const AddCustomerHandler = (name, surname, email, phone_number) => {
    createCustomer({ name, surname, email, phone_number }).then(() => {
      toast({
        id: 1,
        title: "Customer created.",
        description: "We've created a new customer for you.",
        duration: 3000,
      });
    });
  };

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
          <h2 className="text-3xl font-bold tracking-tight">Add customer</h2>
        </div>
        <div className="hidden h-full flex-1 flex-col space-y-8 md:flex">
          <AddCustomerForm onAdd={AddCustomerHandler} />
          <Toaster />
        </div>
      </div>
    </div>
  );
};
