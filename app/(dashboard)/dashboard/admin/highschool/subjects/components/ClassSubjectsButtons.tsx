"use client";

import { DeleteSingleClassSubjects } from "@/app/actions/server.admin";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { notify } from "@/contexts/ToastProvider";
import { TrashIcon } from "lucide-react";

export const DeleteClassSubject = ({ token, id }: { token: string, id: string }) => {
   const handleClassSubjectDelete = async (id: string) => {
      const { error, success }: any = await DeleteSingleClassSubjects(token, id);
      if (error) {
         console.log('error', error)
         notify({ message: 'Failed To Delete Data Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         notify({ message: 'Deleted Successfully.', variant: "success", timeout: 5000 })
      }
   }

   return (
      <>
         <span className="" onClick={() => handleClassSubjectDelete(id)}>
            <DropdownMenuItem>
               <TrashIcon className="w-5" />
               <span className="inline-block">Delete</span>
            </DropdownMenuItem>
         </span>
      </>
   )
}