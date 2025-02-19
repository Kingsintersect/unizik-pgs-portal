"use client";

import { DeleteSingleCountry } from "@/app/actions/server.admin";
import { notify } from "@/contexts/ToastProvider";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

export const DeleteCountry = ({ token, id }: { token: string, id: string }) => {
   const router = useRouter();
   const handleCountryDelete = async (id: string) => {
      const { error, success }: any = await DeleteSingleCountry(token, id);
      if (error) {
         console.log('error', error)
         notify({ message: 'Failed To Delete Data Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         notify({ message: 'Deleted Successfully.', variant: "success", timeout: 5000 })
         router.refresh();
      }
   }

   return (
      <>
         <span className="" onClick={() => handleCountryDelete(id)}>
            <DropdownMenuItem>
               <TrashIcon className="w-5" />
               <span className="inline-block">Delete</span>
            </DropdownMenuItem>
         </span>
      </>
   )
}