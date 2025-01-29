"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodType } from 'zod';
import { HiOutlineArrowRight } from "react-icons/hi";
import { CreateNewLocalGov } from '@/app/actions/server.admin';
import { notify } from '@/contexts/ToastProvider';
import { baseUrl } from '@/config';
import { useRouter } from 'next/navigation';
import { InputFormField, SelectFormField } from '../../inputs/FormFields';

const CreateLocalGov = ({ token, state }: { token: string, state: State[] }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
   } = useForm<CreateLocalGovFormData>({ resolver: zodResolver(CreateStateSchema), });
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   const onSubmit: SubmitHandler<CreateLocalGovFormData> = async (data) => {
      setIsLoading(true);
      const { error, success }: any = await CreateNewLocalGov(token, data);
      if (error) {
         console.log('error', error)
         setIsLoading(false);
         notify({ message: 'Create Data Failed Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         setIsLoading(false);
         notify({ message: 'Create Data Successful.', variant: "success", timeout: 5000 })
         router.push(`${baseUrl}/dashboard/admin/region/local-gov`)
            router.refresh();
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="grid col-auto text-gray-700 space-y-10 mx-auto p-10 md:p-16 bg-gray-200 w-full sm:w-3/4 md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl font-bold mb-4">
               Create <span className="text-orange-700 font-extralight inline-block ml-4">{"New Local Gov. Area"}</span>
            </h1>
            <SelectFormField<CreateLocalGovFormData>
               id={'state_id'}
               name="state_id"
               label={"State of origin"}
               register={register}
               error={errors.state_id}
               valueAsNumber
            >
               <option value={""}>State Option</option>
               {state && state.map((item: any, i: any) => (
                  <option key={i} value={item.id}>{item.name}</option>
               ))}
            </SelectFormField>
            <InputFormField<CreateLocalGovFormData>
               type="text"
               id={'lga'}
               label="Your Cant Separate Multiple Local Gov. With A Comma ','"
               name="lga"
               register={register}
               error={errors.lga}
            />
            <div className="flex justify-center w-full">
               <Button type='submit'>
                  Save New Local Gov
                  <HiOutlineArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </div>
         </div>
      </form>
   )
}

export default CreateLocalGov

export type CreateLocalGovFormData = {
   lga: string;
   state_id: number;
};

export const CreateStateSchema: ZodType<CreateLocalGovFormData> = z.object({
   lga: z
      .string({ message: "Name is required" })
      .min(3, "Name should be at least 3 characters"),
   state_id: z
      .number({ message: "State is required" })
})

