"use client";
import { UpdateSingleCourse, UpdateSingleCourseCategory } from '@/app/actions/server.admin';
import { baseUrl } from '@/config';
import { notify } from '@/contexts/ToastProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { HiOutlineArrowRight } from "react-icons/hi";
import { InputFormField, SelectFormField, TextareaFormField } from '../../inputs/FormFields';

const UpdateCourseCategory = ({ token, courseCategory, faculty, department, studyLevels, semesters }: { token: string, courseCategory: CourseCategory, faculty: Faculty[], department: Department[], studyLevels: StudyLevelsType[], semesters: SemestersType[] }) => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
   } = useForm<CourseCategoryFormData>({ resolver: zodResolver(UpdateCourseCategorySchema), });
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   useEffect(() => {
      if (courseCategory) {
         reset(courseCategory);  // Reset form with parent data
      }
   }, [courseCategory, reset]);

   const onSubmit = async (data: CourseCategoryFormData) => {

      setIsLoading(true);
      const { error, success }: any = await UpdateSingleCourseCategory(courseCategory.id, token, data);
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
               Update <span className="text-orange-700 font-extralight inline-block ml-10">{courseCategory.short_code}</span>
            </h1>
            <SelectFormField<CourseCategoryFormData>
               id={'faculty_id'}
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
            <SelectFormField<CourseCategoryFormData>
               id={'department_id'}
               name="department_id"
               label={"Select the Department"}
               register={register}
               valueAsNumber
               error={errors.department_id}
            >
               <option value={""}>Department Options</option>
               {department && department.map((item: any, i: any) => (
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
                  Save New Department
                  <HiOutlineArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </div>
         </div>
      </form>
   )
}

export default UpdateCourseCategory

export const UpdateCourseCategorySchema: ZodType<CourseCategoryFormData> = z
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