"use client";

import { DeleteSingleLocalGov } from "@/app/actions/server.admin";
import { notify } from "@/contexts/ToastProvider";
import { TrashIcon } from "@heroicons/react/24/outline";
import { DropdownItem } from "flowbite-react";
import { useRouter } from "next/navigation";

export const DeleteLocalGov = ({ token, id }: { token: string, id: string }) => {
   const router = useRouter();
   const handleStateDelete = async (id: string) => {
      const { error, success }: any = await DeleteSingleLocalGov(token, id);
      if (error) {
         console.log('error', error)
         notify({ message: 'Failed To Delete Data Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         notify({ message: 'Deleted Successfully.', variant: "success", timeout: 5000 })
         router.refresh();
         hardReload();
      }
   }
   const hardReload = () => {
      window.location.reload();
   };

   return (
      <>
         <span className="" onClick={() => handleStateDelete(id)}>
            <DropdownItem>
               <TrashIcon className="w-5" />
               <span className="inline-block">Delete</span>
            </DropdownItem>
         </span>
      </>
   )
}