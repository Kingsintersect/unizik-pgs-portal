"use client";

import { DeleteSingleDepartment } from "@/app/actions/server.admin";
import { notify } from "@/contexts/ToastProvider";
import { TrashIcon } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export const DeleteDepartment = ({ token, id }: { token: string, id: string }) => {
   const router = useRouter();

   const handleDepartmentDelete = async (id: string) => {
      const { error, success }: any = await DeleteSingleDepartment(token, id);
      if (error) {
         console.log('error', error)
         notify({ message: 'Failed To Delete Data Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         notify({ message: 'Deleted Successfully.', variant: "success", timeout: 5000 });
         router.refresh();
         hardReload();
      }
   }
   const hardReload = () => {
      window.location.reload();
   };

   return (
      <>
         <span className="" onClick={() => handleDepartmentDelete(id)}>
            <DropdownMenuItem>
               <TrashIcon className="w-5" />
               <span className="inline-block">Delete</span>
            </DropdownMenuItem>
         </span>
      </>
   )
}