"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodType } from 'zod';
import { ArrowRightIcon, Loader2 } from "lucide-react";
import { UpdateSingleState } from '@/app/actions/server.admin';
import { notify } from '@/contexts/ToastProvider';
import { baseUrl } from '@/config';
import { useRouter } from 'next/navigation';
import { InputFormField, SelectFormField } from '@/components/ui/inputs/FormFields';
import { Button } from '@/components/ui/button';


const UpdateState = ({ token, state, }: { token: string, state: State, }) => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isValid, isSubmitting },
      setError,
   } = useForm<StateFormData>({ resolver: zodResolver(UpdateStateSchema), });
   const router = useRouter();

   useEffect(() => {
      if (state) {
         reset(state);  // Reset form with parent data
      }
   }, [reset, state]);

   const onSubmit: SubmitHandler<StateFormData> = async (data) => {
      const { error, success }: any = await UpdateSingleState(state.id, token, data);
      if (error) {
         console.log('error', error)
         notify({ message: 'state Update Failed Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         notify({ message: 'State Update Data Successful.', variant: "success", timeout: 5000 })
         router.push(`${baseUrl}/dashboard/admin/region/states`)
            router.refresh();
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="grid col-auto text-gray-700 space-y-10 mx-auto p-10 md:p-16 bg-gray-200 w-full sm:w-3/4 md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl font-bold mb-4">
               <span className="text-orange-700 font-extralight inline-block">{state.name}</span>
            </h1>
            {/* <SelectFormField<CreateStateData>
               name="country"
               control={control}
               label="Select Country"
               options={countries.map((country: any) => ({ value: String(country.id), label: country.name }))}
               placeholder="Choose a Country"
               error={errors.country}
            /> */}
            <InputFormField<StateFormData>
               type="text"
               label="State Name"
               name="name"
               id={''}
               register={register}
               error={errors.name} />

            <div className="flex justify-center w-full">
               <Button
                  type='submit'
                  disabled={!isValid || isSubmitting}
               >
                  {isSubmitting
                     ? (
                        <>
                           <span>{"Updating data "}</span>
                           <Loader2 fontSize={20} size={40} className="animate-spin text-lg" />
                        </>
                     )
                     : <span>{"Update State"}</span>
                  }
               </Button>
            </div>
         </div>
      </form>
   )
}

export default UpdateState

type StateFormData = {
   name: string,
   // parent: number,
};
export const UpdateStateSchema: ZodType<StateFormData> = z.object({
   name: z
      .string({ message: "Name is required" })
      .min(3, "Name should be at least 3 characters"),
   // parent: z
   //    .number({ message: "Country is required" })
});
