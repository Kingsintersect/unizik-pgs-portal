"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FieldError, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { z, ZodType } from 'zod';
import { HiOutlineArrowRight } from "react-icons/hi";
import { UpdateSingleSubjectGrade } from '@/app/actions/server.admin';
import { notify } from '@/contexts/ToastProvider';
import { baseUrl } from '@/config';
import { useRouter } from 'next/navigation';
import { InputFormField } from '@/components/ui/inputs/FormFields';

const UpdateSubjectGrade = ({ subjectGrade, token }: { subjectGrade: SubjectGrade, token: string }) => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
   } = useForm<UpdateSubjectGradeFormData>({ resolver: zodResolver(UpdateSubjectGradeSchema), });
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   useEffect(() => {
      if (subjectGrade) {
         reset(subjectGrade);  // Reset form with parent data
      }
   }, [subjectGrade, reset]);

   const onSubmit: SubmitHandler<UpdateSubjectGradeFormData> = async (data) => {

      setIsLoading(true);
      const { error, success }: any = await UpdateSingleSubjectGrade(token, data);
      if (error) {
         console.log('error', error)
         setIsLoading(false);
         notify({ message: 'Update Data Failed Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         setIsLoading(false);
         notify({ message: 'Update Data Successful.', variant: "success", timeout: 5000 })
         router.push(`${baseUrl}/dashboard/admin/highschool/grades`)
            router.refresh();
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="grid col-auto text-gray-700 space-y-10 mx-auto p-10 md:p-16 bg-gray-200 w-full sm:w-3/4 md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl font-bold mb-4">
               Updating <span className="text-orange-700 font-extralight inline-block ml-10">{subjectGrade.name}</span>
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
                  Update Subject Grade
                  <HiOutlineArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </div>
         </div>
      </form>
   )
}

export default UpdateSubjectGrade

export type UpdateSubjectGradeFormData = {
   name: string;
};

export const UpdateSubjectGradeSchema: ZodType<UpdateSubjectGradeFormData> = z.object({
   name: z
      .string({ message: "Subject Grade name is required" })
      .min(1, "Subject Grade name should be at least 1 characters"),
})