"use client";
import { CreateNewCourse } from '@/app/actions/server.admin';
import { baseUrl } from '@/config';
import { notify } from '@/contexts/ToastProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ArrowRightIcon } from "lucide-react";
import { InputFormField, TextareaFormField } from '@/components/ui/inputs/FormFields';
import { Button } from '@/components/ui/button';

const CreateCourse = ({ token }: { token: string }) => {
   const {
      register,
      handleSubmit,
      control,
      setValue,
      formState: { errors },
      setError,
   } = useForm<CourseFormData>({ resolver: zodResolver(CreateCourseSchema), });
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   const onSubmit: SubmitHandler<CourseFormData> = async (data) => {
      setIsLoading(true);
      console.log(data);
      
      const { error, success }: any = await CreateNewCourse(token, data);
      if (error) {
         console.log('error', error)
         setIsLoading(false);
         notify({ message: 'Failed to create course! Try again.', variant: "error", timeout: 5000 });
         return;
      }
      if (success) {
         setIsLoading(false);
         notify({ message: 'Course created Successful.', variant: "success", timeout: 5000 })
         router.push(`${baseUrl}/dashboard/admin/course-management/courses`)
            router.refresh();
      }
   }


   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="grid col-auto text-gray-700 space-y-10 mx-auto p-10 md:p-16 bg-gray-200 w-full sm:w-3/4 md:w-1/2 lg:w-2/3">
            <h1 className="text-3xl font-bold mb-4">
               Create <span className="text-orange-700 font-extralight inline-block ml-10">{"New Course"}</span>
            </h1>
            <InputFormField<CourseFormData>
               type="text"
               id={'course_title'}
               label="Course Title"
               name="course_title"
               register={register}
               error={errors.course_title}
            />
            <InputFormField<CourseFormData>
               type="text"
               id={'course_code'}
               label="Course Code"
               name="course_code"
               register={register}
               error={errors.course_code}
            />
            <TextareaFormField<CourseFormData>
               id="description"
               rows={3}
               placeholder="Short note about the new Department"
               name="description"
               register={register}
               error={errors.description}
            />
            {/* <Controller
               name="photo"
               control={control}
               render={({ field }) => (
                  <FileInput<CourseFormData>
                     label="Upload Course Photo"
                     id="photo"
                     name="photo"
                     setValue={(name, value) => setValue(name, value)}
                     error={errors.photo?.message}
                  />
               )}
            /> */}

            <div className="flex justify-center w-full">
               <Button type='submit'>
                  Save New Course
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
               </Button>
            </div>
         </div>
      </form>
   )
}

export default CreateCourse

const CreateCourseSchema = z.object({
   course_title: z.string().min(3, "Course Title should be at least 3 characters"),
   course_code: z.string().min(3, "Course Code should be at least 3 characters"),
   description: z.string().optional(),
   photo: z
      .custom<File>((file) => file instanceof File, "Photo must be a valid file")
      .refine((file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type), {
         message: "Photo must be a JPEG, PNG, or GIF",
      })
      .refine((file) => file.size <= 5 * 1024 * 1024, {
         message: "Photo size must be less than 5MB",
      })
      .optional(),
});

type CourseFormData = {
   course_title: string;
   course_code: string;
   description?: string | null;
   photo?: File | null;
};

interface FileInputProps<T> {
   label: string;
   id: string;
   name: keyof T;
   setValue: (name: keyof T, value: File | null) => void;
   error?: string;
}

const FileInput = <T,>({
   label,
   id,
   name,
   setValue,
   error,
}: FileInputProps<T>) => {
   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      setValue(name, file);
   };

   return (
      <div className="file-input-container">
         <label htmlFor={id} className="file-input-label">
            {label}
         </label>
         <input
            type="file"
            id={id}
            name={String(name)}
            accept="image/jpeg, image/png, image/gif"
            onChange={handleFileChange}
            className="file-input"
         />
         {error && <p className="error-message">{error}</p>}
         <style jsx>{`
         .file-input-container {
           margin-bottom: 1rem;
         }
         .file-input-label {
           font-weight: bold;
           margin-bottom: 0.5rem;
           display: block;
         }
         .file-input {
           display: block;
         }
         .error-message {
           color: red;
           font-size: 0.875rem;
         }
       `}</style>
      </div>
   );
};
