"use client";
import useToken from '@/hook/useToken';
import { Button, Modal, Tabs } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { PayTuitionFee } from '@/app/actions/student';
import { notify } from '@/contexts/ToastProvider';
import { z, ZodType } from 'zod';
import { InputFormField } from '../inputs/FormFields';
import { zodResolver } from '@hookform/resolvers/zod';
import { HiAdjustments, HiClipboardList, HiUserCircle, HiOutlineCurrencyDollar } from "react-icons/hi";

const AppPayTuition = ({ studentData, modalSize = "md" }: { studentData:StudentType, modalSize?: string }) => {
   const router = useRouter();
   const [openModal, setOpenModal] = useState(false);
   const { token } = useToken();
   const outstandingBalance = (195000) - Number(studentData.tuition_amount_paid)
   const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
   } = useForm<PayTuitionFeeFormData>();

   const onSubmit: SubmitHandler<PayTuitionFeeFormData> = async (data) => {
      const amount = data.paymentType === "full" 
         ? data.fullAmount ?? 0 // defaults to 0 if undefined
         : data.paymentType === "installment"
         ? data.installmentAmount ?? 0
         : data.outstandingAmount ?? 0;
      
      if (data.paymentType === "installment") {
         if (typeof amount === 'undefined' || isNaN(amount)) {
            setError('installmentAmount', {
               type: 'manual',
               message: 'Amount must be a valid number.',
            });
            return;
         }
         if (amount < 195000 / 2) {
            setError("installmentAmount", {
               type: "manual",
               message: "Amount must be at least 50% (#97,500 or more)",
            });
            return;
         }
      }
      if (data.paymentType === "outstanding") {
         if (typeof amount === 'undefined' || isNaN(amount)) {
            setError('outstandingAmount', {
               type: 'manual',
               message: 'Amount must be a valid number.',
            });
            return;
         }
         if (amount !== outstandingBalance) {
            setError("outstandingAmount", {
               type: "manual",
               message: `Your Outsatnding fee is ${outstandingBalance}`,
            });
            return;
         }
      }

      if (token) {
         const { error, success } = await PayTuitionFee(token, { amount: amount! })
         if (error) {
            notify({ message: "Tuition Payment Was Unsuccessfull", variant: "error", timeout: 5000 })
            console.log('result.errors', error.message);
            return;
         }
         if (success) {
            setOpenModal(false);
            localStorage.setItem("acceptance_data", success.data);
            router.push(success.data.authorizationUrl);
            router.refresh();
            return;
         }

      }
   }

   const handleOpenModal = (state: boolean) => {
      setOpenModal(state)
   }

   return (
      <>
         <Button size="lg" className="bg-orange-800 text-white hover:bg-orange-600!important" onClick={() => handleOpenModal(true)}>
            {(Number(studentData.tuition_amount_paid)>0)? "Clear Your Outstanding Fee" :"Pay For Your Tution"}
            
         </Button>
         <Modal show={openModal} size={modalSize} onClose={() => handleOpenModal(false)} popup>
            <Modal.Header />
               <Modal.Body>
                     {(studentData.tuition_amount_paid! > 0) ?
                        <Tabs aria-label="Tabs with icons" variant="fullWidth">
                        
                           <Tabs.Item title="PAY YOUR OUTSTANDING TUITION FEE" icon={HiOutlineCurrencyDollar} color='green'>
                              <div className="text-center">
                                 <div className="text-center w-full mb-1 text-orange-800 dark:text-orange-200 font-bold text-5xl" >
                                    {outstandingBalance.toLocaleString()}
                                 </div>
                                 <h3 className="mb-10 mt-4 text-lg font-semibold text-orange-400">
                                    You are about to pay your outstanding tuition fee of ({outstandingBalance.toLocaleString()})
                                 </h3>
                                 <form onSubmit={handleSubmit((data) => onSubmit({ ...data, paymentType: "outstanding" }))}>
                                    <div className="text-left">
                                       <InputFormField<PayTuitionFeeFormData>
                                          type="hidden"
                                          id={'outstandingAmount'}
                                          label={"Amount (should not be less than 50%)"}
                                          name="outstandingAmount"
                                          register={register}
                                          error={errors.outstandingAmount}
                                          valueAsNumber
                                          value={outstandingBalance}
                                       />
                                       <div className="flex justify-center items-center gap-4 mt-10">
                                          <Button color="success" type="submit">
                                             {"Continue to payment"}
                                          </Button>
                                       </div>
                                    </div>                              
                                 </form>
                              </div>
                           </Tabs.Item>
                        </Tabs>
                        :
                        <Tabs aria-label="Tabs with icons" variant="fullWidth">
                           <Tabs.Item title="PAY TUITION IN FULL" icon={HiOutlineCurrencyDollar}>
                              <div className="text-center">
                                 <div className="text-center w-full mb-1 text-orange-800 dark:text-orange-200 font-bold text-5xl" >
                                    195,000
                                 </div>
                                 <h3 className="mb-10 mt-4 text-lg font-semibold text-orange-400">
                                    You are about to make full payment
                                 </h3>
                                 <form onSubmit={handleSubmit((data) => onSubmit({ ...data, paymentType: "full" }))}>
                                    <InputFormField<PayTuitionFeeFormData>
                                       type="hidden"
                                       id={'fullAmount'}
                                       label={""}
                                       name="fullAmount"
                                       register={register}
                                       error={errors.fullAmount}
                                       valueAsNumber
                                       value={195000}
                                    />
                                    <div className="flex justify-center items-center gap-4 mt-10">
                                       <Button color="success" type="submit">
                                          {"Pay Tuition"}
                                       </Button>
                                    </div>
                                 </form>
                              </div>
                           </Tabs.Item>
                        
                           <Tabs.Item title="PAY IN INSTALLMENTS" icon={HiOutlineCurrencyDollar}>
                              <div className="text-center">
                                 {/* <div className="text-center w-full mb-1 text-orange-800 dark:text-orange-200 font-bold text-5xl" >
                                    195,000
                                 </div> */}
                                 <h3 className="mb-10 mt-4 text-lg font-semibold text-orange-400">
                                    Enter any amount from 50% and above (# 97,500) and above
                                 </h3>
                                 <form onSubmit={handleSubmit((data) => onSubmit({ ...data, paymentType: "installment" }))}>
                                    <div className="text-left">
                                       <InputFormField<PayTuitionFeeFormData>
                                          type="text"
                                          id={'installmentAmount'}
                                          label={"Amount (should not be less than 50%)"}
                                          name="installmentAmount"
                                          register={register}
                                          error={errors.installmentAmount}
                                          valueAsNumber
                                       />
                                       <div className="flex justify-center items-center gap-4 mt-10">
                                          <Button color="success" type="submit">
                                             {"Continue to payment"}
                                          </Button>
                                       </div>
                                    </div>                              
                                 </form>
                              </div>
                           </Tabs.Item>
                        </Tabs>
                     }
      
                  
                     
                  
                     
                  
                  <div className="block">
                     <Button color="gray" type="button" onClick={() => handleOpenModal(false)}>
                        No, cancel
                     </Button>
                  </div>
            </Modal.Body>
         </Modal>
      </>
   )
}

export default AppPayTuition

type PayTuitionFeeFormData = {
   fullAmount?: number;
   installmentAmount?: number;
   outstandingAmount?: number;
   paymentType: "full" | "installment" | "outstanding";
};

// const PayTuitionFeeSchema: ZodType<PayTuitionFeeFormData> = z.object({
//    fullAmount: z.number().optional(),
//    installmentAmount: z.number().optional(),
//    paymentType: z.enum(["full", "installment"]),
//    //  .min((195000/2), { message: "Amount must be at least 50% (# 97,500 or more)" }),
// });