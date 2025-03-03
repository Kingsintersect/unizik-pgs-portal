"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { z, ZodType } from 'zod';
import { ArrowRightIcon, Loader2 } from "lucide-react";
import { CreateNewFaculty } from '@/app/actions/server.admin';
import { notify } from '@/contexts/ToastProvider';
import { baseUrl } from '@/config';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { InputFormField } from '@/components/ui/inputs/FormFields';

const CreateFaculty = ({ token }: { token: string }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
   } = useForm<FacultyFormData>({ resolver: zodResolver(CreateFacultySchema), });
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   const onSubmit: SubmitHandler<FacultyFormData> = async (data) => {
      setIsLoading(true);
      const { error, success }: any = await CreateNewFaculty(token, data);
      if (error) {
         console.log('error', error)
         setIsLoading(false);
         notify({ message: 'Faculty Creation Failed Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         setIsLoading(false);
         notify({ message: 'Faculty Created Successful.', variant: "success", timeout: 5000 })
         router.push(`${baseUrl}/dashboard/admin/course-management/faculty`)
         router.refresh();
      } 
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="grid col-auto text-gray-700 space-y-10 mx-auto p-10 md:p-16 bg-gray-200 w-full sm:w-3/4 md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl font-bold mb-4">
               Create <span className="text-orange-700 font-extralight inline-block">{"New Faculty"}</span>
            </h1>
            <InputFormField<FacultyFormData>
               type="text"
               id={'faculty_name'}
               label="Faculty Name"
               name="faculty_name"
               register={register}
               error={errors.faculty_name}
            />

            <div className="flex justify-center w-full">
               <Button type='submit'>
                  Save New Faculty
                  {
                     (isLoading)
                     ? (<Loader2 className="animate-spin" />)
                     : (<ArrowRightIcon className="ml-2 h-5 w-5" />)                     
                  }
               </Button>
            </div>
         </div>
      </form>
   )
}

export default CreateFaculty

export const CreateFacultySchema: ZodType<FacultyFormData> = z
   .object({
      faculty_name: z
         .string({ message: "Title is required" })
         .min(3, "Title should be at least 3 characters"),
   })

type FacultyFormData = {
   faculty_name: string,
};