"use client";

import { DeleteSingleCourseAssignment } from "@/app/actions/server.admin";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { notify } from "@/contexts/ToastProvider";
import { extractErrorMessages } from "@/lib/utils/errorsHandler";
import { TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const DeleteCourseAssignment = ({ token, id }: { token: string, id: string }) => {
   const router = useRouter();

   const handleCourseDelete = async (id: string) => {
      const { error, success }: any = await DeleteSingleCourseAssignment(token, id);
      if (error) {
         const errorMessages = extractErrorMessages(error);
         errorMessages.forEach((msg) => {
            notify({ message: msg, variant: "error", timeout: 10000 });
         });
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
         <span className="" onClick={() => handleCourseDelete(id)}>
            <DropdownMenuItem>
               <TrashIcon className="w-5" />
               <span className="inline-block">Delete</span>
            </DropdownMenuItem>
         </span>
      </>
   )
}