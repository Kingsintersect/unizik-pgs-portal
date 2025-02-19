"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm, } from "react-hook-form";
import { z, ZodType } from 'zod';
import { ArrowRightIcon } from "lucide-react";
import { UpdateSingleLocalGov } from '@/app/actions/server.admin';
import { notify } from '@/contexts/ToastProvider';
import { baseUrl, State } from '@/config';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { InputFormField, SelectFormField } from '@/components/ui/inputs/FormFields';

const UpdateLocalGov = ({ token, parent, localGov, state, }: { token: string, parent: string, state: State, localGov: LocalGov }) => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
   } = useForm<UpdateLocalGovFormData>({ resolver: zodResolver(UpdateStateSchema), });
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   useEffect(() => {
      if (localGov) {
         reset(localGov);  // Reset form with parent data
      }
   }, [reset, localGov]);

   const onSubmit: SubmitHandler<UpdateLocalGovFormData> = async (data) => {
      setIsLoading(true);
      const { error, success }: any = await UpdateSingleLocalGov(localGov.id, token, data);
      if (error) {
         console.log('error', error)
         setIsLoading(false);
         notify({ message: 'state Update Failed Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         setIsLoading(false);
         notify({ message: 'State Update Data Successful.', variant: "success", timeout: 5000 })
         router.push(`${baseUrl}/dashboard/admin/region/local-gov`)
            router.refresh();
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="grid col-auto text-gray-700 space-y-10 mx-auto p-10 md:p-16 bg-gray-200 w-full sm:w-3/4 md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl font-bold mb-4">
               Editing <span className="text-orange-700 font-extralight inline-block ml-4">{localGov.name}</span>
            </h1>
            <SelectFormField<UpdateLocalGovFormData>
               id={'state_id'}
               name="state_id"
               label={"State"}
               register={register}
               error={errors.state_id}
               valueAsNumber
            >
               <option value={""}>State Option</option>
               {State && State.map((item: any, i: any) => (
                  <option key={i} value={item.id}>{item.label}</option>
               ))}
            </SelectFormField>
            <InputFormField<UpdateLocalGovFormData>
               type="text"
               id={'name'}
               label="Name of Local Government"
               name="name"
               register={register}
               error={errors.name}
            />
            <div className="flex justify-center w-full">
               <Button type='submit'>
                  Update Country
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
               </Button>
            </div>
         </div>
      </form>
   )
}

export default UpdateLocalGov

export type UpdateLocalGovFormData = {
   name: string;
   state_id: number;
};

export const UpdateStateSchema: ZodType<UpdateLocalGovFormData> = z.object({
   name: z.string().min(3, "Name should be at least 3 characters"),
   state_id: z.number({ required_error: "Choose a value" }).refine((value) => value > 0, { message: "State must be selected" })
})