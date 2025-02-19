"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodType } from 'zod';
import { ArrowRightIcon } from "lucide-react";
import { CreateNewCountry } from '@/app/actions/server.admin';
import { notify } from '@/contexts/ToastProvider';
import { baseUrl } from '@/config';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { InputFormField } from '@/components/ui/inputs/FormFields';

const CreateCountry = ({ token }: { token: string }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
   } = useForm<CreateCountryFormData>({ resolver: zodResolver(CreateDepartmentSchema), });
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   const onSubmit: SubmitHandler<CreateCountryFormData> = async (data) => {

      setIsLoading(true);
      const { error, success }: any = await CreateNewCountry(token, data);
      if (error) {
         console.log('error', error)
         setIsLoading(false);
         notify({ message: 'Create Data Failed Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         setIsLoading(false);
         notify({ message: 'Create Data Successful.', variant: "success", timeout: 5000 })
         router.push(`${baseUrl}/dashboard/admin/region/countries`)
            router.refresh();
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="grid col-auto text-gray-700 space-y-10 mx-auto p-10 md:p-16 bg-gray-200 w-full sm:w-3/4 md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl font-bold mb-4">
               Create <span className="text-orange-700 font-extralight inline-block ml-10">{"New Country"}</span>
            </h1>
            <InputFormField<CreateCountryFormData>
               type="text"
               id={'name'}
               label="Country Name"
               name="name"
               register={register}
               error={errors.name}
            />
            <div className="flex justify-center w-full">
               <Button type='submit'>
                  Save New Country
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
               </Button>
            </div>
         </div>
      </form>
   )
}

export default CreateCountry


export type CreateCountryFormData = {
   name: string;
};

export const CreateDepartmentSchema: ZodType<CreateCountryFormData> = z.object({
   name: z
      .string({ message: "Country name is required" })
      .min(3, "Country name should be at least 3 characters"),
})
