"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import {  SubmitHandler, useForm } from "react-hook-form";
import { z, ZodType } from 'zod';
import { ArrowRightIcon } from "lucide-react";
import { CreateNewState } from '@/app/actions/server.admin';
import { notify } from '@/contexts/ToastProvider';
import { baseUrl } from '@/config';
import { useRouter } from 'next/navigation';
import { InputFormField, SelectFormField } from '@/components/ui/inputs/FormFields';
import { Button } from '@/components/ui/button';

const CreateState = ({ token, country }: { token: string, country: Country[] }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
   } = useForm<CreateStateData>({ resolver: zodResolver(CreateStateSchema), });
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   const onSubmit: SubmitHandler<CreateStateData> = async (data) => {

      setIsLoading(true);
      const { error, success }: any = await CreateNewState(token, data);
      if (error) {
         console.log('error', error)
         setIsLoading(false);
         notify({ message: 'Create Data Failed Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         setIsLoading(false);
         notify({ message: 'Create Data Successful.', variant: "success", timeout: 5000 })
         router.push(`${baseUrl}/dashboard/admin/region/states`)
            router.refresh();
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="grid col-auto text-gray-700 space-y-10 mx-auto p-10 md:p-16 bg-gray-200 w-full sm:w-3/4 md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl font-bold mb-4">
               Create <span className="text-orange-700 font-extralight inline-block ml-10">{"New State"}</span>
            </h1>
            {/* <SelectFormField<CreateStateData>
               id={'parent'}
               name="parent"
               label={"Select The country"}
               register={register}
               valueAsNumber
               error={errors.parent}
            >
               <option value={""}>Country Option</option>
               {country && country.map((item: any, i: any) => (
                  <option key={i} value={item.id}>{item.name}</option>
               ))}
            </SelectFormField> */}
            <InputFormField<CreateStateData>
               type="text"
               label="State Name"
               name="name"
               id={''}
               register={register}
               error={errors.name} />
            <div className="flex justify-center w-full">
               <Button type='submit'>
                  Save New State
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
               </Button>
            </div>
         </div>
      </form>
   )
}

export default CreateState

type CreateStateData = {
   name: string,
   // parent: number,
};
export const CreateStateSchema: ZodType<CreateStateData> = z.object({
   name: z
      .string({ message: "Name is required" })
      .min(3, "Name should be at least 3 characters"),
   // parent: z
   //    .number({ message: "Country is required" })
});
