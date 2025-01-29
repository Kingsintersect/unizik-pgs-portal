"use client";

import useToken from "@/hook/useToken";
import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PayAcceptanceFee } from "@/app/actions/student";
import { notify } from "@/contexts/ToastProvider";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFormField } from "../inputs/FormFields";

const AppPayAcceptanceFeeModal = ({ modalSize = "md" }: { modalSize?: string }) => {
   const router = useRouter();
   const [openModal, setOpenModal] = useState(false);
   const { token } = useToken();
   const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
   } = useForm<PayAcceptanceFormData>({ resolver: zodResolver(PayAcceptanceFeeSchema), });

   const onSubmit: SubmitHandler<PayAcceptanceFormData> = async (data) => {
      if (token) {
         const { error, success } = await PayAcceptanceFee(token, { ...data })
         if (error) {
            console.log('result.errors', error.message);
            return;
         }
         notify({ message: "Successfull", variant: "success", timeout: 5000 });
         setOpenModal(false);
         localStorage.setItem("acceptance_data", success.data);
         router.push(success.data.authorizationUrl);
            router.refresh();
         return;
      }
   }

   const handleOpenModal = (state: boolean) => {
      setOpenModal(state)
   }

   return (
      <>
         <Button size="lg" className="bg-orange-800 text-white hover:bg-orange-600!important" onClick={() => handleOpenModal(true)}>Accept Admission</Button>
         <Modal show={openModal} size={modalSize} onClose={() => handleOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body>
               <div className="text-center">
                  <div className="text-center w-full mb-1 text-orange-600 dark:text-orange-200 font-bold text-5xl" >
                     30,000
                  </div>
                  <h3 className="mb-10 text-lg font-normal text-gray-700">
                     Acceptance Fee
                  </h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <InputFormField<PayAcceptanceFormData>
                        type="hidden"
                        id={'amount'}
                        label={""}
                        name="amount"
                        register={register}
                        error={errors.amount}
                        valueAsNumber
                        value={30000}
                     />
                     <div className="flex justify-center gap-4">
                        <Button color="gray" type="button" onClick={() => handleOpenModal(false)}>
                           No, cancel
                        </Button>
                        <Button color="success" type="submit">
                           {"Pay Acceptance"}
                        </Button>
                     </div>
                  </form>
               </div>
            </Modal.Body>
         </Modal>
      </>
   );
}

export default AppPayAcceptanceFeeModal

const PayAcceptanceFeeSchema: ZodType<PayAcceptanceFormData> = z.object({
   amount: z
      .number({ required_error: "Amount is required" })
      .positive({ message: "Amount must be a positive number" }),
});

type PayAcceptanceFormData = {
   amount: number;
};
