"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FieldError, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { z, ZodType } from 'zod';
import { HiOutlineArrowRight } from "react-icons/hi";
import { UpdateSingleFaculty } from '@/app/actions/server.admin';
import { notify } from '@/contexts/ToastProvider';
import { baseUrl } from '@/config';
import { useRouter } from 'next/navigation';
import { InputFormField, TextareaFormField } from '../../inputs/FormFields';

const UpdateFaculty = ({ faculty, token }: { faculty: Faculty, token: string }) => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
   } = useForm<UpdateFacultyFormData>({ resolver: zodResolver(UpdateFacultySchema), });
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   useEffect(() => {
      if (faculty) {
         reset(faculty);  // Reset form with parent data
      }
   }, [faculty, reset]);

   const onSubmit: SubmitHandler<UpdateFacultyFormData> = async (data) => {
      setIsLoading(true);
      const { error, success }: any = await UpdateSingleFaculty(faculty.id, token, data);
      if (error) {
         console.log('error', error)
         setIsLoading(false);
         notify({ message: 'Update Data Failed Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         setIsLoading(false);
         notify({ message: 'Update Data Successful.', variant: "success", timeout: 5000 })
         router.push(`${baseUrl}/dashboard/admin/course-management/faculty`)
            router.refresh();
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="grid col-auto text-gray-700 space-y-10 mx-auto p-10 md:p-16 bg-gray-200 w-full sm:w-3/4 md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl font-bold mb-4">
               Edit <span className="text-orange-700 font-extralight inline-block ml-10">{faculty.faculty_name}</span>
            </h1>
            <InputFormField<UpdateFacultyFormData>
               type="text"
               id={'faculty_name'}
               label="Faculty Name"
               name="faculty_name"
               register={register}
               error={errors.faculty_name}
            />
            {/* <TextareaFormField<UpdateFacultyFormData>
               id="description"
               rows={3}
               placeholder="Short note about the new Faculty"
               name="description"
               register={register}
               error={errors.description} cols={0} /> */}

            <div className="flex justify-center w-full">
               <Button type='submit'>
                  Edit Faculty
                  <HiOutlineArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </div>
         </div>
      </form>
   )
}

export default UpdateFaculty

type UpdateFacultyFormData = {
   faculty_name: string,
   // description?: string,
};
export const UpdateFacultySchema: ZodType<UpdateFacultyFormData> = z
   .object({
      faculty_name: z
         .string({ message: "Title is required" })
         .min(3, "Title should be at least 3 characters"),
      // despription: z.string().optional(),
   })
