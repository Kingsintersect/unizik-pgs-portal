"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodType } from 'zod';
import { HiOutlineArrowRight } from "react-icons/hi";
import { UpdateSingleCountry } from '@/app/actions/server.admin';
import { notify } from '@/contexts/ToastProvider';
import { baseUrl } from '@/config';
import { useRouter } from 'next/navigation';
import { InputFormField } from '../../inputs/FormFields';

const UpdateCountry = ({ country, token }: { country: Country, token: string }) => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
   } = useForm<UpdateCountryFormData>({ resolver: zodResolver(UpdateDepartmentSchema), });
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   useEffect(() => {
      if (country) {
         reset(country);  // Reset form with parent data
      }
   }, [country, reset]);

   const onSubmit: SubmitHandler<UpdateCountryFormData> = async (data) => {
      setIsLoading(true);
      const { error, success }: any = await UpdateSingleCountry(token, data);
      if (error) {
         console.log('error', error)
         setIsLoading(false);
         notify({ message: 'Update Data Failed Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         setIsLoading(false);
         notify({ message: 'Update Data Successful.', variant: "success", timeout: 5000 })
         router.push(`${baseUrl}/dashboard/admin/region/countries`)
            router.refresh();
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="grid col-auto text-gray-700 space-y-10 mx-auto p-10 md:p-16 bg-gray-200 w-full sm:w-3/4 md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl font-bold mb-4">
               Edit <span className="text-orange-700 font-extralight inline-block ml-10">{country.name}</span>
            </h1>
            <InputFormField<UpdateCountryFormData>
               type="text"
               id={'name'}
               label="Country Name"
               name="name"
               register={register}
               error={errors.name}
            />
            <div className="flex justify-center w-full">
               <Button type='submit'>
                  Update Country
                  <HiOutlineArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </div>
         </div>
      </form>
   )
}

export default UpdateCountry

export type UpdateCountryFormData = {
   name: string;
};

export const UpdateDepartmentSchema: ZodType<UpdateCountryFormData> = z.object({
   name: z
      .string({ message: "Country name is required" })
      .min(3, "Country name should be at least 3 characters"),
})