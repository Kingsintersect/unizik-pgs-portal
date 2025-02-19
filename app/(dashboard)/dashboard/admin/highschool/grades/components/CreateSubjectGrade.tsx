"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodType } from 'zod';
import { ArrowRightIcon } from "lucide-react";
import { CreateNewSubjectGrade } from '@/app/actions/server.admin';
import { notify } from '@/contexts/ToastProvider';
import { baseUrl } from '@/config';
import { useRouter } from 'next/navigation';
import { InputFormField } from '@/components/ui/inputs/FormFields';
import { Button } from '@/components/ui/button';

const CreateSubjectGrade = ({ token }: { token: string }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
   } = useForm<CreateSubjectGradeFormData>({ resolver: zodResolver(CreateSubjectGradeSchema), });
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   const onSubmit: SubmitHandler<CreateSubjectGradeFormData> = async (data) => {

      setIsLoading(true);
      const { error, success }: any = await CreateNewSubjectGrade(token, data);
      if (error) {
         console.log('error', error)
         setIsLoading(false);
         notify({ message: 'Faield To Save Data! Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         setIsLoading(false);
         notify({ message: 'Subject Created Successfully.', variant: "success", timeout: 5000 })
         router.push(`${baseUrl}/dashboard/admin/highschool/grades`)
            router.refresh();
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="grid col-auto text-gray-700 space-y-10 mx-auto p-10 md:p-16 bg-gray-200 w-full sm:w-3/4 md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl font-bold mb-4">
               Create <span className="text-orange-700 font-extralight inline-block ml-10">{"New Subject Grade"}</span>
            </h1>
            <InputFormField
               type="text"
               id={'name'}
               label="Subject Grade Name"
               name="name"
               register={register}
               error={errors.name}
            />
            <div className="flex justify-center w-full">
               <Button type='submit'>
                  Save New Subject Grade
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
               </Button>
            </div>
         </div>
      </form>
   )
}

export default CreateSubjectGrade

export type CreateSubjectGradeFormData = {
   name: string;
};

export const CreateSubjectGradeSchema: ZodType<CreateSubjectGradeFormData> = z.object({
   name: z
      .string({ message: "Subject Grade name is required" })
      .min(1, "Subject Grade name should be at least 1 characters"),
})

