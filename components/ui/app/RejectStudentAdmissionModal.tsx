"use client";

import { RejectStudentAdmission } from "@/app/actions/admin";
import { baseUrl } from "@/config";
import { notify } from "@/contexts/ToastProvider";
import useToken from "@/hook/useToken";
import { Button, Label, Modal, Textarea } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const RejectStudentAdmissionModal = ({ modalSize, id }: { modalSize: string, id: any }) => {
   const router = useRouter();
   const methods = useForm();
   const [openModal, setOpenModal] = useState(false);
   const { token } = useToken();
   const { handleSubmit } = methods;

   const onSubmit = async (data: any) => {
      setOpenModal(false)
      if (token) {
         const { error, success } = await RejectStudentAdmission(token, { ...data, application_id: id });
         if (error) {
            console.log('errors', error.message);
            notify({ message: "Something went wrong", variant: "error", timeout: 5000 });
         }
         if (success) {
            notify({ message: "Successfull", variant: "success", timeout: 5000 });
            router.push(`${baseUrl}/dashboard/admin/student-applications`);
            router.refresh();
         }
      } else {
         router.push(`${baseUrl}/auth/student`);
         router.refresh();
      }
   }

   const handleOpenModal = (state: boolean) => {
      setOpenModal(state)
   }

   return (
      <>
         <div className="flex flex-wrap gap-4">
            <Button color={"failure"} onClick={() => handleOpenModal(true)}>Reject Admission</Button>
         </div>
         <Modal show={openModal} size={modalSize} onClose={() => handleOpenModal(false)}>
            <FormProvider {...methods}>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <Modal.Header>
                     {/* <HiOutlineCheckCircle className="mx-auto mb-4 h-14 w-14 text-red-400 dark:text-red-200" /> */}
                     <div className="font-semibold text-3xl">Confirm Admission Rejection</div>
                  </Modal.Header>
                  <Modal.Body>
                     <div className="space-y-6 p-6">
                        <div className="mb-2 block">
                           <Label htmlFor="reason" className="text-xl text-red-400 font-bold" value="State your reason/reasons for rejection..." />
                        </div>
                        <Textarea id="reason" placeholder="Leave a reason..." {...methods.register('reason')} required rows={4} />
                     </div>
                  </Modal.Body>
                  <Modal.Footer className="flex items-center justify-between">
                     <Button color="gray" type="button" onClick={() => handleOpenModal(false)}>
                        Cancel
                     </Button>
                     <Button color={"failure"} type="submit" >Reject</Button>
                  </Modal.Footer>
               </form>
            </FormProvider>
         </Modal>
      </>
   );
}

export default RejectStudentAdmissionModal

