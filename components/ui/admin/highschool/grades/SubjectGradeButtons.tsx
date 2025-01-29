"use client";

import { DeleteSingleClassSubjects } from "@/app/actions/server.admin";
import { notify } from "@/contexts/ToastProvider";
import { TrashIcon } from "@heroicons/react/24/outline";
import { DropdownItem } from "flowbite-react";

export const DeleteSubjectGrade = ({ token, id }: { token: string, id: string }) => {
   const handleSubjectGradeDelete = async (id: string) => {
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
         <span className="" onClick={() => handleSubjectGradeDelete(id)}>
            <DropdownItem>
               <TrashIcon className="w-5" />
               <span className="inline-block">Delete</span>
            </DropdownItem>
         </span>
      </>
   )
}