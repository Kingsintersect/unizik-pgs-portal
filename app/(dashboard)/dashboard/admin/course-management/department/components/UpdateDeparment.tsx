"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { FieldError, SubmitHandler, useForm, UseFormRegister } from "react-hook-form";
import { z, ZodType } from 'zod';
import { ArrowRightIcon } from "lucide-react";
import { UpdateSingleDepartment } from '@/app/actions/server.admin';
import { notify } from '@/contexts/ToastProvider';
import { baseUrl } from '@/config';
import { useRouter } from 'next/navigation';
import { InputFormField, SelectFormField } from '@/components/ui/inputs/FormFields';
import { Button } from '@/components/ui/button';

const UpdateDeparment = ({ faculty, department, token }: { faculty: Faculty[], department: Department, token: string }) => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
   } = useForm<UpdateDeparmentFormData>({ resolver: zodResolver(UpdateDeparmentSchema), });
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   useEffect(() => {
      if (department) {
         reset(department);  // Reset form with parent data
      }
   }, [department, reset]);

   const onSubmit: SubmitHandler<UpdateDeparmentFormData> = async (data) => {
      setIsLoading(true);
      const { error, success }: any = await UpdateSingleDepartment(department.id, token, data);
      if (error) {
         console.log('error', error)
         setIsLoading(false);
         notify({ message: 'Update Data Failed Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         setIsLoading(false);
         notify({ message: 'Update Data Successful.', variant: "success", timeout: 5000 })
         router.push(`${baseUrl}/dashboard/admin/course-management/department`)
            router.refresh();
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="grid col-auto text-gray-700 space-y-10 mx-auto p-10 md:p-16 bg-gray-200 w-full sm:w-3/4 md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl font-bold mb-4">
               Edit <span className="text-orange-700 font-extralight inline-block ml-4">{department.department_name}</span>
            </h1>
            <SelectFormField<UpdateDeparmentFormData>
               id={'parent'}
               name="faculty_id"
               label={"Select the Faculty"}
               register={register}
               valueAsNumber
               error={errors.faculty_id}
            >
               <option value={""}>Faculty Option</option>
               {faculty && faculty.map((item: any, i: any) => (
                  <option key={i} value={item.id}>{item.faculty_name}</option>
               ))}
            </SelectFormField>
            <InputFormField<UpdateDeparmentFormData>
               type="text"
               id={'department_name'}
               label="Department Name"
               name="department_name"
               register={register}
               error={errors.department_name}
            />
            {/* <TextareaFormField<UpdateDeparmentFormData>
               id="description"
               rows={3}
               placeholder="Short note about the new Department"
               name="description"
               register={register}
               error={errors.description} cols={0} /> */}

            <div className="flex justify-center w-full">
               <Button type='submit'>
                  Edit Department
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
               </Button>
            </div>
         </div>
      </form>
   )
}

export default UpdateDeparment

type UpdateDeparmentFormData = {
   faculty_id: number,
   department_name: string,
   // description?: string,
};
export const UpdateDeparmentSchema: ZodType<UpdateDeparmentFormData> = z
   .object({
      faculty_id: z.number({ required_error: "Select Faculty", }),
      department_name: z
         .string({ message: "Deprtment name is required" })
         .min(3, "Department name should be at least 3 characters"),
      // despription: z.string().optional(),
   })
