"use client";
import { CreateNewCourseCategory, GetAllDepartmentInAFaculty } from '@/app/actions/server.admin';
import { baseUrl } from '@/config';
import { notify } from '@/contexts/ToastProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { HiOutlineArrowRight } from "react-icons/hi";
import { SelectFormField } from '../../inputs/FormFields';

const CreateCourseCategory = ({ token, faculty, studyLevels, semesters }: { token: string, faculty: Faculty[], studyLevels: StudyLevelsType[], semesters: SemestersType[] }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
      setError,
   } = useForm<CourseCategoryFormData>({ resolver: zodResolver(CreateCourseCategorySchema), });
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [depatments, setDepatments] = useState<any[]>([]);
   const router = useRouter();

   const handleFacultyChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
      const faciltyId = e.target.value;
      if (!faciltyId) return;

      try {
         const { error, success }: any = await GetAllDepartmentInAFaculty(faciltyId);
         if (error) {
            console.error("Error fetching courses:", error);
            return;
         }

         if (success.data) {
            setDepatments(success.data)
         }
      } catch (error) {
         console.error("An unexpected error occurred:", error);
      }
   };

   const onSubmit: SubmitHandler<CourseCategoryFormData> = async (data) => {
      setIsLoading(true);
      const { error, success }: any = await CreateNewCourseCategory(token, data);
      if (error) {
         console.log('error', error)
         setIsLoading(false);
         notify({ message: 'Failed to create course! Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         setIsLoading(false);
         notify({ message: 'Course created Successful.', variant: "success", timeout: 5000 })
         router.push(`${baseUrl}/dashboard/admin/course-management/course-categories`)
            router.refresh();
      }
   }


   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="grid col-auto text-gray-700 space-y-10 mx-auto p-10 md:p-16 bg-gray-200 w-full sm:w-3/4 md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl font-bold mb-4">
               Create <span className="text-orange-700 font-extralight inline-block ml-4">{"New Course Category"}</span>
            </h1>
            <SelectFormField<CourseCategoryFormData>
               id={'faculty_id'}
               name="faculty_id"
               label={"Select the Faculty"}
               register={register}
               valueAsNumber
               error={errors.faculty_id}
               handleChange={handleFacultyChange}
            >
               <option value={""}>Faculty Options</option>
               {faculty && faculty.map((item: any, i: any) => (
                  <option key={i} value={item.id}>{item.faculty_name}</option>
               ))}
            </SelectFormField>
            <SelectFormField<CourseCategoryFormData>
               id={'department_id'}
               name="department_id"
               label={"Select the Department"}
               register={register}
               valueAsNumber
               error={errors.department_id}
            >
               <option value={""}>Department Options</option>
               {depatments && depatments.map((item: any, i: any) => (
                  <option key={i} value={item.id}>{item.department_name}</option>
               ))}
            </SelectFormField>
            <SelectFormField<CourseCategoryFormData>
               id={'level'}
               name="level"
               label={"Select the study level"}
               register={register}
               valueAsNumber
               error={errors.level}
            >
               <option value={""}>Study Level Options</option>
               {studyLevels && studyLevels.map((item: any, i: any) => (
                  <option key={i} value={item.value}>{item.label}</option>
               ))}
            </SelectFormField>
            <SelectFormField<CourseCategoryFormData>
               id={'semester'}
               name="semester"
               label={"Select the Semester"}
               register={register}
               error={errors.semester}
            >
               <option value={""}>Semester Options</option>
               {semesters && semesters.map((item: any, i: any) => (
                  <option key={i} value={item.value}>{item.label}</option>
               ))}
            </SelectFormField>
            <div className="flex justify-center w-full">
               <Button type='submit'>
                  Save New Course
                  <HiOutlineArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </div>
         </div>
      </form>
   )
}

export default CreateCourseCategory

export const CreateCourseCategorySchema: ZodType<CourseCategoryFormData> = z
   .object({
      faculty_id: z.number({ required_error: "Select Faculty", }),
      department_id: z.number({ required_error: "Select Department", }),
      level: z.number({ required_error: "Select Study Level", }),
      semester: z
         .string({ message: "Semester is required" })
         .min(3, "Semester should be at least 3 characters"),
   })

type CourseCategoryFormData = {
   faculty_id: number,
   department_id: number,
   level: number,
   semester: string,
};