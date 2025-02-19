"use client";
import { UpdateSingleCourseCategory } from '@/app/actions/server.admin';
import { baseUrl } from '@/config';
import { notify } from '@/contexts/ToastProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { ArrowRightIcon } from "lucide-react";
import { SelectFormField } from '@/components/ui/inputs/FormFields';
import { Button } from '@/components/ui/button';

const UpdateCourseCategory = ({ token, courseCategory, faculty, department, studyLevels, semesters }: { token: string, courseCategory: CourseCategory, faculty: Faculty[], department: Department[], studyLevels: StudyLevelsType[], semesters: SemestersType[] }) => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
      setError,
      control,
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
               placeholder={"Select the Faculty"}
               control={control}
               valueAsNumber
               error={errors.faculty_id}
            />
            <SelectFormField<CourseCategoryFormData>
               id={'department_id'}
               name="department_id"
               placeholder={"Select the Department"}
               control={control}
               valueAsNumber
               error={errors.department_id}
            />
            <SelectFormField<CourseCategoryFormData>
               id={'level'}
               name="level"
               placeholder={"Select the study level"}
               control={control}
               valueAsNumber
               error={errors.level}
            />
            <SelectFormField<CourseCategoryFormData>
               id={'semester'}
               name="semester"
               placeholder={"Select the Semester"}
               control={control}
               error={errors.semester}
            />
            <div className="flex justify-center w-full">
               <Button type='submit'>
                  Save New Department
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
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